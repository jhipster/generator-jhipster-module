const validateGitHubName = input => {
    if (/^([a-zA-Z0-9]+)(-([a-zA-Z0-9])+)*$/.test(input) && input !== '') return true;
    return 'Your username is mandatory, cannot contain special characters or a blank space';
};

const validateModuleName = input =>
    /^[a-zA-Z0-9-]+$/.test(input)
        ? true
        : 'Your module name is mandatory, cannot contain special characters or a blank space, using the default name instead';

module.exports = { validateGitHubName, validateModuleName };
