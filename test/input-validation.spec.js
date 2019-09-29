const assert = require('yeoman-assert');
const { validateGitHubName } = require('../generators/app/input-validation');

describe('input validation', () => {
    describe('validateGitHubName', () => {
        it('for invalid syntax: Test_Person', () => {
            const result = validateGitHubName('Test_Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: -Test_Person', () => {
            const result = validateGitHubName('-Test-Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: Test-Person-', () => {
            const result = validateGitHubName('Test-Person-');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: -Test-Person', () => {
            const result = validateGitHubName('-Test-Person-');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: -TestPerson', () => {
            const result = validateGitHubName('-Test-Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: TestPerson-', () => {
            const result = validateGitHubName('Test-Person-');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: Test--Person', () => {
            const result = validateGitHubName('Test--Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for valid syntax: Test-Person', () => {
            const result = validateGitHubName('Test-Person');
            assert(result === true);
        });

        it('for valid syntax: Test-Person-Person', () => {
            const result = validateGitHubName('Test-Person-Person');
            assert(result === true);
        });

        it('for valid syntax: TestPerson', () => {
            const result = validateGitHubName('TestPerson');
            assert(result === true);
        });

        it('for valid syntax: TestPerson', () => {
            const result = validateGitHubName('Test1Person123');
            assert(result === true);
        });

        it('for valid syntax: TestPerson', () => {
            const result = validateGitHubName('Test1-Person123');
            assert(result === true);
        });
    });
});
