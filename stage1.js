// road sizes
let LANE_SX_1;
let RW;
let RL;
let DASH_LEN_1;
let STOP_LINE_1;

let ACC_1; // accelaration
let TURN_R_1;

let newHero1; // hero factory
let newRoad1; // road factory
let newConnect1; // road connection factory

/**
 * Initialize Stage 1 constants and factory functions.
 */
function initStage1 () {
    // road sizes    
    LANE_SX_1 = CAR_SX * 2;
    RW = LANE_SX_1 * 5;
    RL = 1500;
    DASH_LEN_1 = RL - 1.5*RW;;
    STOP_LINE_1 = 40;
    
    // acceleration
    ACC_1 = 0.2;
    TURN_R_1 = 0.01;
    
    // factories
    newHero1 = (xpos = 0, ypos = 0, angle = 0) => ({
        x: xpos, // x position
        y: ypos, // y position
        z: 0, // z position
        a: angle, // angle

        vx: 0, // x velocity
        vy: 0, // y velocity
        vz: 0, // z velocity

        d: 0, // drift direction
        dc: 0, // drift duration

        draw() {
            push();
            
            noStroke();
            fill(RED);
            
            translate(this.x, this.y, this.z + CAR_SZ / 4);
            rotate(this.a);
            
            box(CAR_SX, CAR_SY, CAR_SZ / 2);
            
            push();
            translate(0,0,CAR_SZ/2);
            box(CAR_SX, CAR_SY / 2, CAR_SZ / 2);
            pop();
            
            pop();
        }
    });

    newRoad1 = (xpos, ypos, dir) => ({
        x: xpos,
        y: ypos,
        d: dir,
        
        contains(x,y) {
            if (this.d == 0 || this.d == PI)
                return  x >= this.x - (RW/2) && 
                        x <= this.x + (RW/2) &&
                        y >= this.y - (RL/2) &&
                        y <= this.y + (RL/2);
            else 
            return  x >= this.x - (RL/2) && 
                    x <= this.x + (RL/2) &&
                    y >= this.y - (RW/2) &&
                    y <= this.y + (RW/2);
        },

        draw() {
            push();
                fill(BLACK);
                noStroke();
                translate(this.x, this.y, 0);
                rotateZ(this.d);
                plane(RW, RL);

                push();
                    fill(YELLOW);

                    push();
                        translate(5, 0, 0);
                        box(DASH_SX, RL - 2*STOP_LINE_1, DASH_SZ);
                    pop();

                    push();
                        translate(-5, 0, 0);
                        box(DASH_SX, RL - 2*STOP_LINE_1, DASH_SZ);
                    pop();
                pop();

                push();
                    fill(WHITE);

                    push();
                        translate(0, RL/2 - STOP_LINE_1/2, 0);
                        box(RW, STOP_LINE_1, DASH_SZ);
                    pop();

                    push();
                        translate(0, -RL/2 + STOP_LINE_1/2, 0);
                        box(RW, STOP_LINE_1, DASH_SZ);
                    pop();

                    for (let y = DASH_GAP-RL/2; y < RL/2; y += DASH_GAP) {
                        push();
                            translate(RW/4, y, 0);
                            box(DASH_SX, DASH_SY, DASH_SZ);
                        pop();

                        push();
                            translate(-RW/4, y, 0);
                            box(DASH_SX, DASH_SY, DASH_SZ);
                        pop();
                    }
                pop();
            pop();
        }
    });

    newConnect1 = (xpos, ypos, bar1, bar2) => ({
        x: xpos,
        y: ypos,
        b1: bar1,
        b2: bar2,

        contains(x,y) {
            return x <= this.x + RW/2 &&
                x >= this.x - RW/2 &&
                y <= this.y + RW/2 &&
                y >= this.y - RW/2
        },

        draw() {
            push();
                fill(BLACK);
                noStroke();
                translate(this.x, this.y, 0);
                plane(RW);
            pop();
        }
    });
}

/**
 * Create a new instance of Stage 1.
 * @returns Stage 1 object
 */
