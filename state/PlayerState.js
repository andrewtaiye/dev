class PlayerState {
  constructor() {
    this.fighters = {
      player: {
        fighterId: "hero",
        hp: 10,
        maxHp: 50,
        xp: 95,
        maxXp: 100,
        level: 1,
        status: null,
        isPlayerControlled: true,
      },
    };
    this.lineUp = ["player"];
    this.items = [
      { actionId: "item_smallHpPotion", instanceId: "item1" },
      { actionId: "item_smallHpPotion", instanceId: "item2" },
      { actionId: "item_panadol", instanceId: "item3" },
    ];
  }
}

window.playerState = new PlayerState();
