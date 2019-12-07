#!/usr/bin/env node

// @ts-check
/**
 * @file      Read all inputs and train dream prophecy model.
 * @author    Igor Lesik 2019
 * @copyright Igor Lesik 2019
 * 
 */
'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en', 'ru'] });


function readAllJsonInputFiles()
{

    readJsonInputFileSync('./nlp/model/greeting.json');
}

function readJsonInputFileSync(filename)
{
    let rawdata = fs.readFileSync(filename, 'utf8');
    let jsonData = JSON.parse(rawdata);
    processJsonInputData(jsonData);
}

function processJsonInputData(jsonData)
{
    for (const [key, value] of Object.entries(jsonData)) {
        if (key == 'intent') {
            for (const intent of value) {
                const intent_name = intent['name'];
                console.log('intent: ' + intent_name);
                for (const [lang_name, lang_intent] of Object.entries(intent['lang'])) {
                    console.log('  lang: ' + lang_name);
                    const questions = lang_intent['q'];
                    for (const question of questions) {
                        console.log('    q:' + question);
                        manager.addDocument(lang_name, question, intent_name);
                    }
                    const answers = lang_intent['a'];
                    for (const answer of answers) {
                        console.log('    a:' + answer);
                        manager.addAnswer(lang_name, intent_name, answer);
                    }
                }
            }
        }
        else {
            assert.fail('illegal type ' + key);
        }
    }
}

readAllJsonInputFiles();

manager.train()
  .then(result => manager.process('en', 'Hello'))
  //.then(result => manager.process('en', 'I have to go'))
  .then(result => console.log(result.answer));