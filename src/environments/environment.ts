// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  cognos_api_js: 'https://ddetest-us-south.analytics.ibm.com/daas/CognosApi.js',
  cognos_root_url: 'https://ddetest-us-south.analytics.ibm.com/daas/',
  //For proxy mode
  //cognos_api_js: 'http://localhost:3000/daas/CognosApi.js',
  //cognos_root_url: 'http://localhost:3000/daas/',

  toaster_timer: 5000,
  segment_key: '<%= SEGMENT_KEY %>',
  version: '1.0.0',
  bluemix_analytics_js: 'https://console.cdn.stage1.s-bluemix.net/analytics/build/bluemix-analytics.min.js'
};
