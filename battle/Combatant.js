class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
    this.battle = battle;
  }

  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);

    this.hudElement.innerHTML = `
        <p class="combatant-name">${this.name}</p>
        <p class="combatant-level"></p>
        <div class="combatant-character-crop">
            <img class="combatant-character" alt="${this.name}" src="${this.src}" />
        </div>
        <img class="combatant-type" src="${this.icon}" alt="${this.type} />
        <svg viewBox=" 0 0 26 3" class="combatant-life-container">
            <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
            <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
        </svg>
        <svg viewBox=" 0 0 26 2" class="combatant-xp-container">
            <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
            <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
        </svg>
        <p class="combatant-status"></p>
    `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);

    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);
    });
  }
}
