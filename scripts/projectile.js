
/**
 * Projectile container
 * @param {HTMLElement} levelContainer Level dans le quel le projectile va etre instancié
 * @param {object} shootingEntity Entité qui va shooter le projectile
 * @param {object} directionVector Vecteur (normalisé) indicant la direction de mouvement du projectile 
 * @param {number} speed vitesse du projectile en percentage d'ecran / sec
 */
class Projectile extends Entity {

    // -------------------- initialisation --------------------

    constructor (levelContainer, shootingEntity, directionVector = {x: 1, y:0}, speed = 20) {

        // ---- calculer la position
        // collecte des info de positionnement
        let RectLevel = levelContainer.getBoundingClientRect();
        let RectShootingEntity = shootingEntity.htmlEl.getBoundingClientRect();
        // position Y (prends celle du player/ennemi)
        let positionY = RectShootingEntity.y;
        // offset largeur entité (ajouter moitié hauteur player/ennemi)
        positionY += RectShootingEntity.height / 2;
        // rendre en pourcentage
        positionY = positionY / RectLevel.height * 100

        // position X (prends celle du player/ennemi)
        let positionX = RectShootingEntity.x;
        // offset largeur entité (ajouter largeur player/ennemi)
        positionX += RectShootingEntity.width;
        // rendre en pourcentage
        positionX = positionX / RectLevel.width * 100

        // ---- créer la base de cette entitée
        super(levelContainer, { x:positionX, y:positionY } , 'images/projectile.png');

        // ---- lui donner sa class
        this.htmlEl.classList.add('projectile');

        this.#DirectionVector = directionVector;
        this.#Speed = speed;
    }

    // ----------------- declarations variables -----------------
    
    #DirectionVector = {x:0,y:0};
    #Speed = 0;

    // ----------------- declarations fonctions -----------------

    update = () => {

        // ---- deplacement projectile apres shoot
        //this.moveX(this.EntityCurrentPosition.xPerc + 3/10);
        this.move(
            this.EntityCurrentPosition.xPerc + (this.#DirectionVector.x * this.#Speed * 1/60),
            this.EntityCurrentPosition.yPerc + (this.#DirectionVector.y * this.#Speed * 1/60)
        );

        // ---- disparition apres arrivée au bord de l'ecran
        if (this.EntityCurrentPosition.xPerc >= 100 || 
            this.EntityCurrentPosition.xPerc <= 0 ||
            this.EntityCurrentPosition.
            Perc >= 100 || 
            this.EntityCurrentPosition.xPerc <= 0) {
            // destruction element html
            this.htmlEl.remove();
            // destruction instance objet
            for (let i = 0; i < Projectiles.length; i++) {
                if (Projectiles[i] === this) {
                    // enlever reference pour permettre collecte par le GC
                    delete Projectiles[i];
                    Projectiles.splice(i, 1);
                }                
            }
        }
    }

    
}