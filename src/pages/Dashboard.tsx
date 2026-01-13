import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PageView, UserEvent, Session, ContactSubmission } from '../lib/supabase';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import {
  BarChart3,
  Users,
  Eye,
  MousePointerClick,
  Mail,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  Globe,
  FolderKanban,
  Briefcase,
  UserCircle,
  MessageSquare,
  Settings,
  CheckCircle2,
} from 'lucide-react';
import { cleanupOldAnalytics } from '../lib/dataManagement';
import { initializeStorageBuckets } from '../lib/storage';
import { ProjectsManagement } from './dashboard/ProjectsManagement';
import { ServicesManagement } from './dashboard/ServicesManagement';
import { ProfilesManagement } from './dashboard/ProfilesManagement';
import { TestimonialsManagement } from './dashboard/TestimonialsManagement';
import { ExperiencesManagement } from './dashboard/ExperiencesManagement';

type DashboardTab = 'overview' | 'projects' | 'services' | 'profiles' | 'testimonials' | 'experiences' | 'contacts';

interface DashboardStats {
  totalPageViews: number;
  totalSessions: number;
  totalEvents: number;
  totalContacts: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
}

interface TrendData {
  pageViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  avgDuration: number;
}

export const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalPageViews: 0,
    totalSessions: 0,
    totalEvents: 0,
    totalContacts: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
  });
  const [pageViewsData, setPageViewsData] = useState<any[]>([]);
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [sessionsData, setSessionsData] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7); // days
  const [trends, setTrends] = useState<TrendData>({
    pageViews: 0,
    uniqueVisitors: 0,
    totalSessions: 0,
    avgDuration: 0,
  });
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'overview' || activeTab === 'contacts') {
      fetchDashboardData();
      const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [dateRange, activeTab]);

  // Initialize storage buckets and cleanup old analytics data on dashboard load
  useEffect(() => {
    // Initialize storage buckets (only once)
    initializeStorageBuckets();

    // Cleanup old analytics data (once per day)
    const lastCleanup = localStorage.getItem('last_analytics_cleanup');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastCleanup || (now - parseInt(lastCleanup)) > oneDay) {
      cleanupOldAnalytics();
      localStorage.setItem('last_analytics_cleanup', now.toString());
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);
      const startDateStr = startDate.toISOString();

      // Calculate previous period for comparison
      const previousStartDate = new Date();
      previousStartDate.setDate(previousStartDate.getDate() - (dateRange * 2));
      const previousEndDate = new Date();
      previousEndDate.setDate(previousEndDate.getDate() - dateRange);
      const previousStartDateStr = previousStartDate.toISOString();
      const previousEndDateStr = previousEndDate.toISOString();

      // Fetch current period stats
      const [pageViewsRes, sessionsRes, eventsRes, contactsRes] = await Promise.all([
        supabase
          .from('page_views')
          .select('*', { count: 'exact' })
          .gte('created_at', startDateStr),
        supabase
          .from('sessions')
          .select('*', { count: 'exact' })
          .gte('first_visit', startDateStr),
        supabase
          .from('user_events')
          .select('*', { count: 'exact' })
          .gte('created_at', startDateStr),
        supabase
          .from('contact_submissions')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false }),
      ]);

      const totalPageViews = pageViewsRes.count || 0;
      const totalSessions = sessionsRes.count || 0;
      const totalEvents = eventsRes.count || 0;
      const totalContacts = contactsRes.count || 0;

      // Get unique visitors
      const { data: uniqueSessions } = await supabase
        .from('sessions')
        .select('session_id')
        .gte('first_visit', startDateStr);

      const uniqueVisitors = new Set(uniqueSessions?.map((s) => s.session_id) || []).size;

      // Calculate average session duration
      const { data: allSessions } = await supabase
        .from('sessions')
        .select('duration_seconds, is_bounce')
        .gte('first_visit', startDateStr);

      const avgDuration =
        allSessions && allSessions.length > 0
          ? allSessions.reduce((acc, s) => acc + (s.duration_seconds || 0), 0) / allSessions.length
          : 0;

      const bounceRate =
        allSessions && allSessions.length > 0
          ? (allSessions.filter((s) => s.is_bounce).length / allSessions.length) * 100
          : 0;

      // Fetch previous period stats for comparison
      const [prevPageViewsRes, prevSessionsRes, prevUniqueSessionsRes, prevAllSessionsRes] = await Promise.all([
        supabase
          .from('page_views')
          .select('*', { count: 'exact' })
          .gte('created_at', previousStartDateStr)
          .lt('created_at', previousEndDateStr),
        supabase
          .from('sessions')
          .select('*', { count: 'exact' })
          .gte('first_visit', previousStartDateStr)
          .lt('first_visit', previousEndDateStr),
        supabase
          .from('sessions')
          .select('session_id')
          .gte('first_visit', previousStartDateStr)
          .lt('first_visit', previousEndDateStr),
        supabase
          .from('sessions')
          .select('duration_seconds')
          .gte('first_visit', previousStartDateStr)
          .lt('first_visit', previousEndDateStr),
      ]);

      const prevPageViews = prevPageViewsRes.count || 0;
      const prevSessions = prevSessionsRes.count || 0;
      const prevUniqueVisitors = new Set(prevUniqueSessionsRes?.data?.map((s) => s.session_id) || []).size;
      const prevAvgDuration =
        prevAllSessionsRes.data && prevAllSessionsRes.data.length > 0
          ? prevAllSessionsRes.data.reduce((acc, s) => acc + (s.duration_seconds || 0), 0) / prevAllSessionsRes.data.length
          : 0;

      // Calculate percentage changes
      const calculatePercentageChange = (current: number, previous: number): number => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
      };

      setTrends({
        pageViews: calculatePercentageChange(totalPageViews, prevPageViews),
        uniqueVisitors: calculatePercentageChange(uniqueVisitors, prevUniqueVisitors),
        totalSessions: calculatePercentageChange(totalSessions, prevSessions),
        avgDuration: calculatePercentageChange(avgDuration, prevAvgDuration),
      });

      setStats({
        totalPageViews,
        totalSessions,
        totalEvents,
        totalContacts,
        uniqueVisitors,
        avgSessionDuration: Math.round(avgDuration),
        bounceRate: Math.round(bounceRate * 100) / 100,
      });

      // Fetch chart data
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('created_at')
        .gte('created_at', startDateStr)
        .order('created_at', { ascending: true });

      const { data: events } = await supabase
        .from('user_events')
        .select('created_at, event_type')
        .gte('created_at', startDateStr)
        .order('created_at', { ascending: true });

      const { data: sessions } = await supabase
        .from('sessions')
        .select('first_visit, page_count')
        .gte('first_visit', startDateStr)
        .order('first_visit', { ascending: true });

      // Process data for charts
      const processedPageViews = processTimeSeriesData(pageViews || [], 'created_at');
      const processedEvents = processTimeSeriesData(events || [], 'created_at');
      const processedSessions = processTimeSeriesData(sessions || [], 'first_visit');

      setPageViewsData(processedPageViews);
      setEventsData(processedEvents);
      setSessionsData(processedSessions);
      setRecentContacts(contactsRes.data || []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const processTimeSeriesData = (data: any[], dateField: string) => {
    const grouped: Record<string, number> = {};
    const now = new Date();
    const days = dateRange;

    // Initialize all days with 0
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      grouped[key] = 0;
    }

    // Count occurrences per day
    data.forEach((item) => {
      const date = new Date(item[dateField]);
      const key = date.toISOString().split('T')[0];
      if (grouped[key] !== undefined) {
        grouped[key]++;
      }
    });

    return Object.entries(grouped).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count,
    }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatTrend = (percentage: number): string => {
    if (percentage === 0) return '0%';
    const sign = percentage > 0 ? '+' : '';
    return `${sign}${percentage.toFixed(1)}%`;
  };

  const handleViewMessage = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
    // Auto-mark as read when viewing
    if (!contact.is_read) {
      handleMarkAsRead(contact.id);
    }
  };

  const handleMarkAsRead = async (contactId: string) => {
    setUpdatingStatus(contactId);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', contactId);

      if (error) throw error;

      // Update local state
      setRecentContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, is_read: true } : contact
        )
      );

      // Update selected contact if it's the one being viewed
      if (selectedContact?.id === contactId) {
        setSelectedContact((prev) => (prev ? { ...prev, is_read: true } : null));
      }
    } catch (error) {
      console.error('Error marking contact as read:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleMarkAsUnread = async (contactId: string) => {
    setUpdatingStatus(contactId);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: false })
        .eq('id', contactId);

      if (error) throw error;

      // Update local state
      setRecentContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, is_read: false } : contact
        )
      );

      // Update selected contact if it's the one being viewed
      if (selectedContact?.id === contactId) {
        setSelectedContact((prev) => (prev ? { ...prev, is_read: false } : null));
      }
    } catch (error) {
      console.error('Error marking contact as unread:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManagement />;
      case 'services':
        return <ServicesManagement />;
      case 'profiles':
        return <ProfilesManagement />;
      case 'testimonials':
        return <TestimonialsManagement />;
      case 'experiences':
        return <ExperiencesManagement />;
      case 'contacts':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400">Email</th>
                    <th className="text-left py-3 px-4 text-gray-400">Subject</th>
                    <th className="text-left py-3 px-4 text-gray-400">Message</th>
                    <th className="text-left py-3 px-4 text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-400">
                        No contact submissions yet
                      </td>
                    </tr>
                  ) : (
                    recentContacts.map((contact) => (
                      <tr 
                        key={contact.id} 
                        className={`border-b border-gray-700 hover:bg-gray-700/30 transition-colors ${
                          !contact.is_read ? 'bg-yellow-500/5' : ''
                        }`}
                      >
                        <td className="py-3 px-4">{contact.name}</td>
                        <td className="py-3 px-4">{contact.email}</td>
                        <td className="py-3 px-4">{contact.subject}</td>
                        <td 
                          className="py-3 px-4 max-w-xs truncate cursor-pointer text-blue-400 hover:text-blue-300"
                          onClick={() => handleViewMessage(contact)}
                          title="Click to view full message"
                        >
                          {contact.message}
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => 
                              contact.is_read 
                                ? handleMarkAsUnread(contact.id)
                                : handleMarkAsRead(contact.id)
                            }
                            disabled={updatingStatus === contact.id}
                            className={`px-2 py-1 rounded text-xs cursor-pointer transition-all ${
                              contact.is_read
                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            } ${updatingStatus === contact.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={contact.is_read ? 'Click to mark as unread' : 'Click to mark as read'}
                          >
                            {updatingStatus === contact.id ? 'Updating...' : (contact.is_read ? 'Read' : 'Unread')}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Message Modal */}
            {isModalOpen && selectedContact && (
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
                onClick={() => setIsModalOpen(false)}
              >
                <Card
                  className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  hoverScale={false}
                  hoverLift={false}
                  glowColor="transparent"
                  gradientColors={[]}
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-2xl mb-3 pr-4">{selectedContact.subject}</CardTitle>
                        <div className="text-sm text-gray-400 space-y-1.5">
                          <p><span className="font-semibold text-gray-300">From:</span> {selectedContact.name}</p>
                          <p><span className="font-semibold text-gray-300">Email:</span> {selectedContact.email}</p>
                          <p><span className="font-semibold text-gray-300">Date:</span> {new Date(selectedContact.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                        aria-label="Close modal"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-200">Message</h3>
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                          <p className="text-gray-300 whitespace-pre-wrap break-words overflow-wrap-anywhere">{selectedContact.message}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3 justify-end p-6 pt-4">
                    <Button
                      onClick={() => {
                        if (selectedContact.is_read) {
                          handleMarkAsUnread(selectedContact.id);
                        } else {
                          handleMarkAsRead(selectedContact.id);
                        }
                      }}
                      variant="outline"
                      className="cursor-pointer"
                      disabled={updatingStatus === selectedContact.id}
                      glowColor={selectedContact.is_read ? "#f59e0b" : "#10b981"}
                    >
                      {updatingStatus === selectedContact.id ? (
                        <>
                          <Clock size={16} className="mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : selectedContact.is_read ? (
                        <>
                          <Eye size={16} className="mr-2" />
                          Mark as Unread
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} className="mr-2" />
                          Mark as Read
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      variant="default"
                      className="cursor-pointer"
                      glowColor="#3b82f6"
                    >
                      Close
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        );
      case 'overview':
      default:
        return (
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Page Views"
                value={stats.totalPageViews.toLocaleString()}
                icon={<Eye size={24} />}
                trend={formatTrend(trends.pageViews)}
              />
              <StatCard
                title="Unique Visitors"
                value={stats.uniqueVisitors.toLocaleString()}
                icon={<Users size={24} />}
                trend={formatTrend(trends.uniqueVisitors)}
              />
              <StatCard
                title="Total Sessions"
                value={stats.totalSessions.toLocaleString()}
                icon={<Globe size={24} />}
                trend={formatTrend(trends.totalSessions)}
              />
              <StatCard
                title="Avg. Duration"
                value={formatDuration(stats.avgSessionDuration)}
                icon={<Clock size={24} />}
                trend={formatTrend(trends.avgDuration)}
              />
            </div>

            {/* Charts */}
            {pageViewsData.length > 0 || eventsData.length > 0 || sessionsData.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {pageViewsData.length > 0 && (
                    <ChartCard title="Page Views Over Time">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={pageViewsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                          />
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#3B82F6"
                            fill="#3B82F6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  )}

                  {eventsData.length > 0 && (
                    <ChartCard title="User Events Over Time">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={eventsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                          />
                          <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  )}
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {sessionsData.length > 0 && (
                    <ChartCard title="Sessions Over Time">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={sessionsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                          />
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  )}

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Additional Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Events</span>
                        <span className="text-xl font-bold">{stats.totalEvents.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Contact Submissions</span>
                        <span className="text-xl font-bold">{stats.totalContacts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Bounce Rate</span>
                        <span className="text-xl font-bold">{stats.bounceRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center mb-8">
                <div className="text-gray-400">
                  <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No analytics data yet</p>
                  <p className="text-sm mt-2">Analytics will appear here once visitors start using your website</p>
                </div>
              </div>
            )}

            {/* Data Management Info */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-8">
              <h3 className="text-lg font-semibold mb-4">Data Management</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Analytics data older than 90 days is automatically cleaned up</p>
                <p>• Contact submissions are kept for 1 year</p>
                <p>• Cleanup runs automatically once per day</p>
                <p>• Only home page views are tracked to reduce data growth</p>
              </div>
            </div>
          </main>
        );
    }
  };

  if (loading && activeTab === 'overview') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Analytics
            </div>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.8)] text-white backdrop-blur-[10px] shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-300 bg-white/5 border border-white/10 backdrop-blur-[10px] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <BarChart3 size={18} className="inline mr-2" />
              Overview
            </button>

            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-6">
              Content Management
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.8)] text-white backdrop-blur-[10px] shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-300 bg-white/5 border border-white/10 backdrop-blur-[10px] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <FolderKanban size={18} className="inline mr-2" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.8)] text-white backdrop-blur-[10px] shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-300 bg-white/5 border border-white/10 backdrop-blur-[10px] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <Settings size={18} className="inline mr-2" />
              Services
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'profiles'
                  ? 'bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.8)] text-white backdrop-blur-[10px] shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-300 bg-white/5 border border-white/10 backdrop-blur-[10px] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <UserCircle size={18} className="inline mr-2" />
              Profiles
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.8)] text-white backdrop-blur-[10px] shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-300 bg-white/5 border border-white/10 backdrop-blur-[10px] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <MessageSquare size={18} className="inline mr-2" />
              Testimonials
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'experiences'
                  ? 'bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.8)] text-white backdrop-blur-[10px] shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-300 bg-white/5 border border-white/10 backdrop-blur-[10px] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <Briefcase size={18} className="inline mr-2" />
              Experiences
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.8)] text-white backdrop-blur-[10px] shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-300 bg-white/5 border border-white/10 backdrop-blur-[10px] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <Mail size={18} className="inline mr-2" />
              Contacts
            </button>
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="text-xs text-gray-400 mb-2">Signed in as</div>
            <div className="text-sm font-medium">{user?.email}</div>
            <Button
              onClick={handleSignOut}
              className="w-full mt-4 cursor-pointer"
              variant="destructive"
              glowColor="#ef4444"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              {activeTab === 'overview' && (
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(Number(e.target.value))}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value={7}>Last 7 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={90}>Last 90 days</option>
                </select>
              )}
            </div>
          </div>
        </header>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}> = ({ title, value, icon, trend }) => {
  const isPositive = trend ? parseFloat(trend.replace('%', '').replace('+', '')) >= 0 : true;
  
  return (
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <div className="text-gray-400 text-sm">{title}</div>
      <div className="text-blue-500">{icon}</div>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <div className={`text-sm flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? (
            <TrendingUp size={16} className="mr-1" />
          ) : (
            <TrendingUp size={16} className="mr-1 rotate-180" />
          )}
          {trend}
        </div>
      )}
    </div>
  </div>
  );
};

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);
