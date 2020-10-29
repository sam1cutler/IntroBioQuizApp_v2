'use strict';

let store = {
  
  questions: [
    {
      question: 'Evolution is defined by its action on which level of organization?',
      questionShorthand: 'evolution',
      answers: [
        'molecules and genes',
        'communities',
        'population',
        'individual organisms'
      ],
      answerVals: [
        'mols-genes',
        'communities',
        'population',
        'individual-org'
      ],
      correctAnswer: 'population',
      correctAnswerVerbose: 'population'
    },
    {
      question: 'Which of the following options describes the chemical reaction by which a monomer is attached to a polymer?',
      questionShorthand: 'monomer-polymer',
      answers: [
        'Hydrolysis',
        'Fermentation',
        'Oxidation/reduction',
        'Dehydration synthesis'
      ],
      answerVals: [
        'hydrolysis',
        'fermentation',
        'redox',
        'dehydration'
      ],
      correctAnswer: 'dehydration',
      correctAnswerVerbose: 'Dehydration synthesis'
    },
    {
      question: 'Which of the following options accurately represents the “Central Dogma” of biology?',
      questionShorthand: 'dogma',
      answers: [
        'DNA → RNA → protein → physical traits',
        'physical traits → DNA → RNA → protein',
        'RNA → DNA → protein → physical traits',
        'protein → RNA → DNA → physical traits'
      ],
      answerVals: [
        'DNAstart',
        'traitsStart',
        'RNAstart',
        'proteinStart'
      ],
      correctAnswer: 'DNAstart',
      correctAnswerVerbose: 'DNA → RNA → protein → physical traits'
    },
    {
      question: 'A truly scientific hypothesis is “falsifiable”. This means that:',
      questionShorthand: 'falsifiability',
      answers: [
        'The hypothesis is incorrect.',
        'No evidence could possibly prove the hypothesis is “false”, and thus the hypothesis must be correct.',
        'It is possible to imagine a situation that would demonstrate the hypothesis is false.',
        'A large amount of evidence supports the hypothesis being true.'
      ],
      answerVals: [
        'incorrect',
        'neverFalse',
        'possible',
        'lottaEvidence'
      ],
      correctAnswer: 'possible',
      correctAnswerVerbose: 'It is possible to imagine a situation that would demonstrate the hypothesis is false.'
    },
    {
      question: 'Which of the following options is an example of protein secondary structure?',
      questionShorthand: 'secondaryStructure',
      answers: [
        'Sequence of amino acids.',
        'Overall three-dimensional shape.',
        'Combination of two or more separate polypeptides.',
        'Alpha helix.'
      ],
      answerVals: [
        'sequence',
        '3D',
        'twoPlus',
        'alphaHelix'
      ],
      correctAnswer: 'alphaHelix',
      correctAnswerVerbose: 'Alpha helix.'
    }
  ],
  quizStarted: false,
  quizCompleted: false,
  questionNumber: 0,
  questionAnswered: 'empty',
  score: 0
};


/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

// Create the string that will "summarize" quiz progress at the top.
function summaryHTMLaddition() {
  console.log('Ran summaryHTMLaddition function.');
  
  // If quiz hasn't started OR if it's done, this should be empty...
  if (store.quizStarted === false || store.quizCompleted === true) {
    return '';
  
  // ...otherwise, provide the summary of progress.
  } else {
    return `
      <section class="major-section">
        <header>
          <h3>You're on question ${store.questionNumber} out of 5.</h3>
          <h3>Current score is ${store.score} points.</h3>
        </header>
      </section>`
  };
}

// Create the string that will "welcome" users to the start of the quiz.
function quizStartHTML() {
  console.log('The quizStartHTML function ran.');
  return `
    <div class='major-section'>
      <form>
        <h3>Welcome to this quiz, focused on content from the first chapter of our biology textbook.</h3>
        <button class='js-quiz-start'>Start quiz.</button>
      </form>
    </div>`;
}

