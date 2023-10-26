let CAR_SX;
let CAR_SY;
let CAR_SZ;

let DASH_SX;
let DASH_SY;
let DASH_SZ;
let DASH_GAP;

let LANE_SX;
let ROAD_SX;
let ROAD_SY;

let ACC;
let MAX_SPEED;

let RED;
let GREY;
let YELLOW;

let newCar;
let newRoad;

function initStage2 () {
    // sizes
    CAR_SX = 40;
    CAR_SY = 80;
    CAR_SZ = 40;

    DASH_SX = 5;
    DASH_SY = 30;
    DASH_SZ = 2;
    DASH_GAP = 150;

    LANE_SX = CAR_SX * 2;
    ROAD_SX = LANE_SX * 6;
    ROAD_SY = 1200;

    // acceleration
    ACC = 0.2;
    MAX_SPEED = 10;

    // colors
    RED = color(255,0,0);
    GREY = color(200); 
    YELLOW = color(255,255,0);

    // factories
    newCar = (xpos = 0, ypos = 0, angle = 0, col) => ({
        x: xpos, // x position
        y: ypos, // y position
        a: angle, // angle
        c: col, // color
        draw() {
            push();
            
            noStroke();
            fill(this.c);
            
            translate(this.x, this.y, CAR_SZ / 4);
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

    newRoad = (ypos) => ({
        y: ypos,
        drawRoad() {
            push();
            fill(0);
            noStroke();
            translate(0, this.y, 0);
            plane(ROAD_SX, ROAD_SY);
            pop();
        },
        drawLines() {
            push();
            fill(YELLOW);
            noStroke();
            
            // left
            push();
            translate(LANE_SX/2-ROAD_SX/2, this.y, 1);
            box(DASH_SX, ROAD_SY, DASH_SZ);
            pop();

            // right
            push();
            translate(-LANE_SX/2+ROAD_SX/2, this.y, 1);
            box(DASH_SX, ROAD_SY, DASH_SZ);
            pop();

            pop();
        },
        drawDashes() {
            push();
            translate(0, this.y, 0);
            for (let dy = LANE_SX/2 - ROAD_SY/2 + DASH_GAP/2; dy < ROAD_SY/2; dy += DASH_GAP) {
                for (let lane = 1; lane <= 4; lane++) {
                    push();
                    noStroke();
                    translate(-(0.42*ROAD_SX) + lane * (ROAD_SX/6), dy, 1);
                    box(DASH_SX, DASH_SY, DASH_SZ);
                    pop();
                }
            }
            pop();
        },
        draw() {
            this.drawRoad();
            this.drawLines();
            this.drawDashes();
        }
    })
}

function newStage2() {
    let cars = [];
    cars.push(newCar(100, 0, 0, GREY));

    return ({
        hero: newCar(0, 0, 0, RED),
        vx: 0,
        vy: 10,
        cars: cars,
        currRoad: newRoad(-400),
        nextRoad: newRoad(-1600),
        nextCkpt: -1200,

        updateHero() {
            // LEFT
            if (keyIsDown(LEFT_ARROW)) {
                if (this.vx > -MAX_SPEED) this.vx -= (1 + ((this.vx + MAX_SPEED) / (2*MAX_SPEED))) * ACC;
            }
            
            // RIGHT
            if (keyIsDown(RIGHT_ARROW)) {
                if (this.vx < MAX_SPEED) this.vx += (1 + (-(this.vx - MAX_SPEED) / (2*MAX_SPEED))) * ACC;
            }
            
            // NEITHER L/R
            if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
                if (this.vx < 0) this.vx += ACC;
                else if (this.vx > 0) this.vx -= ACC;
            }
            
            // UP
            if (keyIsDown(UP_ARROW)) {
                if (this.vy < 20) this.vy += ACC;
            }
            
            // DOWN
            if (keyIsDown(DOWN_ARROW)) {
                if (this.vy > 5) this.vy -= ACC;
            }
            
            // NEITHER U/D
            if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
                if (this.vy < 10) this.vy += ACC/5;
                else if (this.vy > 10) this.vy -= ACC/5;
            }

            this.hero.x += this.vx;

            if (this.hero.x < -2*LANE_SX) {
                const max = 10 * (-2.5*LANE_SX - this.hero.x) / (0.5*LANE_SX);
                if (max > this.vx) this.vx = max;
            }

            if (this.hero.x > 2*LANE_SX) {
                const max = 10 * (2.5*LANE_SX - this.hero.x) / (0.5*LANE_SX);
                if (max < this.vx) this.vx = max;
            }

            this.hero.y -= this.vy; // forward is -y
            
            this.hero.a = asin(map(this.vx, -15, 15, -10, 10, true) / 10);
        },

        updateCamera() {
            camera(
                this.hero.x, this.hero.y + 195, 150,
                this.hero.x, this.hero.y, 0,
                0, 0, -1
            );
        },

        updateRoad() {
            if (this.hero.y <= this.nextCkpt) {
                this.nextCkpt -= 1200;
                this.currRoad = this.nextRoad;
                this.nextRoad = newRoad(this.nextCkpt-400);
            }
        },

        update() {
            this.updateRoad();
            this.updateHero();
            this.updateCamera();
        },

        draw() {
            // ambientLight(color(50));
            directionalLight(color(255), -1, -2, -3);
            
            this.currRoad.draw();
            this.nextRoad.draw();
            this.hero.draw();
            this.cars.forEach(c => c.draw());
        },
    })
}