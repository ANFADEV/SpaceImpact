

/**
 * Objet represantant les entités deplacable dans un niveau.
 * Schema héritiers:
 * - Entity
        - character
            - player
            - enemy
        - projectile
 */
class Entity {

    // -------------------- initialisation --------------------

    constructor (levelContainer, initialPosition = { x: 50, y:50 }, imageUrl) {
        
        // ---- check parametres
        if (levelContainer == null) {
            console.error("Entity error: invalid levelContainer");
        } else if (imageUrl == null) {
            console.error("Entity error: invalid imageUrl");
        }
        
        this.LevelContainer = levelContainer;

        // ---- creation du projectile
        // créer l'element projectile
        this.htmlEl = document.createElement('img');
        // lui donner un parent
        this.LevelContainer.appendChild(this.htmlEl);
        // lui donner l'image
        this.htmlEl.src = imageUrl;
        // le positionner
        this.move(initialPosition.x, initialPosition.y);
    }

    // ----------------- declarations variables -----------------

    EntityCurrentPosition = { x:0, y:0, xPerc: 0, yPerc: 0 };
    htmlEl;
    LevelContainer;

    // ----------------- declarations fonctions -----------------

    move(percentageX, percentageY) {
        this.moveX(percentageX);
        this.moveY(percentageY);
    }

    moveY(percentage) {
        // limiter pourcentage
        percentage = this.#clampPercentage(percentage);

        // recuperer les mesures actuelles des elements
        let hauteurParent = this.LevelContainer.getBoundingClientRect().height;
        let hauteurPlayer = this.htmlEl.getBoundingClientRect().height;

        // calculer position en pixel du player par rapport au div level
        hauteurParent -= hauteurPlayer;
        let positionInPixel = hauteurParent/(100/percentage) - hauteurPlayer;
        positionInPixel += hauteurPlayer;

        // memoriser nouvelle position
        this.EntityCurrentPosition.y = positionInPixel;
        this.EntityCurrentPosition.yPerc = percentage;

        // appliquer le positionnement avec style css
        this.htmlEl.style.transform = 'translateY(' + this.EntityCurrentPosition.y + 'px)';
        this.htmlEl.style.transform += ' translateX(' + this.EntityCurrentPosition.x + 'px)';
    }

    moveX(percentage) {
        // limiter pourcentage
        percentage = this.#clampPercentage(percentage);

        // recuperer les mesures actuelles des elements
        let largeurParent = this.LevelContainer.getBoundingClientRect().width;
        let largeurPlayer = this.htmlEl.getBoundingClientRect().width;

        // calculer position en pixel du player par rapport au div level
        largeurParent -= largeurPlayer;
        let positionInPixel = largeurParent/(100/percentage) - largeurPlayer;
        positionInPixel += largeurPlayer;

        // memoriser nouvelle position
        this.EntityCurrentPosition.x = positionInPixel;
        this.EntityCurrentPosition.xPerc = percentage;

        // appliquer le positionnement avec style css
        this.htmlEl.style.transform = 'translateY(' + this.EntityCurrentPosition.y + 'px)';
        this.htmlEl.style.transform += ' translateX(' + this.EntityCurrentPosition.x + 'px)';
    }

    // utility functions

    #clampPercentage(percentage) {

        // prend 100 si percentage > 100
        percentage = Math.min(percentage, 100);
        // prend 0 si percentage < 0
        percentage = Math.max(percentage, 0);

        return percentage;
    }

    refresh() {

        // refresh position
        this.move(
            this.EntityCurrentPosition.xPerc,
            this.EntityCurrentPosition.yPerc
        );
    }
}
