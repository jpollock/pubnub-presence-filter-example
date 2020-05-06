"use strict";
const PubNub = require('pubnub');
const args = require('yargs').argv;


if (args.subscribe_key === undefined || args.subscribe_key === '' || args.publish_key === undefined || args.publish_key === '') {
    console.log("USAGE ERROR: Missing key information");
    process.exit(1);
}

const subscribe_key = args.subscribe_key;
const publish_key = args.publish_key;
const channel = args.channel !== undefined ?  args.channel : 'demo';
const uuid = args.uuid !== undefined ?  args.uuid : 'test';
const age = args.age !== undefined ?  args.age : 100;

var pubnub = new PubNub({ subscribeKey: subscribe_key, publishKey:publish_key, uuid: uuid, logVerbosity: false});


pubnub.addListener({
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
        console.log(p);
    }
});


pubnub.setFilterExpression("pn_ispresence==1 && pn_state_age > 50");

pubnub.setState(
    {
        state: {
            "age" : age
        },
        uuid: uuid,
        channels: [channel]
    }).then((response) => {
        //console.log(response)
    }).catch((error) => {
        console.log(error)
    });

pubnub.subscribe({
    channels: [channel],
    withPresence: true
});




