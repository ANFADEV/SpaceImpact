
/**
 * Projectile container
 * @param {HTMLElement} LevelContainer Level dans le quel le projectile va etre instancié
 * @param {object} ShootingEntity Entité qui va shooter le projectile
 */
function projectile(LevelContainer, ShootingEntity) {

    // ----------------- declarations variables -----------------
    

    // ----------------- declarations fonctions -----------------
    
    this.move = (percentageX, percentageY) => {
        //moveX(percentageX);
        moveY(percentageY);
    }

    function moveY(percentage) {
        // limiter pourcentage
        // ---- prend 100 si percentage > 100
        percentage = Math.min(percentage, 100);
        // ---- prend 0 si percentage < 0
        percentage = Math.max(percentage, 0);

        // recuperer les mesures actuelles des elements
        let hauteurParent = LevelContainer.getBoundingClientRect().height;
        let hauteurPlayer = htmlEl.getBoundingClientRect().height;

        // calculer position en pixel du player par rapport au div level
        hauteurParent -= hauteurPlayer;
        let positionInPixel = hauteurParent/(100/percentage) - hauteurPlayer;
        positionInPixel += hauteurPlayer;

        // appliquer le positionnement avec style css
        htmlEl.style.transform = 'translateY(' + positionInPixel + 'px)';

        PlayerCurrentPosition = percentage;
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

    // position Y
    let positionY = RectShootingEntity.y;
    // offset largeur entité
    positionY += RectShootingEntity.height / 2;
    // rendre en pourcentage
    positionY = positionY / RectLevel.height * 100

    this.move(
        // X
        5,   
        // Y           
        positionY
    );


}