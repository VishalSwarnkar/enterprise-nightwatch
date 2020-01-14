
const config = require('../../config/environment/test');

module.exports = {

    beforeEach: browser => {
        browser
          .url('https://enterprise.taskworld.com')
          .waitForElementVisible('body')
          .assert.title('Taskworld')
          .assert.urlContains('enterprise.taskworld')
          .assert.visible('input[placeholder="Email address"]')
          .saveScreenshot('guinea-pig-test.png')
    },

    'Verify that an existing users login to the system': browser => {
        browser
            .setValue('input[name=email]', 'mailosaur.test@gmail.com')
            .setValue('input[name=password]', 'Automation!23')
            .pause(60000)
            .waitForElementVisible('button[type=submit]', 1000)
            .click('button[type=submit]')
            .pause(1000)
            .assert.visible('input[placeholder=Search Projects]')
            .end()
    },

    // afterAll: browser => {
    //     browser.end();
    // }
}