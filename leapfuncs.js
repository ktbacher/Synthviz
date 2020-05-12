var leftSwipes = 0;
var rightSwipes = 0;
var d = new Date();
Leap.loop({ hand: function(hand) {
    // console.log(hand.frame.gestures);
    for (i=0;i<hand.frame.gestures.length;i++) {
        if (hand.frame.gestures[i].type == "swipe" ) {//&& hand.frame.gestures[i].state == "stop") {
            if ((new Date() -d)/1000>1) {
                if (hand.frame.gestures[i].direction[0]>0) {
                    rightSwipes++;
                    shiftPiano(-1);
                } else {
                    leftSwipes ++;
                    shiftPiano(1);
                }
                d = new Date();
            }
        }
        // console.log("right: ", rightSwipes);
        // console.log("left: ", leftSwipes);
    }
}});
