/* global describe, beforeEach, it */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const expectedFiles = {
    module: [
        '.editorconfig',
        '.eslintignore',
        '.eslintrc.json',
        '.gitattributes',
        '.gitignore',
        '.travis.yml',
        'package.json',
        'README.md',
        'test/templates/maven-angularX/.yo-rc.json',
        'test/templates/gradle-angular1/.yo-rc.json',
        'test/test-app.js',
        'generators/app/index.js',
        'generators/app/templates/dummy.txt'
    ],
    entity: [
        'generators/entity/index.js',
        'generators/entity/templates/dummy.txt'
    ],
    license: [
        'LICENSE'
    ]
};

describe('JHipster generator module', () => {
    describe('default configuration no license', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
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
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('doesn\'t generate license', () => {
            assert.noFile(expectedFiles.license);
        });
        it('doesn\'t generate entity files', () => {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('default configuration license Apache', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
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
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates license Apache', () => {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'Apache-2.0');
            assert.fileContent('package.json', 'Apache-2.0');
        });
        it('doesn\'t generate entity files', () => {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('default configuration license GNU GPLv3', () => {
        beforeEach((done) => {
            helpers.run(path.join(__dirname, '../generators/app'))
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
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates license', () => {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'GPL-3.0');
            assert.fileContent('package.json', 'GPL-3.0');
        });
        it('doesn\'t generate entity files', () => {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('default configuration license MIT', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
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
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates license', () => {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'MIT');
            assert.fileContent('package.json', 'MIT');
        });
        it('doesn\'t generate entity files', () => {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('hook postEntity on default generator', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
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

        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('doesn\'t generate entity files', () => {
            assert.noFile(expectedFiles.entity);
        });
    });

    describe('hook postEntity on entity', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
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
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates entity files', () => {
            assert.file(expectedFiles.entity);
        });
    });
});
