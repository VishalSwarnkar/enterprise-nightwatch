
const testData = require('./testdata');
const login = require('../../pages/login');
const logger = require('../../helpers/logger');
const report_path = "./reports/"
module.exports = {

    before: browser => {
        logger.info('Home Page of TaskWorld')
        browser
            .url(browser.launch_url)
            .waitForElementVisible('body')
            .assert.title(testData.TITLE)
            .assert.urlContains(testData.HOME_PAGE)
            .assert.visible('input[placeholder="Email address"]')
            .saveScreenshot(report_path + 'TaskWorldHomePage.png')
    },

    'Verify that an existing users login to the system': browser => {
        logger.info('Verify that an existing users login to the system')
        browser
            .setValue('input[name=email]', login.USER_EMAIL)
            .setValue('input[name=password]', login.USER_PASSWORD)
            .waitForElementVisible('button[type=submit]')
            .click('button[type=submit]')
            .waitForElementVisible('.tw-project-box-content__new-project')
            .assert.visible('.tw-project-box-content__new-project')
    },

    'Verify the user can add new project': browser => {
        logger.info('Verify the user can add new project')
        browser
            .click('.tw-project-box-content__new-project')
            .waitForElementVisible('input[name=project-name]')
            .assert.visible(`div[data-user-email="${login.USER_EMAIL}"]`)
            .setValue('input[name=project-name]', testData.PROJECT_NAME)
            .waitForElementPresent('.tw-new-project__choose-workflow-button')

        browser.getText('.tw-new-project__choose-workflow-button', (result) => {
            browser.assert.equal(result.value, testData.NEXT_BUTTON)
        })
        browser.click('.tw-new-project__choose-workflow-button')
            .waitForElementVisible('.tw-modal-content__title')
        browser.getText('.tw-modal-content__title', (result) => {
            browser.assert.equal(result.value, testData.PROJECT_TITLE)
        })
        browser.click('.tw-modal-content__title')
            .waitForElementPresent('.ax-create-project-button')
            .click('.ax-create-project-button')
            .waitForElementPresent('.tw-project-header__title')

        browser.getText('.tw-project-header__title', (result) => {
            browser.assert.equal(result.value, testData.PROJECT_NAME)
        })
    },

    'Verify the user creates a new tasklist in the project': browser => {
        logger.info('Verify the user creates a new tasklist in the project')
        browser
            .waitForElementVisible('input[placeholder="Tasklist title"]')
            .setValue('input[placeholder="Tasklist title"]', testData.TASK_TITLE)
            .keys(browser.Keys.ENTER)
        browser.getText('section.tw-tasklist', (result) => {
            browser.assert.equal(result.value, testData.TASK_TITLE)
        })
    },

    'Verify the user adds a new task to the tasklist': browser => {
        logger.info('Verify the user adds a new task to the tasklist')
        browser
            .keys(browser.Keys.ENTER)
            .waitForElementPresent('div.ax-add-task-button[role="button"]')
            .assert.visible('div.ax-add-task-button[role="button"]')
            .click('div.ax-add-task-button')
            .waitForElementPresent('textarea.ax-task-input-panel-textfield')
        browser.getAttribute('button.ax-create-task-button', 'disabled', (result) => {
            browser.assert.equal(result.value, "true")
        })
        browser
            .setValue('textarea.ax-task-input-panel-textfield', testData.TASK_DETAILS)
            .click('span[data-l10n-key="tasks.buttons.create"]')
            .waitForElementPresent('section.tw-task.ax-task')
            .getText('section.tw-task.ax-task', (result) => {
                browser.assert.equal(result.value, testData.TASK_DETAILS)
            })
            .click('section.tw-task.ax-task')
            .waitForElementPresent('.tw-editable-panel-title__text')
            .getText('.tw-editable-panel-title__text', (result)=>{
                browser.assert.equal(result.value, testData.TASK_DETAILS)
            })
    },

    'Verify the user marks the task as completed': browser => {
        logger.info('Verify the user marks the task as completed')
        browser
            .waitForElementPresent('.tw-task-checkbox[role="button"]')
            .click('.tw-task-checkbox[role="button"]')
            .assert.visible('span[data-l10n-key="tasks.task_lists.completed_tasks"]')
            .getText('span[data-l10n-key="tasks.task_lists.completed_tasks"]', (result) => {
                browser.assert.equal(result.value, testData.TASK_COMPLETED)
            })
            .assert.containsText('span[data-l10n-key="tasks.properties.due_date_status.completed_on"]', 
            testData.COMPLETE_DATE)
    },

    'Verify the user opens the completed task to see its details': browser => {
        logger.info('Verify the user opens the completed task to see its details')
        browser
            .click('section.tw-task.ax-task')
            .waitForElementPresent('header.tw-task-properties-header')
            .assert.visible('.tw-editable-panel-title__text')
            .getText('.tw-editable-panel-title__text', (result) => {
                browser.assert.equal(result.value, testData.TASK_DETAILS)
            })
    },

    after: browser => {
        browser.end();
    }
}