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
  return `
    <section class="major-section">
      <header>
        <h3>You're on question ${store.questionNumber} out of 5.</h3>
        <h3>Current score is ${store.score} points.</h3>
      </header>
    </section>`;
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

// Create the HTML string that begins every question core content
function QandAstringStart() {
  
  // Identify the current question object in the store
  const currentQuestion = store.questions[(store.questionNumber-1)];

  return `
    <section class="major-section">
      <h3>${currentQuestion.question}</h3>  
      <form class="js-question-form">
        <div class="answer-choices-container">`;
}
  
// Create a string containing each answer choice
function makeAnswerChoiceHTMLstring(answerNumber) {
  console.log('Ran makeAnswerChoiceHTMLstring function.');

  // Identify the current question object in the store
  const currentQuestion = store.questions[(store.questionNumber-1)];

  let answerChoiceString = `
    <input type="radio" id="option${answerNumber}" value="${currentQuestion.answerVals[answerNumber]}" name="options" required>
      <label for="${currentQuestion.answerVals[answerNumber]}">${currentQuestion.answers[answerNumber]}</label><br>`
    
  /*
  let answerChoiceString = `
    <input type="radio" id="${currentQuestion.answerVals[answerNumber]}" name='${currentQuestion.questionShorthand}' value='${currentQuestion.answerVals[answerNumber]}' required>
      <label for="${currentQuestion.answerVals[answerNumber]}">${currentQuestion.answers[answerNumber]}</label><br>`
  */

  return answerChoiceString;

}

// Create a string to conclude QandA HTML, including a "Submit Answer" button.
function provideSubmitAnswerButtonString() {
  return `
    <button type="submit">Submit answer.</button>
    </div>
    </form>
    </section>`;
}

// Create a string to conclude QandA HTML, including a "See quiz results" button.
function provideSeeResultsButtonString() {
  return ` 
    </div>
    </form>
    <button class='js-see-results-button'>See quiz results.</button>
    </section>`;
}

// Create a string to conclude QandA HTML, including a "Next question" button. 
function provideNextQuestionButtonString() { 
  return ` 
    </form>
    <button class='js-next-question-button'>Next question.</button>
    </section>`; 
}


// Troubleshooting my radio button form requirement...
function renderQuizQuestionHTMLtester() {
  // The following form WORKS (is required!) in my quiz. So, seek to emulate it!
  return `
  <section class="major-section">
    <h3>Here is the question.</h3>
    <form>
      <div class="answer-choices-container">
        <input type="radio" id="pizza" value="pizza" name="favfood" required>
          <label for="pizza">Pizza</label><br>
        <input type="radio" id="hotdog" value="hotdog" name="favfood" required>
          <label for="hotdog">Hot dogs</label><br>
        <input type="radio" id="hamburger" value="hamburger" name="favfood" required>
          <label for="hamburger">Hamburger</label><br>

        <button type="submit">Submit selection.</button>
      </div>
    </form>
  </section>
  `

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
    
    // Identify the current question object in the store
    const currentQuestion = store.questions[(store.questionNumber-1)];
    return `<section class="major-section"><p class="need-space">That is incorrect. The correct answer is "${currentQuestion.correctAnswerVerbose}"</p></section>`;
  };
  
}


/********** RENDER FUNCTION(S) **********/

// Add additional render functions with "logic", each one using template generation functions

// Conditions governing rendering the summary information:
function renderSummaryHTMLaddition() {
  console.log('Ran renderSummaryHTMLaddition function.')
  
  // If quiz hasn't started OR if it's done, this should be empty...
  if (store.quizStarted === false || store.quizCompleted === true) {
    return '';
  
  // ...otherwise, provide the summary of progress.
  } else {
    return summaryHTMLaddition();
  };
}

// Conditions governing how to finish the question content
function renderQandAstringFinish() {
  console.log('Ran renderQandAstringFinish function.')

  // A few different ways to end this string, but 
  // always includes ending the answer-choices <div> (does it???)
  let QandAstringFinish = '';

  // ...if the active question hasn't yet been answered, need a "Submit answer" button.
  if (store.questionAnswered === 'empty') {
    QandAstringFinish = provideSubmitAnswerButtonString();
  
  // ...if the 5th, and thus final, question has been answered, need a "See quiz results" button.
  } else if (store.questionNumber === 5 && store.questionAnswered != 'empty') {
    QandAstringFinish = provideSeeResultsButtonString();
  
  // ...otherwise, need a "Next question" button. 
  } else {
    QandAstringFinish = provideNextQuestionButtonString(); 
  };

  return QandAstringFinish;
}

// Conditions governing the quiz question and answer choices
function renderQuizQuestionHTML() {
  console.log('Ran renderQuizQuestionHTML function.');

  // Identify the current question object in the store
  const currentQuestion = store.questions[(store.questionNumber-1)];
  
  // Start the string with the question and answer choices, as the start of a form.
  let QandAstring = QandAstringStart();

  // Add each answer choice
  let i = '';
  for (i=0; i<4; i++) {
    let answerChoiceAddition = makeAnswerChoiceHTMLstring(i);
    QandAstring += answerChoiceAddition;
  };

  // Add the conclusion of the string, with appropriately located/labeled button.
  let QandAstringFinish = renderQandAstringFinish();
  QandAstring += QandAstringFinish;
  
  return QandAstring;
}

// Conditions governing rendering the core content:
function renderCoreContentHTMLaddition() {
  console.log('Ran renderCoreContentHTMLaddition function');

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
    return renderQuizQuestionHTML();
    //return quizQuestionHTMLtester();
  };

  return coreContentString;

}


// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderQuizPage() {
  console.log('Ran renderQuizPage function.');
  
  // Initialize an empty string of what will be inserted into the <Main> HTML element
  let HTMLstring = '';

  // Generate the string/HTML content for the "Summary"
  HTMLstring = renderSummaryHTMLaddition();
  
  // Generate the string/HTML content for the question + answer choices
  HTMLstring += renderCoreContentHTMLaddition();

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

    // Re-render the DOM.
    console.log('With those changes in place, re-rendering the DOM.')
    renderQuizPage();

  });
}

// ...clicks of the "Submit Answer" button
function handleAnswerSubmission() {
  console.log('Ran handleAnswerSubmission function.')
  
  $('.js-core-HTML-target').on('submit', '.js-question-form', function(event) {
    event.preventDefault();
    console.log('You submitted an answer.');

    console.log('store.questionAnswered is currently set to '+store.questionAnswered);

    // Create shorthand for current Question (object in store) 
    const currentQuestion = store.questions[(store.questionNumber-1)];
    // and Answer (from that Question object)
    const correctAnswer = currentQuestion.correctAnswer;

    // identify the selected answer choice    
    const answerChoice = $(`input[type='radio'][name='options']:checked`).val();
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

    // Re-render the DOM.
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

    // Re-render the DOM.
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