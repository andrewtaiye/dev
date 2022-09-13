class SubmissionMenu {
  constructor({ caster, enemy, onComplete, items }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;

    let quantityMap = {};
    items.forEach((item) => {
      if (item.team === caster.team) {
        let existing = quantityMap[item.actionId];
        if (existing) {
          existing.quantity += 1;
        } else {
          quantityMap[item.actionId] = {
            actionId: item.actionId,
            quantity: 1,
            instanceId: item.instanceId,
          };
        }
      }
    });
    this.items = Object.values(quantityMap);
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
      items: [
        ...this.items.map((item) => {
          const action = window.Actions[item.actionId];
          return {
            label: action.name,
            description: action.description,
            right: () => {
              return "x" + item.quantity;
            },
            handler: () => {
              this.menuSubmit(action, item.instanceId);
            },
          };
        }),
        backOption,
      ],
    };
  }

  menuSubmit(action, instanceId = null) {
    this.keyboardMenu?.end();

    this.onComplete({
      action,
      target: action.targetType === "friendly" ? this.caster : this.enemy,
      instanceId,
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
