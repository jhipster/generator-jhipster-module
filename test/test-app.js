'use strict';

var util = require('util');
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

const expectedFiles = {
    module : [
        '.editorconfig',
        '.eslintrc',
        '.gitattributes',
        '.gitignore',
        '.travis.yml',
        'gulpfile.js',
        'package.json',
        'README.md',
        'test/templates/default/.yo-rc.json',
        'test/test-app.js',
        'generators/app/index.js',
        'generators/app/templates/dummy.txt'
    ],
    entity : [
        'generators/entity/index.js',
        'generators/entity/templates/dummy.txt'
    ],
    license : [
        'LICENSE'
    ]
};

describe('JHipster generator module', function () {

    describe('default configuration no license', function () {
        before(function (done) {
            helpers.run(path.join( __dirname, '../generators/app'))
            .withPrompts({
                moduleName: 'hello-world',
                moduleDescription: 'hello world',
                hook: 'none',
                githubName: 'githubName',
                authorName: 'authorName',
                authorEmail: 'mail@mail',
                authorUrl: 'authorUrl',
                license: 'no'
            })
            .on('end', done);
        });
        it('generates default files', function () {
            assert.file(expectedFiles.module);
        });
        it('doesn\'t generate license', function () {
            assert.noFile(expectedFiles.license);
        });
        it('doesn\'t generate entity files', function () {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('default configuration license Apache', function () {
        before(function (done) {
            helpers.run(path.join( __dirname, '../generators/app'))
            .withPrompts({
                moduleName: 'hello-world',
                moduleDescription: 'hello world',
                hook: 'none',
                githubName: 'githubName',
                authorName: 'authorName',
                authorEmail: 'mail@mail',
                authorUrl: 'authorUrl',
                license: 'apache'
            })
            .on('end', done);
        });
        it('generates default files', function () {
            assert.file(expectedFiles.module);
        });
        it('generates license Apache', function () {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'Apache-2.0');
            assert.fileContent('package.json', 'Apache-2.0');
        });
        it('doesn\'t generate entity files', function () {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('default configuration license GNU GPLv3', function () {
        before(function (done) {
            helpers.run(path.join( __dirname, '../generators/app'))
            .withPrompts({
                moduleName: 'hello-world',
                moduleDescription: 'hello world',
                hook: 'none',
                githubName: 'githubName',
                authorName: 'authorName',
                authorEmail: 'mail@mail',
                authorUrl: 'authorUrl',
                license: 'gpl'
            })
            .on('end', done);
        });
        it('generates default files', function () {
            assert.file(expectedFiles.module);
        });
        it('generates license', function () {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'GPL-3.0');
            assert.fileContent('package.json', 'GPL-3.0');
        });
        it('doesn\'t generate entity files', function () {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('default configuration license MIT', function () {
        before(function (done) {
            helpers.run(path.join( __dirname, '../generators/app'))
            .withPrompts({
                moduleName: 'hello-world',
                moduleDescription: 'hello world',
                hook: 'none',
                githubName: 'githubName',
                authorName: 'authorName',
                authorEmail: 'mail@mail',
                authorUrl: 'authorUrl',
                license: 'mit'
            })
            .on('end', done);
        });
        it('generates default files', function () {
            assert.file(expectedFiles.module);
        });
        it('generates license', function () {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'MIT');
            assert.fileContent('package.json', 'MIT');
        });
        it('doesn\'t generate entity files', function () {
            assert.noFile(expectedFiles.entity);
        });
    });

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
                authorUrl: 'authorUrl',
                license: 'no'
            })
            .on('end', done);
        });

        it('generates default files', function () {
            assert.file(expectedFiles.module);
        });
        it('doesn\'t generate entity files', function () {
            assert.noFile(expectedFiles.entity);
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
                authorUrl: 'authorUrl',
                license: 'no'
            })
            .on('end', done);
        });
        it('generates default files', function () {
            assert.file(expectedFiles.module);
        });
        it('generates entity files', function () {
            assert.file(expectedFiles.entity);
        });
    })
});
