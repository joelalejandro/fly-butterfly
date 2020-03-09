class GameElement {
    /**
    * @type {HTMLElement}
    */
    _element = null;

    id = `element${randomId()}`;
    isDestroyed = false;

    /**
    * @param {HTMLElement} element 
    */
    constructor(element) {
        this._element = element;
        this._element.setAttribute("data-game-element-id", this.id);
    }

    get x() {
        return this._element.offsetLeft;
    }

    set x(value) {
        this._element.style.left = `${value}px`;
    }

    get y() {
        return this._element.offsetTop;
    }

    set y(value) {
        this._element.style.top = `${value}px`;
    }

    get width() {
        return this._element.offsetWidth;
    }

    get height() {
        return this._element.offsetHeight;
    }

    getElementBox() {
        return { width: this.width, height: this.height, x: this.x, y: this.y }
    }

    /**
    * @param {GameScene} scene 
    */
    renderIn(scene) {
        scene.renderGameElement(this);
    }

    setContent(value) {
        this._element.innerHTML = value;
    }

    setAttribute(attribute, value) {
        this._element.setAttribute(attribute, value);
    }

    setData(key, value) {
        this._element.dataset[key] = value;
    }

    setAlpha(value) {
        this._element.style.opacity = value / 100;
    }

    getData(key) {
        return this._element.dataset[key];
    }

    destroy() {
        this._element.remove();
        this.isDestroyed = true;
        this._element = null;
    }

    /**
    * @param {GameElement} gameElement 
    */
    collidesWith(gameElement) {
        if (gameElement.isDestroyed || this.isDestroyed) {
            return false;
        }

        return this.x >= gameElement.x &&
            this.y >= gameElement.y &&
            this.x <= gameElement.x + gameElement.width &&
            this.y <= gameElement.y + gameElement.height;
    }
}
