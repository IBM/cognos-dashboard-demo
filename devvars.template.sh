#!/usr/bin/env bash

# This is template file, primarily used for development environments but also provides
# definitions of various environment variables that the demo application uses.
# To use this, copy it to devvars.sh and modify the settings.

export PORT=3000
export NODE_ENV=dev   #dev or production

# default client_id/secret. If your running in IBM Bluemix with Cloud Foundry, you can
# use service binding instead.
export DDE_CLIENT_ID=
export DDE_SECRET=

# true if you want all DDE requests proxied through the demo app. That is useful if you
# need to run in FireFox Incognito mode where Tracking protection would block requests to DDE
export PROXY_DDE_REQUESTS=false

# Default location of DDE server. If your running in Bluemix with Cloud Foundry, you can
# use service binding and this variable can be omitted.
#     Staging: https://ddetest-us-south.analytics.ibm.com
#     UK-South: https://dde-us-south.analytics.ibm.com
#     UK-South: https://dde-uk-south.analytics.ibm.com
#
export DDE_BASE_URL=

# Base URL where the application is running.
#     Cloud demo app: https://ibm-cognos-dashboard-demo.ng.bluemix.net/
#     localhost: http://localhost:${PORT}
export APP_BASE_URL=
