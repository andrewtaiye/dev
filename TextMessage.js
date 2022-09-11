class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("text-message");
    this.element.innerHTML = `
        <p class="text-message-p"></p>
        <button class="text-message-btn">Next</button>
        `;

    this.revealingText = new RevealText({
      element: this.element.querySelector(".text-message-p"),
      text: this.text,
    });

    this.element.querySelector("button").addEventListener("click", () => {
      // Close the text message.
      this.done();
    });

    this.actionListener = new KeypressListener("KeyZ", () => {
      this.done();
    });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.skipToDone();
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
