class TitleScreen {
  constructor() {
    this.element = null;
  }

  getOptions(resolve) {
    return [
      {
        label: "Start Game",
        description: "Start your isekai adventure!",
        handler: () => {
          this.close();
          resolve();
        },
      },
    ];
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("title-screen");

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = "Mis-Matched Adventures";

    this.element.append(title);
  }

  close() {
    this.keyboardMenu.end();
    this.element.remove();
  }

  init(container) {
    return new Promise((resolve) => {
      this.createElement();
      container.appendChild(this.element);
      this.keyboardMenu = new KeyboardMenu();
      this.keyboardMenu.init(this.element);
      this.keyboardMenu.setOptions(this.getOptions(resolve));
    });
  }
}
