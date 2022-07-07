





let conteneur = document.querySelector('.game-container');
let level = document.querySelector('.level');

// references entités
let monPlayer = new Player(level);
monPlayer.refresh();// refresh position temporary fix to constructor TODO
let Entities = [];
let Projectiles = [];


// loop
let gameLoop = setInterval(() => {
    // Projectiles
    for (let i = 0; i < Projectiles.length; i++) {
        Projectiles[i].update();        
    }
}, 16.66);


// adaptabilité des entités au changements de taille du niveau
window.addEventListener('resize', () => {

    // actualisation player
    monPlayer.refresh();

    // actualisation projectiles
    for (let i = 0; i < Projectiles.length; i++) {
        Projectiles[i].refresh();
    }
});

