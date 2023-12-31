// road sizes
let LANE_SX_1;
let RW;
let RL;
let DASH_LEN_1;
let STOP_LINE_1;

let BUILD_SIZE;
let BUILD_COLS;
let BUILD_WNDW_GAP;
let BUILD_WNDW_SIZE;

let ACC_1; // accelaration
let GRAV_1; // gravity
let TURBO; // boost speed
let MAX_SPEED_1; // max speed
let TURN_R_1; // turn radius

let GOAL1;

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

    BUILD_SIZE = (RL-CAR_SX)/5;
    BUILD_COLS = [
        color(240, 120, 80),
        color(40, 255, 110),
        color(200, 180, 20),
        color(80, 80, 240),
        color(240, 120, 80)
    ];
    BUILD_WNDW_GAP = 10;
    BUILD_WNDW_SIZE = (BUILD_SIZE - 3 * BUILD_WNDW_GAP) / 2;
    
    // acceleration
    ACC_1 = 0.05;
    GRAV_1 = 0.2;
    TURBO = 5;
    MAX_SPEED_1 = 12;
    TURN_R_1 = 0.015;

    // goal
    GOAL1 = 15;
    
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
        lc: RED, // light color

        draw() {
            push();
            
                noStroke();
                
                translate(this.x, this.y, this.z);
                rotate(this.a);

                // BODY
                push();
                    fill(WHITE);

                    translate(0, 0, CAR_SZ / 4 + WHEEL_R);
                
                    box(CAR_SX, CAR_SY, CAR_SZ / 3);

                    // LIGHTS
                    push();
                        fill(ORANGE);
                        push();
                            translate(
                                CAR_SX/2 - WINDOW_D, 
                                CAR_SY/2 + WINDOW_D/2, 
                                1.5*WINDOW_D
                            );
                            box(WINDOW_D, WINDOW_D, 2*WINDOW_D);
                        pop();
                        push();
                            translate(
                                -CAR_SX/2 + WINDOW_D, 
                                CAR_SY/2 + WINDOW_D/2, 
                                1.5*WINDOW_D
                            );
                            box(WINDOW_D, WINDOW_D, 2*WINDOW_D);
                        pop();
                    pop();
                    push();
                        fill(this.lc);
                        push();
                            translate(
                                CAR_SX/2 - 3.5*WINDOW_D, 
                                CAR_SY/2 + WINDOW_D/2, 
                                1.5*WINDOW_D
                            );
                            box(4*WINDOW_D, WINDOW_D, 2*WINDOW_D);
                        pop();
                        push();
                            translate(
                                -CAR_SX/2 + 3.5*WINDOW_D, 
                                CAR_SY/2 + WINDOW_D/2, 
                                1.5*WINDOW_D
                            );
                            box(4*WINDOW_D, WINDOW_D, 2*WINDOW_D);
                        pop();
                    pop();
                    
                    push();
                        translate(0,CAR_SY/8,CAR_SZ/3);
                        box(CAR_SX, CAR_SY / 2, CAR_SZ / 2);

                        // WINDOW
                        push();
                            fill(GREY_BLUE);
                            translate(0, CAR_SY/4 + WINDOW_D/2, 1.5*WINDOW_D);
                            box(CAR_SX - WINDOW_D, WINDOW_D, CAR_SZ/2 - 4*WINDOW_D);
                        pop();
                    pop();
                pop();

                // TIRES
                push();
                    fill(BLACK);

                    push();
                        translate(CAR_SX/2, CAR_SY/3, WHEEL_R);
                        rotateZ(PI/2);
                        cylinder(WHEEL_R, WHEEL_H);
                    pop();

                    push();
                        translate(-CAR_SX/2, CAR_SY/3, WHEEL_R);
                        rotateZ(PI/2);
                        cylinder(WHEEL_R, WHEEL_H);
                    pop();

                    push();
                        translate(CAR_SX/2, -CAR_SY/3, WHEEL_R);
                        rotateZ(PI/2);
                        cylinder(WHEEL_R, WHEEL_H);
                    pop();

                    push();
                        translate(-CAR_SX/2, -CAR_SY/3, WHEEL_R);
                        rotateZ(PI/2);
                        cylinder(WHEEL_R, WHEEL_H);
                    pop();
                pop();
            pop();
        }
    });

    newRoad1 = (xpos, ypos, dir) => ({
        x: xpos,
        y: ypos,
        d: dir,
        
        contains(x,y) {
            if (Math.abs(sin(this.d)) < 0.001) {
                return  x >= this.x - (RW/2) && 
                        x <= this.x + (RW/2) &&
                        y >= this.y - (RL/2) &&
                        y <= this.y + (RL/2);
            } else {
                return  x >= this.x - (RL/2) && 
                        x <= this.x + (RL/2) &&
                        y >= this.y - (RW/2) &&
                        y <= this.y + (RW/2);
            }
        },

        draw() {
            push();
                fill(DARK_GREY);
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

                push();
                    fill(TAN);
                    noStroke();
                    push();
                        translate(RW/2 + CAR_SX/4, 0, 5);
                        box(CAR_SX/2, RL, 10);
                    pop();
                    push();
                        translate(-RW/2 - CAR_SX/4, 0, 5);
                        box(CAR_SX/2, RL, 10);
                    pop();
                pop();

                for (let s = -1; s <= 1; s+=2) { 
                    for (let i = 0; i < 5; i++) {
                        const p = -2*BUILD_SIZE + i * BUILD_SIZE;
                        push();
                            fill(s == -1 ? BUILD_COLS[i] : BUILD_COLS[4-i]);
                            noStroke();
                            translate(
                                s * (RW/2 + BUILD_SIZE/2 + CAR_SX/2),
                                p,
                                BUILD_SIZE
                            );
                            box(BUILD_SIZE, BUILD_SIZE, 2*BUILD_SIZE);
                        pop();
                    }
                }
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
                noStroke();
                translate(this.x, this.y, 0);

                push();
                    fill(DARK_GREY);
                    plane(RW);
                pop();

                push();
                    push();
                        rotateZ(-this.b1);
                        push();
                            fill(color(120));
                            translate(0, RW/2 + CAR_SX/2 + 5, BUILD_SIZE);
                            box(RW + CAR_SX, 10, 2*BUILD_SIZE);
                        pop();
                        push();
                            fill(TAN);
                            translate(0, RW/2 + CAR_SX/4, 5);
                            box(RW + CAR_SX, CAR_SX/2, 10);
                        pop();
                    pop();
                    push();
                        rotateZ(-this.b2);
                        push();
                            fill(color(80));
                            translate(0, RW/2 + CAR_SX/2 + 5, BUILD_SIZE);
                            box(RW + CAR_SX, 10, 2*BUILD_SIZE);
                        pop();
                        push();
                            fill(TAN);
                            translate(0, RW/2 + CAR_SX/4, 5);
                            box(RW + CAR_SX, CAR_SX/2, 10);
                        pop();
                    pop();
                pop();
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

        progress: 0,

        updateCamera() {
            const aa = this.hero.a;

            camera(
                this.hero.x - CAM_D * sin(aa), this.hero.y + CAM_D * cos(aa), CAM_H,
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
                if (this.hero.vy < MAX_SPEED_1) this.hero.vy += (1 + ((this.hero.vy + 10) / 20)) * ACC_1;
            }

            if (this.hero.vy > MAX_SPEED_1) this.hero.vy -= 2 * ACC_1;
            
            // DOWN
            if (keyIsDown(DOWN_ARROW)) {
                if (this.hero.vy > 0)
                    this.hero.vy -= (1 + (-(this.hero.vy - 10) / 20)) * 4 * ACC_1;
                else if (this.hero.vy > -MAX_SPEED_1/3) 
                    this.hero.vy -= (1 + (-(this.hero.vy - 10) / 20)) * ACC_1;
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

                if (this.hero.dc > 140 || this.hero.dc < -140) {
                    this.hero.lc = BLUE;
                } else if (this.hero.dc > 60 || this.hero.dc < -60) {
                    this.hero.lc = PURPLE;
                } else {
                    this.hero.lc = RED;
                }
            } else {
                // DRIFT
                if (this.hero.dc > 140 || this.hero.dc < -140) {
                    this.hero.vy = MAX_SPEED_1 + 2*TURBO;
                    this.hero.lc = RED;
                } else if (this.hero.dc > 60 || this.hero.dc < -60) {
                    this.hero.vy = MAX_SPEED_1 + TURBO;
                    this.hero.lc = RED;
                }

                this.hero.d = 0;
                this.hero.dc = 0;
            }

            // BASE MOVEMENT
            
            // adjusted angle based on drift
            const aa = this.hero.d == 0 ? this.hero.a : this.hero.a - 0.5*this.hero.d;

            this.hero.x += this.hero.vx * cos(aa) + this.hero.vy * sin(aa);
            this.hero.y -= this.hero.vy * cos(aa) + this.hero.vx * sin(aa);

            if (this.prevRoad.contains(this.hero.x, this.hero.y)) {
                this.hero.x -= this.hero.vx * cos(aa) + this.hero.vy * sin(aa);
                this.hero.y += this.hero.vy * cos(aa) + this.hero.vx * sin(aa);
            }

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

            if (this.hero.z > 0) this.hero.vz -= GRAV_1;
            else this.hero.vz = 0;
        },

        updateRoads() {
            // GENERATE NEW ROAD
            if (!this.currRoad.contains(this.hero.x, this.hero.y)) {
                if (this.nextRoad.contains(this.hero.x, this.hero.y)) {
                    this.progress++;

                    this.prevRoad = this.currRoad;
                    this.currRoad = this.nextRoad;
                    this.prevConnect = this.nextConnect;

                    const turn = PI/2 * (1 - Math.floor(Math.random() * 3))
                    const nextDir = this.currRoad.d + turn;

                    let b1;
                    let b2;

                    switch (turn) {
                        case PI/2:
                            b1 = this.currRoad.d;
                            b2 = this.currRoad.d - PI/2;
                            break;
                        case 0:
                            b1 = this.currRoad.d + PI/2;
                            b2 = this.currRoad.d - PI/2;
                            break;
                        case -PI/2:
                            b1 = this.currRoad.d + PI/2;
                            b2 = this.currRoad.d;
                            break;
                    }

                    this.nextConnect = newConnect1(
                        this.currRoad.x + sin(this.currRoad.d) * (RL/2 + RW/2),
                        this.currRoad.y + cos(this.currRoad.d) * (RL/2 + RW/2),
                        b1,
                        b2
                    );

                    this.nextRoad = newRoad1(
                        this.nextConnect.x + sin(nextDir) * (RL/2 + RW/2),
                        this.nextConnect.y + cos(nextDir) * (RL/2 + RW/2),
                        nextDir
                    );
                }

                // CRASH IF OUT OF BOUNDS
                if (!this.nextConnect.contains(this.hero.x, this.hero.y) &&
                    !this.prevConnect.contains(this.hero.x, this.hero.y) &&
                    !this.currRoad.contains(this.hero.x, this.hero.y)
                ) {
                    return true;
                }
            }

            return false;
        },

        update() {
            if (this.progress >= GOAL1) return FINISH;

            this.updateHero();
            this.updateCamera();
            if (this.updateRoads()) return CRASH;

            return CONT;
        },

        drawProgress() {
            const progressPercent = this.progress / GOAL1;

            pb.clear();

            pb.noStroke();

            pb.pixelDensity(8);
            pb.rectMode(CENTER);
            pb.translate(HUD_W/2, HUD_H/4);

            pb.push();
                pb.fill(GREY);
                pb.rect(0, HUD_H/2, HUD_W, 2);
            pb.pop();

            pb.push();
                pb.fill(RED);
                pb.rect(0.5*HUD_W*progressPercent-HUD_W/2, HUD_H/2, HUD_W*progressPercent, 2);
            pb.pop();

            pb.push();
                pb.fill(RED);
                pb.translate(0, HUD_H/3);
                pb.textSize(5);
                pb.textFont('monospace');
                pb.textAlign(CENTER);
                pb.text(`${h}:${m < 10 ? "0" : ""}${m}`, 0, 0, HUD_W);
            pb.pop();

            push();
                translate(
                    this.hero.x, 
                    this.hero.y, 
                    this.hero.z + 2.4*CAR_SZ
                );
                rotateX(-PI/2);
                rotateY(-this.hero.a);
                translate(-HUD_W/2, 0, CAR_SY/3);
                image(pb, 0, 0);
            pop();
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

            this.drawProgress();
        }
    }
}

