// @ts-check
/**
 * @file      Conversation with User.
 * @author    Igor Lesik 2019
 * @copyright Igor Lesik 2019
 * 
 */
'use strict';

const {split} = require('sentence-splitter');

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
    this.makeResponse = async function makeResponse(question) {
        //console.log('processing phrase: '+question);
        let accum = '';

        let responsePromises = [];
        let sentences = split(question);
        for (let sentence of sentences) {
            if (sentence['type'] != 'Sentence') continue;
            let partOfQuestion = sentence['raw'];

            responsePromises.push(this.nlp.process(partOfQuestion));
        }

        let responses = await Promise.all(responsePromises);

        for (let response of responses) {
            let answer = response['answer'];
            //console.log('answer: '+answer);
            accum +=  answer + ' / ';
        }
        if (responses.length > 0) {accum = accum.slice(0, -3);}//FIXME

        return accum;
    }
}

module.exports = {
    Conversation: Conversation
}