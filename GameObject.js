class GameObject {
  constructor(config, map) {
    this.id = null;
    this.isMounted = false;
    this.isAlive = config.isAlive;
    this.map = map;

    this.x = config.x || 0; // x position data. to be passed through when GameObject is created, defaults to 0
    this.y = config.y || 0; // y position data. to be passed through when GameObject is created, defaults to 0
    this.direction = config.direction || "down";

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "assets/characters/people/hero.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];
    this.retryTimeout = null;
  }

  mount(map) {
    this.isMounted = true;
    console.log(this);

    // if there is a behavior, start behavior after short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviorEvent(map) {
    // if a cutscene is playing or if the character does not have a behavior loop, stop the function.
    if (this.behaviorLoop.length === 0) {
      return;
    }

    if (map.isCutscenePlaying) {
      if (this.retryTimeout) {
        clearTimeout(this.retryTimeout);
      }
      this.retryTimeout = setTimeout(() => {
        this.doBehaviorEvent(map);
      }, 10);

      return;
    }

    // Setting up event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]; // event will have a type and direction (and time if it is stand) passed from the OverworldMap
    eventConfig.who = this.id;

    // Create an event instance from the next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    // Set next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    this.doBehaviorEvent(map);
  }
}
