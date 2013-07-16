termQuestions
=============
Creates a queue of stdin requests

## Install

    npm install term-questions

## Methods

 * **addQuestion**(question, callback, *&lt;context&gt;*);

## Use

~~~~~ js
var questions = require('term-questions');

var asker = new questions();

asker.addQuestion('What is it', function(answer){
   console.log('It is ' + answer); 
});

asker.addQuestion('Who are you', function(answer){
   console.log('Hellow, ' + answer + '!'); 
});
~~~~~
