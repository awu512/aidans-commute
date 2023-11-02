// road sizes
let LANE_SX_1;
let ROAD_SX_1;
let ROAD_SY_1;
let DASH_LEN_1;
let STOP_LINE_1;

let ACC_1; // accelaration
let TURN_R_1;

let newHero1; // hero factory
let newRoad1; // road factory

/**
 * Initialize Stage 1 constants and factory functions.
 */
function initStage1 () {
    // road sizes    
    LANE_SX_1 = CAR_SX * 2;
    ROAD_SX_1 = LANE_SX_1 * 5;
    ROAD_SY_1 = 1500;
    DASH_LEN_1 = ROAD_SY_1 - 1.5*ROAD_SX_1;;
    STOP_LINE_1 = 40;
    
    // acceleration
    ACC_1 = 0.2;
    TURN_R_1 = 0.01;
    
    // factories
    newHero1 = (xpos = 0, ypos = 0, angle = 0) => ({
        x: xpos, // x position
        y: ypos, // y position
        a: angle, // angle
        draw() {
            push();
            
            noStroke();
            fill(RED);
            
            translate(this.x, this.y, CAR_SZ / 4);
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
        sx: xpos,
        sy: ypos,
        d: dir,
        draw() {
            push();
                fill(0);
                noStroke();
                translate(
                    this.sx + sin(this.d) * ROAD_SY_1/2,
                    this.sy + cos(this.d) * ROAD_SY_1/2,
                    0
                );
                rotateZ(this.d);
                plane(ROAD_SX_1, ROAD_SY_1 - ROAD_SX_1);

                push();
                    fill(YELLOW);

                    push();
                        translate(5, 0, 0);
                        box(DASH_SX, DASH_LEN_1, DASH_SZ);
                    pop();

                    push();
                        translate(-5, 0, 0);
                        box(DASH_SX, DASH_LEN_1, DASH_SZ);
                    pop();
                pop();

                push();
                    fill(WHITE);

                    push();
                        translate(0, DASH_LEN_1/2 + STOP_LINE_1/2, 0);
                        box(ROAD_SX_1, STOP_LINE_1, DASH_SZ);
                    pop();

                    push();
                        translate(0, -DASH_LEN_1/2 - STOP_LINE_1/2, 0);
                        box(ROAD_SX_1, STOP_LINE_1, DASH_SZ);
                    pop();

                    for (let y = DASH_GAP/2-DASH_LEN_1/2; y < DASH_LEN_1/2; y += DASH_GAP) {
                        push();
                            translate(ROAD_SX_1/4, y, 0);
                            box(DASH_SX, DASH_SY, DASH_SZ);
                        pop();

                        push();
                            translate(-ROAD_SX_1/4, y, 0);
                            box(DASH_SX, DASH_SY, DASH_SZ);
                        pop();
                    }
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
        vx: 0,
        vy: 0,
        prevRoad: newRoad1(0, ROAD_SY_1, PI),
        currRoad: newRoad1(0, 0, PI),
        nextRoad: newRoad1(0, -ROAD_SY_1, PI/2),

        updateCamera() {
            camera(
                this.hero.x - 195 * sin(this.hero.a), this.hero.y + 195 * cos(this.hero.a), 150,
                this.hero.x, this.hero.y, 0,
                0, 0, -1
            );
        },

        updateHero() {
            // LEFT
            if (keyIsDown(LEFT_ARROW)) {
                this.hero.a -= TURN_R_1;
            }
            
            // RIGHT
            if (keyIsDown(RIGHT_ARROW)) {
                this.hero.a += TURN_R_1;
            }
            
            // NEITHER L/R
            if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
                if (this.vx < 0.1 && this.vx >= 0) this.vx = 0;
                else if (this.vx > -0.1 && this.vx < 0) this.vx = 0;
                else if (this.vx < 0) this.vx += ACC_1;
                else if (this.vx > 0) this.vx -= ACC_1;
            }
            
            // UP
            if (keyIsDown(UP_ARROW)) {
                if (this.vy < 10) this.vy += (1 + ((this.vy + 10) / 20)) * ACC_1;
            }
            
            // DOWN
            if (keyIsDown(DOWN_ARROW)) {
                if (this.vy > -5) this.vy -= (1 + (-(this.vy - 10) / 20)) * ACC_1;
            }
            
            // NEITHER U/D
            if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
                if (this.vy < 0.1 && this.vy >= 0) this.vy = 0;
                else if (this.vy > -0.1 && this.vy < 0) this.vy = 0;
                else if (this.vy < 0) this.vy += ACC_1;
                else if (this.vy > 0) this.vy -= ACC_1;
            }
            
            this.hero.x += this.vx * cos(this.hero.a) + this.vy * sin(this.hero.a);
            this.hero.y -= this.vy * cos(this.hero.a) + this.vx * sin(this.hero.a);
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
            this.hero.draw();
        }
    }
}

