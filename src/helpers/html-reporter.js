var HtmlReporter = require('nightwatch-html-reporter');

var reporter = new HtmlReporter({
    openBrowser: false,
    uniqueFilename: true,
    reportsDirectory: __dirname + '/../../reports/',
    reportFilename: 'taskworld.html',
    themeName: "default",
    logLevel: 0
  });
   
  module.exports = {
    write : function(results, options, done) {
      reporter.fn(results, done);
    }
  };