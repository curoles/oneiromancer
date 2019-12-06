#!/usr/bin/env node

// @ts-check
/**
 * @file file is ...
 * @author Igor Lesik 2019
 * @copyright Igor Lesik 2019
 * 
 * @see
 * https://jsdoc.app/#block-tags
 * https://scotch.io/tutorials/build-an-interactive-command-line-application-with-nodejs
 */

const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
//const { addContact, getContact } = require('./logic');

program
    .version('0.0.1')
    .description('CLI dialog with Oneiromancer');

/*program
    .command('addContact <firstame> <lastname> <phone> <email>')
    .alias('a')
    .description('Add a contact')
    .action((firstname, lastname, phone, email) => {
        addContact({firstname, lastname, phone, email});
  });

program
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name));*/

program.parse(process.argv);

/**
 * testing JSDoc
 * @param {string} id File identifier.
 * @returns {File} File object.
 */
const testJSDoc = (id) => {
    // ...
}