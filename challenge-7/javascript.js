function Question(question, options, answer){
    this.question = question;
    this.options = options;
    this.answer = answer;
    logger = function() {
        console.log(this.question + this.options[0] + this.options[1] + this.options[2]);
    }
}


var q1 = new Question('Where were you born?', ['Bloomington', 'Chicago', 'Arkansas'], 0);

var q2 = new Question('Whats your dog\'s name?', ['Skip', 'Spud', 'Chika'], 2);

var q3 = new Question('Do you eat cheese?', ['Yes', 'No', 'Sometimes, but I shoudln/t'], 2);

const questions = [q1, q2, q3];

let i = Math.floor(Math.rand*2);

console.log(Question.logger[i]);