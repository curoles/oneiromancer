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

const { /*NlpManager,*/ Language } = require('node-nlp');
const languageNlp = new Language();
const { OneiroNlpManager } = require('./oneironlp');

//Let's load a model per Conversation instead of one for all.
//const nlp = new NlpManager();
//console.log("loading NLP model ...");
//nlp.load('./build/model.nlp');

function createUniqueSessionId() {
    return uniqid();
}

/**
 * Split one sentence to smaller chunks by conjunctions and etc.
 * @param {string} lang      language of the text
 * @param {string} sentence  one sentence
 * @todo 1. select marks by lang, 2. parts should not include marks
 */
function splitSentence(lang, sentence) {
    const punctuation = [';', ','];
    const conjunctions = [' but ', ' and ', ' or ', ' nor '];
    //pronouns ('either', 'neither', 'also', 'as well', 'too');
    //adverbs ('also', 'as well', 'too');
    const marks = [].concat(punctuation, conjunctions);
    var chunks = [sentence];
    for (const mark of marks) {
        let new_chunks = [];
        for (const chunk of chunks) {
            let parts = chunk.split(mark);
            new_chunks = new_chunks.concat(parts);
        }
        chunks = new_chunks;
    }

    return chunks;
}

function Conversation() {
    this.sessionId = createUniqueSessionId();
    this.nlp = new OneiroNlpManager();
    this.language = undefined;
    this.userInput = '';

    /** constructor */
    (() => {
        //console.log("loading NLP model ...");
        this.nlp.load(/*'./build/model.nlp'*/);
        //console.log(`created new conversation with ID:${this.sessionId}`);
    })();

    /**
     * Save new chunk of text received from User.
     * @param {string} newInput new text from User
     * @return {void}
     */
    this.storeUserInput = function storeUserInput(newInput) {
        this.userInput += newInput;
        this.language = languageNlp.guessBest(this.userInput);
        //console.log(this.language['alpha2']);
    }

    /**
     * Analyze input phrase and generate a response.
     * @param {string} question 
     */
    this.makeResponse = async function makeResponse(question) {
        //console.log('processing phrase: '+question);
        this.storeUserInput(question);

        let responsePromises = [];
        let sentences = split(question);
        for (let sentence of sentences) {
            if (sentence['type'] != 'Sentence') continue;
            let sentenceOfQuestion = sentence['raw'];

            const partsOfSentence = splitSentence(this.language['alpha2'], sentenceOfQuestion);
            for (const partOfSentence of partsOfSentence) {
                responsePromises.push(this.nlp.process(partOfSentence));
            }
        }

        let responses = await Promise.all(responsePromises);

        let accum = '';

        for (let response of responses) {
            let answer = response['answer'];
            //console.log('answer: '+answer);
            accum +=  answer + ' / ';
        }
        if (responses.length > 0) {accum = accum.slice(0, -3);}//FIXME

        return accum;
    }

    /**
     * Combine all previously provided inputs and compile a prophecy.
     */
    this.makeProphecy = function makeProphecy() {

        return 'prophecy...';
    }
}

module.exports = {
    Conversation: Conversation
}