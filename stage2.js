let LANE_SX_2;
let ROAD_SX_2;
let ROAD_SY_2;

let ACC_2;
let MAX_SPEED_2;

let newHero2;
let newEnemy2;
let newRoad2;

/**
 * Initialize Stage 2 constants and factories.
 */
function initStage2 () {
    // road
    LANE_SX_2 = CAR_SX * 2;
    ROAD_SX_2 = LANE_SX_2 * 6;
    ROAD_SY_2 = 1200;

    // ACC_2eleration
    ACC_2 = 0.2;
    MAX_SPEED_2 = 10;

    // factories
    newHero2 = () => ({
        x: 0, // x position
        y: 0, // y position
        a: 0, // angle
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

    newEnemy2 = (l, y, s) => ({
        l: l, // lane
        y: y, // y position
        s: s, // speed
        update() {
            this.y -= s;
        },
        draw() {
            push();
            
            noStroke();
            fill(GREY);
            
            translate(LANE_SX_2*(this.l - 2), this.y, CAR_SZ / 4);
            
            box(CAR_SX, CAR_SY, CAR_SZ / 2);
            
            push();
            translate(0,0,CAR_SZ/2);
            box(CAR_SX, CAR_SY / 2, CAR_SZ / 2);
            pop();
            
            pop();
        }
    });

    newRoad2 = (ypos) => ({
        y: ypos,
        drawRoad() {
            push();
            fill(0);
            noStroke();
            translate(0, this.y, 0);
            plane(ROAD_SX_2, ROAD_SY_2);
            pop();
        },
        drawLines() {
            push();
            fill(YELLOW);
            noStroke();
            
            // left
            push();
            translate(LANE_SX_2/2-ROAD_SX_2/2, this.y, 1);
            box(DASH_SX, ROAD_SY_2, DASH_SZ);
            pop();

            // right
            push();
            translate(-LANE_SX_2/2+ROAD_SX_2/2, this.y, 1);
            box(DASH_SX, ROAD_SY_2, DASH_SZ);
            pop();

            pop();
        },
        drawDashes() {
            push();
            translate(0, this.y, 0);
            for (let dy = LANE_SX_2/2 - ROAD_SY_2/2 + DASH_GAP/2; dy < ROAD_SY_2/2; dy += DASH_GAP) {
                for (let lane = 1; lane <= 4; lane++) {
                    push();
                    noStroke();
                    translate(-(0.42*ROAD_SX_2) + lane * (ROAD_SX_2/6), dy, 1);
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

/**
 * Create a new instance of Stage 2.
 * @returns Stage 2 object
 */
function newStage2 () {
    return {
        hero: newHero2(),
        vx: 0,
        vy: 10,
        enemies: [],
        currRoad: newRoad2(-400),
        nextRoad: newRoad2(-1600),
        roadCkpt: -1200,
        enemyCkpt: -1200,
        enemyFreq: 1600,
        maxEnemies: 20,

        updateHero() {
            // LEFT
            if (keyIsDown(LEFT_ARROW)) {
                if (this.vx > -MAX_SPEED_2) this.vx -= (1 + ((this.vx + MAX_SPEED_2) / (2*MAX_SPEED_2))) * ACC_2;
            }
            
            // RIGHT
            if (keyIsDown(RIGHT_ARROW)) {
                if (this.vx < MAX_SPEED_2) this.vx += (1 + (-(this.vx - MAX_SPEED_2) / (2*MAX_SPEED_2))) * ACC_2;
            }
            
            // NEITHER L/R
            if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
                if (this.vx < 0.1 && this.vx >= 0) this.vx = 0;
                else if (this.vx > -0.1 && this.vx <0) this.vx = 0;
                else if (this.vx < 0) this.vx += ACC_2;
                else if (this.vx > 0) this.vx -= ACC_2;
            }
            
            // UP
            if (keyIsDown(UP_ARROW)) {
                if (this.vy < 20) this.vy += ACC_2;
            }
            
            // DOWN
            if (keyIsDown(DOWN_ARROW)) {
                if (this.vy > 5) this.vy -= ACC_2;
            }
            
            // NEITHER U/D
            if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
                if (this.vy < 10) this.vy += ACC_2/5;
                else if (this.vy > 10) this.vy -= ACC_2/5;
            }

            this.hero.x += this.vx;

            // HANDLE LEFT BOUND
            if (this.hero.x < -1.7*LANE_SX_2) {
                const max = 10 * (-2.2*LANE_SX_2 - this.hero.x) / (0.5*LANE_SX_2);
                if (max > this.vx) this.vx = max;
            }

            // HANDLE RIGHT BOUND
            if (this.hero.x > 1.7*LANE_SX_2) {
                const max = 10 * (2.2*LANE_SX_2 - this.hero.x) / (0.5*LANE_SX_2);
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
            if (this.hero.y <= this.roadCkpt) {
                this.roadCkpt -= 1200;
                this.currRoad = this.nextRoad;
                this.nextRoad = newRoad2(this.roadCkpt-400);
            }
        },

        updateCars() {
            if (this.hero.y <= this.enemyCkpt) {
                for (let l = 0; l < 5; l++) {
                    if (this.enemies.length < this.maxEnemies) {
                        const ypos = this.enemyCkpt - 1200 - random(4*CAR_SY, this.enemyFreq - 4*CAR_SY);
                        this.enemies.push(newEnemy2(l, ypos, 10-l));
                    }
                }

                this.enemyCkpt -= this.enemyFreq;
            }

            this.enemies = this.enemies.filter(e => e.y < this.hero.y + 200);
            this.enemies.forEach(e => e.update());
        },

        update() {
            this.updateRoad();
            this.updateCars();
            this.updateHero();
            this.updateCamera();
        },

        draw() {
            lights();
            
            this.currRoad.draw();
            this.nextRoad.draw();
            this.hero.draw();
            this.enemies.forEach(e => e.draw());
        },
    }
}