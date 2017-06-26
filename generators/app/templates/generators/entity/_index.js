const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require(__dirname + '/../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const constants = require('generator-jhipster/generators/generator-constants');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

module.exports = JhipsterGenerator.extend({
    initializing: {
        readConfig() {
            this.jhipsterConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },
        displayLogo() {
            this.log(chalk.white('Running ' + chalk.bold('JHipster <%= moduleName %>') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
        },
        validate() {
            // this shouldn't be run directly
            if (!this.entityConfig) {
                this.env.error(chalk.red.bold('ERROR!') + ' This sub generator should be used only from JHipster and cannot be run directly...\n');
            }
        }
    },

    prompting() {
        // don't prompt if data are imported from a file
        if (this.entityConfig.useConfigurationFile == true && this.entityConfig.data && typeof this.entityConfig.data.yourOptionKey !== 'undefined') {
            this.yourOptionKey = this.entityConfig.data.yourOptionKey;
            return;
        }
        const done = this.async();
        const prompts = [
            {
                type: 'confirm',
                name: 'enableOption',
                message: 'Some option here?',
                default: false
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    },

    writing: {
        updateFiles() {
            // read config from .yo-rc.json
            this.baseName = this.jhipsterConfig.baseName;
            this.packageName = this.jhipsterConfig.packageName;
            this.packageFolder = this.jhipsterConfig.packageFolder;
            this.clientFramework = this.jhipsterConfig.clientFramework;
            this.clientPackageManager = this.jhipsterConfig.clientPackageManager;
            this.buildTool = this.jhipsterConfig.buildTool;

            // use function in generator-base.js from generator-jhipster
            this.angularAppName = this.getAngularAppName();

            // use constants from generator-constants.js
            const javaDir = `${constants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
            const resourceDir = constants.SERVER_MAIN_RES_DIR;
            const webappDir = constants.CLIENT_MAIN_SRC_DIR;

            const entityName = this.entityConfig.entityClass;

            // do your stuff here
        },

        writeFiles() {
            // function to use directly template
            this.template = function (source, destination) {
                this.fs.copyTpl(
                    this.templatePath(source),
                    this.destinationPath(destination),
                    this
                );
            };

            this.template('dummy.txt', 'dummy.txt', this, {});
        },

        updateConfig() {
            this.updateEntityConfig(this.entityConfig.filename, 'yourOptionKey', this.yourOptionKey);
        }
    },

    end() {
        if (this.yourOptionKey){
            this.log('\n' + chalk.bold.green('<%= moduleName %> enabled'));
        }
    }
});
