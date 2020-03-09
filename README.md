# Fly, Butterfly

A 100% vanilla JavaScript-made game about butterflies and flowers. Submission for the Indie Game Garage Jam #0.

## Technologies and tools used

- Aseprite
- HTML, CSS, JavaScript
- Visual Studio Code

## How the engine works

The [`Game`](./game/engine/Game.js) class is composed by the following components:

- [`Controls`](./game/engine/Controls.js): takes care of the player input (both keyboard and mouse events are supported).
- [`Scene`](./game/engine/GameScene.js): renders a viewport for the game. Everything about the elements rendered on screen is contained here.
- [`Player`](./game/engine/Player.js): a special class that wraps the sprite for the player object (in this case, the Butterfly). It interacts with the controls and the scene.
- [`Score`](./game/engine/Score.js): a UI component to keep track of how much points the player has scored.
- [`Life`](./game/engine/PlayerLife.js): a UI component that keeps track of how many life points the player has left.

As soon as the game starts, it renders everything in the UI and fires up the [`Spawner`](./game/engine/Spawner.js) implementations that the game requires. For _Fly, Butterfly_, there's a [`FlowerSpawner`](./game/spawners/FlowerSpawner.js) that will render either [Flower 1](./assets/Flower1.png) or [Flower 2](./assets/Flower2.png) on a variable frequency, determined by the game `level` and the amount of `points` the player has scored.

On each frame, there's a collision detection between the player object and all of the rendered flowers. While both sprites are colliding, the hovered flower is consumed and the player's life points are increased.

Take a look inside the files and see the magic ✨

## Why all Vanilla JS? Why not Phaser or {type your engine here}?

Because it's a Game Jam, and it's all about experimenting!

## License

Feel free to use anything from this repo and remix it as you see fit. Keep in mind that the music track has a license of its own.