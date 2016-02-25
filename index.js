'use strict';

const $ = require('vorpal')();
const VentHub = require('venthub');

let venthub;

$.command('start [port]')
.alias('up')
.description('Start a VentHub instance @ specified port (default: 3000)')
.validate(args => {
    if (!args.port || Number.isInteger(args.port)) return true;
    return '"port" argument, if given, should be a number';
})
.action((args, cb) => {
    let port = args.port || 3000;
    venthub = new VentHub(port);
    cb();
});

$.command('status')
.alias('st')
.description('Get the current VentHub instance status')
.action((args, cb) => {
    if (!venthub) {
        $.log('VentHub instance is DOWN');
    } else {
        let server = venthub.server;
        $.log(`VentHub instance is UP @ ${server.options.host}:${server.options.port}`);
        $.log(`${server.clients.length} Vents are currently connected`);
    }
    cb();
});

$.command('publish <type> [payload] [fragment]')
.alias('pub')
.description('Publish action to VentHub. Use fragment for extra options.')
.validate(() => venthub ? true : 'No VentHub instance running')
.types({
    string: ['payload']
})
.action((args, cb) => {
    let fragment = args.fragment ? JSON.parse(args.fragemnt) : {};
    let payload;
    switch (args.payload) {
        case undefined:
        case '_':
            payload = {};
            break;
        default:
            payload = {payload: JSON.parse(args.payload)};
    }
    let action = Object.assign({}, {type: args.type}, payload, fragment);

    venthub.publish(action);
    cb();
});

$.delimiter('venthub$').show();