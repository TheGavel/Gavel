const channels = require.context(".", true, /_channel\.js$/);
console.log( channels.keys() );
channels.keys().forEach(channels);
