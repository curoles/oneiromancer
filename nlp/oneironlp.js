// @ts-check
/**
 * @file      Adapter and Wrapper for 3d-party NLP library modules.
 * @author    Igor Lesik 2019
 * @copyright Igor Lesik 2019
 * 
 */
'use strict';

const { NlpManager/*, Language*/ } = require('node-nlp');
const natural = require('natural');

/**
 * Interface to NLP API.
 * Dispatches calls to NlpManager.
 */
class OneiroNlpManager
{
    constructor() {
        this.nlpTrainedModelPath = './build/model.nlp';
        this.bayesTrainedModelPath = './build/bayesModel.json';
        this.nlp = new NlpManager({
            languages: ['en', 'ru'],
            nlu: { log: true },
            autoLoad: false, autoSave: false,
            modelFileName: this.nlpTrainedModelPath
        });

        //const PorterStemmerRu = require('./node_modules/natural/lib/natural/stemmers/porter_stemmer_ru');
        this.bayesClassifier = new natural.BayesClassifier(/*PorterStemmerXx*/);
        //LogisticRegressionClassifier
    }

    /**
     * Save model to a file.
     */
    save() {
        this.nlp.save(this.nlpTrainedModelPath);

        this.bayesClassifier.save(this.bayesTrainedModelPath, (err, classifier) => {
            console.log(`Bayes classifier saved to ${this.bayesTrainedModelPath}`);
        });
    }

    /**
     * Load model from a file.
     */
    load() {
        this.nlp.load(this.nlpTrainedModelPath);

        natural.BayesClassifier.load(this.bayesTrainedModelPath,
            null, (err, classifier) => {this.bayesClassifier = classifier;}
        );
    }

    /**
     * Add a phrase to the model.
     * @param {string} lang      language string ('en', 'ru')
     * @param {string} question  user input text
     * @param {string} intent    intent Id string
     */
    addDocument(lang, question, intent) {
        this.nlp.addDocument(lang, question, intent);
        this.bayesClassifier.addDocument(question, intent);
    }

    /**
     * Connect a phrase to particular intent.
     * @param {string} lang   language string
     * @param {string} intent intent Id string
     * @param {string} answer answer/response string to intent
     */
    addAnswer(lang, intent, answer) {
        this.nlp.addAnswer(lang, intent, answer);
    }

    train() {
        const promiseNlp = this.nlp.train();
        const promiseBayes = this.bayesClassifier.train();
        let allPromises = Promise.all([promiseNlp, promiseBayes]);
        return allPromises;
    }

    /*async*/ process(question) {
        const promiseNlp = this.nlp.process(question);
        //console.log('bayes: ' + this.bayesClassifier.classify(question));
        //let allPromises = Promise.all(promiseNlp);
        return promiseNlp; //allPromises;
    }

    /**
     * 
     * @param {Object.<string, string>} language 
     * @param {string} userInput 
     * @param {Object[]} responses 
     */
    prophesy(language, userInput, responses) {
        let prophecyText = '';
        for (const response of responses) {
            prophecyText += response.answer;
        }
        return prophecyText;
    }
}

module.exports = {
    OneiroNlpManager: OneiroNlpManager
}