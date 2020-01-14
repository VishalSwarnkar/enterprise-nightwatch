const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const SCREENSHOT_PATH = './reports/pages';
module.exports = {
  "src_folders": [
    "src/tests"
  ],
  "test_workers": {
    "enabled": true,
    "workers": "auto"
  },
  "output_folder": "reports",
  "custom_commands_path": "",
  "custom_assertions_path": "",
  "page_objects_path": "",
  "globals_path": "",
  "selenium": {
    "start_process": true,
    "server_path": seleniumServer.path,
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": chromedriver.path,
      "webdriver.ie.driver": ""
    }
  },
  "test_settings": {
    "default": {
      // "launch_url": "https://enterprise.taskworld.com",
      // "selenium_port": 4444,
      // "selenium_host": "localhost",
      // "silent": true,
      "screenshots": {
        "enabled": true,
        "path": SCREENSHOT_PATH
      },
      "globals": {
        "waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "chromeOptions": {
          "args": [
            "--incognito",
          ],
          "w3c": false
        }
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true // turn off to test progressive enhancement
      }
    }
  }
}