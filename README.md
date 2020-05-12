# 6835-final-project
6.835 Final Project SynthViz, a synesthesia simulator

To run the project, open 'index.html' in a browser.  I have only tested in Firefox.

The files I created include:
- 'index.html' which is the html for the app
- 'index.js' which has the code for mapping pitch to color and updating the visual.
- 'index.css' has all the stlying for the app
- 'leapfuncs.js' has the function for handling the leap updates and gesture recognision.  Calls funciton to shift the piano in 'playKeyboard.js' if a swipe detected. 

I used Joe Liang's keyboard implementation in 'playKeyboard.js' as starter code for my virtual piano but heavily modified it to suit my application and add some functionality (like shifting up and down octaves).

I used Keith Horwood's 'audiosynth.js' as is to generate sound.

I used Chris Wilson's 'pitchdetect.js' to record audio and detect pitch, with some modifications. 
