// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html



module.exports = function (config) {
  config.set({
    proxies: {
      '/assets/ddeDb2SampleModule.json': 'http://localhost:9876/base/src/assets/ddeDb2SampleModule.json',
      '/assets/ddeSampleSpec.json': 'http://localhost:9876/base/src/assets/ddeSampleSpec.json'
    },
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
