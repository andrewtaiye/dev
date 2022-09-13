class TurnCycle {
  constructor({ battle, onNewEvent }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
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
      resultingEvents = submission.action.success;
      this.battle.items = this.battle.items.filter(
        (item) => item.instanceId !== submission.instanceId
      );
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
    }

    // Do we have a winning team?
    const winner = this.getWinningTeam();
    console.log({ winner: winner });
    if (winner) {
      // End battle
      await this.onNewEvent({
        type: "textMessage",
        text: "You have defeated you enemy!",
      });
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
    console.log({ combatants: this.battle.combatants });
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
