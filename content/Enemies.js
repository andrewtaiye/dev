window.Enemies = {
  trainingSlime: {
    name: "Dorothy",
    fighters: {
      trainingSlime: {
        fighterId: "trainingSlime",
        generateStats: false,
        levelSpread: {
          lower: 0,
          upper: 0,
        },
        maxHp: 10,
        level: 1,
        stats: {
          attack: 0,
          defence: 0,
          speed: 0,
        },
      },
    },
  },
  greenSlime: {
    name: "Green Slime",
    fighters: {
      greenSlime: {
        fighterId: "greenSlime",
        generateStats: true,
        levelSpread: {
          lower: 2,
          upper: 2,
        },
        maxHp: 20,
        level: null,
        levelLimits: {
          lower: 1,
          upper: 8,
        },
        stats: {
          attack: null,
          defence: null,
          speed: null,
        },
      },
    },
  },
  blueSlime: {
    name: "Blue Slime",
    fighters: {
      greenSlime: {
        fighterId: "blueSlime",
        generateStats: true,
        levelSpread: {
          lower: 2,
          upper: 2,
        },
        maxHp: 20,
        level: null,
        levelLimits: {
          lower: 4,
          upper: 12,
        },
        stats: {
          attack: null,
          defence: null,
          speed: null,
        },
      },
    },
  },
  redSlime: {
    name: "Red Slime",
    fighters: {
      greenSlime: {
        fighterId: "redSlime",
        generateStats: true,
        levelSpread: {
          lower: 2,
          upper: 2,
        },
        maxHp: 20,
        level: null,
        levelLimits: {
          lower: 6,
          upper: 15,
        },
        stats: {
          attack: null,
          defence: null,
          speed: null,
        },
      },
    },
  },
  orangeSlime: {
    name: "Orange Slime",
    fighters: {
      greenSlime: {
        fighterId: "orangeSlime",
        generateStats: true,
        levelSpread: {
          lower: 2,
          upper: 2,
        },
        maxHp: 20,
        level: null,
        levelLimits: {
          lower: 8,
          upper: 17,
        },
        stats: {
          attack: null,
          defence: null,
          speed: null,
        },
      },
    },
  },
  whiteSlime: {
    name: "White Slime",
    fighters: {
      greenSlime: {
        fighterId: "whiteSlime",
        generateStats: true,
        levelSpread: {
          lower: 2,
          upper: 2,
        },
        maxHp: 20,
        level: null,
        levelLimits: {
          lower: 10,
          upper: 20,
        },
        stats: {
          attack: null,
          defence: null,
          speed: null,
        },
      },
    },
  },
  babyBronzeDragon: {
    name: "Baby Bronze Dragon",
    fighters: {
      babyBronzeDragon: {
        fighterId: "babyBronzeDragon",
        generateStats: true,
        levelSpread: {
          lower: 0,
          upper: 10,
        },
        maxHp: 100,
        level: null,
        levelLimits: {
          lower: 12,
          upper: 30,
        },
        stats: {
          attack: 35,
          defence: 15,
          speed: 10,
        },
      },
    },
  },
  babyWhiteDragon: {
    name: "Baby white Dragon",
    fighters: {
      babyWhiteDragon: {
        fighterId: "babyWhiteDragon",
        generateStats: true,
        levelSpread: {
          lower: 0,
          upper: 10,
        },
        maxHp: 100,
        level: null,
        levelLimits: {
          lower: 13,
          upper: 30,
        },
        stats: {
          attack: 35,
          defence: 15,
          speed: 10,
        },
      },
    },
  },
  adultRedDragon: {
    name: "Adult Red Dragon",
    fighters: {
      adultRedDragon: {
        fighterId: "adultRedDragon",
        generateStats: true,
        levelSpread: {
          lower: -2,
          upper: 10,
        },
        maxHp: 100,
        level: null,
        levelLimits: {
          lower: 20,
          upper: 45,
        },
        stats: {
          attack: 35,
          defence: 15,
          speed: 10,
        },
      },
    },
  },
};
