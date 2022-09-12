window.Actions = {
  headbutt: {
    name: "Headbutt",
    description: "Use your head!",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: 15,
        status: {
          type: "Dizzy",
          targetType: "friendly",
          isApplied: [true, false], // array to decide whether it is applied. Here is 50% chance.
          expiresIn: 3,
          statusEvents: [
            { type: "textMessage", text: "{CASTER} became dizzy!" },
          ],
        },
      },
    ],
  },
  tackle: {
    name: "Tackle",
    description: "Tackle the opponent!",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 5 },
    ],
  },
  healingStatus: {
    name: "Heal",
    targetType: "friendly",

    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      {
        type: "stateChange",
        status: {
          type: "Healing",
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
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      {
        type: "stateChange",
        status: {
          type: "Healing",
          targetType: "friendly",
          isApplied: [true],
          expiresIn: 5,
        },
      },
    ],
  },
};
