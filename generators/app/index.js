const chalk = require('chalk');
const generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const packagejs = require('../../package.json');

module.exports = generator.extend({
    initializing: {
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

            this.log(chalk.white.bold('         http://jhipster.github.io\n'));
            this.log(chalk.white(`Welcome to the ${chalk.bold('JHipster Module')} Generator! ${chalk.yellow(`v${packagejs.version}\n`)}`));
        }
    },

    prompting() {
        const done = this.async();
        const prompts = [
            {
                type: 'input',
                name: 'moduleName',
                validate: input => (/^[a-zA-Z0-9-]+$/.test(input) ? true : 'Your module name is mandatory, cannot contain special characters or a blank space, using the default name instead'),
                message: 'What is the base name of your module?',
                default: 'hello-world'
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
                        name: 'No, This is a stand alone module',
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
                validate: (input) => {
                    if (/^([a-zA-Z0-9_]*)$/.test(input) && input !== '') return true;
                    return 'Your username is mandatory, cannot contain special characters or a blank space';
                },
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

        // copy general files
        this.template('editorconfig', '.editorconfig');
        this.template('eslintignore', '.eslintignore');
        this.template('eslintrc.json', '.eslintrc.json');
        this.template('gitattributes', '.gitattributes');
        this.template('gitignore', '.gitignore');
        this.template('_travis.yml', '.travis.yml');
        this.template('_gulpfile.js', 'gulpfile.js');
        this.template('_package.json', 'package.json');
        if (this.license === 'apache') {
            this.template('_LICENSE_APACHE', 'LICENSE');
        } else if (this.license === 'gpl') {
            this.template('_LICENSE_GPL', 'LICENSE');
        } else if (this.license === 'mit') {
            this.template('_LICENSE_MIT', 'LICENSE');
        }
        this.template('_README.md', 'README.md');

        // copy files for test
        mkdirp('test/templates/default');
        this.template('test/templates/default/_yo-rc.json', 'test/templates/default/.yo-rc.json');
        this.template('test/_test-app.js', 'test/test-app.js');

        // copy files for the generator
        mkdirp('generators/app/templates');
        this.template('generators/app/_index.js', 'generators/app/index.js');
        this.template('generators/app/templates/_dummy.txt', 'generators/app/templates/dummy.txt');

        // copy files for the hook
        if (this.hook === 'none' || this.hookCallback === 'app') {
            return;
        }
        mkdirp('generators/entity/templates');
        this.template('generators/entity/_index.js', 'generators/entity/index.js');
        this.template('generators/entity/templates/_dummy.txt', 'generators/entity/templates/dummy.txt');
    },

    end() {
        this.log(`\n${chalk.bold.green('##### USAGE #####')}`);
        this.log('To begin to work:');
        this.log(`- launch: ${chalk.yellow.bold('yarn install')}`);
        this.log(`- link: ${chalk.yellow.bold('yarn link')}`);
        this.log('- test your module in a JHipster project: ');
        this.log('    - go into your JHipster project');
        this.log(`    - link to your module: ${chalk.yellow.bold(`yarn link generator-jhipster-${this.moduleName}`)}`);
        this.log(`    - launch your module: ${chalk.yellow.bold(`yo jhipster-${this.moduleName}`)}`);
        this.log('- then, come back here, and begin to code!\n');
    }
});
