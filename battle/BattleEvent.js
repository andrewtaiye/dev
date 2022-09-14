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
      console.log(this);
      target.update({
        hp:
          target.hp -
          Math.ceil(
            (damage *
              Math.max(
                0,
                100 +
                  (caster.level - target.level) * 5 +
                  caster.stats.attack * 5
              )) /
              100 -
              target.stats.defence * 3
          ),
      });

      if (caster.isPlayerControlled) {
        caster.stats.attackXp += 1;
        if (caster.stats.attackXp === caster.stats.attackMaxXp) {
          caster.stats.attack += 1;
          caster.stats.attackXp = 0;
          caster.stats.attackMaxXp = caster.stats.attack * 100;
        }
      }
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

    if (status) {
      let statusApplied = utility.randomFromArray(status.isApplied);
      if (statusApplied && status.targetType === "friendly") {
        who = caster;
        who.update({
          status: { ...status },
        });
      }
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
    const { caster } = this.event;

    const menu = new SubmissionMenu({
      caster: caster,
      enemy: this.event.enemy,
      items: this.battle.items,
      replacements: Object.values(this.battle.combatants).filter(
        (combatants) => {
          return (
            combatants.id !== caster.id &&
            combatants.team === caster.team &&
            combatants.hp > 0
          );
        }
      ),
      onWinner: this.battle.turnCycle.onWinner,
      onComplete: (submission) => {
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  giveXp(resolve) {
    let amount = this.event.xp;
    const { combatant } = this.event;
    const step = () => {
      if (amount > 0) {
        amount -= 1;
        combatant.xp += 1;

        // check if level up is achieved
        if (combatant.xp === combatant.maxXp) {
          combatant.xp = 0;
          combatant.maxXp = 100;
          combatant.level += 1;
        }

        combatant.update();
        requestAnimationFrame(step);
        return;
      }
      resolve();
    };
    requestAnimationFrame(step);
  }

  animation(resolve) {
    const fn = window.BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
