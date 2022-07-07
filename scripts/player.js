
/**
 * Player container
 * @param {*} LevelContainer Level dans le quel player va etre instancié
 */
class Player extends Entity {

    // -------------------- initialisation --------------------

    constructor(levelContainer, initialPosition = {x: 0, y: 50}, speed = 60) {

        // ---- calculer la position
        // TODO prendre en consideration hauteur player
    
        // ---- créer la base de cette entitée
        super(levelContainer, initialPosition , 'images/player.png');

        // ---- lui donner sa class
        this.htmlEl.classList.add('player');  

        this.initialPosition = initialPosition;
        this.#Speed = speed;

        // ---- création du gestionnaire de commande 
        this.input = {
            up: false,
            down: false,
            space: false
        }

        window.addEventListener('keydown', (e) => {

            // a chaque pression de touche
            switch (e.code) {
                case 'ArrowDown': {
                    this.input.down = true;
                    break;
                }
                case 'ArrowUp': {
                    this.input.up = true;
                    break;
                }
                case 'Space': {
                    this.input.space = true;
                    break;
                }
                default:
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {

            // a chaque pression de touche
            switch (e.code) {
                case 'ArrowDown': {
                    this.input.down = false;
                    break;
                }
                case 'ArrowUp': {
                    this.input.up = false;
                    break;
                }
                case 'Space': {
                    this.input.space = false;
                    break;
                }
                default:
                    break;
            }
        });

        // Intervalle check des valeurs d'input

        setInterval(() => {
            if (this.input.down == true) {
                // vers le bas
                this.move(
                    this.EntityCurrentPosition.xPerc,
                    this.EntityCurrentPosition.yPerc + (this.#Speed * 1/60)
                );
            }

            if (this.input.up == true) {
                // vers le haut
                this.move(
                    this.EntityCurrentPosition.xPerc,
                    this.EntityCurrentPosition.yPerc - (this.#Speed * 1/60)
                );
            }

        }, 16.66);

        // Intervalle check valeur input SHOOT

        setInterval(() => {

            if (this.input.space == true) {
                this.shoot();
            }

        }, 200);
    }

    // ----------------- declarations variables -----------------

    health = 3;
    #Speed = 0;
    
    // ----------------- declarations fonctions -----------------

    die = () => {
        health = 0;
        console.log('le player est mort');
    }

    shoot = () => {
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
   

}