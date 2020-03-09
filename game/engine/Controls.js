class Controls {
    keyEventListeners = {};
    mouseEventListeners = {};
    enabled = true;
    sceneElement = null;

    constructor({ sceneElement }) {
        window.addEventListener("keydown", event => {
            if (!this.enabled) {
                return;
            }

            (this.keyEventListeners[event.key] || []).forEach(callback => window.requestAnimationFrame(callback));
        });

        sceneElement.addEventListener("mousemove", event => {
            if (!this.enabled) {
                return;
            }

            (this.mouseEventListeners["MouseMove"] || []).forEach(callback => window.requestAnimationFrame(() => callback(event)));
        });
    }

    onMouseMove(callback) {
        this.mouseEventListeners["MouseMove"] = [...(this.mouseEventListeners["MouseMove"] || []), callback];
    }

    onMouseDown(callback) {
        this.mouseEventListeners["MouseDown"] = [...(this.mouseEventListeners["MouseDown"] || []), callback];
    }

    onArrowDown(callback) {
        this.keyEventListeners["ArrowDown"] = [...(this.keyEventListeners["ArrowDown"] || []), callback];
    }

    onArrowUp(callback) {
        this.keyEventListeners["ArrowUp"] = [...(this.keyEventListeners["ArrowUp"] || []), callback];
    }

    onArrowLeft(callback) {
        this.keyEventListeners["ArrowLeft"] = [...(this.keyEventListeners["ArrowLeft"] || []), callback];
    }

    onArrowRight(callback) {
        this.keyEventListeners["ArrowRight"] = [...(this.keyEventListeners["ArrowRight"] || []), callback];
    }
}
