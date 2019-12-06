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

// http://sudheerjonna.com/blog/2017/10/22/interactive-command-line-interface-using-inquirerjs/
/** @see http://janabeck.com/blog/2017/02/05/infinite-interactivity-with-Inquirer */
const inquirer = require('inquirer');
const Rx = require('rxjs');

const prompts = new Rx.Subject();

/**
 * Make `inquirer` prompt structure.
 *
 * @param {string} msg File identifier.
 * @returns {any} prompt object.
 */
function makePrompt(msg) {
    return {
        type: 'input',            // Type of the prompt.
        name: `userInput-${i}`,   // The name to use when storing the answer in the answers hash.
        message: `${msg || 'Say something to start chatting!'}\n\n`, // The question to print.
    };
}

let i = 0;

function onEachAnswer({ answer }) {
    if (answer !== '') {
        i += 1;
        prompts.next(makePrompt(`This is prompt #${i}.`));
    } else {
        prompts.complete();
    }
}

function onError(err) {
    console.warn(err);
}

function onCompleted() {
    console.log('Interactive session is complete. Good bye! 🙂\n');
}

inquirer.prompt(prompts).ui.process.subscribe(
   onEachAnswer,
   onError,
   onCompleted,
);

// kick off the chat with a simple call to prompts.onNext
prompts.next(
    makePrompt(`Hello! I will be delighted to hear about your dream 😀`)
);
