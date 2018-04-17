var config = module.exports = {};

config.dde_base_url = process.env.DDE_BASE_URL || 'https://ddetest-us-south.analytics.ibm.com';
config.dde_session_uri = config.dde_base_url + '/daas/v1/session';
config.web_domain = process.env.APP_BASE_URL ||  'http://localhost:3000';
