window.Actions = {
  headbutt: {
    name: "Headbutt",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: 10,
        status: { type: "Dizzy", targetType: "friendly", expiresIn: 2 },
      },
      { type: "textMessage", text: "{CASTER} became dizzy!" },
    ],
  },
  healingStatus: {
    name: "Heal",

    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      {
        type: "stateChange",
        status: { type: "Healing", targetType: "friendly", expiresIn: 2 },
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
        status: { type: "Healing", targetType: "friendly", expiresIn: 5 },
      },
    ],
  },
};
