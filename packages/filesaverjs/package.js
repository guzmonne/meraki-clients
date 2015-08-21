Package.describe({
  name: 'guzmonne:filesaverjs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Meteor port of FileSaver.js'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('filesaverjs.js', ['client']);
  api.export('saveAs', ['client']);
});