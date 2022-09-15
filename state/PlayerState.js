class PlayerState {
  constructor() {
    this.fighters = {
      player: {
        fighterId: "hero",
        hp: 50,
        maxHp: 50,
        xp: 0,
        maxXp: 50,
        level: 2,
        status: null,
        isPlayerControlled: true,
        stats: {
          attack: 5,
          attackXp: 0,
          attackMaxXp: 50,
          defence: 5,
          defenceXp: 0,
          defenceMaxXp: 50,
          speed: 5,
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
