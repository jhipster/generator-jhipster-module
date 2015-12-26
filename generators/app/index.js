'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var jhipster = require('generator-jhipster');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'module'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

  initializing: {
    // templates: function (args) {
    //   this.composeWith('jhipster:modules', {
    //     options: {
    //       jhipsterVar: jhipsterVar,
    //       jhipsterFunc: jhipsterFunc
    //     }
    //   });
    // },
    displayLogo: function () {
      console.log(' \n' +
        chalk.red.bold('              Three::Modules\n') +
        chalk.red.bold('          for:::the::Elven-Kings\n') +
        chalk.red.bold('       under:the:sky,:Seven:for:the\n') +
        chalk.red.bold('     Dwarf-Lords::in::their::halls:of\n') +
        chalk.red.bold('    stone,:Nine             for:Mortal\n') +
        chalk.red.bold('   :::Men:::     ________     doomed::to\n') +
        chalk.red.bold(' die.:One   _,-\'...:... `-.    for:::the\n') +
        chalk.red.bold(' ::Dark::  ,- .:::::::::::. `.   Lord::on\n') +
        chalk.red.bold('his:dark ,\'  .:::::zzz:::::.  `.  :throne:\n') +
        chalk.red.bold('In:::the/    ::::dMMMMMb::::    \ Land::of\n') +
        chalk.red.bold(':Mordor:\    ::::dMMmgJP::::    / :where::\n') +
        chalk.red.bold('::the::: \'.  \'::::YMMMP::::\'  ,\'  Shadows:\n') +
        chalk.red.bold(' lie.::One  `. ``:::::::::\'\' ,\' Module::to\n') +
        chalk.red.bold(' ::rule::    `-._```:\'\'\'_,-\'     ::them::\n') +
        chalk.red.bold(' all,::One      `-----\'       Module::to\n') +
        chalk.red.bold('   ::find:::                  them,:One\n') +
        chalk.red.bold('    Module:::::to          bring::them\n') +
        chalk.red.bold('      all::and::in:the:darkness:bind\n') +
        chalk.red.bold('        them:In:the:Land:of:Mordor\n') +
        chalk.red.bold('           where:::the::Shadows\n') +
        chalk.red.bold('                :::lie.:::\n'));

      console.log(chalk.white.bold('         http://jhipster.github.io\n'));
      console.log(chalk.white('Welcome to the ' + chalk.bold('JHipster Module') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
    }
  },

  prompting: function () {
    var done = this.async();
    var prompts = [
      {
        type: 'input',
        name: 'moduleName',
        validate: function (input) {
            if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
            return 'Your application name cannot contain special characters or a blank space, using the default name instead';
        },
        message: 'What is the base name of your module'
      },
      {
        type: 'input',
        name: 'moduleDescription',
        message: 'Give a description of your module',
      },
      {
        type: 'input',
        name: 'githubName',
        message: 'What is your GitHub username?',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Who are you? Firstname Lastname',
        default: "Firstname Lastname"
      },

    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.moduleName = props.moduleName;
      this.moduleDescription = props.moduleDescription;
      this.githubName = props.githubName;
      this.authorName = props.authorName;
      done();
    }.bind(this));
  },

  writing: function () {
    var done = this.async();

    this.copy('.editorconfig', '.editorconfig');
    this.copy('.eslintrc', '.eslintrc');
    this.copy('.gitattributes', '.gitattributes');
    this.copy('.gitignore', '.gitignore');
    this.copy('.travis.yml', '.travis.yml');

    this.template('package.json', 'package.json', this, {});
    this.template('LICENSE', 'LICENSE', this, {});
    this.template('README.md', 'README.md', this, {});

    this.template('generators/app/index.js', 'generators/app/index.js', this, {});
    mkdirp('generators/app/templates');

    done();
  },

  install: function () {
    // var done = this.async();
    // this.installDependencies();
    // done();
  },

  end: function () {

  }
});
