class Battle {
  constructor({ map, enemy, overworldId, onComplete }) {
    this.map = map;
    this.enemy = enemy;
    this.overworldId = overworldId;
    this.onComplete = onComplete;

    this.combatants = {};

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
    const newConfig = JSON.parse(JSON.stringify(config));
    if (team === "enemy" && newConfig.generateStats) {
      // Generate Level
      const generatedLevel = utility.randomFromInterval(
        this.combatants.player.level - newConfig.levelSpread.lower,
        this.combatants.player.level + newConfig.levelSpread.upper
      );
      switch (true) {
        case generatedLevel <= newConfig.levelLimit.lower:
          newConfig.level = newConfig.levelLimit.lower;
          break;
        case generatedLevel >= newConfig.levelLimit.upper:
          newConfig.level = newConfig.levelLimit.upper;
          break;
        default:
          newConfig.level = generatedLevel;
      }

      // Generate Max HP
      newConfig.maxHp = window.hpTable["level" + newConfig.level];

      // Generate Atk, Def and Spd
      newConfig.stats.attack = utility.randomFromInterval(
        newConfig.level * 0.8,
        newConfig.level * 1.2
      );
      newConfig.stats.defence = utility.randomFromInterval(
        newConfig.level * 0.8,
        newConfig.level * 1.2
      );
      newConfig.stats.speed = utility.randomFromInterval(
        newConfig.level * 0.8,
        newConfig.level * 1.2
      );
    }

    // console.log(newConfig);

    this.combatants[id] = new Combatant(
      {
        ...window.Fighters[config.fighterId],
        ...newConfig,
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
        const playerState = window.playerState;
        if (winner === "player") {
          Object.keys(playerState.fighters).forEach((id) => {
            const playerStateFighter = playerState.fighters[id];
            const combatant = this.combatants[id];

            if (combatant) {
              playerStateFighter.hp = combatant.hp;
              playerStateFighter.xp = combatant.xp;
              playerStateFighter.maxXp = combatant.maxXp;
              playerStateFighter.maxHp = combatant.maxHp;
              playerStateFighter.level = combatant.level;
              playerStateFighter.status = combatant.status;
              playerStateFighter.stats = combatant.stats;
            }
          });

          this.map.gameObjects[this.overworldId].isAlive = false;
          this.map.gameObjects[this.overworldId].respawnTimer = 30000;
        }

        if (winner === "enemy") {
          Object.keys(playerState.fighters).forEach((id) => {
            const playerStateFighter = playerState.fighters[id];
            const combatant = this.combatants[id];
            if (combatant) {
              playerStateFighter.hp = 1;
              playerStateFighter.xp = combatant.xp;
              playerStateFighter.maxXp = combatant.maxXp;
              playerStateFighter.maxHp = combatant.maxHp;
              playerStateFighter.level = combatant.level;
              playerStateFighter.status = null;
            }
          });
        }

        // get rid of player used items
        playerState.items = playerState.items.filter((item) => {
          return !this.usedInstanceIds[item.instanceId];
        });

        this.element.remove();
        this.onComplete();
      },
    });

    this.turnCycle.init();
  }
}
