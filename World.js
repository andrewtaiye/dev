class World {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d"); // context allows drawing to the canvas
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish camera person
      const cameraPerson = this.map.gameObjects.hero;

      // Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      // Draw Lower map
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw Game Objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => a.y - b.y)
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      // Draw Upper map
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.Overworld);
    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "right" },
      { who: "hero", type: "stand", direction: "right", time: 800 },
    ]);
  }
}
