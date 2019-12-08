// @ts-check
/**
 * @file      Conversation with User.
 * @author    Igor Lesik 2019
 * @copyright Igor Lesik 2019
 * 
 */
'use strict';

const uniqid = require('uniqid');

const { NlpManager } = require('node-nlp');
const nlp = new NlpManager();

//Let's load a model per Conversation instead of one for all.
//console.log("loading NLP model ...");
//nlp.load('./build/model.nlp');

function createUniqueSessionId() {
    return uniqid();
}

function Conversation() {
    this.sessionId = createUniqueSessionId();
    this.nlp = new NlpManager();

    /** constructor */
    (() => {
        //console.log("loading NLP model ...");
        this.nlp.load('./build/model.nlp');
        //console.log(`created new conversation with ID:${this.sessionId}`);
    })();

    /**
     * Analyze input phrase and generate a response.
     * @param {string} question 
     */
    this.makeResponse = function makeResponse(question, cb) {
        //console.log('processing phrase: '+question);
        this.nlp.process(question)
        .then(response => {
            let answer = response['answer'];
            //console.log('answer: '+answer);
            cb(answer);
        });
    }
}

module.exports = {
    Conversation: Conversation
}