function newStage1 () {
    return {
        hero: newHero1(0,0,0,RED),

        prevRoad: newRoad1(0, RL/2+RW/2, PI),
        currRoad: newRoad1(0, -RW/2-RL/2, PI),
        nextRoad: newRoad1(RL/2+RW/2, -RL-RW, PI/2),

        prevConnect: newConnect1(0, 0, PI/2, -PI/2),
        nextConnect: newConnect1(0, -RL-RW, PI, -PI/2),

        updateCamera() {
            const aa = this.hero.a;

            camera(
                this.hero.x - 195 * sin(aa), this.hero.y + 195 * cos(aa), 150,
                this.hero.x, this.hero.y, 0,
                0, 0, -1
            );
        },

        updateHero() {
            // LEFT
            if (keyIsDown(LEFT_ARROW)) {
                switch (this.hero.d) {
                    case -1:
                        this.hero.a -= 2*TURN_R_1;
                        this.hero.dc -= 3;
                        break;
                    case 0:
                        this.hero.a -= TURN_R_1;
                        break;
                    case 1:
                        this.hero.a += TURN_R_1
                        this.hero.dc += 1;
                }
            }
            
            // RIGHT
            if (keyIsDown(RIGHT_ARROW)) {
                switch (this.hero.d) {
                    case -1:
                        this.hero.a -= TURN_R_1;
                        this.hero.dc -= 1;
                        break;
                    case 0:
                        this.hero.a += TURN_R_1;
                        break;
                    case 1:
                        this.hero.a += 2*TURN_R_1;
                        this.hero.dc += 3
                }
            }
            
            // NEITHER L/R
            if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
                switch (this.hero.d) {
                    case -1:
                        this.hero.a -= 1.5*TURN_R_1;
                        this.hero.dc -= 2;
                        break;
                    case 1:
                        this.hero.a += 1.5*TURN_R_1;
                        this.hero.dc += 2;
                        break;
                    case 0:
                        if (this.hero.vx < 0.1 && this.hero.vx >= 0) this.hero.vx = 0;
                        else if (this.hero.vx > -0.1 && this.hero.vx < 0) this.hero.vx = 0;
                        else if (this.hero.vx < 0) this.hero.vx += ACC_1;
                        else if (this.hero.vx > 0) this.hero.vx -= ACC_1;
                        break;
                }
                
            }

            // UP
            if (keyIsDown(UP_ARROW)) {
                if (this.hero.vy < 10) this.hero.vy += (1 + ((this.hero.vy + 10) / 20)) * ACC_1;
            }
            
            // DOWN
            if (keyIsDown(DOWN_ARROW)) {
                if (this.hero.vy > -5) this.hero.vy -= (1 + (-(this.hero.vy - 10) / 20)) * ACC_1;
            }
            
            // NEITHER U/D
            if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
                if (this.hero.vy < 0.1 && this.hero.vy >= 0) this.hero.vy = 0;
                else if (this.hero.vy > -0.1 && this.hero.vy < 0) this.hero.vy = 0;
                else if (this.hero.vy < 0) this.hero.vy += ACC_1;
                else if (this.hero.vy > 0) this.hero.vy -= ACC_1;
            }

            // SPACE
            if (keyIsDown(SPACE_BAR)) {
                if (this.hero.d == 0 && this.hero.z == 0) {
                    this.hero.vz = 1.5;
                    this.hero.z += this.hero.vz;
                }
            } else {
                this.hero.d = 0;
                this.hero.dc = 0;
            }

            // BASE MOVEMENT
            
            // adjusted angle based on drift
            const aa = this.hero.d == 0 ? this.hero.a : this.hero.a - 0.5*this.hero.d;

            this.hero.x += this.hero.vx * cos(aa) + this.hero.vy * sin(aa);
            this.hero.y -= this.hero.vy * cos(aa) + this.hero.vx * sin(aa);

            // HOP MECHANICS
            if (this.hero.z > 0) {
                this.hero.z += this.hero.vz;

                if (this.hero.z <= 0) {
                    if (keyIsDown(LEFT_ARROW)) this.hero.d = -1;
                    else if (keyIsDown(RIGHT_ARROW)) this.hero.d = 1;
                    this.hero.z = 0;
                }
            }
            else this.hero.z = 0;

            if (this.hero.z > 0) this.hero.vz -= ACC_1;
            else this.hero.vz = 0;

            // HANDLE ROAD BOUNDS
            if (!this.currRoad.contains(this.hero.x, this.hero.y)) {
                if (this.nextConnect.contains(this.hero.x, this.hero.y)) {
                    console.log("next");
                } else if (this.prevConnect.contains(this.hero.x, this.hero.y)) {
                    console.log("prev");
                }
            }
        },

        update() {
            this.updateHero();
            this.updateCamera();
        },

        draw() {
            background(220);

            lights();

            this.prevRoad.draw();
            this.currRoad.draw();
            this.nextRoad.draw();

            this.prevConnect.draw();
            this.nextConnect.draw();

            this.hero.draw();
        }
    }
}

