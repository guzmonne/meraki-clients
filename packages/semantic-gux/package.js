Package.describe({
  name: 'guzmonne:semantic-gux',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Semantic UI Angular directives',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'urigo:angular@0.9.3'
  ]);

  api.addFiles([
    'module.js',
    'directives/semantic-checkbox.directive.js'
  ], ['client']);
});