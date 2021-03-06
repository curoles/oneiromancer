#!/usr/bin/env node

// @ts-check
/**
 * @file CLI dialog with Oneiromancer
 * @author Igor Lesik 2019
 * @copyright Igor Lesik 2019
 * 
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

const converse = require('../nlp/conversation');
const conversation = new converse.Conversation();

const inquirer = require('inquirer');
const Rx = require('rxjs');

const prompts = new Rx.Subject();

/**
 * Make `inquirer` prompt structure.
 *
 * @param {string} msg message string.
 * @returns {any} prompt object.
 */
function makePrompt(msg) {
    return {
        type: 'input',            // Type of the prompt.
        name: `user`,   // The name to use when storing the answer in the answers hash.
        message: `${msg || 'Say something to start chatting!'}\n\n`, // The question to print.
    };
}

function onEachQuestion({ answer }) {
    if (answer !== '') {
        conversation.makeResponse(answer)
            .then((response) => prompts.next(makePrompt(response)));
    } else {
        prompts.complete();
    }
}

function onError(err) {
    console.warn(err);
}

function onCompleted() {
    console.log(conversation.makeProphecy());
    console.log('\nInteractive session is complete. Good bye! 🙂\n');
}

inquirer.prompt(prompts).ui.process.subscribe(
   onEachQuestion,
   onError,
   onCompleted,
);

// kick off the chat with a simple call to prompts.onNext
prompts.next(
    makePrompt(`Hello! I will be delighted 😀 to hear about your dream.\n`+
        'You can tell me your dream by entering short sentences or by entering a long essay at once.\n'+
        'Press [↵ Enter] twice to end this session.')
);
