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
            this.composeWith('jhipster:modules',
                {
                    jhipsterVar: jhipsterVar,
                    jhipsterFunc: jhipsterFunc
                },
                this.options.testmode ? {local: require.resolve('generator-jhipster/generators/modules')} : null
            );
        },
        displayLogo () {
            // Have Yeoman greet the user.
            console.log('Welcome to the ' + chalk.bold.yellow('JHipster <%= moduleName %>') + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'));
        }
    },

    prompting() {
        const done = this.async();
        const prompts = [
            {
                type: 'input',
                name: 'message',
                message: 'Please put something',
                default: 'hello world!'
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    },

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        this.baseName = jhipsterVar.baseName;
        this.packageName = jhipsterVar.packageName;
        this.angularAppName = jhipsterVar.angularAppName;
        this.clientFramework = jhipsterVar.clientFramework;
        this.clientPackageManager = jhipsterVar.clientPackageManager;
        const javaDir = jhipsterVar.javaDir;
        const resourceDir = jhipsterVar.resourceDir;
        const webappDir = jhipsterVar.webappDir;

        this.message = this.props.message;

        console.log('\n--- some config read from config ---');
        console.log('baseName=' + this.baseName);
        console.log('packageName=' + this.packageName);
        console.log('angularAppName=' + this.angularAppName);
        console.log('clientFramework=' + this.clientFramework);
        console.log('clientPackageManager=' + this.clientPackageManager);
        console.log('\nmessage=' + this.message);
        console.log('------\n');

        this.template('dummy.txt', 'dummy.txt');

        <%_ if (hook !== 'none') { _%>
        try {
            jhipsterFunc.registerModule('generator-jhipster-<%= moduleName %>', '<%= hookFor %>', '<%= hookType %>', '<%= hookCallback %>', '<%= moduleDescription %>');
        } catch (err) {
            this.log(chalk.red.bold('WARN!') + ' Could not register as a jhipster <%= hookFor %> <%= hookType %> creation hook...\n');
        }
        <%_ } _%>
    },

    install() {
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: this.clientFramework === 'angular1',
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        this.installDependencies(installConfig);
    },

    end() {
        console.log('End of <%= moduleName %> generator');
    }
});
