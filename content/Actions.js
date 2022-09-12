window.Actions = {
  headbutt: {
    name: "Headbutt",
    description: "Deals 15 damage",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: 15,
        status: {
          type: "dizzy",
          category: "Dizzy",
          targetType: "friendly",
          isApplied: [true], // array to decide whether it is applied. Here is 50% chance.
          expiresIn: 3,
          statusEvents: { type: "textMessage", text: "{CASTER} became dizzy!" },
        },
      },
      { type: "textMessage", text: "{CASTER} became dizzy!" },
    ],
  },
  tackle: {
    name: "Tackle",
    description: "Deals 5 damage",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 5 },
    ],
  },
  healingStatus: {
    name: "Heal",
    targetType: "friendly",
    description: "Heals 5HP for 2 turns",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      {
        type: "stateChange",
        status: {
          type: "healing",
          category: "Healing",
          targetType: "friendly",
          isApplied: [true],
          expiresIn: 2,
        },
      },
    ],
  },
  healingStatus2: {
    name: "Greater Heal",
    targetType: "friendly",
    description: "Heals 10HP for 3 turns",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      {
        type: "stateChange",
        status: {
          type: "greaterHealing",
          category: "Healing",
          targetType: "friendly",
          isApplied: [true],
          expiresIn: 3,
        },
      },
    ],
  },
};
