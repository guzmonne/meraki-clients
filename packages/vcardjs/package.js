Package.describe({
  name: 'guzmonne:vcardjs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Meteor port of vCardJS',

});

Npm.depends({
  'vcards-js': '2.2.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('vcardjs.js', ['server']);
  api.export('vCard', ['server']);
});