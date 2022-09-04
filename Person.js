class Person extends GameObject {
  constructor(config) {
    super(config); // calls the constructor of a parent class
    this.movementProgressRemaining = 0;

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
      if (this.isPlayerControlled && state.arrow) {
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
        return;
      }
      // Ready to walk
      state.map.moveWall(this.x, this.y, this.direction);
      this.movementProgressRemaining = 16;
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movementProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movementProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
