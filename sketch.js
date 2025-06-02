function setup() {
  createCanvas(800, 800);
  background(255);
  noLoop();

  let y = 0;
  let lastColor = null;

  while (y < height) {
    let x = 0;
    let rowHeight = Math.round(random(60, 150));

    while (x < width) {
      let w = Math.round(random(60, 150));
      let h = rowHeight;

      if (x + w > width) {
        w = width - x;
      }
      if (y + h > height) {
        h = height - y;
      }

      let colorList = [
        [255, 255, 255],
        [255, 255, 255],
        [255, 255, 255],
        [255, 255, 255],
        [255, 0, 0],
        [255, 230, 90],
        [0, 102, 255],
        [0, 0, 0]
      ];

      let chosenColor = null;

      while (true) {
        let index = Math.floor(random(colorList.length));
        let candidate = colorList[index];

        let isWhite = candidate[0] === 255 && candidate[1] === 255 && candidate[2] === 255;

        if (lastColor == null || isWhite || !colorsEqual(candidate, lastColor)) {
          chosenColor = candidate;
          break;
        }
      }

      fill(chosenColor[0], chosenColor[1], chosenColor[2]);
      stroke(0);
      strokeWeight(8);
      rect(x, y, w, h);


      if (!(chosenColor[0] === 255 && chosenColor[1] === 255 && chosenColor[2] === 255)) {
        lastColor = chosenColor;
      }

      x += w;
    }

    y += rowHeight;
  }
}

function colorsEqual(c1, c2) {
  return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
}
