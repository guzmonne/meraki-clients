/* jshint ignore:start */
Package.describe({
  name          : 'guzmonne:stringjs',
  version       : '0.0.1',
  summary       : 'String.js - A dead simple, customizable plain text parser for JS - ported to meteor',
  documentation : null
});

Npm.depends({
  'string': '3.3.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');

  api.addFiles('string.js', ['server']);

  api.export('S', ['server']);
});