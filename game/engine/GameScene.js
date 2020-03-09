class GameScene {
    /**
    * @type {HTMLElement}
    */
    _element = null;

    /**
    * @type {Spawner[]}
    */
    _spawners = null;

    /**
    * @type {Object.<string,GameElement>}
    */
    _elements = {};

    /**
     * @type {MutationObserver}
     */
    _mutationObserver = {};

    _spawnerTimers = {};

    /**
    * @param {HTMLElement} element 
    */
    constructor(element, { spawners = [] } = {}) {
        this._element = element;
        this._spawners = spawners;

        this._element.addEventListener("contextmenu", e => e.preventDefault());

        this.setupSpawners();
        this.setupMutationObserver();
    }

    get width() {
        return this._element.offsetWidth;
    }

    get height() {
        return this._element.offsetHeight;
    }

    /**
    * @param {GameElement} element 
    */
    elementIsInScene(element) {
        const isInX = element.x >= 0 && element.x + element.width <= this.width;
        const isInY = element.y >= 0 && element.y + element.height <= this.height;

        return isInX && isInY;
    }

    setupSpawners() {
        this._spawners.forEach(spawner => {
            const spawnLoop = () => {
                this._spawnerTimers[spawner.id] = setTimeout(() => {
                    spawner.spawnInto(this);
                    spawnLoop();
                }, spawner.frequency());
            };
            spawnLoop();
        });
    }

    destroy() {
        Object.values(this._spawnerTimers).forEach(timer => clearTimeout(timer));
        this._spawners = [];
        this._mutationObserver.disconnect();
    }

    setupMutationObserver() {
        this._mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type !== "childList") {
                    return;
                }

                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType !== Node.TEXT_NODE) {
                            this._elements[node.dataset.gameElementId] = new GameElement(node);
                        }
                    });
                }

                if (mutation.removedNodes.length) {
                    mutation.removedNodes.forEach(node => {
                        if (node.nodeType !== Node.TEXT_NODE) {
                            delete this._elements[node.dataset.gameElementId];
                        }
                    });
                }
            });
        });

        this._mutationObserver.observe(this._element, { childList: true, subtree: true });
    }

    /**
    * @param {GameElement} element 
    */
    renderGameElement(element) {
        this._element.append(element._element);
    }

    getElement(id) {
        return this._elements[id];
    }
}
