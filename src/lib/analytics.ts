import { supabase } from './supabase';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Get device type
const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Get browser name
const getBrowser = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
};

// Get IP address and geolocation data
const getLocationData = async (): Promise<{
  ip_address?: string;
  country?: string;
  city?: string;
}> => {
  // Try multiple APIs in sequence (prioritize CORS-enabled APIs)
  const apis = [
    // 1. ipwho.is (free, no key, CORS support) - PRIMARY
    async () => {
      const response = await fetch('https://ipwho.is/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'API error');
      return {
        ip_address: data.ip,
        country: data.country,
        city: data.city
      };
    },
    // 2. ip-api.com (free, CORS support) - Note: uses HTTP (not HTTPS) but supports CORS
    async () => {
      const response = await fetch('https://ip-api.com/json/?fields=status,message,country,city,query', {
        method: 'GET',
        mode: 'cors'
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.status !== 'success') throw new Error(data.message || 'API error');
      return {
        ip_address: data.query,
        country: data.country,
        city: data.city
      };
    },
    // 3. db-ip.com (free, basic, CORS support)
    async () => {
      const response = await fetch('https://api.db-ip.com/v2/free/self', {
        method: 'GET',
        mode: 'cors'
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return {
        ip_address: data.ipAddress,
        country: data.countryName,
        city: data.city
      };
    }
  ];

  for (const api of apis) {
    try {
      const result = await api();
      if (result.ip_address) {
        return result;
      }
    } catch (error) {
      // Silently try next API - don't log errors to avoid console spam
      // CORS errors are expected with some APIs
      continue;
    }
  }

  return {};
};

// Track page view - ONLY for home page (/)
// Use sessionStorage to persist tracking state across page reloads
const TRACK_DEBOUNCE_MS = 120000; // Don't track same session within 2 minutes (reduces DB requests)

// Lock to prevent concurrent tracking calls
let isTrackingInProgress = false;

const getLastTrackedTime = (): number => {
  const stored = sessionStorage.getItem('last_tracked_time');
  return stored ? parseInt(stored, 10) : 0;
};

const setLastTrackedTime = (time: number): void => {
  sessionStorage.setItem('last_tracked_time', time.toString());
};

export const trackPageView = async (pagePath: string, pageTitle?: string) => {
  // Prevent concurrent calls
  if (isTrackingInProgress) {
    return;
  }

  try {
    // Don't track dashboard or login (reduce noise)
    if (pagePath.startsWith('/dashboard') || pagePath.startsWith('/login')) {
      return;
    }

    const now = Date.now();
    const lastTrackedTime = getLastTrackedTime();
    const lastTrackedPath = sessionStorage.getItem('last_tracked_path') || '';

    // Skip if same path was tracked recently (within debounce period)
    if (lastTrackedPath === pagePath && (now - lastTrackedTime) < TRACK_DEBOUNCE_MS) {
      return;
    }

    isTrackingInProgress = true;
    setLastTrackedTime(now);
    sessionStorage.setItem('last_tracked_path', pagePath);

    const sessionId = getSessionId();
    const referrer = document.referrer || 'Direct';
    const deviceType = getDeviceType();
    const browser = getBrowser();
    const locationData = await getLocationData();

    await supabase.rpc('track_page_view', {
      p_page_path: pagePath,
      p_page_title: pageTitle || document.title,
      p_referrer: referrer,
      p_user_agent: navigator.userAgent,
      p_session_id: sessionId,
      p_ip_address: locationData.ip_address || null,
      p_country: locationData.country || null,
      p_city: locationData.city || null,
      p_device_type: deviceType || null,
      p_browser: browser || null,
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
    // On error, reset the time so it can retry
    const lastTrackedTime = getLastTrackedTime();
    const now = Date.now();
    // Only reset if the error happened very recently (within 1 second)
    // This prevents infinite retry loops
    if ((now - lastTrackedTime) < 1000) {
      setLastTrackedTime(0);
    }
  } finally {
    // Always release the lock
    isTrackingInProgress = false;
  }
};

// User events and sessions tracking removed to reduce database load.
// We only track: (1) page views via trackPageView, (2) blog view count via blogService.incrementViewCount.
