let stage;
let stageI;

// stage changes
let CONT = 0;
let CRASH = 1;
let FINISH = 2;

// screen size
let W;

// space bar
let SPACE_BAR;

// colors
let RED;
let GREY;
let DARK_GREY;
let GREY_BLUE;
let YELLOW;
let ORANGE;
let WHITE;
let BLACK;
let PURPLE;
let BLUE;

// car sizes
let CAR_SX;
let CAR_SY;
let CAR_SZ;
let WHEEL_R;
let WHEEL_H;
let WINDOW_D;

// dash sizes
let DASH_SX;
let DASH_SY;
let DASH_SZ;
let DASH_GAP;

// camera
let CAM_D;
let CAM_H;
let CAM_A;

// hud
let HUD_D;
let HUD_W;

// progress bar
let pb;

// times
let h;
let m;

/**
 * Initialize global constants.
 */
function init () {
    // screen size
    W = 800;

    // space bar
    SPACE_BAR = 32;

    // colors
    RED = color(255,0,0);
    GREY = color(100); 
    DARK_GREY = color(30);
    GREY_BLUE = color(115, 147, 179);
    YELLOW = color(255,255,0);
    ORANGE = color(255, 165, 0)
    WHITE = color(255);
    BLACK = color(0);
    PURPLE = color(255, 51, 221);
    BLUE = color(41, 234, 255);

    // car sizes
    CAR_SX = 40;
    CAR_SY = 80;
    CAR_SZ = 40;
    WHEEL_R = 10;
    WHEEL_H = 5;
    WINDOW_D = 2;

    // dash sizes
    DASH_SX = 5;
    DASH_SY = 30;
    DASH_SZ = 2;
    DASH_GAP = 150;

    // camera
    CAM_D = 195;
    CAM_H = 150;
    CAM_A = atan(150/195);

    // hud
    HUD_D = Math.sqrt(CAM_D*CAM_D + CAM_H*CAM_H) / 2;
    HUD_W = 0.6*W;

    // progress bar
    pb = createGraphics(30, HUD_W);

    // times
    h = 7;
    m = 0;
}

/**
 * p5.js setup() call.
 */
function setup () {
    rectMode(CENTER);

    init();

    createCanvas(W, W, WEBGL);

    initStage0();
    initStage1();
    initStage2();

    stageI = 0;
    stage = newStage0();
}

/**
 * p5.js draw() loop.
 */
function draw () {
    background(220);

    // update clock
    if (frameCount % 120 == 0) {
        m++;
        if (m >= 60) {
            h++;
            m = 0;
        }
    }

    switch (stage.update()) {
        case CONT:
            stage.draw();
            break;
        case CRASH:
            stage = newStage0();
            break;
        case FINISH:
            switch (stageI) {
                case 0: 
                    stage = newStage1();
                    break;
                case 1:
                    stage = newStage2();
                    break;
                case 2:
                    stage = newStage1();
                    break;
            }

    }
}

