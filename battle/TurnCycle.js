class TurnCycle {
  constructor({ battle, onNewEvent, onWinner }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.onWinner = onWinner;
    this.currentTeam = "player"; // or enemy
  }

  async turn() {
    // get the caster
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId =
      this.battle.activeCombatants[
        caster.team === "player" ? "enemy" : "player"
      ];
    const enemy = this.battle.combatants[enemyId];

    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      enemy,
    });

    // Stop here is replacing main fighter
    if (submission.replacement) {
      await this.onNewEvent({
        type: "replace",
        replacement: submission.replacement,
      });
      await this.onNewEvent({
        type: "textMessage",
        text: "Go Get 'Em!",
      });
      return;
    }

    let resultingEvents;

    if (submission.instanceId === null) {
      resultingEvents = caster.getReplacedEvents(submission.action.success);
    } else {
      // add to list to persist to player state
      this.battle.usedInstanceIds[submission.instanceId] = true;

      // removing item from battle state
      this.battle.items = this.battle.items.filter(
        (item) => item.instanceId !== submission.instanceId
      );
      resultingEvents = submission.action.success;
    }

    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      };
      // console.log(event);
      await this.onNewEvent(event);
    }

    // Did the target die?
    const targetDead = submission.target.hp <= 0;
    if (targetDead) {
      await this.onNewEvent({
        type: "textMessage",
        text: `${submission.target.name} has no more HP!`,
      });

      if (submission.target.team === "enemy") {
        const playerActiveFighterId = this.battle.activeCombatants.player;
        const xp = submission.target.givesXp;

        await this.onNewEvent({
          type: "textMessage",
          text: `Gained ${xp}XP!`,
        });

        await this.onNewEvent({
          type: "giveXp",
          xp,
          combatant: this.battle.combatants[playerActiveFighterId],
        });
      }
    }

    // Do we have a winning team?
    const winner = this.getWinningTeam();
    if (winner) {
      // End battle
      let endingMessage;

      if (winner === "player") {
        endingMessage = "You have defeated your enemy!";
      } else {
        endingMessage = "You have been defeated!";
      }

      await this.onNewEvent({
        type: "textMessage",
        text: endingMessage,
      });
      this.onWinner(winner);
      return;
    }

    // check for post events (events after original turn submission)
    const postEvents = caster.getPostEvents();
    for (let i = 0; i < postEvents.length; i++) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      };
      await this.onNewEvent(event);
    }

    // Check for status expiry
    const expiredEvent = caster.decrementStatus();
    if (expiredEvent) {
      await this.onNewEvent(expiredEvent);
    }

    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
    this.turn();
  }

  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.battle.combatants).forEach((combatant) => {
      if (combatant.hp > 0) {
        aliveTeams[combatant.team] = true;
      }
    });
    if (!aliveTeams["player"]) {
      return "enemy";
    }
    if (!aliveTeams["enemy"]) {
      return "player";
    }
    return null;
  }

  async init() {
    // console.log(this);
    await this.onNewEvent({
      type: "textMessage",
      text: `${
        this.battle.combatants[this.battle.activeCombatants.enemy].name
      } is getting ready to attack!`,
    });

    // start first turn
    this.turn();
  }
}
