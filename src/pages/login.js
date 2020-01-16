require('dotenv').config();
module.exports = {
    USER_EMAIL: process.env.EMAIL_ID,
    USER_PASSWORD: process.env.PASSWORD,
    PROJECT_NAME: `Sample project-${Math.random().toString(36).substring(7)}`,
    url: '/login',
    elements: {
      email: {
        selector: 'input[type=text]'
      },
      password: {
        selector: 'input[name=password]'
      },
      submit: {
          selector: 'button[type=submit]'
      }
    }
  };