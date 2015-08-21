Package.describe({
  name: 'guzmonne:qrcode.js',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Meteor port of QRcode.js',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('qrcode.js', ['client']);
  api.export('QRcode', ['client']);
});