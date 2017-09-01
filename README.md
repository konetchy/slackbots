# slackbots

# Bots

Bot's are kept running using *forever*. *forever* can be installed using `npm install forever -g`
Important variables are kept in a `.env` file at the base of the project. Setting up this file goes like this:

    - `cd /path/to/slackbots/`
    - `touch .env && nano .env`
    - Some common variables:
        - SLACK_TOKEN=xxxxx
        - SLACK_BOT_TOKEN=xxxxx
        - SLACK_CLIENT_ID=xxxxx
        - SLACK_CLIENT_SECRET=xxxxx
        - SLACK_WEBHOOK_URL=xxxxx

Below is a list of all of the bots in the project

### Return Logs

`cd /path/to/slackbots/ && forever start return_logs/index.js`

Permissions needed:

    - bot
    - incoming-webhook
