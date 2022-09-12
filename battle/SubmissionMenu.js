class SubmissionMenu {
  constructor({ caster, enemy, onComplete }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
  }

  getPages() {
    const backOption = {
      label: "Back",
      description: "Return to previous page",
      handler: () => {
        this.keyboardMenu.setOptions(this.getPages().root);
      },
    };

    return {
      root: [
        {
          label: "Attack",
          description: "Select an attack",
          handler: () => {
            // do something when chosen
            this.keyboardMenu.setOptions(this.getPages().attacks);
          },
        },
        {
          label: "Items",
          // disabled: true,
          description: "Select an item",
          handler: () => {
            // do something when chosen
            this.keyboardMenu.setOptions(this.getPages().items);
          },
        },
        {
          label: "Swap",
          description: "Swap Something",
          handler: () => {
            // do something when chosen
            console.log("go to swap page");
          },
        },
      ],
      attacks: [
        ...this.caster.actions.map((key) => {
          const action = window.Actions[key];
          return {
            label: action.name,
            description: action.description,
            handler: () => {
              this.menuSubmit(action);
            },
          };
        }),
        backOption,
      ],
      items: [backOption],
    };
  }

  menuSubmit(action, instanceId = null) {
    this.keyboardMenu?.end();

    this.onComplete({
      action,
      target: action.targetType === "friendly" ? this.caster : this.enemy,
    });
  }

  decide() {
    this.menuSubmit(window.Actions[this.caster.actions[0]]);
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions(this.getPages().root);
  }

  init(container) {
    if (this.caster.isPlayerControlled) {
      // show some UI
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}
