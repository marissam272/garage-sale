var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Sale Sale Sale!')
    .pauseFor(2500)
    .deleteAll()
    .typeString('View Items')
    .pauseFor(2500)
    .deleteChars(10)
    .typeString('Sell your Stuff!')
    .start();