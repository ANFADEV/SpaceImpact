
/**
 * Projectile container
 * @param {HTMLElement} LevelContainer Level dans le quel le projectile va etre instancié
 * @param {object} ShootingEntity Entité qui va shooter le projectile
 */
function projectile(LevelContainer, ShootingEntity) {

    // ----------------- declarations variables -----------------
    
    let PlayerCurrentPosition = { x:0, y:0, xPerc: 0, yPerc: 0 };

    // ----------------- declarations fonctions -----------------

    this.update = () => {
        console.log('va en avant');
    }
    
    this.move = (percentageX, percentageY) => {
        moveX(percentageX);
        moveY(percentageY);
    }

    function moveY(percentage) {
        // limiter pourcentage
        percentage = clampPercentage(percentage);

        // recuperer les mesures actuelles des elements
        let hauteurParent = LevelContainer.getBoundingClientRect().height;
        let hauteurPlayer = htmlEl.getBoundingClientRect().height;

        // calculer position en pixel du player par rapport au div level
        hauteurParent -= hauteurPlayer;
        let positionInPixel = hauteurParent/(100/percentage) - hauteurPlayer;
        positionInPixel += hauteurPlayer;

        // memoriser nouvelle position
        PlayerCurrentPosition.y = positionInPixel;
        PlayerCurrentPosition.yPerc = percentage;

        // appliquer le positionnement avec style css
        htmlEl.style.transform = 'translateY(' + PlayerCurrentPosition.y + 'px)';
        htmlEl.style.transform += ' translateX(' + PlayerCurrentPosition.x + 'px)';
    }

    function moveX(percentage) {
        // limiter pourcentage
        percentage = clampPercentage(percentage);

        // recuperer les mesures actuelles des elements
        let largeurParent = LevelContainer.getBoundingClientRect().width;
        let largeurPlayer = htmlEl.getBoundingClientRect().width;

        // calculer position en pixel du player par rapport au div level
        largeurParent -= largeurPlayer;
        let positionInPixel = largeurParent/(100/percentage) - largeurPlayer;
        positionInPixel += largeurPlayer;

        // memoriser nouvelle position
        PlayerCurrentPosition.x = positionInPixel;
        PlayerCurrentPosition.xPerc = percentage;

        // appliquer le positionnement avec style css
        htmlEl.style.transform = 'translateY(' + PlayerCurrentPosition.y + 'px)';
        htmlEl.style.transform += ' translateX(' + PlayerCurrentPosition.x + 'px)';
    }

    // utility functions

    function clampPercentage(percentage) {
        // ---- prend 100 si percentage > 100
        percentage = Math.min(percentage, 100);
        // ---- prend 0 si percentage < 0
        percentage = Math.max(percentage, 0);

        return percentage;
    }

    // -------------------- initialisation --------------------

    // creation du projectile
    // ---- créer l'element projectile
    let htmlEl = document.createElement('img');
    // ---- lui donner un parent
    LevelContainer.appendChild(htmlEl);
    // ---- lui donner l'image
    htmlEl.src = 'images/projectile.png';
    // ---- lui donner sa class
    htmlEl.classList.add('projectile');
    // ---- le positionner au mileu

    let RectLevel = LevelContainer.getBoundingClientRect();
    let RectShootingEntity = ShootingEntity.htmlEl.getBoundingClientRect();

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

    this.move(
        // X
        positionX,
        // Y
        positionY
    );


}