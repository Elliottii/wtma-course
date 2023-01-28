let code = [];
const alertText = document.querySelector('.alert');
const text = document.querySelector('.text');
const touch = document.querySelector('.touch');
let touchCount = 0;
let mouseMove = 0;
let keyPress = 0;

document.addEventListener('mousemove', () => {
  mouseMove = 1;
});

document.addEventListener('keypress', () => {
  keyPress = 1;
});

/**
 * Alert when browsing 15 seconds, then erase array and text.
 * Idle alert if mouse didn't move or any keys pressed
 */
const timer = setInterval(() => {
  code = [];
  alertText.textContent = 'Hurry up!';
  text.textContent = '';
  if ((mouseMove || keyPress) == 0) {
    alertText.textContent = 'Hurry up idler!';
  }
  mouseMove = 0;
  keyPress = 0;
}, 15000);
/**
 * Event adding keypresses to an array.
 * After that it check out the array containing the "secret" hello word.
 * If the array contains the hello word, alert pop up and array will be erased.
 */
document.addEventListener('keypress', (event) => {
  code.push(event.key);
  if (code.join('').includes('hello')) {
    alert('hello there! next try typing lorem and see what happens');
    code = [];
  } else if (code.join('').includes('lorem')) {
    text.textContent =
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet incidunt' +
      'perferendis maxime ipsam. Fugiat enim eum harum velit dicta vitae quasi ' +
      'reiciendis officia vero. Corporis rerum tenetur incidunt. Minima, fuga. Soluta, ' +
      'eveniet consequuntur. Excepturi, mollitia facilis consectetur rem cupiditate ' +
      'laboriosam perferendis tempora vel similique voluptatum enim, omnis sed libero ' +
      'totam obcaecati quos fugit commodi voluptates unde animi quia deleniti. Iste! ' +
      'Quod sit veniam aliquid, iste ut voluptate consequatur, nemo eius adipisci qui ' +
      'delectus possimus quaerat excepturi ullam, soluta quis. Accusamus omnis magni ex ' +
      'dolorem et repellendus corrupti reprehenderit optio ullam?';
    code = [];
  }
});

const xCord = document.querySelector('#xCord');
const yCord = document.querySelector('#yCord');

document.addEventListener('dblclick', (event) => {
  xCord.textContent = event.x;
  yCord.textContent = event.y;
});

document.addEventListener('touchend', (event) => {
  touchCount++;
  touch.textContent = 'You touched the screen ' + touchCount + ' times.';
});
