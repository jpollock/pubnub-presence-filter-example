# pubnub-presence-filter-example

Simple example (Node.js) for showing Presence Stream Filtering capability

## Setup

1. `git clone git@github.com:jpollock/pubnub-presence-filter-example.git` into a local directory.
2. `cd pubnub-presence-filter-example`.
3. `npm i`.


## Usage

If you run a command like this, `node index.js --subscribe_key=<insert subscribe key> --publish_key=<insert publish key> --channel=test --uuid=me --age=40`, you should get no response, since PubNub, in `index.js` has had its stream filter configured to only show Presence Events for uuids with state of `age` greater than 50.


If you run a command like this, `node index.js --subscribe_key=<insert subscribe key> --publish_key=<insert publish key> --channel=test --uuid=me --age=60`, you should get a response like:

```
{
  channel: 'test',
  subscription: null,
  actualChannel: null,
  subscribedChannel: 'test-pnpres',
  action: 'state-change',
  state: { age: 60 },
  timetoken: '15887714647255723',
  occupancy: 0,
  uuid: 'me',
  timestamp: 1588771464
}
```