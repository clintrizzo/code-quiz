var time_in_minutes = 5;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes * 60 * 1000);


function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return { 'total': t, 'minutes': minutes, 'seconds': seconds };
}

function run_clock(id, endtime) {
    var clock = document.getElementById(id);

    function update_clock() {
        var t = time_remaining(endtime);
        clock.innerHTML = t.minutes + ' Min ' + t.seconds + ' Sec ';
        if (t.total <= 0) { clearInterval(timeinterval); }
    }
    update_clock();
    var timeinterval = setInterval(update_clock, 1000);
}

// running the quiz
var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;

var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var startButton = document.getElementById('startButton')
var nextButton = document.getElementById('nextButton');
var resultCount = document.getElementById('result');


function loadQuestion(questionIndex) {
    var q = questions[questionIndex];
    questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
};

function loadNextQuestion() {


    var selectedOption = document.querySelector('input[type=radio]:checked');

    if (!selectedOption) {
        alert('Please select your answer!');
        return;
    }

    var answer = selectedOption.value;
    if (questions[currentQuestion].answer == answer) {
        score += 5;
    }
    selectedOption.checked = false;
    currentQuestion++;
    if (currentQuestion == totQuestions - 1) {
        nextButton.textContent = 'Finish'
    }
    if (currentQuestion == totQuestions) {
        container.style.display = 'none';
        alert('Your score: ' + score);
        var username = prompt("Please submit your name:")
        alert(username + " scored " + score + "!");
        clearInterval(timeinterval);

        return;
    }

    loadQuestion(currentQuestion);

}
loadQuestion(currentQuestion);