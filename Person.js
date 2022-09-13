class Person extends GameObject {
  constructor(config, map) {
    super(config); // calls the constructor of a parent class
    this.movementProgressRemaining = 0;
    this.isStanding = false;
    this.intentPosition = null;
    this.map = map;

    this.isPlayerControlled = config.isPlayerControlled || false;
    this.isMonster = config.isMonster || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
    this.standingBehaviorTimeout;

    this.respawnTimer = 0;
  }

  update(state) {
    // the state argument is the object passed to the update function during the game loop
    if (!this.isAlive && this.respawnTimer > 0) {
      this.respawnTimer -= 1;
      if (this.respawnTimer === 0) {
        this.isAlive = true;
      }
    }

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
    if (!this.isMounted) {
      return;
    }

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
      this.movementProgressRemaining = 16;

      const intentPosition = utility.nextPosition(
        this.x,
        this.y,
        this.direction
      );
      this.intentPosition = [intentPosition.x, intentPosition.y];

      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
      this.isStanding = true;

      if (this.standingBehaviorTimeout) {
        clearTimeout(this.standingBehaviorTimeout);
      }
      this.standingBehaviorTimeout = setTimeout(() => {
        utility.emitEvent("PersonStandingComplete", {
          whoId: this.id,
        });
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
      this.intentPosition = null;
      utility.emitEvent("PersonWalkingComplete", { whoId: this.id });
    }
  }

  updateSprite() {
    if (this.movementProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    if (this.isMonster && !this.map.isCutscenePlaying) {
      // console.log(this);
      this.sprite.setAnimation("idle");
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
