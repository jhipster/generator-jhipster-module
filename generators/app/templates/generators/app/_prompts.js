const chalk = require('chalk');

module.exports = {
    askMessage
};

function askMessage() {
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
}
