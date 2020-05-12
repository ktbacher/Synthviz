var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// var noteColors = {"C": "#ff0000", "C#":"#5a1f78",  "D":"#ffff00",  "D#": "#3b476b", "E":"#91daeb", "F":"#780a1e", "F#": "#0048ff", "G":"#ff9500", "G#":"#a257c2", "A":"#00ff37", "A#":"#596470","B": "#d2e2f7"};
var noteColors = {"C": "#ff0000", "C#":"#5a1f78",  "D":"#ffff00",  "D#": "#3b476b", "E":"#91daeb", "F":"#780a1e", "F#": "#0048ff", "G":"#ff9500", "G#":"#a257c2", "A":"#00ff37", "A#":"#596470","B": "#d2e2f7"};
var data = [];
var circRad = 100;
var rad = Math.PI/2;
var style = 'random';

function noteToColor(note) {
    console.log("here");
}

function resetVis() {
    svg.selectAll("circle").remove()
}
function updateVis(note) {
    if (note == 0) {
        console.log("update");
        // data.forEach((el) => {
        //     el.opacity = 0;
        //     console.log(el)
        // });
        svg.selectAll("circle").remove()
        data = [];
        rad = Math.PI/2;
    }
    else {
        if (data.length >0 && data.slice(-1)[0].note == note){
            data.slice(-1)[0].radius += 5;
            data.slice(-1)[0].opacity =1;
        
        }else {
            if (style == 'random') {
                data.push({note: note, color: noteColors[note], x_pos: randNum()*400, y_pos: randNum()*400, radius: 10, opacity: 1});
            } else if (style == 'circular') {
                data.push({note: note, color: noteColors[note], x_pos: getCircleX(rad, circRad)+200+randNum()*20*(randNum()-.5),  y_pos: -getCircleY(rad, circRad)+200+randNum()*20*(randNum()-.5), radius: 10, opacity: 1});
                rad += .05;
            } else {
                // data.push({note: note, color: noteColors[note], x_pos: 200+(randNum()-.5)*50,  y_pos: (11- noteStrings.indexOf(note))*32+20, radius: 10, opacity: 1});
                data.push({note: note, color: noteColors[note], x_pos: (noteStrings.indexOf(note))*30+35,  y_pos: (11- noteStrings.indexOf(note))*32+20, radius: 10, opacity: 1});
            }
            
        }
        // data.slice(1,-1).forEach((el) => {
        //     el.opacity = Math.max(.1,el.opacity/2)
        //     // console.log(el)
        // });
    }
    // svg.selectAll("circle").remove()
    svg.selectAll("circle")
    .data(data)
    .join(
        enter => enter.append("circle")
            .attr("cx", function (d) { return d.x_pos; } )
            .attr("cy", function (d) { return d.y_pos; } )
            .attr("r", function (d) { return d.radius; })
            .style("fill", function(d) { return d.color})
            .style("opacity", function(d) { console.log(d.opacity); return d.opacity}),
        update => update
            .attr("r", function (d) { return d.radius; })
            .style("opacity", function(d) { d.opacity = Math.max(.1,d.opacity*.95); return d.opacity;}),
        exit => exit
            // .style("opacity", function(d) { d.opacity = 0; console.log(d.opacity); return d.opacity;})
            .remove()
    );

}

function changeVis(type) {
    console.log(type);
    updateVis(0);
    style = type;
    rad = Math.PI/2;
}

// keep distribution mostly to center of visual
function randNum() {
    var rand = 0;
    for (var i = 0; i < 4; i += 1) {
        rand += Math.random();
    }
    return rand / 4;
}


function testSound() {
    // Synth.play(2, 'A', 4, 2);

    var piano = Synth.createInstrument('piano');
    piano.play('C', 4, 2); // plays C4 for 2s using the 'piano' sound profile
}

function getCircleY(radians, radius) {
    return Math.sin(radians) * radius;
}

function getCircleX(radians, radius) {
    return Math.cos(radians) * radius;
}

