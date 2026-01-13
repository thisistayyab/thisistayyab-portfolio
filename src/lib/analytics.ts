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

// Track page view - ONLY for home page (/)
let lastTrackedPath = '';
let lastTrackedTime = 0;
const TRACK_DEBOUNCE_MS = 5000; // Don't track same path within 5 seconds

export const trackPageView = async (pagePath: string, pageTitle?: string) => {
  try {
    // Only track home page views
    if (pagePath !== '/' && pagePath !== '/#home' && !pagePath.includes('#home')) {
      return;
    }

    const now = Date.now();
    // Skip if same path was tracked recently
    if (lastTrackedPath === pagePath && (now - lastTrackedTime) < TRACK_DEBOUNCE_MS) {
      return;
    }

    const sessionId = getSessionId();
    const referrer = document.referrer || undefined;

    await supabase.rpc('track_page_view', {
      p_page_path: '/',
      p_page_title: pageTitle || document.title,
      p_referrer: referrer,
      p_user_agent: navigator.userAgent,
      p_session_id: sessionId,
    });

    lastTrackedPath = pagePath;
    lastTrackedTime = now;
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
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
    const sessionId = getSessionId();
    const pagePath = window.location.pathname + window.location.search;

    await supabase.from('user_events').insert({
      event_type: eventType,
      event_name: eventName,
      element_id: elementId,
      element_type: elementType,
      page_path: pagePath,
      session_id: sessionId,
      user_agent: navigator.userAgent,
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

// Initialize scroll tracking
if (typeof window !== 'undefined') {
  let scrollTimeout: NodeJS.Timeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      trackScrollDepth();
    }, 1000);
  });
}
