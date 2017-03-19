const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const deps = [
    [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('JHipster generator <%= moduleName %>', function () {
    describe('simple test', function () {
        before(function (done) {
            helpers
            .run(path.join( __dirname, '../generators/app'))
            .inTmpDir(function (dir) {
                fse.copySync(path.join(__dirname, '../test/templates/default'), dir)
            })
            .withOptions({
                testmode: true
            })
            .withPrompts({
                message: 'simple message to say hello'
            })
            .withGenerators(deps)
            .on('end', done);
        });

        it('generate dummy.txt file', function () {
            assert.file([
                'dummy.txt'
            ]);
        });
    });
});
