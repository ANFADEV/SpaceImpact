





let conteneur = document.querySelector('.game-container');
let level = document.querySelector('.level');

// 
let monPlayer = new player(level);














function player(LevelContainer) {

    // ----------------- declarations variables -----------------
    let health = 3;

    // ----------------- declarations fonctions -----------------
    this.die = () => {
        health = 0;
        console.log('le player est mort');
    }

    this.shoot = () => {
        
        console.log('le player a shoot');
    }

    let deplacer = (percentage) => {
        // recuperer les mesures actuelles des elements
        let hauteurParent = LevelContainer.getBoundingClientRect().height;
        let hauteurPlayer = htmlEl.getBoundingClientRect().height;

        // calculer position en pixel du player par rapport au div level
        hauteurParent -= hauteurPlayer;
        let positionInPixel = hauteurParent/(100/percentage) - hauteurPlayer;
        positionInPixel += hauteurPlayer;

        // appliquer le positionnement avec style css
        htmlEl.style.transform = 'translateY(' + positionInPixel + 'px)';
    }

    // -------------------- initialisation --------------------

    // creation du player
    // ---- créer l'element player
    let htmlEl = document.createElement('img');
    // ---- lui donner un parent
    LevelContainer.appendChild(htmlEl);
    // ---- lui donner l'image
    htmlEl.src = 'images/player.png';
    // ---- lui donner sa class
    htmlEl.classList.add('player');
    // ---- le positionner au mileu
    deplacer(50);

}