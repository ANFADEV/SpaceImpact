
/**
 * Player container
 * @param {*} LevelContainer Level dans le quel player va etre instancié
 */
function player(LevelContainer) {

    // ----------------- declarations variables -----------------

    let health = 3;
    let PlayerCurrentPosition = 50;

    // ----------------- declarations fonctions -----------------
    
    this.die = () => {
        health = 0;
        console.log('le player est mort');
    }

    this.shoot = () => {
        // créer nouvelle instance de projectile
        let nouveauP = new Projectile(
            LevelContainer,
            this
        );
        // l'ajouter au tableau projectiles
        Projectiles.push(nouveauP);
        // son
        // ... TODO
    }

    this.move = (percentage) => {

        // limiter pourcentage
        // ---- prend 100 si percentage > 100
        percentage = Math.min(percentage, 100);
        // ---- prend 0 si percentage < 0
        percentage = Math.max(percentage, 0);

        // recuperer les mesures actuelles des elements
        let hauteurParent = LevelContainer.getBoundingClientRect().height;
        let hauteurPlayer = this.htmlEl.getBoundingClientRect().height;

        // calculer position en pixel du player par rapport au div level
        hauteurParent -= hauteurPlayer;
        let positionInPixel = hauteurParent/(100/percentage) - hauteurPlayer;
        positionInPixel += hauteurPlayer;

        // appliquer le positionnement avec style css
        this.htmlEl.style.transform = 'translateY(' + positionInPixel + 'px)';

        PlayerCurrentPosition = percentage;
    }

    // -------------------- initialisation --------------------

    // ---- creation du player
    // créer l'element player
    this.htmlEl = document.createElement('img');
    // lui donner un parent
    LevelContainer.appendChild(this.htmlEl);
    // lui donner l'image
    this.htmlEl.src = 'images/player.png';
    // lui donner sa class
    this.htmlEl.classList.add('player');
    // le positionner au mileu
    this.move(PlayerCurrentPosition);

    // ---- ajout event commandes

    // window.addEventListener('keydown', (e) => {

    //     // a chaque pression de touche
    //     switch (e.code) {
    //         case 'ArrowDown':{
    //             // vers le bas
    //             this.move(PlayerCurrentPosition + 1);
    //             break;
    //         }
    //         case 'ArrowUp':{
    //             // vers le haut
    //             this.move(PlayerCurrentPosition - 1);
    //             break;
    //         }
    //         case 'Space':{
    //             this.shoot();
    //             break;
    //         }
    //         default:
    //             break;
    //     }
    // });

    let input={
        up:false,
        down:false,
        space:false
    }

    window.addEventListener('keydown', (e) => {

        // a chaque pression de touche
        switch (e.code) {
            case 'ArrowDown':{
                input.down=true;
                break;
            }
            case 'ArrowUp':{
                input.up=true;
                break;
            }
            case 'Space':{
                input.space=true;
                break;
            }
            default:
                break;
        }
    });
    window.addEventListener('keyup', (e) => {

        // a chaque pression de touche
        switch (e.code) {
            case 'ArrowDown':{
                input.down=false;
                break;
            }
            case 'ArrowUp':{
                input.up=false;
                break;
            }
            case 'Space':{
                input.space=false;
                break;
            }
            default:
                break;
        }
    });

// Intervalle check des valeurs d'input

    setInterval(() => {
        if (input.down==true) {
            // vers le bas
            this.move(PlayerCurrentPosition + 1);
        }
        
        if (input.up==true) {
            // vers le haut
            this.move(PlayerCurrentPosition - 1);
        }
       
    }, 16.66);
    
// Intervalle check valeur input SHOOT

    setInterval(() => {
        
        if (input.space==true) {
            this.shoot();
        }
        
    }, 200);

}