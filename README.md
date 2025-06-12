# Creative Coding Major Project
## AUDIO-Boogie Woogie
### bali6475_Tut07_Group H

#### Introduction
This project is a dynamic music visualisation tool built using **p5.js** to create dynamic **Mondrian style** displays based on the frequency and volume of the audio. The colour of the blocks changes according to the rhythm of the audio and the project includes an interactive play/pause button and smooth animation effects synchronised with the music.

#### How to Interact
- After loading the page, click the **Play/Pause** button to start or stop the music.
- While the music is playing, the rectangle in the screen will change according to the frequency and volume of the audio.
- You can refresh the page to restart the animation, or click the Play button to pause or resume the music.

#### How animations are implemented
In my personal implementation:
- **Audio-driven**: the animation is driven by the **Audio Frequency** data, using p5.js's `FFT` (Fast Fourier Transform) and `Amplitude` methods to get the frequency and volume of the audio in real time. 
- **Animation properties**:
  - **Colour**: the colour of the rectangle changes according to the intensity of the audio, the colour changes between red, yellow, blue and black.
  - **Size**: the size of the rectangle changes according to the volume of the audio (RMS).
  - **Smooth transitions**: Smooth colour transitions with the `lerpColor()` function to ensure smoother rectangle colour changes.

  #### Unique
  My animation method focuses on colour and size changes that are synchronised with the frequency and volume of the music. Unlike the work of the other panelists, my animation focuses on **random selection of colours** where the colour of the rectangle will randomly switch between red, yellow, blue and black.

  #### Inspiration
  My work is inspired by the **Mondrian art style**, which is known for its grid-like structure and use of primary colours. I wanted to translate this into an art form through audio data that echoed the rhythm and dynamics of the music.

  #### Technique Explanation
  - **FFT**: Fast Fourier Transform is used to decompose audio into multiple frequency bands. The amplitude of each frequency band is used to control the height of the rectangles (histograms) and the change in colour.
- **Amplitude**: Volume data is obtained via `getLevel()` and the size of the rectangle is controlled based on the intensity of the volume.
- **lerpColor()**: this function makes the colour change smoother and avoids overly abrupt changes.

#### Code Explanation
- **FFT**: analyses the frequency data of the audio by Fast Fourier Transform.
- **Amplitude**: resize the rectangle by getting volume data.
- **lerpColor()**: smooth the colour change to avoid the colour switching too fast.

#### Changes compared to the panel code
In my code:
- I introduced the **colour random selection** function, which was not the original intent of the group code.
- I used the `lerpColor()` function to smooth out the colour transitions and ensure a smooth visual effect.

#### External Tools/References
- **p5.js documentation**: [https://p5js.org/reference/](https://p5js.org/reference/)
- **FFT Tutorial**: [https://www.youtube.com/watch?v=vXn4Wq0eX7g](https://www.youtube.com/watch?v=vXn4Wq0eX7g)

#### Conclusion
This music visualisation tool dynamically transforms music into art, with changes in audio frequency and volume driving changes in colour and rectangle size to create interesting and interactive visuals.

#### Github Link
https://github.com/bali6475/Tut07_Group-H.git
