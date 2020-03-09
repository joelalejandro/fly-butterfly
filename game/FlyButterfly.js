class FlyButterflyGame extends Game {
    start() {
        super.start();

        const lifeInterval = setInterval(() => {
            this.life.points -= this.level / 5;
            if (this.over) {
                clearInterval(lifeInterval);
            }
        }, 100);

        const raisePoints = () => window.requestAnimationFrame(() => {
            this.score.points += 0.1 * this.level;
            this.level = Math.ceil(this.score.points / 1000);

            if (!this.over) {
                raisePoints();
            }
        });

        raisePoints();
    }

    end() {
        super.end();

        const gameOverScreen = document.createElement("div");
        gameOverScreen.id = "gameover";
        gameOverScreen.innerHTML = `<h1>GAME OVER</h1>Score: <span>${Math.floor(this.score.points)}</span><button onclick='window.location.reload()'>PLAY AGAIN</button>`;
        this.scene.renderGameElement(new GameElement(gameOverScreen));
    }
}

new FlyButterflyGame({
    sceneElement: document.querySelector("#game"),
    playerElement: document.querySelector("#player"),
    spawners: [FlowerSpawner]
});