class Game {
    over = false;

    /**
    * @type {Player}
    */
    player = null;

    /**
     * @type {Controls}
     */
    controls = null;

    /**
    * @type {Score} 
    */
    score = null;

    level = 1;

    constructor({
        playerElement, sceneElement, spawners = []
    }) {
        this.controls = new Controls({ sceneElement });
        this.scene = new GameScene(sceneElement, { spawners: spawners.map(spawner => new spawner(this)) });
        this.player = new Player({
            playerGameElement: new GameElement(playerElement),
            gameControls: this.controls,
            gameScene: this.scene
        });
        this.score = new Score(this.scene);
        this.life = new PlayerLife(this.scene, () => this.end());

        this.start();
    }

    end() {
        this.over = true;

        this.controls.enabled = false;

        this.scene._element.style.cursor = "default";
        this.scene.destroy();
        this.player.destroy();
    }

    start() {}
}