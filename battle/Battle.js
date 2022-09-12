class Battle {
  constructor() {
    this.combatants = {
      player1: new Combatant(
        {
          ...Fighters["hero"],
          team: "player",
          hp: 50,
          maxHp: 50,
          xp: 0,
          level: 1,
          status: null,
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...Fighters["greenSlime"],
          team: "enemy",
          hp: 50,
          maxHp: 50,
          xp: 0,
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
          xp: 0,
          level: 1,
          status: null,
        },
        this
      ),
    };
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("battle");
    this.element.innerHTML = `
        <div class="battle-hero">
            <img src="${"assets/characters/people/hero.png"}" alt='Hero' />
        </div>
        <div class="battle-enemy">
            <img src="${"assets/characters/people/npc3.png"}" alt='Hero' />
        </div>
`;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
