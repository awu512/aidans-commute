let stage1;
let stage2;

// space bar
let SPACE_BAR;

// colors
let RED;
let GREY;
let YELLOW;
let WHITE;
let BLACK;

// car sizes
let CAR_SX;
let CAR_SY;
let CAR_SZ;

// dash sizes
let DASH_SX;
let DASH_SY;
let DASH_SZ;
let DASH_GAP;

/**
 * Initialize global constants.
 */
function init () {
    // space bar
    SPACE_BAR = 32;

    // colors
    RED = color(255,0,0);
    GREY = color(200); 
    YELLOW = color(255,255,0);
    WHITE = color(255);
    BLACK = color(0);

    // car sizes
    CAR_SX = 40;
    CAR_SY = 80;
    CAR_SZ = 40;

    // dash sizes
    DASH_SX = 5;
    DASH_SY = 30;
    DASH_SZ = 2;
    DASH_GAP = 150;
}

/**
 * p5.js setup() call.
 */
function setup () {
    createCanvas(800, 800, WEBGL);
    
    rectMode(CENTER);

    init();

    initStage1();
    stage1 = newStage1();

    // initStage2();
    // stage2 = newStage2();
}

/**
 * p5.js draw() loop.
 */
function draw () {
    background(220);

    stage1.update();
    stage1.draw();

    // stage2.update();
    // stage2.draw();
}

