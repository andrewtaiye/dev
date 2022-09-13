class Battle {
  constructor({ map, enemy, overworldId, onComplete }) {
    this.map = map;
    this.enemy = enemy;
    this.overworldId = overworldId;
    this.onComplete = onComplete;

    this.combatants = {
      // player1: new Combatant(
      //   {
      //     ...Fighters["hero"],
      //     team: "player",
      //     hp: 50,
      //     maxHp: 50,
      //     xp: 95,
      //     maxXp: 100,
      //     level: 1,
      //     status: null,
      //     isPlayerControlled: true,
      //   },
      //   this
      // ),
      // enemy1: new Combatant(
      //   {
      //     ...Fighters["greenSlime"],
      //     team: "enemy",
      //     hp: 1,
      //     maxHp: 50,
      //     xp: 50,
      //     maxXp: 100,
      //     level: 1,
      //     status: null,
      //   },
      //   this
      // ),
      // enemy2: new Combatant(
      //   {
      //     ...Fighters["blueSlime"],
      //     team: "enemy",
      //     hp: 50,
      //     maxHp: 50,
      //     xp: 70,
      //     maxXp: 100,
      //     level: 1,
      //     status: null,
      //   },
      //   this
      // ),
    };

    this.activeCombatants = {
      player: null,
      enemy: null,
    };

    // Dynamically add player
    window.playerState.lineUp.forEach((id) => {
      this.addCombatant(id, "player", window.playerState.fighters[id]);
    });
    // Dynamically add enemy
    Object.keys(this.enemy.fighters).forEach((key) => {
      this.addCombatant("e_" + key, "enemy", this.enemy.fighters[key]);
    });

    // start empty
    this.items = [];

    // add in player items
    window.playerState.items.forEach((item) => {
      this.items.push({
        ...item,
        team: "player",
      });
    });

    this.usedInstanceIds = {};
  }

  addCombatant(id, team, config) {
    this.combatants[id] = new Combatant(
      {
        ...window.Fighters[config.fighterId],
        ...config,
        team,
        isPlayerControlled: team === "player",
      },
      this
    );

    // Populate teams
    this.activeCombatants[team] = this.activeCombatants[team] || id;
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
      onWinner: (winner) => {
        if (winner === "player") {
          const playerState = window.playerState;
          Object.keys(playerState.fighters).forEach((id) => {
            const playerStateFighter = playerState.fighters[id];
            const combatant = this.combatants[id];
            if (combatant) {
              playerStateFighter.hp = combatant.hp;
              playerStateFighter.xp = combatant.xp;
              playerStateFighter.maxXp = combatant.maxXp;
              playerStateFighter.level = combatant.level;
            }
          });

          console.log(this);

          // get rid of player used items
          playerState.items = playerState.items.filter((item) => {
            return !this.usedInstanceIds[item.instanceId];
          });
        }

        this.element.remove();
        this.onComplete();
      },
    });

    this.turnCycle.init();
  }
}
