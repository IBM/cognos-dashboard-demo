# Getting Started with DDE on IBM Cloud

This repo shows a Angular 5.0.0 + Node.js app that demos the Bluemix DDE service.


 In order to deploy to IBM Cloud, you'll need an [IBM Cloud account](https://console.stage1.ng.bluemix.net/registration/). Once registered, you can automatically deploy the app using the following deploy to IBM Cloud button.

 [![Deploy to IBM Cloud](https://bluemix.net/deploy/button.png)](https://console.stage1.bluemix.net/devops/setup/deploy?repository=https://github.ibm.com/GearBox/DDE-ang-node-test&repository_token=a623cbb1534c9f30fb0199bc9ac57e8d3f91afa6&branch=master)

 To run locally and deploy from the command line, follow the instructions below.

 ## Prerequisites

 * [Git](https://git-scm.com/downloads)
 * [IBM Cloud CLI](https://console.stage1.bluemix.net/docs/cli/reference/bluemix_cli/all_versions.html#bluemix-cli-installer-downloads)


## Repo setup

Getting started:

```bash
$ npm install
```

### Running

```bash
$ npm run dist
$ node sever.js
```
or

```bash
$ npm run build
```

## Angular setup

### Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

### Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory. Use the -prod flag for a production build.

### Development server

Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Resources

* [DDE in Bluemix](https://console-regional.stage1.ng.bluemix.net/docs/services/dynamic-dashboard-embedded/index.html#overview-of-dynamic-dashboard-embedded)
* [Sample app](https://jdcluster.us-south.containers.mybluemix.net/daas/DashboardAPI.html)
* [Swagger](https://jdcluster.us-south.containers.mybluemix.net/api-docs)

## Deployment

Deploy into Bluemix:
1. Create a new Node.JS Cloud Foundry application in bluemix (https://console.stage1.bluemix.net/)
1. cf api <API-endpoint> (US South https://api.STAGE1.ng.bluemix.net)
1. cf login --sso (will ask for one-time passcode from login.stage1.ng.bluemix.net/UAALoginServerWAR/passcode)
1. cf push
