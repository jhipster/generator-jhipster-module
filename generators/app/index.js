'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'module'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {
    displayLogo: function () {
      this.log(' \n' +
        chalk.red.bold('               Three::Modules\n') +
        chalk.red.bold('           for:::the::Elven-Kings\n') +
        chalk.red.bold('        under:the:sky,:Seven:for:the\n') +
        chalk.red.bold('      Dwarf-Lords::in::their::halls:of\n') +
        chalk.red.bold('     stone,:Nine             for:Mortal\n') +
        chalk.red.bold('    :::Men:::' + chalk.yellow('    ________') + '     doomed::to\n') +
        chalk.red.bold('  die.:One' + chalk.yellow('   _,-\'...:... `-.    ') + 'for:::the\n') +
        chalk.red.bold('  ::Dark::' + chalk.yellow('  ,- .:::::::::::. `.   ') + 'Lord::on\n') +
        chalk.red.bold(' his:dark' + chalk.yellow(' ,\'  .:::::zzz:::::.  `.  ') + ':throne:\n') +
        chalk.red.bold(' In:::the' + chalk.yellow('/    ::::dMMMMMb::::    \  ') + 'Land::of\n') +
        chalk.red.bold(' :Mordor:' + chalk.yellow('\    ::::dMMmgJP::::    /  ') + ':where::\n') +
        chalk.red.bold(' ::the:::' + chalk.yellow(' \'.  \'::::YMMMP::::\'  ,\'  ') + 'Shadows:\n') +
        chalk.red.bold('  lie.::One' + chalk.yellow('  `. ``:::::::::\'\' ,\' ') + 'Module::to\n') +
        chalk.red.bold('  ::rule::' + chalk.yellow('    `-._```:\'\'\'_,-\'     ') + '::them::\n') +
        chalk.red.bold('   all,::One' + chalk.yellow('     `-----\'       ') + 'Module::to\n') +
        chalk.red.bold('    ::find:::                  them,:One\n') +
        chalk.red.bold('     Module:::::to          bring::them\n') +
        chalk.red.bold('       all::and::in:the:darkness:bind\n') +
        chalk.red.bold('         them:In:the:Land:of:Mordor\n') +
        chalk.red.bold('            where:::the::Shadows\n') +
        chalk.red.bold('                 :::lie.:::\n'));

      this.log(chalk.white.bold('         http://jhipster.github.io\n'));
      this.log(chalk.white('Welcome to the ' + chalk.bold('JHipster Module') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
    }
  },

  prompting: function () {
    var done = this.async();
    var defaultAppBaseName = (/^[a-zA-Z0-9-]+$/.test(path.basename(process.cwd()))) ? path.basename(process.cwd()).replace('generator-jhipster-', '') : 'hello-world';
    var prompts = [
      {
        type: 'input',
        name: 'moduleName',
        validate: function (input) {
            if (/^([a-zA-Z0-9_\-]*)$/.test(input)) return true;
            return 'Your module name is mandatory, cannot contain special characters or a blank space, using the default name instead';
        },
        message: 'What is the base name of your module',
        default: defaultAppBaseName
      },
      {
        type: 'input',
        name: 'moduleDescription',
        message: 'Give a description of your module',
      },
      {
        type: 'list',
        name: 'hook',
        message: 'Do you want to enable hooks for your module from JHipster generator?',
        choices: [
          {name: 'Yes, Enable post entity hook', value: 'postEntity'},
          {name: 'No, This is a stand alone module', value: 'none'}
        ],
        default: 'none'
      },
      {
        when: function (props) {
          return props.hook != 'none';
        },
        type: 'list',
        name: 'hookCallback',
        message: 'Do you want to add a subgenerator for this hook?',
        choices: [
          {name: 'Yes, Add a subgenerator', value: 'entity'},
          {name: 'No, Hook to default generator', value: 'app'}
        ],
        default: 'entity'
      },
      {
        type: 'input',
        name: 'githubName',
        validate: function (input) {
          if (/^([a-zA-Z0-9_]*)$/.test(input) && input != '') return true;
          return 'Your username is mandatory, cannot contain special characters or a blank space';
        },
        store: true,
        message: 'What is your GitHub username?',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Who are you? Firstname Lastname',
        default: "Firstname Lastname",
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
      }

    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.moduleName = props.moduleName;
      this.moduleDescription = props.moduleDescription;
      this.hook = props.hook;
      this.hookCallback = props.hookCallback;
      if(this.hook == 'postEntity'){
        this.hookType = 'post';
        this.hookFor = 'entity';
      }
      this.githubName = props.githubName;
      this.authorName = props.authorName;
      this.authorEmail = props.authorEmail;
      this.authorUrl = props.authorUrl;
      done();
    }.bind(this));
  },

  writing: {
    writeCommonTemplates : function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('eslintrc', '.eslintrc');
      this.copy('gitattributes', '.gitattributes');
      this.copy('gitignore', '.gitignore');
      this.copy('_travis.yml', '.travis.yml');
      this.copy('_gulpfile.js', '.gulpfile.js');
      this.template('_package.json', 'package.json', this, {});
      this.template('_LICENSE', 'LICENSE', this, {});
      this.template('_README.md', 'README.md', this, {});
    },

    writeMainGenTemplates : function () {
      mkdirp('generators/app/templates');

      this.template('generators/app/_index.js', 'generators/app/index.js', this, {});
      this.template('generators/app/templates/_dummy.txt', 'generators/app/templates/dummy.txt', this, {});
    },

    writeSubGenTemplates : function () {
      if(this.hook == 'none' || this.hookCallback == 'app'){
        return;
      }
      mkdirp('generators/entity/templates');

      this.template('generators/entity/_index.js', 'generators/entity/index.js', this, {});
      this.template('generators/entity/templates/_dummy.txt', 'generators/entity/templates/dummy.txt', this, {});

    }

  },

  end: function () {
    this.log('\n' + chalk.bold.green('##### USAGE #####'));
    this.log('To begin to work:');
    this.log('- launch: ' + chalk.yellow.bold('npm install'));
    this.log('- link: ' + chalk.yellow.bold('npm link'));
    this.log('- test your module in a JHipster project: ' + chalk.yellow.bold('yo jhipster-' + this.moduleName));
    this.log('- then, come back here, and begin to code!\n')
  }
});
