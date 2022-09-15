class PlayerState {
  constructor() {
    this.fighters = {
      player: {
        fighterId: "hero",
        hp: 50,
        maxHp: 50,
        xp: 49,
        maxXp: 50,
        level: 1,
        status: null,
        isPlayerControlled: true,
        stats: {
          attack: 1,
          attackXp: 95,
          attackMaxXp: 100,
          defence: 1,
          defenceXp: 0,
          defenceMaxXp: 100,
          speed: 1,
          speedXp: 0,
          speedMaxXp: 1600,
        },
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
