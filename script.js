// Creating field
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

// Creating blocks
for (let i=1; i<101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1, y = 10;

for (let i=0; i<excel.length; i++) {
    if (x > 10) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

// Snake generation

function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);

    return [posX, posY];
}
let coordinates = generateSnake();
console.log(coordinates);

let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + (+coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + (+coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')]

console.log(snakeBody);

for (let i=0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');


// Creating of mouse

let mouse;

function createMouse() {
    function generateMouse() {
        let posX = Math.round(Math.random() * (10 - 1) + 1);
        let posY = Math.round(Math.random() * (10 - 1) + 1);

        return [posX, posY];
    }

    let mouseCoordinates = generateMouse();
    console.log(mouseCoordinates);

    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')

    while (mouse.classList.contains('snakeBody')) {
        let mouseCoordinates = generateMouse();
        console.log(mouseCoordinates);

        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
    }

    mouse.classList.add('mouse');
}
createMouse();


// Moves

let direction = 'right';
let steps = false;

function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posx'), snakeBody[0].getAttribute('posy')];

    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction === 'right') {
        if (snakeCoordinates[0] < 10) {
            let newBodyPart = document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]');
            snakeBody.unshift(newBodyPart);
        } else {
            let newBodyPart = document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]');
            snakeBody.unshift(newBodyPart);
        }
    } else if (direction === 'left') {
        if (snakeCoordinates[0] > 1) {
            let newBodyPart = document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]');
             snakeBody.unshift(newBodyPart);
        } else {
            let newBodyPart = document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]');
            snakeBody.unshift(newBodyPart);
        }
    } else if (direction === 'up') {
        if (snakeCoordinates[1] < 10) {
            let newBodyPart = document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]');
            snakeBody.unshift(newBodyPart);
        } else {
            let newBodyPart = document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]');
            snakeBody.unshift(newBodyPart);
        }
    } else if (direction === 'down') {
        if (snakeCoordinates[1] > 1) {
            let newBodyPart = document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]');
            snakeBody.unshift(newBodyPart);
        } else {
            let newBodyPart = document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]');
            snakeBody.unshift(newBodyPart);
        }
    }

    if (snakeBody[0].getAttribute('posX') === mouse.getAttribute('posX')
    && snakeBody[0].getAttribute('posY') === mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
    }

    if (snakeBody[0].classList.contains('snakeBody')) {
        clearInterval(interval);
        setTimeout(() => {
            alert('Game over');
        }, 200)
        snakeBody[0].style.background = 'url(cry-cat.jpg) center no-repeat';
        snakeBody[0].style.backgroundSize = 'cover';
    }

    snakeBody[0].classList.add('head');
    for (let i=0; i<snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', function (e) {
    if (!steps) {
        return;
    }
    if (e.keyCode === 37 && direction !== 'right') {
        direction = 'left';
        steps = false;
    } else if (e.keyCode === 38 && direction !== 'down') {
        direction = 'up';
        steps = false;
    } else if (e.keyCode === 39 && direction !== 'left') {
        direction = 'right';
        steps = false;
    } else if (e.keyCode === 40 && direction !== 'up') {
        direction = 'down';
        steps = false;
    }
})
