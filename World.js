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
          // console.log(object);
          if (object.isAlive) {
            object.sprite.draw(this.ctx, cameraPerson);
          }
        });

      // Draw Upper map
      this.map.drawUpperImage(this.ctx, cameraPerson);

      setTimeout(() => {
        requestAnimationFrame(() => {
          step();
        });
      }, 16);
    };
    step();
  }

  bindActionInput() {
    new KeypressListener("KeyZ", () => {
      // Is there a person here to talk to?
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (event) => {
      if (event.detail.whoId === "hero") {
        // Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.world = this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.Overworld);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([
      { type: "textMessage", text: "Where the hell am I..." },
      { type: "textMessage", text: "One moment I'm flipping pizzas..." },
      { type: "textMessage", text: "The next moment I'm in this... Well?" },
      {
        type: "textMessage",
        text: "This water though, makes me feel refreshed!",
      },
      { who: "hero", type: "walk", direction: "down" },
      { who: "npc2", type: "walk", direction: "left" },
      { who: "npc2", type: "walk", direction: "down" },
      { who: "npc2", type: "walk", direction: "down" },
      { who: "npc2", type: "stand", direction: "right", time: 10 },
      { who: "hero", type: "stand", direction: "left", time: 10 },
      { type: "textMessage", text: "Get out of my way!" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "stand", direction: "up", time: 10 },
      { who: "npc2", type: "walk", direction: "right" },
      { who: "npc2", type: "walk", direction: "right" },
      { who: "npc2", type: "walk", direction: "up" },
      { who: "npc2", type: "walk", direction: "up" },
      { who: "npc2", type: "walk", direction: "left" },
      { who: "npc2", type: "stand", direction: "down", time: 10 },
      // { type: "battle", enemyId: "babyBronzeDragon" },
    ]);
  }
}
