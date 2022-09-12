class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  textMessage(resolve) {
    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);

    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });
    message.init(this.battle.element);
  }

  async stateChange(resolve) {
    const { caster, target, damage } = this.event;
    if (damage) {
      // modify target to have less HP
      target.update({
        hp: target.hp - damage,
      });

      // start blinking
      target.spriteElement.classList.add("battle-damage-blink");
    }

    // wait a little for blinking to happen
    await utility.wait(600);

    // stop blinking
    target.spriteElement.classList.remove("battle-damage-blink");

    resolve();
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (submission) => {
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
