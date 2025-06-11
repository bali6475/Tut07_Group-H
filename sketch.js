let img, song, fft, analyser; // 用于图片和音频分析
let columns = 12; // 控制列数
let rows = 12;    // 控制行数
let rectWidth, rectHeight; // 矩形的宽度和高度

let rmsHistory = 0; // 用来平滑音量（rms）变化，延长动态效果

function preload() {
  // 加载图片
  img = loadImage('data/images.jpg'); // 确保图片路径正确
  // 加载音频文件
  song = loadSound('data/music-box-loop-31.wav', loaded, loadError);
}

function loaded() {
  // 确保音频已经正确加载，开始播放
  song.loop();
}

function loadError() {
  console.error("音频文件加载失败！");
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // 设置画布大小
  rectWidth = width / columns; // 每个矩形的宽度
  rectHeight = height / rows; // 每个矩形的高度

  // 初始化FFT分析
  fft = new p5.FFT();
  analyser = new p5.Amplitude();

  // 连接输入和输出
  analyser.setInput(song);

  // 添加播放/暂停按钮
  let button = createButton('Play/Pause');
  button.position((width - button.width) / 2, height - button.height - 2);
  button.mousePressed(play_pause);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  // 自动调整画布大小
  redraw();  // 重新绘制图形
}

function draw() {
  background(255); // 背景为白色

  // 获取音频的频率光谱（使用FFT分析）
  let spectrum = fft.analyze();

  // 使用平滑过渡来延长动态效果
  let rms = analyser.getLevel();
  rmsHistory = lerp(rmsHistory, rms, 0.1);  // 通过lerp来平滑rms值，延长动态效果

  // 绘制柱状图
  drawMondrianStyle(spectrum);

  // 绘制音量动态变化的椭圆（显示音量的大小）
  fill(127);
  ellipse(width / 2, height / 2, 10 + rmsHistory * 200, 10 + rmsHistory * 200);
}

function drawMondrianStyle(spectrum) {
  let colorList = [
    [255, 0, 0],   // 红色
    [255, 255, 0], // 黄色
    [0, 0, 255],   // 蓝色
    [0, 0, 0]      // 黑色
  ];

  let rectIndex = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let x = col * rectWidth;
      let y = row * rectHeight;

      // 根据音频的频率强度决定颜色
      let colorIndex = Math.floor(map(spectrum[rectIndex], 0, 255, 0, colorList.length));
      let chosenColor = colorList[colorIndex];

      // 使用平滑的变化来减缓矩形的变化速度
      let lerpedColor = lerpColor(color(chosenColor[0], chosenColor[1], chosenColor[2]), color(255), 0.1);

      // 绘制色块
      fill(lerpedColor);
      noStroke();
      rect(x, y, rectWidth, rectHeight);

      // 移动到下一个矩形
      rectIndex++;
    }
  }
}

function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    // 循环播放音频
    song.loop();
  }
}


