const chalk = require('chalk');

module.exports = {
    askModule
};

function askModule() {
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
            validate: input => {
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
        },
        {
            type: 'list',
            name: 'license',
            message: 'Do you want to add a license?',
            choices: [
                {name: 'No license', value: 'no'},
                {name: 'Apache License 2.0', value: 'apache'},
                {name: 'GNU General Public License v3.0', value: 'gnu'},
                {name: 'MIT License', value: 'mit'}
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
        if (this.hook == 'postEntity') {
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