// Create a string containing each answer choice
function makeAnswerChoiceHTMLstring(answerNumber) {
  console.log('makeAnswerChoiceHTMLstring function.');

  const currentQuestion = store.questions[(store.questionNumber-1)];

  let answerChoiceString = `
    <input type="radio" name='${currentQuestion.questionShorthand}' value='${currentQuestion.answerVals[answerNumber]}' required>
      <label for="${currentQuestion.answerVals[answerNumber]}">${currentQuestion.answers[answerNumber]}</label><br>`
  return answerChoiceString;

}

// Create the string containing the current question and answer choices. 
function quizQuestionHTML() {
  console.log('The quizQuestionHTML function ran.');

  const currentQuestion = store.questions[(store.questionNumber-1)];
  console.log('Determined current question.')
  
  // Create the string with the question and answer choices, as the start of a form.
  let QandAstring = `
    <section class="major-section">
      <form>
        <h3 class="js-test-click">${currentQuestion.question}</h3>
        <div class="answer-choices-container">`;
  console.log('Started the QandAstring.')

  // Add each answer choice
  let i = '';
  for (i=0; i<4; i++) {
    //console.log(i);
    let answerChoiceAddition = makeAnswerChoiceHTMLstring(i);
    QandAstring += answerChoiceAddition;
  };

  // A few different ways to end this string (always includes ending the answer-choices <div>)...
  let QandAstringFinish = '</div>';

  // ...if the active question hasn't yet been answered, need a "Submit answer" button.
  if (store.questionAnswered === 'empty') {
    QandAstringFinish = 
        ` <button class='js-submit-answer-button'>Submit answer.</button>
          </form>
          </section>`;
  
  // ...if the 5th, and thus final, question has been answered, need a "See quiz results" button.
  } else if (store.questionNumber === 5 && store.questionAnswered != 'empty') {
    QandAstringFinish = 
        ` </form>
          <button class='js-see-results-button'>See quiz results.</button>
          </section>`; 
  
  // ...otherwise, need a "Next question" button. 
  } else {
    QandAstringFinish = 
        `</form>
         <button class='js-next-question-button'>Next question.</button>
         </section>`; 
  };

  // Append the "finish" to the existing string, and return it. 
  QandAstring += QandAstringFinish;
  return QandAstring;
  
}

// Create the string containing the "end of quiz" message.
function quizCompleteHTML() {
  console.log('The quizCompleteHTML function ran.');
  return `
    <section class="major-section">
      <h3>Congratulations! You finished the quiz.</h3>
      <h3>You scored ${store.score} points out of a possible total of 50 points.</h3>
      <p>You may take this quiz as many times as you like. To restart, please click the button below.</p>
      <button class='js-restart-button'>Restart quiz.</button>
    </section>`;
}

// Depending on the position in the quiz, will use one of 3 major 
// "core content" functions:
function coreContentHTMLaddition() {
  console.log('Ran coreContentHTMLaddition function.');
  
  // initialize empty coreContentString to be filled out
  let coreContentString = ''

  // Go to the "quiz start" form function:
  if (store.quizStarted === false) {
    console.log('The quiz is starting.');
    coreContentString = quizStartHTML();

  // Go to "quiz conclusion" form function:
  } else if (store.quizCompleted === true) {
    console.log('The quiz has finished, need to provide summary');
    coreContentString = quizCompleteHTML();
  
  // Otherwise, go to the "quiz question" form function:
  } else {
    console.log('The quiz has already started');
    return quizQuestionHTML();
  };

  return coreContentString;

}

