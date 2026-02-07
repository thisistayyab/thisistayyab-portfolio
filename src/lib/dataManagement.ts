import { supabase } from './supabase';

// Data retention settings (in days) - only page_views and contact_submissions (user_events/sessions removed)
const RETENTION_DAYS = {
  page_views: 90,
  contact_submissions: 365,
};

const ARCHIVE_TABLES = {
  page_views: 'page_views_archive',
  contact_submissions: 'contact_submissions_archive',
};

// Archive old analytics data instead of deleting
export const archiveOldAnalytics = async () => {
  try {
    const cutoffDate = new Date();
    
    // Archive page views older than retention period
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS.page_views);
    const { data: oldPageViews } = await supabase
      .from('page_views')
      .select('*')
      .lt('created_at', cutoffDate.toISOString());

    if (oldPageViews && oldPageViews.length > 0) {
      // Insert into archive table (create if doesn't exist)
      const { error: archiveError } = await supabase
        .from(ARCHIVE_TABLES.page_views)
        .insert(oldPageViews);

      if (!archiveError) {
        // Delete from main table only after successful archive
        await supabase
          .from('page_views')
          .delete()
          .lt('created_at', cutoffDate.toISOString());
        console.log(`Archived ${oldPageViews.length} page views`);
      }
    }

    // Archive old contact submissions
    const contactCutoff = new Date();
    contactCutoff.setDate(contactCutoff.getDate() - RETENTION_DAYS.contact_submissions);
    const { data: oldContacts } = await supabase
      .from('contact_submissions')
      .select('*')
      .lt('created_at', contactCutoff.toISOString());

    if (oldContacts && oldContacts.length > 0) {
      const { error: archiveError } = await supabase
        .from(ARCHIVE_TABLES.contact_submissions)
        .insert(oldContacts);

      if (!archiveError) {
        await supabase
          .from('contact_submissions')
          .delete()
          .lt('created_at', contactCutoff.toISOString());
        console.log(`Archived ${oldContacts.length} contact submissions`);
      }
    }

    console.log('Old analytics data archived successfully');
  } catch (error) {
    console.error('Error archiving old analytics:', error);
    // If archive fails, fall back to compression/aggregation
    await compressOldAnalytics();
  }
};

// Compress old analytics data by aggregating into daily summaries
export const compressOldAnalytics = async () => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS.page_views);

    // Aggregate page views by day
    const { data: aggregated } = await supabase.rpc('aggregate_page_views', {
      cutoff_date: cutoffDate.toISOString(),
    });

    if (aggregated) {
      // Store aggregated data in archive table
      await supabase.from(ARCHIVE_TABLES.page_views).insert(aggregated);
      
      // Delete detailed records
      await supabase
        .from('page_views')
        .delete()
        .lt('created_at', cutoffDate.toISOString());
      
      console.log('Analytics data compressed successfully');
    }
  } catch (error) {
    console.error('Error compressing analytics:', error);
  }
};

// Legacy function name for backward compatibility
export const cleanupOldAnalytics = archiveOldAnalytics;

// Get paginated data
export const getPaginatedData = async (
  table: string,
  page: number = 1,
  pageSize: number = 50,
  filters?: Record<string, any>
) => {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from(table)
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    };
  } catch (error) {
    console.error(`Error fetching paginated data from ${table}:`, error);
    return {
      data: [],
      total: 0,
      page: 1,
      pageSize,
      totalPages: 0,
    };
  }
};

// Archive old data to a separate table (optional - for future implementation)
export const archiveOldData = async (table: string, daysOld: number) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // This would require creating archive tables first
    // For now, we'll just log the intention
    console.log(`Would archive ${table} data older than ${daysOld} days`);
  } catch (error) {
    console.error(`Error archiving ${table}:`, error);
  }
};

// Run cleanup on a schedule (call this from dashboard or cron job)
export const scheduleCleanup = () => {
  // Run cleanup once per day
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(2, 0, 0, 0); // Run at 2 AM

  const msUntilTomorrow = tomorrow.getTime() - now.getTime();

  setTimeout(() => {
    cleanupOldAnalytics();
    // Schedule next cleanup
    setInterval(cleanupOldAnalytics, 24 * 60 * 60 * 1000); // Every 24 hours
  }, msUntilTomorrow);
};
