
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
            .waitForElementVisible('button[type=submit]', 1000)
            .click('button[type=submit]')
            .pause(1000)
            .assert.visible('input[placeholder=Search Projects]')
            .end()
    },

    'Verify the user can add new project': browser => {
        browser
        .waitForElementVisible('.tw-project-box-content__new-project', 1000)
        .click('.tw-project-box-content__new-project')
        .pause(1000)
        .waitForElementVisible('input[name=project-name]', 1000)
        .assert.visible('div[data-user-email=mailosaur.test@gmail.com]')
        .setValue('input[name=project-name]', 'Sample project01')
        .waitForElementPresent('.tw-new-project__choose-workflow-button')
        
        browser.getText('.tw-new-project__choose-workflow-button', (result)=>{
            this.assert.equal(result.value, 'Next: Choose a template')
        })
        browser.click()
        .waitForElementVisible('.tw-modal-content__title')
        browser.getText('.tw-modal-content__title', (result)=>{
            this.assert.equal(result.value, 'Choose a Project Template')
        })
        browser.click()
        .pause(2000)
    }

    // afterAll: browser => {
    //     browser.end();
    // }
}