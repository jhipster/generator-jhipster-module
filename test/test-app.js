'use strict';
var util = require('util');
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('JHipster generator module', function () {

  describe('default configuration', function () {
    before(function (done) {
      helpers.run(path.join( __dirname, '../generators/app'))
        .withPrompts({
          moduleName: 'hello-world',
          moduleDescription: 'hello world',
          hook: 'none',
          githubName: 'githubName',
          authorName: 'authorName',
          authorEmail: 'mail@mail',
          authorUrl: 'authorUrl'
        })
        .on('end', done);
    });

    it('generate default files', function () {
      assert.file([
        '.editorconfig',
        '.eslintrc',
        '.gitattributes',
        '.gitignore',
        '.travis.yml',
        '.gulpfile.js',
        'package.json',
        'LICENSE',
        'README.md',
        'test/templates/default/.yo-rc.json',
        'test/test-app.js',
        'generators/app/index.js',
        'generators/app/templates/dummy.txt'
      ]);
    });

    it('doesn\'t generate entity files', function () {
      assert.noFile([
        'generators/entity/index.js',
        'generators/entity/templates/dummy.txt'
      ]);
    });
  })

  describe('hook postEntity on default generator', function () {
    before(function (done) {
      helpers.run(path.join( __dirname, '../generators/app'))
        .withPrompts({
          moduleName: 'hello-world',
          moduleDescription: 'hello world',
          hook: 'postEntity',
          hookCallback: 'app',
          githubName: 'githubName',
          authorName: 'authorName',
          authorEmail: 'mail@mail',
          authorUrl: 'authorUrl'
        })
        .on('end', done);
    });

    it('generates default files', function () {
      assert.file([
        '.editorconfig',
        '.eslintrc',
        '.gitattributes',
        '.gitignore',
        '.travis.yml',
        '.gulpfile.js',
        'package.json',
        'LICENSE',
        'README.md',
        'test/templates/default/.yo-rc.json',
        'test/test-app.js',
        'generators/app/index.js',
        'generators/app/templates/dummy.txt'
      ]);
    });

    it('doesn\'t generate entity files', function () {
      assert.noFile([
        'generators/entity/index.js',
        'generators/entity/templates/dummy.txt'
      ]);
    });
  })

  describe('hook postEntity on entity', function () {
    before(function (done) {
      helpers.run(path.join( __dirname, '../generators/app'))
        .withPrompts({
          moduleName: 'hello-world',
          moduleDescription: 'hello world',
          hook: 'postEntity',
          hookCallback: 'entity',
          githubName: 'githubName',
          authorName: 'authorName',
          authorEmail: 'mail@mail',
          authorUrl: 'authorUrl'
        })
        .on('end', done);
    });

    it('generates default files', function () {
      assert.file([
        '.editorconfig',
        '.eslintrc',
        '.gitattributes',
        '.gitignore',
        '.travis.yml',
        '.gulpfile.js',
        'package.json',
        'LICENSE',
        'README.md',
        'test/templates/default/.yo-rc.json',
        'test/test-app.js',
        'generators/app/index.js',
        'generators/app/templates/dummy.txt'
      ]);
    });

    it('generates entity files', function () {
      assert.file([
        'generators/entity/index.js',
        'generators/entity/templates/dummy.txt'
      ]);
    });
  })
});
