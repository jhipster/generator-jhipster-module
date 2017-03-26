# generator-jhipster-<%= moduleName %>
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, <%= moduleDescription %>

# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

# Installation

## With Yarn

To install this module:

```bash
yarn global add generator-jhipster-<%= moduleName %>
```

To update this module:

```bash
yarn global upgrade generator-jhipster-<%= moduleName %>
```

## With NPM

To install this module:

```bash
npm install -g generator-jhipster-<%= moduleName %>
```

To update this module:

```bash
npm update -g generator-jhipster-<%= moduleName %>
```

# Usage

# License

<%_ if (license === 'apache') { _%>
Apache-2.0 © [<%= authorName %>](<%= authorUrl %>)
<%_ } else if (license === 'gpl') { _%>
GPL-3.0 © [<%= authorName %>](<%= authorUrl %>)
<%_ } else if (license === 'mit') { _%>
MIT © [<%= authorName %>](<%= authorUrl %>)
<%_ } _%>


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-<%= moduleName %>.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-<%= moduleName %>
[travis-image]: https://travis-ci.org/<%= githubName %>/generator-jhipster-<%= moduleName %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= githubName %>/generator-jhipster-<%= moduleName %>
[daviddm-image]: https://david-dm.org/<%= githubName %>/generator-jhipster-<%= moduleName %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%= githubName %>/generator-jhipster-module
