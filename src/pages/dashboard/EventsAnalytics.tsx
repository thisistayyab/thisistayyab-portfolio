import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PageView, UserEvent, Session } from '../../lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { DateRangePicker } from '../../components/DateRangePicker';
import { Clock, Globe, MapPin, Monitor, MousePointerClick, Eye, Users, Trash2, X } from 'lucide-react';
import { ConfirmModal } from '../../components/ConfirmModal';

interface EventsAnalyticsProps {
  startDate: Date | null;
  endDate: Date | null;
  selectedCountry: string;
  selectedCity: string;
}

type EventTableType = 'page_views' | 'user_events' | 'sessions';

export const EventsAnalytics: React.FC<EventsAnalyticsProps> = ({
  startDate,
  endDate,
  selectedCountry,
  selectedCity,
}) => {
  const [activeTable, setActiveTable] = useState<EventTableType>('page_views');
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [allUserEvents, setAllUserEvents] = useState<UserEvent[]>([]); // Store all events for grouping
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [selectedIP, setSelectedIP] = useState<string | null>(null);
  const [ipEvents, setIpEvents] = useState<UserEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingIPEvents, setLoadingIPEvents] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    variant: 'danger',
  });

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, selectedCountry, selectedCity, activeTable, page]);

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

      if (activeTable === 'page_views') {
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
      } else if (activeTable === 'user_events') {
        // First, fetch ALL events to group by IP (not paginated) to ensure we get all IPs
        let allEventsQuery = supabase
          .from('user_events')
          .select('*')
          .gte('created_at', startDateStr)
          .lt('created_at', endDateStr)
          .order('created_at', { ascending: false })
          .limit(10000); // Reasonable limit to prevent timeouts

        // Note: user_events table doesn't have country/city columns, so we skip those filters

        const { data: allEventsData, error: allError } = await allEventsQuery;
        if (allError) throw allError;

        // Store all events for grouping
        setAllUserEvents(allEventsData || []);

        // Group by IP address - show unique IPs with event counts
        const ipGroups: Record<string, UserEvent[]> = {};
        (allEventsData || []).forEach((event) => {
          const ip = event.ip_address || 'unknown';
          if (!ipGroups[ip]) {
            ipGroups[ip] = [];
          }
          ipGroups[ip].push(event);
        });

        // Create grouped data - show most recent event for each IP with event count
        const groupedEvents = Object.entries(ipGroups).map(([ip, events]) => {
          // Sort events by time, get most recent
          const sortedEvents = [...events].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          return {
            ...sortedEvents[0], // Use most recent event data
            event_count: events.length, // Add event count
          };
        });

        // Sort by most recent event time
        groupedEvents.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // Apply pagination to grouped results
        const totalUniqueIPs = groupedEvents.length;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedEvents = groupedEvents.slice(startIndex, endIndex);

        setUserEvents(paginatedEvents as UserEvent[]);
        setTotalCount(totalUniqueIPs); // Count unique IPs
      } else if (activeTable === 'sessions') {
        let query = supabase
          .from('sessions')
          .select('*', { count: 'exact' })
          .gte('first_visit', startDateStr)
          .lt('first_visit', endDateStr)
          .order('first_visit', { ascending: false })
          .range((page - 1) * pageSize, page * pageSize - 1);

        if (selectedCountry !== 'all') {
          query = query.eq('country', selectedCountry);
        }
        if (selectedCity !== 'all') {
          query = query.eq('city', selectedCity);
        }

        const { data, count, error } = await query;
        if (error) throw error;
        setSessions(data || []);
        setTotalCount(count || 0);
      }
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

  const handleIPClick = async (ip: string | null | undefined) => {
    if (!ip || ip === 'unknown' || ip === '') {
      return;
    }

    setSelectedIP(ip);
    setIsModalOpen(true);
    setLoadingIPEvents(true);

    try {
      const startDateStr = formatDateForQuery(startDate!, false);
      const endDateStr = formatDateForQuery(endDate!, true);

      let query = supabase
        .from('user_events')
        .select('*')
        .eq('ip_address', ip)
        .gte('created_at', startDateStr)
        .lt('created_at', endDateStr)
        .order('created_at', { ascending: false });

      // Note: user_events table doesn't have country/city columns, so we skip those filters

      const { data, error } = await query;
      if (error) throw error;
      setIpEvents(data || []);
    } catch (error) {
      console.error('Error fetching IP events:', error);
      setIpEvents([]);
    } finally {
      setLoadingIPEvents(false);
    }
  };

  const handleDeleteAllEventsForIP = async (ipAddress: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const eventCount = (userEvents.find(e => e.ip_address === ipAddress) as any)?.event_count || 1;
    
    setConfirmModal({
      isOpen: true,
      title: 'Delete All Events',
      message: `Are you sure you want to delete ALL ${eventCount} event(s) from IP ${maskIPAddress(ipAddress)}? This action cannot be undone.`,
      variant: 'danger',
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        setDeletingIds((prev) => new Set(prev).add(ipAddress));
        try {
          const { error } = await supabase
            .from('user_events')
            .delete()
            .eq('ip_address', ipAddress);

          if (error) throw error;

          // Remove from local state - remove all events with this IP
          setUserEvents((prev) => prev.filter((e) => e.ip_address !== ipAddress));
          setAllUserEvents((prev) => prev.filter((e) => e.ip_address !== ipAddress));
          setIpEvents((prev) => prev.filter((e) => e.ip_address !== ipAddress));

          // Refresh data
          fetchData();
        } catch (error) {
          console.error('Error deleting all events for IP:', error);
          alert('Failed to delete events for this IP address');
        } finally {
          setDeletingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(ipAddress);
            return newSet;
          });
        }
      },
    });
  };

  const handleDeleteEvent = async (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setConfirmModal({
      isOpen: true,
      title: 'Delete User Event',
      message: 'Are you sure you want to delete this user event record? This action cannot be undone.',
      variant: 'danger',
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        setDeletingIds((prev) => new Set(prev).add(eventId));
        try {
          const { error } = await supabase
            .from('user_events')
            .delete()
            .eq('id', eventId);

          if (error) throw error;

          // Remove from local state
          setUserEvents((prev) => prev.filter((e) => e.id !== eventId));
          setAllUserEvents((prev) => prev.filter((e) => e.id !== eventId));
          setIpEvents((prev) => prev.filter((e) => e.id !== eventId));

          // Refresh data
          fetchData();
        } catch (error) {
          console.error('Error deleting user event:', error);
          alert('Failed to delete user event record');
        } finally {
          setDeletingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(eventId);
            return newSet;
          });
        }
      },
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Events Analytics</h2>
        <p className="text-gray-400 mb-4">View all analytics data from different tables</p>
        
        {/* Table Type Selector */}
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => {
              setActiveTable('page_views');
              setPage(1);
            }}
            variant={activeTable === 'page_views' ? 'default' : 'outline'}
            className="cursor-pointer"
            glowColor={activeTable === 'page_views' ? '#3b82f6' : 'transparent'}
          >
            <Eye size={16} className="inline mr-2" />
            Page Views
          </Button>
          <Button
            onClick={() => {
              setActiveTable('user_events');
              setPage(1);
            }}
            variant={activeTable === 'user_events' ? 'default' : 'outline'}
            className="cursor-pointer"
            glowColor={activeTable === 'user_events' ? '#3b82f6' : 'transparent'}
          >
            <MousePointerClick size={16} className="inline mr-2" />
            User Events
          </Button>
          <Button
            onClick={() => {
              setActiveTable('sessions');
              setPage(1);
            }}
            variant={activeTable === 'sessions' ? 'default' : 'outline'}
            className="cursor-pointer"
            glowColor={activeTable === 'sessions' ? '#3b82f6' : 'transparent'}
          >
            <Users size={16} className="inline mr-2" />
            Sessions
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : (
        <Card hoverScale={false} hoverLift={false} glowColor="transparent" gradientColors={[]}>
          <CardHeader className="p-6 pb-4 border-b border-gray-700">
            <CardTitle className="text-xl">
              {activeTable === 'page_views' && 'Page Views'}
              {activeTable === 'user_events' && 'User Events'}
              {activeTable === 'sessions' && 'Sessions'}
              <span className="text-gray-400 text-sm ml-2">({totalCount} total)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/30 border-b border-gray-700">
                  {activeTable === 'page_views' && (
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
                  )}
                  {activeTable === 'user_events' && (
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Time</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">IP Address</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Event Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Event Name</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Page</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Element ID</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  )}
                  {activeTable === 'sessions' && (
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">First Visit</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Last Activity</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Session ID</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Country</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">City</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Page Count</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Duration</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Bounce</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {activeTable === 'page_views' &&
                    pageViews.map((pv) => (
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
                  {activeTable === 'user_events' &&
                    (userEvents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-400">
                          No user events found
                        </td>
                      </tr>
                    ) : (
                      userEvents.map((event) => (
                        <tr
                          key={event.id}
                          onClick={() => {
                            const ip = event.ip_address;
                            if (ip) {
                              handleIPClick(ip);
                            }
                          }}
                          className="border-b border-gray-700 hover:bg-gray-700/20 transition-colors cursor-pointer"
                        >
                          <td className="py-3 px-4 text-gray-300">{new Date(event.created_at).toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                const ip = event.ip_address;
                                if (ip) {
                                  handleIPClick(ip);
                                }
                              }}
                              className="text-gray-400 font-mono text-sm hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2"
                              title="Click to view all events from this IP"
                            >
                              {maskIPAddress(event.ip_address)}
                              {(event as any).event_count > 1 && (
                                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">
                                  {(event as any).event_count} events
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs capitalize">
                              {event.event_type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{event.event_name}</td>
                          <td className="py-3 px-4">
                            <span className="text-blue-400">{event.page_path}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-400 text-sm">{event.element_id || '-'}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const ip = event.ip_address;
                                if (ip) {
                                  handleDeleteAllEventsForIP(ip, e);
                                }
                              }}
                              disabled={event.ip_address ? deletingIds.has(event.ip_address) : false}
                              className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              title={`Delete all events from IP ${maskIPAddress(event.ip_address)}`}
                            >
                              {event.ip_address && deletingIds.has(event.ip_address) ? (
                                <Clock size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ))}
                  {activeTable === 'sessions' &&
                    sessions.map((session) => (
                      <tr key={session.id} className="border-b border-gray-700 hover:bg-gray-700/20 transition-colors">
                        <td className="py-3 px-4 text-gray-300">{new Date(session.first_visit).toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-300">{new Date(session.last_activity).toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-300 font-mono text-sm">{session.session_id.substring(0, 20)}...</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-blue-400" />
                            <span>{session.country || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-purple-400" />
                            <span>{session.city || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{session.page_count}</td>
                        <td className="py-3 px-4 text-gray-300">{Math.round((session.duration_seconds || 0) / 60)}m</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${session.is_bounce ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {session.is_bounce ? 'Yes' : 'No'}
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

      {/* IP Events Modal */}
      {isModalOpen && selectedIP && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <Card
            className="max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            hoverScale={false}
            hoverLift={false}
            glowColor="transparent"
            gradientColors={[]}
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="p-6 pb-4 border-b border-gray-700">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl mb-2">All Events from IP: {maskIPAddress(selectedIP)}</CardTitle>
                  <div className="text-sm text-gray-400">
                    Total: {ipEvents.length} event{ipEvents.length !== 1 ? 's' : ''}
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
            <CardContent className="p-0 flex-1 min-h-0 overflow-hidden flex flex-col">
              {loadingIPEvents ? (
                <div className="flex items-center justify-center py-12 p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : ipEvents.length === 0 ? (
                <div className="text-center py-12 text-gray-400 p-6">
                  <p>No events found for this IP address</p>
                </div>
              ) : (
                <div
                  className="overflow-y-auto overflow-x-auto flex-1 modal-scrollable"
                  style={{
                    maxHeight: 'calc(90vh - 200px)',
                  }}
                >
                  <table className="w-full">
                    <thead className="sticky top-0 bg-gray-800 z-10">
                      <tr className="border-b border-gray-700 bg-gray-700/30">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Time</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Event Type</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Event Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Page</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Element ID</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ipEvents.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-gray-700 hover:bg-gray-700/20 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-300">{new Date(event.created_at).toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs capitalize">
                              {event.event_type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{event.event_name}</td>
                          <td className="py-3 px-4">
                            <span className="text-blue-400">{event.page_path}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-400 text-sm">{event.element_id || '-'}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(event.id, e);
                              }}
                              disabled={deletingIds.has(event.id)}
                              className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              title="Delete this event record"
                            >
                              {deletingIds.has(event.id) ? (
                                <Clock size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end p-6 pt-4 border-t border-gray-700">
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
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant || 'danger'}
        isLoading={deletingIds.size > 0}
      />
    </div>
  );
};
