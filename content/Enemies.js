window.Enemies = {
  greenSlime: {
    name: "Green Slime",
    src: "./assets/characters/monsters/slime_green.png",
    fighters: {
      greenSlime: {
        fighterId: "greenSlime",
        generateStats: true,
        maxHp: 50,
        level: 1,
        stats: {
          attack: 1,
          defence: 1,
          speed: 1,
        },
      },
    },
  },
  babyBronzeDragon: {
    name: "Baby Bronze Dragon",
    src: "./assets/characters/monsters/dragon_baby_bronze.png",
    fighters: {
      babyBronzeDragon: {
        fighterId: "babyBronzeDragon",
        generateStats: true,
        maxHp: 10,
        level: 20,
        stats: {
          attack: 35,
          defence: 15,
          speed: 10,
        },
      },
    },
  },
};
