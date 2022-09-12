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
    // console.log(this.event);
    const { caster, target, damage, recover, status } = this.event;
    let who = this.event.onCaster ? caster : target;

    if (damage) {
      // modify target to have less HP
      target.update({
        hp: target.hp - damage,
      });

      // start blinking
      target.spriteElement.classList.add("battle-damage-blink");
    }

    if (recover) {
      let newHp = who.hp + recover;
      if (newHp > who.maxHp) {
        newHp = who.maxHp;
      }
      who.update({
        hp: newHp,
      });
    }

    let statusApplied = utility.randomFromArray(status.isApplied);
    // console.log(statusApplied);
    if (status && statusApplied) {
      if (status.targetType === "friendly") {
        who = caster;
      }
      who.update({
        status: { ...status },
      });
    }

    if (status === null) {
      who.update({
        status: null,
      });
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

  animation(resolve) {
    const fn = window.BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
