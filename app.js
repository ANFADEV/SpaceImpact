





let conteneur = document.querySelector('.game-container');
let level = document.querySelector('.level');

// 
let monPlayer = new Player(level);


let Entities = [];
let Projectiles = [];

let gameLoop = setInterval(() => {
    // Projectiles
    for (let i = 0; i < Projectiles.length; i++) {
        Projectiles[i].update();        
    }
}, 16.66);




