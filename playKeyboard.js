offset = 0;

function playKeyboard(){

	let pressColor = '#1BC0EA'; //color when key is pressed


	var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	if(isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	var __octave = 0; //sets position of middle C, normally the 4th octave
	

	// Key bindings, notes to keyCodes.
	var keyboard = {
            // /* Q */
			// 81: 'C#,-1',//'C#,-1',

			/* 1 */
			49: 'C#,3',

            // /* W */
            // 87: 'D#,-1',//'D,-1',

			/* 2 */
			50: 'D#,3',

            // /* E */
			// 69: 'F#,-1',
			
			/* 4 */
			52: 'F#,3',
            
            // // /* R */
			// 82: 'G#,-1',

			/* 5 */
			53: 'G#,3',

			// // /* T */
			// 84: 'A#,-1',

			/* 6 */
			54: 'A#,3',
            
            // // /* Z */
			// 90: 'C,-1',

			/* ~ */
			192: 'C,3',

			// // /* X */
			// 88: 'D,-1',

			/* Q */
			81: 'D,3',

			// /* A */
			// 65: 'E,-1',//'C#,0',

			/* W */
            87: 'E,3',//'D,-1',

			// /* S */
			// 83: 'F,-1',//'D,0',

			/* E */
            69: 'F,3',

			// /* D */
			// 68: 'G,-1',//'D#,0',

			// /* R */
			82: 'G,3',

			// /* F */
			// 70: 'A,-1',//'E,0',

			// /* T */
			84: 'A,3',

			// /* G */
			// 71: 'B,-1',//'F,0',

			/* Y */
            89: 'B,3',

			// /* Y */
			// 89: 'C#,0',
			
			/* 7 */
			55: 'C#,4',

			// /* H */
			// 72: 'C,0',//'F#,0',

			/* J */
			74: 'C,4',//'G,0',

			// /* J */
			// 74: 'D,0',//'G,0',

			/* U */
			85: 'D,4',

			// /* K */
			// 75: 'E,0',//'G#,0',

			/* I */
			73: 'E,4',

			// /* L */
			// 76: 'F#,0', //'A,0',

			/* O */
			79:  'F,4',

			// /* ; */
			// 59: 'G,0',//186: 'A#,0',//59

			/* P */
			80: 'G,4',
			

			/* ' */
            // 222: 'A,0', // 192: 'A,0',
            
            /* [ */
            219: 'A,4',//'B,-1',
            
            /* ] */
			221: 'B,4',//'C,0',
			
			// /* \\ */
			// 220: 'B,0',//'C,0',
            
            //  /* Y */
            // 89: 'C#,0',
            
            // /* U */
			// 85: 'D#,0',

			/* 8 */
			56: 'D#,4',

			// /* I */
			// 73: 'F#,0',

			/* 0 */
			48: 'F#,4',

			// /* O */
			// 79: 'G#,0',
			
			/* - */
			173: 'G#,4',

			// /* P */
			// 80: 'A#,0',

			/* = */
			61: 'A#,4',

		
		};
	
	var reverseLookupText = {};
	var reverseLookup = {};

	// Create a reverse lookup table.
	for(var i in keyboard) {
	
		var val;

		switch(i|0) { //some characters don't display like they are supposed to, so need correct values
		
			case 187: //equal sign
				val = 61; //???
				break;
			
			case 219: //open bracket
				val = 91; //left window key
				break;
			
			case 221: //close bracket
				val = 93; //select key
				break;
			
			case 188://comma
				val = 44; //print screen
				break;
			//the fraction 3/4 is displayed for some reason if 190 wasn't replaced by 46; it's still the period key either way
			case 190: //period
				val = 46; //delete
                break;
            case 186:
                val = 59;
                break;
			
			default:
				val = i;
				break;
			
		}
	
		reverseLookupText[keyboard[i]] = val;
		reverseLookup[keyboard[i]] = i;
	
	}

	// Keys you have pressed down.
	var keysPressed = [];

	// Generate keyboard
	var visualKeyboard = document.getElementById('keyboard');
	let selectSound = {
		value: "0" //piano
	};

	var iKeys = 0;
    var iWhite = 0;
    var iBlack = 0;
	var notes = __audioSynth._notes; //C, C#, D....A#, B

	// for(var i=-2;i<=1;i++) {
    for(var i=3;i<5;i++) {
		for(var n in notes) {
			if(n[2]!='b') {
				var thisKey = document.createElement('div');
				if(n.length>1) { //adding sharp sign makes 2 characters
                    thisKey.className = 'black-key'; //2 classes
					thisKey.style.width = '25px';
                    thisKey.style.height = '70px';
                    thisKey.style.position = 'absolute';
                    thisKey.style.zIndex= 2;
                    thisKey.style.left = (40 * (iWhite - 1)) + 25 +360+ 'px';
                    // thisKey.style.left = -20*(iWhite) +'px';
                    iBlack++;
				} else {
					thisKey.className = 'white-key';
					thisKey.style.width = '40px';
                    thisKey.style.height = '70px';
                    thisKey.style.position = 'absolute';
                    thisKey.style.zIndex = 1;
                    thisKey.style.left = 40 * iWhite + 360+ 'px';
                    // thisKey.style.left = '-40px';
                    // thisKey.style.left = (iBlack%2)*-25 + 'px';
					iWhite++;
				}

				var label = document.createElement('div');
				label.className = 'label';

				let s = getDispStr(n,i,reverseLookupText);
				label.innerHTML = '<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) +
					'<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)+offset) + '</span>' + (n.substr(1,1)?n.substr(1,1):'');
				thisKey.appendChild(label);
				thisKey.setAttribute('ID', 'KEY_' + n + ',' + (i));
				thisKey.addEventListener(evtListener[0], (function(_temp) { return function() { fnPlayKeyboard({keyCode:_temp}); } })(reverseLookup[n + ',' + i]));
                visualKeyboard[n + ',' + (i)] = thisKey;
				visualKeyboard.appendChild(thisKey);
				
				iKeys++;
			}
		}
	}

	visualKeyboard.style.width = iWhite * 40 + 'px';

	window.addEventListener(evtListener[1], function() { n = keysPressed.length; while(n--) { fnRemoveKeyBinding({keyCode:keysPressed[n]}); } });
	

// Detect keypresses, play notes.

	var fnPlayKeyboard = function(e) {
        // console.log("here")
        console.log("e ", e);
	
        var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				return false;	
			}
		}
		keysPressed.push(e.keyCode);

		if(keyboard[e.keyCode]) {
			if(visualKeyboard[keyboard[e.keyCode]]) {
				visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = pressColor;
				//visualKeyboard[keyboard[e.keyCode]].classList.add('playing'); //adding class only affects keypress and not mouse click
				visualKeyboard[keyboard[e.keyCode]].style.marginTop = '5px';
				visualKeyboard[keyboard[e.keyCode]].style.boxShadow = 'none';
			}
			var arrPlayNote = keyboard[e.keyCode].split(',');
			var note = arrPlayNote[0];
			var octaveModifier = arrPlayNote[1]|0;
			fnPlayNote(note, __octave + octaveModifier+offset);
		} else {
			return false;	
		}
	
	}
	// Remove key bindings once note is done.
	var fnRemoveKeyBinding = function(e) {
	
		var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				if(visualKeyboard[keyboard[e.keyCode]]) {
					//visualKeyboard[keyboard[e.keyCode]].classList.remove('playing');
					visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = '';
					visualKeyboard[keyboard[e.keyCode]].style.marginTop = '';
					visualKeyboard[keyboard[e.keyCode]].style.boxShadow = '';
				}
				keysPressed.splice(i, 1);
			}
		}
	
	}
	// Generates audio for pressed note and returns that to be played
	var fnPlayNote = function(note, octave) {

		src = __audioSynth.generate(selectSound.value, note, octave, 2);
		container = new Audio(src);
		container.addEventListener('ended', function() { container = null; });
		container.addEventListener('loadeddata', function(e) { e.target.play(); });
		container.autoplay = false;
		container.setAttribute('type', 'audio/wav');
		container.load();
		return container;
	
	};

	//returns correct string for display
	function getDispStr(n,i,lookup) {

		if(n=='C' && i==3){
			return "~";
		}else if(n=='B' && i==2){
			return "-";
		// }else if(n=='A#' && i==0){
        }else if(n=='G#' && i==4) {   
            return "-";
		// }else if(n=='B' && i==4){
		// 	return "\\";
		}else if(n=='A' && i==5){
			return "/";
		}else if(n=='A#' && i==5){
			return "<-";
		}else if(n=='B' && i==5){
			return "->";
		}else{
			return String.fromCharCode(lookup[n + ',' + i]);
		}

	}
	window.addEventListener('keydown', fnPlayKeyboard);
	window.addEventListener('keyup', fnRemoveKeyBinding);
}


