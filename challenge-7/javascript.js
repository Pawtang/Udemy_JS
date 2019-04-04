
/*
1. Build a function constructor called Question to describe a question
2. Create a couple of questions using the constructor
3. store them all inside an array
4. select one random question and log it on the console, together with the possible answers (numbered)
5. use the prompt function to ask the user for the correct answer. input a number
6. check if answer is correct and print whether or not to console (use a method)
7. make sure all code is private and doesnt interfere with external code if it were a plugin */



let i = Math.floor(Math.random()*2);


function Question(question, options, answer){
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.logger = function() {
        console.log(this.question + this.options[0] + this.options[1] + this.options[2]);
    }
}

var q1 = new Question('Where were you born?', ['Bloomington', 'Chicago', 'Arkansas'], 1);
var q2 = new Question('Whats your dog\'s name?', ['Skip', 'Spud', 'Chika'], 3);
var q3 = new Question('Do you eat cheese?', ['Yes', 'No', 'Sometimes, but I shoudln/t'], 3);

const questions = [q1, q2, q3];
let asker = questions[i].question + ' 1. ' + questions[i].options[0] + ' 2. ' + questions[i].options[1] + ' 3. '  + questions[i].options[2];

console.log(asker);

let userAnswer = prompt('Input a number to answer the question');



function CheckAnswer(userAnswer, correctAnswer){
    this.userAnswer = userAnswer;
    this.correctAnswer = questions[i].answers;
    this.verify = function() {
        if (this.userAnswer = this.correctAnswer) console.log('You are correct')
     else  console.log('You are incorrect, loser');
    }
}

CheckAnswer(userAnswer,questions[i].answer);