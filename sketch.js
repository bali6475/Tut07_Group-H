let img, song, fft, analyser; // For picture and audio analysis
let columns = 12; // Control columns
let rows = 12;    // Control Rows
let rectWidth, rectHeight; // Width and height of the rectangle

let rmsHistory = 0; //Used to smooth out volume (rms) changes and extend dynamics

function preload() {
  // Loading images
  img = loadImage('data/images.jpg'); // Make sure the image path is correct
  // Load the audio file
  song = loadSound('data/music-box-loop-31.wav', loaded, loadError);
}

function loaded() {
  // Make sure the audio has loaded correctly and start playing
  song.loop();
}

function loadError() {
  console.error("File loading failed!！");
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Setting the canvas size
  rectWidth = width / columns; // Width of each rectangle
  rectHeight = height / rows; // Height of each rectangle

  // Initialising the FFT analysis
  fft = new p5.FFT();
  analyser = new p5.Amplitude();

  // Connecting inputs and outputs
  analyser.setInput(song);

  // Add play/pause button
  let button = createButton('Play/Pause');
  button.position((width - button.width) / 2, height - button.height - 2);
  button.mousePressed(play_pause);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  // Automatic canvas resizing
  redraw();  // Redraw the graph
}

function draw() {
  background(255); // White background

  // Obtaining the frequency spectrum of the audio (using FFT analysis)
  let spectrum = fft.analyze();

  //Use smooth transitions to extend dynamic effects
  let rms = analyser.getLevel();
  rmsHistory = lerp(rmsHistory, rms, 0.1);  // Smoothing rms values by lerp to extend dynamics

  // Plotting bar charts
  drawMondrianStyle(spectrum);

  // Drawing ellipses with dynamic changes in volume (showing how loud the volume is)
  fill(127);
  ellipse(width / 2, height / 2, 10 + rmsHistory * 200, 10 + rmsHistory * 200);
}

function drawMondrianStyle(spectrum) {
  let colorList = [
    [255, 0, 0],   // Red
    [255, 255, 0], // Yellow
    [0, 0, 255],   // Blue
    [0, 0, 0]      // Black
  ];

  let rectIndex = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let x = col * rectWidth;
      let y = row * rectHeight;

      // Colours are determined by the frequency intensity of the audio
      let colorIndex = Math.floor(map(spectrum[rectIndex], 0, 255, 0, colorList.length));
      let chosenColor = colorList[colorIndex];

      // Use smoothing variations to slow down the rate of change of the rectangle
      let lerpedColor = lerpColor(color(chosenColor[0], chosenColor[1], chosenColor[2]), color(255), 0.1);

      // Drawing colour blocks
      fill(lerpedColor);
      noStroke();
      rect(x, y, rectWidth, rectHeight);

      // Move to the next rectangle
      rectIndex++;
    }
  }
}

function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    // Loop Audio
    song.loop();
  }
}




