class Battle {
  constructor() {
    this.combatants = {
      player1: new Combatant(
        {
          ...Fighters["hero"],
          team: "player",
          hp: 40,
          maxHp: 50,
          xp: 20,
          maxXp: 100,
          level: 1,
          status: {
            type: "Healing",
            expiresIn: 3,
          },
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...Fighters["greenSlime"],
          team: "enemy",
          hp: 50,
          maxHp: 50,
          xp: 50,
          maxXp: 100,
          level: 1,
          status: null,
        },
        this
      ),
      enemy2: new Combatant(
        {
          ...Fighters["blueSlime"],
          team: "enemy",
          hp: 50,
          maxHp: 50,
          xp: 70,
          maxXp: 100,
          level: 1,
          status: null,
        },
        this
      ),
    };
    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1",
    };
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("battle");
    //     this.element.innerHTML = `
    //         <div class="battle-hero">
    //             <img src="${"assets/characters/people/hero.png"}" alt='Hero' />
    //         </div>
    //         <div class="battle-enemy">
    //             <img src="${"assets/characters/people/npc3.png"}" alt='Hero' />
    //         </div>
    // `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);
    });

    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: (event) => {
        return new Promise((resolve) => {
          const battleEvent = new BattleEvent(event, this);
          battleEvent.init(resolve);
        });
      },
    });

    this.turnCycle.init();
  }
}
