class Spawner {
    assetPaths = [];
    className = "";
    events = {};
    frequency = () => 1000;
    id = `spawner${randomId()}`;

    /**
    * @type {Game}
    */
    game = null;

    constructor({ assetPaths, className, events = {}, game } = {}) {
        this.assetPaths = assetPaths;
        this.className = className;
        this.events = events;
        this.game = game;
    }

    spawn() {
        const element = document.createElement("img");
        element.src = this.assetPaths[Math.floor(Math.random() * this.assetPaths.length)];
        element.classList.add("spawn", this.className);
        element.addEventListener("animationend", () => element.remove());
        const gameElement = new GameElement(element);
        Object.entries(this.events).forEach(([eventName, callback]) => gameElement._element.addEventListener(eventName, (event) => callback(event, gameElement)));
        return gameElement;
    }

    /**
    * @param {GameScene} scene 
    */
    spawnInto(scene) {
        const spawn = this.spawn();
        spawn.x = Math.ceil(Math.random() * (scene.width - 32));
        scene.renderGameElement(spawn);

        if ("render" in this.events) {
            this.events.render({}, spawn);
        }

        if ("frame" in this.events) {
            window.requestAnimationFrame(() => this.events.frame({}, spawn));
        }
    }

    destroy(element) {
        element.remove();
    }
}
