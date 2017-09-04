# slackbots

# Bots

Bot's are kept running using *forever*. *forever* can be installed using `npm install forever -g`
Important variables are kept in a `.env` file at the base of the project. Setting up this file goes like this:

- `cd /path/to/slackbots/`
- `touch .env && nano .env`
- Some common variables:
    ```
    SLACK_TOKEN=xxxxx
    SLACK_BOT_TOKEN=xxxxx
    SLACK_CLIENT_ID=xxxxx
    SLACK_CLIENT_SECRET=xxxxx
    SLACK_WEBHOOK_URL=xxxxx
    ```

Below is a list of all of the bots in the project

### Return Logs

Dumps a list of the logs when a user types `Dump logs.` to the bot as a direct message or in a channel that the bot is authorized in.

**Examples**

- `Dump logs.` returns all of the logs as a message.
- `Dump 10 lines of logs.` returns the last 10 lines of the logs.
- `Dump first 10 lines of logs.` returns the first 10 lines of the logs.

**Starting the bot**

`cd /path/to/slackbots/ && forever start return_logs/index.js`

**Permissions needed**

- bot
- incoming-webhook
