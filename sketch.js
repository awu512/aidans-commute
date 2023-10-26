let stage2;

function setup () {
    createCanvas(800, 800, WEBGL);
    
    rectMode(CENTER);
    
    initStage2();
    stage2 = newStage2();
}

function draw () {
    background(220);

    stage2.update();
    stage2.draw();
}

