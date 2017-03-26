const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
const jhipsterVar = {moduleName: '<%= moduleName %>'};

// Stores JHipster functions
const jhipsterFunc = {};

module.exports = generator.extend({

    initializing: {
        compose() {
            this.entityConfig = this.options.entityConfig;
            this.composeWith('jhipster:modules', {
                jhipsterVar: jhipsterVar,
                jhipsterFunc: jhipsterFunc
            });
        },
        displayLogo() {
            console.log(chalk.white('Running ' + chalk.bold('JHipster <%= moduleName %>') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
        },
        validate() {
            // this shouldnt be run directly
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

    writing() {
        updateFiles() {

            this.baseName = jhipsterVar.baseName;
            this.packageName = jhipsterVar.packageName;
            this.angularAppName = jhipsterVar.angularAppName;
            this.frontendBuilder = jhipsterVar.frontendBuilder;

            var webappDir = jhipsterVar.webappDir,
            javaTemplateDir = 'src/main/java/package',
            javaDir = jhipsterVar.javaDir,
            resourceDir = jhipsterVar.resourceDir,
            entityName = this.entityConfig.entityClass;

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
            jhipsterFunc.updateEntityConfig(this.entityConfig.filename, 'yourOptionKey', this.yourOptionKey);
        }
    },

    end() {
        if (this.yourOptionKey){
            console.log('\n' + chalk.bold.green('<%= moduleName %> enabled'));
        }
    }
});
