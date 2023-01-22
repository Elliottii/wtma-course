const minNumber = 1;
const maxNumber = 1000000000;
const maxGuess = 100;

let startTime = '';

document.getElementById('min').innerHTML = minNumber;
document.getElementById('max').innerHTML = maxNumber;
document.getElementById('maxGuess').innerHTML = maxGuess;

let randomNumber = Math.floor(
  Math.random() * (maxNumber - minNumber + 1) + minNumber
);

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessAlgorithm = document.querySelector('.algorithmSubmit');
const guessField = document.querySelector('.guessField');
const testAlgorithm = document.querySelector('.testAlgorithmSubmit');
const testResults = document.querySelector('.testResults');

let guessCount = 1;
let resetButton;

function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    startTime = Date.now();
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += `${userGuess}, `;

  if (userGuess === randomNumber) {
    finalTime = (Date.now() - startTime) / 1000;
    lastResult.textContent =
      'Congratulations! You got it right in ' +
      guessCount +
      ' try and it took ' +
      finalTime +
      ' seconds';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === maxGuess) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  guessAlgorithm.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  min = minNumber;
  max = maxNumber;
  mid = Math.round(max + min - 1) / 2;
  guessCount = 1;
  startTime = Date.now();
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessAlgorithm.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(
    Math.random() * (maxNumber - minNumber + 1) + minNumber
  );
}

let min = minNumber;
let max = maxNumber;
let mid = Math.round(max + min - 1) / 2;
/**
 * Algorithm always guess the number at the middle.
 * If the guess is too low, the new minium number is the previous guess +1.
 * If the quess is too high, the new maxium number is the previous quess -1.
 * Each guess sets either new min or max and the next guess is the middle of those values.
 */
function numberGuessingAlgorithm() {
  startTime = Date.now();
  while (guessCount < maxGuess && mid != randomNumber) {
    guessField.value = mid;
    checkGuess();
    if (mid > randomNumber) {
      max = mid - 1;
      mid = Math.round((max + min - 1) / 2);
    } else if (mid < randomNumber) {
      min = mid + 1;
      mid = Math.round((max + min + 1) / 2);
    }
  }
  guessField.value = mid;
  checkGuess();
}
let testCount = 0;
let testGuesses = [];

let testRandomNumber = Math.floor(
  Math.random() * (maxNumber - minNumber + 1) + minNumber
);
/**
 * Algorithm guess the number multiple times and saves the guess count to an array.
 * After that algorithm calculates max, min and avg values of the array.
 */
function testingAlgorithm() {
  startTime = Date.now();
  num = Number(testMultiplier.value);
  while (num > 0) {
    if (mid > testRandomNumber) {
      max = mid - 1;
      mid = Math.round((max + min - 1) / 2);
    } else if (mid < testRandomNumber) {
      min = mid + 1;
      mid = Math.round((max + min + 1) / 2);
    } else if (mid === testRandomNumber) {
      testGuesses.push(testCount);
      testCount = 0;
      min = minNumber;
      max = maxNumber;
      mid = Math.round(max + min - 1) / 2;
      testRandomNumber = Math.floor(
        Math.random() * (maxNumber - minNumber + 1) + minNumber
      );
      num -= 1;
    }

    testCount += 1;
  }
  finalTime = (Date.now() - startTime) / 1000;
  let sum = testGuesses.reduce((acc, current) => acc + current);
  console.log(testGuesses);
  testResults.textContent =
    '"AI" guessed the number right ' +
    testMultiplier.value +
    ' times in ' +
    finalTime +
    ' seconds. Maximum guesses ' +
    Math.max(...testGuesses) +
    ', minimum guesses ' +
    Math.min(...testGuesses) +
    ' and average ' +
    sum / testGuesses.length +
    ' to get it right.';
  testResults.style.backgroundColor = 'green';
  testMultiplier.value = '';
  testGuesses = [];
}

guessAlgorithm.addEventListener('click', numberGuessingAlgorithm);
testAlgorithm.addEventListener('click', testingAlgorithm);
