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
  heal: {
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
  greaterHeal: {
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
  item_smallHpPotion: {
    name: "Small Healing Potion",
    description: "Heals 15HP",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", recover: 15 },
      { type: "textMessage", text: "Healed 15HP!" },
    ],
  },
  item_panadol: {
    name: "Panadol",
    description: "Recovers from dizzy status",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      { type: "stateChange", status: null },
      { type: "textMessage", text: "{CASTER} is no longer dizzy!" },
    ],
  },
};
