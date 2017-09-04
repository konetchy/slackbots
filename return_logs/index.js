const LOG_FILE = 'return_logs/logs.txt';

require('dotenv').config();

const fs = require('fs');
const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || '';
const rtm = new RtmClient(SLACK_BOT_TOKEN);

var numberOfLines = -1;
var startingPoint = 'end';
var logFile = '';

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    var messageText = message.text.toLowerCase();

    if (!verifyMessageTrigger(messageText)) {
        return false;
    }

    setNumberOfLines(messageText);
    setStartingPoint(messageText);

    fs.readFile(LOG_FILE, 'utf8', function(err, contents) {
        var logFile = trimLogsLines(contents);

        rtm.sendMessage(
            "Here are your deployment logs ```" + logFile + "```",
            message.channel
        );
    });
});

function trimLogsLines(logFile) {
    if (numberOfLines == -1) {
        return logFile;
    }

    var i;
    var lines = logFile.split("\n");

    switch (startingPoint) {
        case 'start':
            var i = 0;
            var updateI = function() { i++ };
            var verifyI = function() { return i < numberOfLines; };
            break;
        case 'end':
            var i = lines.length - 1;
            var updateI = function() { i-- };
            var verifyI = function() { return i > lines.length - (numberOfLines+1); };
            break;
    }

    for (logFile = ''; verifyI(); updateI()) {
        logFile += lines[i] + "\n";
    }

    return logFile;
}

function setNumberOfLines(messageText) {
    var linesIndex = messageText.indexOf('line');
    if (linesIndex == -1) {
        numberOfLines = -1;
        return;
    }

    var textArr = messageText.substring(0,7).split(' ');
    var numberGiven = Number(textArr[textArr.length - 1]);

    if (isNaN(numberGiven)) {
        numberOfLines = -1;
        return;
    }

    numberOfLines = numberGiven;
    return;
}

function setStartingPoint(messageText) {
    if (messageText.indexOf('first') && messageText.indexOf('line')) {
        startingPoint = 'start';
    } else {
        startingPoint = 'end';
    }
}


function verifyMessageTrigger(messageText) {
    return (messageText.indexOf('dump') != -1 && messageText.indexOf('logs') != -1);
}

rtm.start();
