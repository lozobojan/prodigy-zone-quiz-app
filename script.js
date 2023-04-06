var questionsString = '[{"category":"Food & Drink","id":"627164211ba117625baac949","correctAnswer":"Brazil","incorrectAnswers":["Costa Rica","France","Italy"],"question":"In which country is cachaca a popular drink?","tags":["drink","alcohol"],"type":"Multiple Choice","difficulty":"medium","regions":[],"isNiche":false},{"category":"Science","id":"6242cb70d543524f1b19c92e","correctAnswer":"A covey","incorrectAnswers":["A colony","A herd","A field"],"question":"What is the word for a group of partridges?","tags":["science"],"type":"Multiple Choice","difficulty":"hard","regions":[],"isNiche":false},{"category":"Science","id":"622a1c377cc59eab6f950482","correctAnswer":"symptoms","incorrectAnswers":["paranormal or psychic phenomenon that defy conventional scientific explanations","sacred texts","animals that may or may not be mythical"],"question":"What is Symptomatology the study of?","tags":["science"],"type":"Multiple Choice","difficulty":"medium","regions":[],"isNiche":false},{"category":"Sport & Leisure","id":"6384b44b83dddfb71ee5e36e","correctAnswer":"Soccer","incorrectAnswers":["Motorsports","Cricket","Rugby"],"question":"Which sport is played at The FA Cup?","tags":["sport"],"type":"Multiple Choice","regions":[],"isNiche":false},{"category":"Film & TV","id":"622a1c367cc59eab6f950404","correctAnswer":"Halloween","incorrectAnswers":["A Nightmare on Elm Street","Scream","Child\'s Play"],"question":"The Character Of Mike Myers Features Heavily In Which Series Of Horror Movies?","tags":["film_and_tv"],"type":"Multiple Choice","difficulty":"medium","regions":[],"isNiche":false},{"category":"Geography","id":"62374063cb85f7ce9e949cf9","correctAnswer":"Fiji","incorrectAnswers":["Cambodia","Jordan","New Zealand"],"question":"Suva is the capital city of which country?","tags":["geography"],"type":"Multiple Choice","difficulty":"hard","regions":[],"isNiche":false},{"category":"Film & TV","id":"622a1c347cc59eab6f94fb3e","correctAnswer":"The English Patient","incorrectAnswers":["Fargo","Jerry Maguire","Secrets & Lies"],"question":"Which film won the Academy Award for Best Picture in 1996?","tags":["academy_awards","film","film_and_tv"],"type":"Multiple Choice","difficulty":"hard","regions":[],"isNiche":false},{"category":"Film & TV","id":"625fd697dc0dd3b72da64cfc","correctAnswer":"2000","incorrectAnswers":["1997","2003","2006"],"question":"Gladiator was released in which year?","tags":["film","film_and_tv"],"type":"Multiple Choice","difficulty":"medium","regions":[],"isNiche":false},{"category":"Geography","id":"622a1c387cc59eab6f950a32","correctAnswer":"Turkey","incorrectAnswers":["Montenegro","Serbia","Bosnia and Herzegovina"],"question":"Which of these countries borders Greece?","tags":["geography"],"type":"Multiple Choice","difficulty":"hard","regions":[],"isNiche":false},{"category":"Science","id":"622a1c377cc59eab6f950567","correctAnswer":"Picture postcards","incorrectAnswers":["The structure of diseased tissues","Changes in social norms","Ethics"],"question":"What is deltiology the study of?","tags":["science","words"],"type":"Multiple Choice","difficulty":"hard","regions":[],"isNiche":false}]';
const questions = JSON.parse(questionsString);
var points = 0;

function displayQuestions(){
    let questionsHtml = "";
    questions.forEach(function(currentQuestion){

        let answers = getAllAnswers(currentQuestion);

        questionsHtml += `<div class="row mt-3">
                                <div class="col">
                                    <h5>${currentQuestion.question}</h5>
                                </div>
                            </div>
                            <div class="row">${answers.join('')}</div>`
    });

    document.getElementById('quizWrapper').innerHTML = questionsHtml;
}

function getAllAnswers(currentQuestion){

    let possibileAnswers = getAnswersShuffled(currentQuestion);
    console.log(possibileAnswers);
    
    let answers = [];
    possibileAnswers.forEach(function(answer, index){
        answers.push(
            `<div class="col-12">
                <input type="radio" value="${answer}" name="${currentQuestion.id}" id="${currentQuestion.id}_${index}">
                <label for="${currentQuestion.id}_${index}">${answer}</label>
            </div>`);
    });

    return answers;
}

function finishQuiz(){
    questions.forEach(function(question){
        let userAnswer = getSelectedAnswer(question.id);
        if(userAnswer === question.correctAnswer){
            points++;
        }
    });
    alert(`Osvojeno poena: ${points}!`);
    document.getElementById('finishQuizButton').classList.add('disabled');
}

function getSelectedAnswer(questionId){
    let selector = `input[name="${questionId}"]:checked`;
    let elem = document.querySelector(selector);
    if(elem !== null){
        return elem.value;
    }
    return null;
}

function getRandomIndex(max){
    return Math.floor(Math.random() * max);
}

function getAnswersShuffled(question){
    let possibileAnswers = [];
    let randomIndex = getRandomIndex(question.incorrectAnswers.length + 1);
    
    for(let i = 0; i <= question.incorrectAnswers.length; i++){
        if(i === randomIndex){
            possibileAnswers[i] = question.correctAnswer;
        }else{
            possibileAnswers.push(question.incorrectAnswers[i]);
        }
    }
    return possibileAnswers;
}
