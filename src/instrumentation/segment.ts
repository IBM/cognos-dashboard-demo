  declare var window: any;

  export function setUp(options) {
    window._analytics = options;
  }

   export function identify(options) {
    if (window.bluemixAnalytics) {
      window.bluemixAnalytics.identify(options);
    }
  }

  export function page(name, options) {
    if (window.bluemixAnalytics) {
      window.bluemixAnalytics.pageEvent(name, options);
    }
  }

  export function track(name, options) {
    if (window.bluemixAnalytics) {
      window.bluemixAnalytics.trackEvent(name, options);
    }
  }
