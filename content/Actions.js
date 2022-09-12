window.Actions = {
  headbutt: {
    name: "Headbutt",
    success: [
      { type: "textMessage", text: "{CASTER} used {ACTION}!" },
      //   { type: "animation", animation: "toBeDefined" },
      { type: "stateChange", damage: 10 },
    ],
  },
};
