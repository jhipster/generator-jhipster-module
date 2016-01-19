'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'entity-audit'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {

    compose: function (args) {
      this.entityConfig = this.options.entityConfig;
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc
        }
      });
    },

    displayLogo: function () {
      this.log(chalk.white('Running ' + chalk.bold('JHipster <%= moduleName %>') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
    },

    validate: function () {
      // this shouldnt be run directly
      if (!this.entityConfig) {
        this.env.error(chalk.red.bold('ERROR!') + ' This sub generator should be used only from JHipster and cannot be run directly...\n');
      }
    }
  },

  prompting: function () {
    // don't prompt if data are imported from a file
    if (this.entityConfig.useConfigurationFile == true &&  this.entityConfig.data && typeof this.entityConfig.data.yourOptionKey !== 'undefined') {
      this.yourOptionKey = this.entityConfig.data.yourOptionKey;
      return;
    }
    var done = this.async();
    var prompts = [
      {
        type: 'confirm',
        name: 'enableOption',
        message: 'Some option here?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },
  writing : {
    updateFiles: function () {

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

    writeFiles : function () {
      this.template('dummy.txt', 'dummy.txt', this, {});
    },

    updateConfig : function() {
      jhipsterFunc.updateEntityConfig(this.entityConfig.filename, 'yourOptionKey', this.yourOptionKey);
    }
  },

  end: function () {
    if (this.yourOptionKey){
      this.log('\n' + chalk.bold.green('<%= moduleName %> enabled'));
    }
  }
});