// This is to access all octaves on the piano
function shiftPiano(shift) {
	if (offset+shift >= -3 && offset+shift <= 3) {
		offset += shift;

		console.log("offset: ", offset);
		var keys = document.getElementsByClassName("white-key")
		console.log(keys);
		for (let j=0; j<keys.length; j++){
			// console.log(keys[j].innerHTML);
			// console.log(keys[j].innerHTML.slice(0, 88));
			// keys[j].childrenNodes[0].innerHTML = '<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) +
			// '<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)+offset) + '</span>' + (n.substr(1,1)?n.substr(1,1):'');
			// "<div class=\"label\"><b class=\"keyLabel\">~</b><br><br>C<span name=\"OCTAVE_LABEL\" value=\"-1\">3</span></div>"
			keys[j].innerHTML = keys[j].innerHTML.slice(0, 89) +  (parseInt(keys[j].innerHTML.slice(89, 90))+shift)+keys[j].innerHTML.slice(90);
		}


		keys = document.getElementsByClassName("black-key");
		for (let j=0; j<keys.length; j++){
			// console.log(keys[j].innerHTML);
			// console.log(keys[j].innerHTML.slice(0, 88));
			// keys[j].childrenNodes[0].innerHTML = '<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) +
			// '<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)+offset) + '</span>' + (n.substr(1,1)?n.substr(1,1):'');
			// "<div class=\"label\"><b class=\"keyLabel\">~</b><br><br>C<span name=\"OCTAVE_LABEL\" value=\"-1\">3</span></div>"
			keys[j].innerHTML = keys[j].innerHTML.slice(0, 89) +  (parseInt(keys[j].innerHTML.slice(89, 90))+shift)+keys[j].innerHTML.slice(90);
		}

		if (offset == 3) {
			document.getElementById("arrow-rt").style.display = "none";
			document.getElementById("arrow-lft").style.display = "flex";
		} else if (offset == -3) {
			document.getElementById("arrow-rt").style.display = "flex";
			document.getElementById("arrow-lft").style.display = "none";
		} else {
			document.getElementById("arrow-rt").style.display = "flex";
			document.getElementById("arrow-lft").style.display = "flex";
		}
	}
}