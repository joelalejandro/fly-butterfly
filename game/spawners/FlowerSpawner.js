class FlowerSpawner extends Spawner {
    className = "flower";
    assetPaths = ["./assets/Flower1.png", "./assets/Flower2.png"];
    events = {
        render: (event, /** @type {GameElement} */ flower) => {
            flower.setData("capacity", 100);
        },

        frame: (event, /** @type {GameElement} */ flower) => {
            if (!flower) {
                return;
            }

            if (this.game.player.isCollidingWith(flower)) {
                flower.setData("capacity", flower.getData("capacity") - 2);
                flower.setAlpha(flower.getData("capacity"));
                if (this.game.life.points < 100) {
                    this.game.life.points += 0.2 * this.game.level;
                    this.game.score.points += 10;
                }
                if (flower.getData("capacity") <= 0) {
                    flower.destroy();
                }
            }

            window.requestAnimationFrame(() => this.events.frame({}, flower));
        }
    }

    frequency = () => this.game.score ? (this.game.score.points < 1000 ? 1000 : this.game.score.points / 2) : 1000;

    constructor(game) { super(); this.game = game; }
}
