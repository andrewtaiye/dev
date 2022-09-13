class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  // resolvers are functions called to tell that the event is completed.
  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );

    // set up handler to complete when correct person is done walking, then resolve event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandingComplete", completeHandler);
        resolve();
      }
    };
    document.addEventListener("PersonStandingComplete", completeHandler);
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: "walk",
        direction: this.event.direction,
        retry: true,
      }
    );

    // set up handler to complete when correct person is done walking, then resolve event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const object = this.map.gameObjects[this.event.faceHero];
      object.direction = utility.oppositeDirection(
        this.map.gameObjects["hero"].direction
      );
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => {
        return resolve();
      },
    });
    message.init(document.querySelector(".game-container"));
  }

  // changeMap(resolve) {
  //   Objects.values(this.map.gameObjects).forEach((object) => {
  //     object.isMounted = false;
  //   });

  //   this.map.world.startMap(window.OverworldMaps[this.event.map]);
  //   resolve();
  // }

  battle(resolve) {
    const battle = new Battle({
      map: this.map,
      enemy: window.Enemies[this.event.enemyId],
      overworldId: this.event.overworldId,
      onComplete: () => {
        return resolve();
      },
    });
    battle.init(document.querySelector(".game-container"));
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}
