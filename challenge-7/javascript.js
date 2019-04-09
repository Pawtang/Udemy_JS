
/*
1. Build a function constructor called Question to describe a question
2. Create a couple of questions using the constructor
3. store them all inside an array
4. select one random question and log it on the console, together with the possible answers (numbered)
5. use the prompt function to ask the user for the correct answer. input a number
6. check if answer is correct and print whether or not to console (use a method)
7. make sure all code is private and doesnt interfere with external code if it were a plugin */



(function(){
function Question(question, answers, correctAnswer){
   this.question = question;
   this.answers = answers;
   this.correct = correctAnswer;
} 



Question.prototype.displayQuestion = function(){
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++) {
        console.log(i + '. ' + this.answers[i]);
    }
}

Question.prototype.checkAnswer = function(answer){
    if (answer === this.correctAnswer) {console.log('Correct!');
    }else {console.log('Incorrect!')
          }
}

var q1 = new Question ('1?', ['0', '1'], 1);
var q2 = new Question ('1', ['0', '1'], 1);
var q3 = new Question ('1', ['0', '1'], 1);
var questions = [q1, q2, q3];

var n = Math.floor(Math.random()*questions.length);  


questions[n].displayQuestion();
    
var answer = parseInt(prompt('What is your answer?'), 10);
    
questions[n].checkAnswer(answer);
})();