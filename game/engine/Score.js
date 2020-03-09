class Score {
    /**
    * @type {GameScene}
    */
    _scene = null;

    /**
    * @type {GameElement}
    */
    _gameElement = null;

    _points = 0;

    constructor(scene) {
        this._scene = scene;
        this.mount();
    }

    mount() {
        const domElement = document.createElement("div");
        domElement.id = "score";
        domElement.innerHTML = this.points.toString().padStart(8, "0");
        const scoreElement = new GameElement(domElement);
        this._scene.renderGameElement(scoreElement);
        this._gameElement = scoreElement;
    }

    get points() {
        return this._points;
    }

    set points(value) {
        this._points = value;
        this._gameElement.setContent(Math.floor(value).toString().padStart(8, "0"));
    }
}
