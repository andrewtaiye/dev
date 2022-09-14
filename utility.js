const utility = {
  withGrid(n) {
    return n * 16;
  },

  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },

  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;

    if (direction === "left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }

    return { x, y };
  },

  oppositeDirection(direction) {
    if (direction === "left") {
      return "right";
    }
    if (direction === "right") {
      return "left";
    }
    if (direction === "up") {
      return "down";
    }
    return "up";
  },

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

  randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  randomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  damageFormula(damage, casterLevel, targetLevel, casterAttack, targetDefence) {
    return Math.max(
      0,
      Math.ceil(
        (damage *
          Math.max(
            0,
            100 + (casterLevel - targetLevel) * 10 + casterAttack * 10
          )) /
          100 -
          targetDefence * 3
      )
    );
  },

  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail,
    });
    document.dispatchEvent(event);
  },
};
