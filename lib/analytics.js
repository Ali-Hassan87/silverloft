/**
 * Check if the current visitor is an internal team member or running in development.
 * Supports query param: ?internal=1 (to exclude) or ?internal=0 (to re-enable).
 */
export function isInternalUser() {
  if (typeof window === 'undefined') return false;

  // Automatically exclude local development
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.vercel.app')
  ) {
    return true;
  }

  // Handle URL override to toggle internal status
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('internal') === '1' || urlParams.get('dev') === '1') {
      window.localStorage.setItem('sl_internal_user', 'true');
      return true;
    }
    if (urlParams.get('internal') === '0') {
      window.localStorage.removeItem('sl_internal_user');
      return false;
    }

    return window.localStorage.getItem('sl_internal_user') === 'true';
  } catch {
    return false;
  }
}

/**
 * Send custom conversion and user interaction events to analytics.
 * Automatically suppressed for internal team members and localhost.
 *
 * @param {string} action - Event action name (e.g. 'click_email', 'view_live_demo')
 * @param {object} params - Additional event payload / parameters
 */
export function trackEvent(action, params = {}) {
  if (typeof window === 'undefined') return;

  if (isInternalUser()) {
    console.debug(`[Analytics Filtered] ${action}:`, params);
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}
