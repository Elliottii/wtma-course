let code = [];
const text = document.querySelector('.text');
/**
 * Timer erase array and text 10 seconds.
 */
const timer = setInterval(() => {
  code = [];
  text.textContent = '';
}, 10000);

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
