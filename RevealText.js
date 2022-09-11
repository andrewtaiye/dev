class RevealText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 40;

    this.timeout = null;
    this.isDone = false;
  }

  revealOneCharacter(listOfCharacters) {
    const next = listOfCharacters.splice(0, 1)[0];
    next.span.classList.add("revealed");
    console.log(listOfCharacters, next);

    if (listOfCharacters.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(listOfCharacters);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  skipToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll("span").forEach((span) => {
      span.classList.add("revealed");
    });
  }

  init() {
    let characters = [];
    this.text.split("").forEach((character) => {
      let span = document.createElement("span");
      span.textContent = character;
      this.element.appendChild(span);

      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }
}
