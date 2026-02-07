import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PageView } from '../../lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Globe, MapPin, Monitor, Eye } from 'lucide-react';

interface EventsAnalyticsProps {
  startDate: Date | null;
  endDate: Date | null;
  selectedCountry: string;
  selectedCity: string;
}

export const EventsAnalytics: React.FC<EventsAnalyticsProps> = ({
  startDate,
  endDate,
  selectedCountry,
  selectedCity,
}) => {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, selectedCountry, selectedCity, page]);

  const formatDateForQuery = (date: Date, isEnd: boolean) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (isEnd) {
      const nextDay = new Date(Date.UTC(year, date.getMonth(), date.getDate() + 1, 0, 0, 0, 0));
      return nextDay.toISOString();
    } else {
      const start = new Date(Date.UTC(year, date.getMonth(), date.getDate(), 0, 0, 0, 0));
      return start.toISOString();
    }
  };

  const fetchData = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      const startDateStr = formatDateForQuery(startDate, false);
      const endDateStr = formatDateForQuery(endDate, true);

      let query = supabase
        .from('page_views')
        .select('*', { count: 'exact' })
        .gte('created_at', startDateStr)
        .lt('created_at', endDateStr)
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (selectedCountry !== 'all') {
        query = query.eq('country', selectedCountry);
      }
      if (selectedCity !== 'all') {
        query = query.eq('city', selectedCity);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      setPageViews(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching events data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const maskIPAddress = (ip: string | null | undefined) => {
    if (!ip) return 'Unknown';
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.x.x`;
    }
    return ip;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Events Analytics</h2>
        <p className="text-gray-400 mb-4">Page views and blog view counts only (user events and sessions removed to reduce database load).</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : (
        <Card hoverScale={false} hoverLift={false} glowColor="transparent" gradientColors={[]}>
          <CardHeader className="p-6 pb-4 border-b border-gray-700">
            <CardTitle className="text-xl">
              Page Views
              <span className="text-gray-400 text-sm ml-2">({totalCount} total)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/30 border-b border-gray-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Time</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">IP Address</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Country</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">City</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Device</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Browser</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Page</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {pageViews.map((pv) => (
                      <tr key={pv.id} className="border-b border-gray-700 hover:bg-gray-700/20 transition-colors">
                        <td className="py-3 px-4 text-gray-300">{new Date(pv.created_at).toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-300 font-mono text-sm">{maskIPAddress(pv.ip_address)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-blue-400" />
                            <span>{pv.country || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-purple-400" />
                            <span>{pv.city || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Monitor size={16} className="text-green-400" />
                            <span className="capitalize">{pv.device_type || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{pv.browser || 'Unknown'}</td>
                        <td className="py-3 px-4">
                          <span className="text-blue-400">{pv.page_path}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-400 text-sm">
                            {pv.referrer ? (pv.referrer.length > 30 ? `${pv.referrer.substring(0, 30)}...` : pv.referrer) : 'Direct'}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-gray-700">
                <div className="text-sm text-gray-400">
                  Page {page} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    variant="outline"
                    className="cursor-pointer"
                    glowColor="#3b82f6"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    variant="outline"
                    className="cursor-pointer"
                    glowColor="#3b82f6"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

    </div>
  );
};
