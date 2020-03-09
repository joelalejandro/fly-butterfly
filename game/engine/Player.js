class Player {
    /**
    * @type {GameElement}
    */
    playerGameElement = null;

    /**
    * @type {Controls}
    */
    gameControls = null;

    /**
    * @type {GameScene}
    */
    gameScene = null;

    constructor({ playerGameElement, gameControls, gameScene }) {
        this.playerGameElement = playerGameElement;
        this.gameControls = gameControls;
        this.gameScene = gameScene;

        this.gameControls.onArrowDown(() => this.moveWithKeyboard("down"));
        this.gameControls.onArrowUp(() => this.moveWithKeyboard("up"));
        this.gameControls.onArrowLeft(() => this.moveWithKeyboard("left"));
        this.gameControls.onArrowRight(() => this.moveWithKeyboard("right"));
        this.gameControls.onMouseMove(({ x, y }) => this.moveWithMouse(x, y));
    }

    moveWithMouse(x, y) {
        /**
        * @type {GameElement}
        */
        const futurePlayer = this.playerGameElement.getElementBox();

        futurePlayer.x = x - this.gameScene._element.offsetLeft;
        futurePlayer.y = y - this.gameScene._element.offsetTop;

        if (this.gameScene.elementIsInScene(futurePlayer)) {
            this.playerGameElement.x = futurePlayer.x;
            this.playerGameElement.y = futurePlayer.y;
        }
    }

    moveWithKeyboard(direction, step = 5) {
        /**
        * @type {GameElement}
        */
        const futurePlayer = this.playerGameElement.getElementBox();

        switch (direction) {
            case "down":
                futurePlayer.y += step;
                break;
            case "up":
                futurePlayer.y -= step;
                break;
            case "left":
                futurePlayer.x -= step;
                break;
            case "right":
                futurePlayer.x += step;
                break;
        }

        if (this.gameScene.elementIsInScene(futurePlayer)) {
            this.playerGameElement.x = futurePlayer.x;
            this.playerGameElement.y = futurePlayer.y;
        }
    }

    isCollidingWith(gameElement) {
        return this.playerGameElement.collidesWith(gameElement);
    }

    destroy() {
        this.playerGameElement.destroy();
    }
}
