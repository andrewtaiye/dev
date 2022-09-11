class Person extends GameObject {
  constructor(config) {
    super(config); // calls the constructor of a parent class
    this.movementProgressRemaining = 0;
    this.isStanding = false;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    // the state argument is the object passed to the update function during the game loop
    if (this.movementProgressRemaining > 0) {
      this.updatePosition();
    } else {
      // More cases for starting to walk

      // Case: we're keyboard ready and have an arrow pressed
      if (
        !state.map.isCutscenePlaying &&
        this.isPlayerControlled &&
        state.arrow
      ) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }

  startBehavior(state, behavior) {
    // Set character direction to what behavior has
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      // Stop is tile is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry &&
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 10);
        return;
      }
      // Ready to walk
      state.map.moveWall(this.x, this.y, this.direction);
      this.movementProgressRemaining = 16;
      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utility.emitEvent("PersonStandingComplete", { whoId: this.id });
        this.isStanding = false;
      }, behavior.time);
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movementProgressRemaining -= 1;

    if (this.movementProgressRemaining === 0) {
      // finished moving
      utility.emitEvent("PersonWalkingComplete", { whoId: this.id });
    }
  }

  updateSprite() {
    if (this.movementProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
