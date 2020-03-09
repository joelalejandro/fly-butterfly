class PlayerLife {
    /**
    * @type {GameScene}
    */
    _scene = null;

    /**
    * @type {GameElement}
    */
    _gameElement = null;

    _points = 100;

    _endCallback = () => {};

    constructor(scene, endCallback) {
        this._scene = scene;
        this._endCallback = endCallback;
        this.mount();
    }

    mount() {
        const domElement = document.createElement("progress");
        domElement.id = "life";
        domElement.min = 0;
        domElement.max = 100;
        domElement.value = 100;
        const lifeElement = new GameElement(domElement);
        this._scene.renderGameElement(lifeElement);
        this._gameElement = lifeElement;
    }

    get points() {
        return this._points;
    }

    set points(value) {
        this._points = value;
        this._gameElement.setAttribute("value", value);
        if (value <= 0) {
            this._endCallback();
        }
    }
}
