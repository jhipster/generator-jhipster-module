const chalk = require('chalk');
const Generator = require('yeoman-generator');
const filter = require('gulp-filter');
const mkdirp = require('mkdirp');
const packagejs = require('../../package.json');
const { validateGitHubName, validateModuleName } = require('./input-validation');
const prettierTransform = require('./generator-transforms').prettierTransform;
const constants = require('../generator-constants');

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);
        // Register file transforms for generated files, using Prettier
        const prettierFilter = filter(['{,**/}{.,}*.{js,json,md,yml}'], { restore: true });
        // this pipe will pass through (restore) anything that doesn't match prettierFilter
        this.registerTransformStream([prettierFilter, prettierTransform(), prettierFilter.restore]);
    }

    get initializing() {
        return {
            displayLogo() {
                this.log(`
${chalk.red.bold('               Three::Modules')}
${chalk.red.bold('           for:::the::Elven-Kings')}
${chalk.red.bold('        under:the:sky,:Seven:for:the')}
${chalk.red.bold('      Dwarf-Lords::in::their::halls:of')}
${chalk.red.bold('     stone,:Nine             for:Mortal')}
${chalk.red.bold(`    :::Men:::${chalk.yellow('    ________')}     doomed::to`)}
${chalk.red.bold(`  die.:One${chalk.yellow('    _,-\'...:... `-.    ')}for:::the`)}
${chalk.red.bold(` ::Dark::${chalk.yellow('   ,- .:::::::::::. `. ')}Hipster::on`)}
${chalk.red.bold(` his:dark${chalk.yellow(' ,\'  .:::::::::::::.  `.  ')}:throne:`)}
${chalk.red.bold(`In:::the${chalk.yellow(' /    :::: Java :::::    \\  ')}Land::of`)}
${chalk.red.bold(`JHipster${chalk.yellow(' \\    ::: Hipster :::    /  ')}:where::`)}
${chalk.red.bold(` ::the:::${chalk.yellow(' \'.  \':::::::::::::\'  ,\'  ')}Shadows:`)}
${chalk.red.bold(`  lie::One${chalk.yellow('  `. ``:::::::::\'\' ,\'  ')}Module::to`)}
${chalk.red.bold(`  ::rule::${chalk.yellow('    `-._```:\'\'\'_,-\'     ')}::them::`)}
${chalk.red.bold(`   all,::One${chalk.yellow('      `-----\'       ')}Module::to`)}
${chalk.red.bold('    ::find:::                  them,:One')}
${chalk.red.bold('     Module:::::to          bring::them')}
${chalk.red.bold('       all::and::in:the:darkness:bind')}
${chalk.red.bold('         them:In:the:Land:of:JHipster')}
${chalk.red.bold('            where:::the::Shadows')}
${chalk.red.bold('                 :::lie.:::')}\n`);
                this.log(chalk.white.bold('         http://www.jhipster.tech\n'));
                this.log(chalk.white(`Welcome to the ${chalk.bold('JHipster Module')} Generator! ${chalk.yellow(`v${packagejs.version}\n`)}`));
            },
            initConstants() {
                this.NODE_VERSION = constants.NODE_VERSION;
            },
        };
    }

    prompting() {
        const done = this.async();
        const prompts = [
            {
                type: 'input',
                name: 'moduleName',
                validate: validateModuleName,
                message: 'What is the base name of your module?',
                default: 'helloworld'
            },
            {
                type: 'input',
                name: 'moduleDescription',
                message: 'Give a description of your module'
            },
            {
                type: 'list',
                name: 'hook',
                message: 'Do you want to enable hooks for your module from JHipster generator?',
                choices: [
                    {
                        name: 'No, This is a standalone module',
                        value: 'none'
                    },
                    {
                        name: 'Yes, Enable post entity hook',
                        value: 'postEntity'
                    }
                ],
                default: 'none'
            },
            {
                when: props => props.hook !== 'none',
                type: 'list',
                name: 'hookCallback',
                message: 'Do you want to add a subgenerator for this hook?',
                choices: [
                    { name: 'Yes, Add a subgenerator', value: 'entity' },
                    { name: 'No, Hook to default generator', value: 'app' }
                ],
                default: 'entity'
            },
            {
                type: 'input',
                name: 'githubName',
                validate: validateGitHubName,
                store: true,
                message: 'What is your GitHub username?',
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Who are you? Firstname Lastname',
                default: 'Firstname Lastname',
                store: true
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Your email?',
                store: true
            },
            {
                type: 'input',
                name: 'authorUrl',
                message: 'Your home page url?',
                store: true
            },
            {
                type: 'list',
                name: 'license',
                message: 'Do you want to add a license?',
                choices: [
                    { name: 'No license', value: 'no' },
                    { name: 'Apache License 2.0', value: 'apache' },
                    { name: 'GNU General Public License v3.0', value: 'gnu' },
                    { name: 'MIT License', value: 'mit' }
                ],
                default: 'no'
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            this.moduleName = props.moduleName;
            this.moduleDescription = props.moduleDescription;
            this.hook = props.hook;
            this.hookCallback = props.hookCallback;
            if (this.hook === 'postEntity') {
                this.hookType = 'post';
                this.hookFor = 'entity';
            }
            this.githubName = props.githubName;
            this.authorName = props.authorName;
            this.authorEmail = props.authorEmail;
            this.authorUrl = props.authorUrl;
            this.license = props.license;
            done();
        });
    }

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        // copy general files
        this.template('.github/workflows/github-ci.yml.ejs', '.github/workflows/github-ci.yml');
        this.template('.prettierrc', '.prettierrc');
        this.template('.prettierignore', '.prettierignore');
        this.template('.editorconfig', '.editorconfig');
        this.template('.eslintignore', '.eslintignore');
        this.template('.eslintrc.json', '.eslintrc.json');
        this.template('.gitattributes', '.gitattributes');
        this.template('.gitignore.ejs', '.gitignore');
        this.template('package.json.ejs', 'package.json');
        if (this.license === 'apache') {
            this.template('LICENSE_APACHE.ejs', 'LICENSE');
        } else if (this.license === 'gpl') {
            this.template('LICENSE_GPL.ejs', 'LICENSE');
        } else if (this.license === 'mit') {
            this.template('LICENSE_MIT.ejs', 'LICENSE');
        }
        this.template('README.md.ejs', 'README.md');

        // copy files for test
        mkdirp('test/templates/default');
        this.template('test/templates/gradle-react/.yo-rc.json', 'test/templates/gradle-react/.yo-rc.json');
        this.template('test/templates/maven-angularX/.yo-rc.json', 'test/templates/maven-angularX/.yo-rc.json');
        this.template('test/app.spec.js.ejs', 'test/app.spec.js');

        // copy files for the generator
        mkdirp('generators/app/templates');
        this.template('generators/app/index.js.ejs', 'generators/app/index.js');
        this.template('generators/app/templates/dummy.txt.ejs', 'generators/app/templates/dummy.txt');

        // copy files for the hook
        if (this.hook === 'none' || this.hookCallback === 'app') {
            return;
        }
        mkdirp('generators/entity/templates');
        this.template('generators/entity/index.js.ejs', 'generators/entity/index.js');
        this.template('generators/entity/templates/dummy.txt.ejs', 'generators/entity/templates/dummy.txt');
    }

    end() {
        this.log(`\n${chalk.bold.green('##### USAGE #####')}`);
        this.log('To begin to work:');
        this.log(`- launch: ${chalk.yellow.bold('npm install')} or ${chalk.yellow.bold('yarn install')}`);
        this.log(`- link: ${chalk.yellow.bold('npm link')} or ${chalk.yellow.bold('yarn link')}`);
        this.log('- test your module in a JHipster project: ');
        this.log('    - go into your JHipster project');
        this.log(`    - link to your module: ${chalk.yellow.bold(`npm link generator-jhipster-${this.moduleName}`)} or ${chalk.yellow.bold(`yarn link generator-jhipster-${this.moduleName}`)}`);
        this.log(`    - launch your module: ${chalk.yellow.bold(`yo jhipster-${this.moduleName}`)}`);
        this.log('- then, come back here, and begin to code!\n');
    }
};
