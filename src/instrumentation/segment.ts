  declare var window: any;

  export async function setUp(options) {
    window._analytics = options;
  }

  export async function page(name, options) {
    await waitForBluemixAnalyticsLoad();

    if (window.bluemixAnalytics) {
      window.bluemixAnalytics.pageEvent(name, options);
    }
  }

  export async function track(name, options) {
    await waitForBluemixAnalyticsLoad();

    if (window.bluemixAnalytics) {
      window.bluemixAnalytics.trackEvent(name, options);
    }
  }

  async function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function waitForBluemixAnalyticsLoad(){
    do {
      await sleep(100);
    } while (window.bluemixAnalytics === undefined)
  }
