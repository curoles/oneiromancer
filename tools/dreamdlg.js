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
        conversation.makeResponse(
            answer,
            (rsp)=>{prompts.next(makePrompt(rsp));}
        );
        //nlp.process(answer)
            //.then(response => prompts.next(makePrompt(`${response['answer']}`)));
            //.then(response => console.log(response/*['answer']*/));
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
   onEachQuestion,
   onError,
   onCompleted,
);

// kick off the chat with a simple call to prompts.onNext
prompts.next(
    makePrompt(`Hello! I will be delighted to hear about your dream 😀`+
        '\nType "help", if you need instructions.')
);
