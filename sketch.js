let CAR_SX; // car width
let CAR_SY; // car depth
let CAR_SZ; // car height

let DASH_SX; // dash width
let DASH_SY; // dash depth
let DASH_SZ; // dash height

let LANE_SX; // lane width
let ROAD_SX; // road width

let ACC; // accelaration

let RED;

let cam;

let newCar; // car factory
let newDash; // dash factory

let state; // game state

function setConstants () {
  // sizes
  CAR_SX = 40;
  CAR_SY = 80;
  CAR_SZ = 40;
  
  DASH_SX = 5;
  DASH_SY = 30;
  DASH_SZ = 2;
  
  LANE_SX = CAR_SX * 2;
  ROAD_SX = LANE_SX * 5;
  
  // acceleration
  ACC = 0.2;
  
  // colors
  RED = color(255,0,0);
  GREY = color(200); 
  
  // factories
  newCar = (xpos = 0, ypos = 0, angle = 0, col = color(0)) => ({
      x: xpos, // x position
      y: ypos, // y position
      a: angle, // angle
      c: col, // color
      draw() {
        push();
        
        noStroke();
        fill(this.c);
        
        translate(this.x, this.y, CAR_SZ / 2);
        rotate(this.a);
        
        ambientMaterial(RED);
        
        box(CAR_SX, CAR_SY, CAR_SZ / 2);
        
        push();
        translate(0,0,CAR_SZ/2);
        box(CAR_SX, CAR_SY / 2, CAR_SZ / 2);
        pop();
        
        pop();
      }
  });
  
  newDash = (lane, ypos) => ({
    l: lane,
    y: ypos,
    draw() {
      push();
      noStroke();
      translate(-(ROAD_SX/2) + this.l * (ROAD_SX/5), this.y, 0);
      box(DASH_SX, DASH_SY, DASH_SZ);
      pop();
    }
  });
}

function setState () {
  state = {
    stage: 0,
    cam: createCamera(),
    hero: newCar(0, 0, 0, RED),
    vx: 0,
    vy: 0,
    dashes: [],
    cars: []
  };
  
  updateCamera();
  
  state.cars.push(newCar(100, 0, 0, GREY));
  
  for (let l = 1; l <= 4; l++) {
    // for (let y = 0; y <=)
    state.dashes.push(newDash(l, 50));
  }
}


function setup () {
  createCanvas(800, 800, WEBGL);
  
  rectMode(CENTER);
  
  setConstants();
  setState();
}

function updateHero () {
  // LEFT
  if (keyIsDown(LEFT_ARROW)) {
    if (state.vx > -10) state.vx -= (1 + ((state.vx + 10) / 20)) * ACC;
  }
  
  // RIGHT
  if (keyIsDown(RIGHT_ARROW)) {
    if (state.vx < 10) state.vx += (1 + (-(state.vx - 10) / 20)) * ACC;
  }
  
  // NEITHER L/R
  if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    if (state.vx < 0.1 && state.vx >= 0) state.vx = 0;
    else if (state.vx > -0.1 && state.vx < 0) state.vx = 0;
    else if (state.vx < 0) state.vx += ACC;
    else if (state.vx > 0) state.vx -= ACC;
  }
  
  // UP
  if (keyIsDown(UP_ARROW)) {
    state.vy = 5;
  }
  
  // DOWN
  if (keyIsDown(DOWN_ARROW)) {
    state.vy = -5;
  }
  
  // NEITHER U/D
  if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
    state.vy = 0;
  }
  
  state.hero.x += state.vx;
  state.hero.y -= state.vy; // forward is -y
  
  state.hero.a = asin(map(state.vx, -15, 15, -10, 10, true) / 10);
}

function updateCamera () {
  state.cam.setPosition(state.hero.x, state.hero.y + 195, 150);
  state.cam.lookAt(state.hero.x, state.hero.y, 0);
}

function update () {
  updateHero();
  updateCamera();
}

function drawRoad () {
  push();
  fill(0);
  noStroke();
  translate(0, -530, 0);
  plane(ROAD_SX, 1350);
  pop();
}

function draw () {
  background(220);
  
  update();
  
  drawRoad();
  
  // ambientLight(color(50));
  directionalLight(color(255), -1, -2, -3);

  state.hero.draw();
  state.cars.forEach(c => c.draw());
  state.dashes.forEach(d => d.draw());
  
}

