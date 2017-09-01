require('dotenv').config();

const fs = require('fs');
const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || '';

const logs = 'return_logs/logs.txt';
const rtm = new RtmClient(SLACK_BOT_TOKEN);

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
	if (message.text.toLowerCase().indexOf("dump deployment logs") == -1) {
		return false;
	}

	fs.readFile(logs, 'utf8', function(err, contents) {
		rtm.sendMessage(
			"Here are your deployment logs ```" + contents + "```", 
			message.channel
		);
	});
});

rtm.start();
