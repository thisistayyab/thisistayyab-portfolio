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
const TRACK_DEBOUNCE_MS = 30000; // Don't track same session within 30 seconds

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
    // Only track home page views (normalize all home page variations)
    const normalizedPath = pagePath === '/' || pagePath === '/#home' || pagePath.includes('#home') ? '/' : null;
    if (!normalizedPath) {
      return;
    }

    const now = Date.now();
    const lastTrackedTime = getLastTrackedTime();
    
    // Skip if tracked recently (within debounce period)
    if ((now - lastTrackedTime) < TRACK_DEBOUNCE_MS) {
      return;
    }

    // Set lock and update time immediately to prevent duplicate calls
    isTrackingInProgress = true;
    setLastTrackedTime(now);

    const sessionId = getSessionId();
    const referrer = document.referrer || 'Direct'; // Default to 'Direct' if empty
    const deviceType = getDeviceType();
    const browser = getBrowser();

    // Get location data (IP, country, city)
    const locationData = await getLocationData();

    await supabase.rpc('track_page_view', {
      p_page_path: '/', // Normalize all home visits to '/'
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

// Cache IP address to avoid multiple API calls
let cachedIPAddress: string | null = null;
let ipCacheTime: number = 0;
const IP_CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes

// Get IP address (cached)
const getIPAddress = async (): Promise<string | null> => {
  const now = Date.now();
  // Return cached IP if still valid
  if (cachedIPAddress && (now - ipCacheTime) < IP_CACHE_DURATION) {
    return cachedIPAddress;
  }

  try {
    const locationData = await getLocationData();
    if (locationData.ip_address) {
      cachedIPAddress = locationData.ip_address;
      ipCacheTime = now;
      return cachedIPAddress;
    }
  } catch (error) {
    // Silently fail - IP is optional
  }
  return null;
};

// Track user event
export const trackEvent = async (
  eventType: string,
  eventName: string,
  elementId?: string,
  elementType?: string,
  metadata?: Record<string, any>
) => {
  try {
    // Don't track events on dashboard or login pages
    const pagePath = window.location.pathname;
    if (pagePath.includes('/dashboard') || pagePath.includes('/login')) {
      return;
    }

    const sessionId = getSessionId();
    const fullPath = pagePath + window.location.search;
    
    // Get IP address (cached)
    const ipAddress = await getIPAddress();

    await supabase.from('user_events').insert({
      event_type: eventType,
      event_name: eventName,
      element_id: elementId,
      element_type: elementType,
      page_path: fullPath,
      session_id: sessionId,
      user_agent: navigator.userAgent,
      ip_address: ipAddress,
      metadata: metadata || {},
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Track form submission
export const trackFormSubmit = async (formName: string, metadata?: Record<string, any>) => {
  await trackEvent('form_submit', formName, undefined, 'form', metadata);
};

// Track button click
export const trackButtonClick = async (buttonName: string, buttonId?: string) => {
  await trackEvent('click', buttonName, buttonId, 'button');
};

// Track link click
export const trackLinkClick = async (linkName: string, linkUrl: string, linkId?: string) => {
  await trackEvent('click', linkName, linkId, 'link', { url: linkUrl });
};

// Track scroll depth
let maxScrollDepth = 0;
export const trackScrollDepth = async () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);

  if (scrollPercent > maxScrollDepth) {
    maxScrollDepth = scrollPercent;
    if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
      await trackEvent('scroll', `scroll_${scrollPercent}%`, undefined, 'page', {
        scroll_percent: scrollPercent,
      });
    }
  }
};

// Initialize scroll tracking (only on portfolio pages, not dashboard/login)
if (typeof window !== 'undefined') {
  let scrollTimeout: NodeJS.Timeout;
  const handleScroll = () => {
    // Don't track scroll on dashboard or login pages
    const pagePath = window.location.pathname;
    if (pagePath.includes('/dashboard') || pagePath.includes('/login')) {
      return;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      trackScrollDepth();
    }, 1000);
  };
  window.addEventListener('scroll', handleScroll);
}