// Want to provide right/wrong feedback after answers are submitted.
function feedbackHTMLaddition() {
  console.log('Ran feedbackHTMLaddition function');

  // No feedback to provide if answer has not just been answered:
  if (store.questionAnswered === 'empty' || store.quizCompleted === true) {
    console.log('No answered question to provide feedback about.');
    return ``;

  // Feedback for a correct answer:
  } else if (store.questionAnswered === 'correct') {
    console.log('A question has been answered correctly.');
    return `<section class="major-section"><p class="need-space">That is correct!</p></section>`;
  
  // Feedback for an incorrect answer, including the correct answer:
  } else if (store.questionAnswered === 'incorrect') {
    console.log('A question has been answered incorrectly.');
    const currentQuestion = store.questions[(store.questionNumber-1)]
    return `<section class="major-section"><p class="need-space">That is incorrect. The correct answer is "${currentQuestion.correctAnswerVerbose}"</p></section>`;
  };
  
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuizPage() {
  console.log('Ran renderQuizPage function.');
  
  // Initialize an empty string of what will be inserted into the <Main> HTML element
  let HTMLstring = '';

  // Generate the string/HTML content for the "Summary"
  HTMLstring = summaryHTMLaddition();
  
  // Generate the string/HTML content for the question + answer choices
  HTMLstring += coreContentHTMLaddition();

  // Generate the string/HTML content for the feedback + button
  HTMLstring += feedbackHTMLaddition();
  
  // Insert this string into the <Main> HTML element.
  $('.js-core-HTML-target').html(HTMLstring);

}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// This page will need to handle...

// ...clicks of the "start quiz" button
function handleStartQuiz() {
  console.log('Ran handleStartQuiz function.')
  $('.js-core-HTML-target',).on('click', '.js-quiz-start', function(event) {
    event.preventDefault();
    console.log('You clicked the "start quiz" button');

    // change quiz Start status
    store.quizStarted = true;
    console.log('Setting "quizStarted" to "true".')
    
    // change question #
    store.questionNumber = 1;
    console.log('Setting "questionNumber" to "1".')

    console.log('With those changes in place, re-rendering the DOM.')
    renderQuizPage();

  });
}

// ...clicks of the "Submit Answer" button
function handleAnswerSubmission() {
  console.log('Ran handleAnswerSubmission function.')
  
  $('.js-core-HTML-target').on('click', '.js-submit-answer-button', function(event) {
    event.preventDefault();
    console.log('You submitted an answer.');

    console.log('store.questionAnswered is currently set to '+store.questionAnswered);

    // Create shorthand for current Question (object in store) 
    const currentQuestion = store.questions[(store.questionNumber-1)];
    // and Answer (from that Question object)
    const correctAnswer = currentQuestion.correctAnswer;

    // identify the selected answer choice    
    const answerChoice = $(`input[type='radio'][name='${currentQuestion.questionShorthand}']:checked`).val();
    console.log(`You selected "${answerChoice}".`);
  
    // Determine if the answer was correct or not:
    if (answerChoice === correctAnswer) {
      console.log('You chose the correct answer!');
      store.score += 10;
      store.questionAnswered = 'correct';
      console.log('store.questionAnswered is currently set to '+store.questionAnswered);
    } else {
      console.log('You chose the incorrect answer.');
      store.questionAnswered = 'incorrect';
      console.log('store.questionAnswered is currently set to '+store.questionAnswered);
    };

    renderQuizPage();

  });
}

// ...clicks of the "Next question" button
function handleNextQuestion() {
  console.log('Ran handleNextQuestion function.')

  $('.js-core-HTML-target').on('click','.js-next-question-button', function(event) {
    event.preventDefault;
    console.log("You clicked the 'next question' button.")

    // Advance to the next question.
    store.questionNumber++;

    // Reset questionAnswered to 'empty'.
    store.questionAnswered = 'empty';

    // Re-render the DOM. 
    renderQuizPage();

  })
}

// ...clicks of the "See results" button
function handleSeeResults() {
  console.log('Ran handleSeeResults function.');

  $('.js-core-HTML-target').on('click','.js-see-results-button', function(event) {
    console.log('You clicked the "see results" button.');
    store.quizCompleted = true;
    renderQuizPage();
  })
}

// ...clicks of the "Restart the quiz" button
function handleRestartQuiz() {
  console.log('Ran the handleRestartQuiz function.');

  $('.js-core-HTML-target').on('click','.js-restart-button', function(event) {
    console.log('You clicked the "restart quiz" button.');

    // Reset the important counters/attributes to starting values.
    store.quizStarted = false;
    store.quizCompleted = false;
    store.questionNumber = 0;
    store.questionAnswered = 'empty';
    store.score = 0;

    // Re-render the DOM.
    renderQuizPage();
    
  })
}


// Render the page for the first time and run all the handler functions.
function handleQuizPage() {
  console.log('Ran handleQuizPage function.');
  renderQuizPage();
  handleStartQuiz();
  handleAnswerSubmission();
  handleNextQuestion();
  handleSeeResults();
  handleRestartQuiz();
}

$(handleQuizPage);