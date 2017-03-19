const chalk = require('chalk');
const generator = require('yeoman-generator');
const prompts = require('./prompts');
const mkdirp = require('mkdirp');
const packagejs = require('../../package.json');

module.exports = generator.extend({
    initializing: {
        displayLogo() {
            this.log(' \n' +
            chalk.red.bold('               Three::Modules\n') +
            chalk.red.bold('           for:::the::Elven-Kings\n') +
            chalk.red.bold('        under:the:sky,:Seven:for:the\n') +
            chalk.red.bold('      Dwarf-Lords::in::their::halls:of\n') +
            chalk.red.bold('     stone,:Nine             for:Mortal\n') +
            chalk.red.bold('    :::Men:::' + chalk.yellow('    ________') + '     doomed::to\n') +
            chalk.red.bold('  die.:One' + chalk.yellow('    _,-\'...:... `-.    ') + 'for:::the\n') +
            chalk.red.bold(' ::Dark::' + chalk.yellow('   ,- .:::::::::::. `. ') + 'Hipster::on\n') +
            chalk.red.bold(' his:dark' + chalk.yellow(' ,\'  .:::::::::::::.  `.  ') + ':throne:\n') +
            chalk.red.bold('In:::the' + chalk.yellow(' /    :::: Java :::::    \\  ') + 'Land::of\n') +
            chalk.red.bold('JHipster' + chalk.yellow(' \\    ::: Hipster :::    /  ') + ':where::\n') +
            chalk.red.bold(' ::the:::' + chalk.yellow(' \'.  \':::::::::::::\'  ,\'  ') + 'Shadows:\n') +
            chalk.red.bold('  lie::One' + chalk.yellow('  `. ``:::::::::\'\' ,\'  ') + 'Module::to\n') +
            chalk.red.bold('  ::rule::' + chalk.yellow('    `-._```:\'\'\'_,-\'     ') + '::them::\n') +
            chalk.red.bold('   all,::One' + chalk.yellow('      `-----\'       ') + 'Module::to\n') +
            chalk.red.bold('    ::find:::                  them,:One\n') +
            chalk.red.bold('     Module:::::to          bring::them\n') +
            chalk.red.bold('       all::and::in:the:darkness:bind\n') +
            chalk.red.bold('         them:In:the:Land:of:JHipster\n') +
            chalk.red.bold('            where:::the::Shadows\n') +
            chalk.red.bold('                 :::lie.:::\n'));

            this.log(chalk.white.bold('         http://jhipster.github.io\n'));
            this.log(chalk.white('Welcome to the ' + chalk.bold('JHipster Module') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
        }
    },

    prompting: {
        askModule: prompts.askModule
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
        this.template('eslintrc', '.eslintrc');
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
        if (this.hook == 'none' || this.hookCallback == 'app'){
            return;
        }
        mkdirp('generators/entity/templates');
        this.template('generators/entity/_index.js', 'generators/entity/index.js');
        this.template('generators/entity/templates/_dummy.txt', 'generators/entity/templates/dummy.txt');
    },

    end() {
        this.log('\n' + chalk.bold.green('##### USAGE #####'));
        this.log('To begin to work:');
        this.log('- launch: ' + chalk.yellow.bold('yarn install'));
        this.log('- link: ' + chalk.yellow.bold('yarn link'));
        this.log('- test your module in a JHipster project: ');
        this.log('    - go into your JHipster project');
        this.log('    - link to your module: ' + chalk.yellow.bold('yarn link generator-jhipster-' + this.moduleName));
        this.log('    - launch your module: ' + chalk.yellow.bold('yo jhipster-' + this.moduleName));
        this.log('- then, come back here, and begin to code!\n')
    }
});
