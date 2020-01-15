
const config = require('../../config/environment/test');

module.exports = {

    before: browser => {
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
            .waitForElementVisible('button[type=submit]')
            .click('button[type=submit]')
            .waitForElementVisible('.tw-project-box-content__new-project')
            .assert.visible('.tw-project-box-content__new-project')
    },

    'Verify the user can add new project': browser => {
        browser
            .click('.tw-project-box-content__new-project')
            .waitForElementVisible('input[name=project-name]', 1000)
            .assert.visible('div[data-user-email="mailosaur.test@gmail.com"]')
            .setValue('input[name=project-name]', 'Sample project02')
            .waitForElementPresent('.tw-new-project__choose-workflow-button')

        browser.getText('.tw-new-project__choose-workflow-button', (result) => {
            browser.assert.equal(result.value, "Next: Choose a template")
        })
        browser.click('.tw-new-project__choose-workflow-button')
            .waitForElementVisible('.tw-modal-content__title')
        browser.getText('.tw-modal-content__title', (result) => {
            browser.assert.equal(result.value, "Choose a Project Template")
        })
        browser.click('.tw-modal-content__title')
            .waitForElementPresent('.ax-create-project-button')
            .click('.ax-create-project-button')
            .pause(2000)
            .waitForElementPresent('.tw-project-header__title')

        browser.getText('.tw-project-header__title', (result) => {
            browser.assert.equal(result.value, 'Sample project02')
        })
            .end()
    },

    'Verify the user creates a new tasklist in the project.': browser => {

    },

    'Verify the user adds a new task to the tasklist.': browser => {

    },

    'Verify the user marks the task as completed.': browser => {

    },

    'Verify the user opens the completed task to see its details.': browser => {
        
    }
    // afterAll: browser => {
    //     browser.end();
    // }
}