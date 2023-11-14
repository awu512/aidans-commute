let LANE_SX_2;
let ROAD_SX_2;
let ROAD_SY_2;

let WALL_W;
let WALL_H;

let ACC_2;
let MAX_SPEED_2;

let GOAL2;

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

    // walls
    WALL_W = 10;
    WALL_H = 150;

    // acceleration
    ACC_2 = 0.2;
    MAX_SPEED_2 = 10;

    GOAL2 = 40000;

    // factories
    newHero2 = () => ({
        x: 0, // x position
        y: 0, // y position
        a: 0, // angle
        draw() {
            push();
                noStroke();
                
                translate(this.x, this.y);
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
                        fill(RED);
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
                    
                    // UPPER BODY
                    push();
                        translate(0,CAR_SY/8,CAR_SZ/3);
                        box(CAR_SX, CAR_SY / 2, CAR_SZ / 2);

                        // WINDOWS
                        push();
                            fill(GREY_BLUE);

                            push();
                                translate(0, CAR_SY/4 + WINDOW_D/2, 1.5*WINDOW_D);
                                box(CAR_SX - WINDOW_D, WINDOW_D, CAR_SZ/2 - 4*WINDOW_D);
                            pop();

                            push();
                                translate(CAR_SX/2, 0, 1.5*WINDOW_D);
                                box(WINDOW_D, CAR_SY/2 - 4 * WINDOW_D, CAR_SZ/2 - 4*WINDOW_D);
                            pop();

                            push();
                                translate(-CAR_SX/2, 0, 1.5*WINDOW_D);
                                box(WINDOW_D, CAR_SY/2 - 4 * WINDOW_D, CAR_SZ/2 - 4*WINDOW_D);
                            pop();
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
                        rotate(this.a);
                        rotateZ(PI/2);
                        cylinder(WHEEL_R, WHEEL_H);
                    pop();

                    push();
                        translate(-CAR_SX/2, -CAR_SY/3, WHEEL_R);
                        rotate(this.a);
                        rotateZ(PI/2);
                        cylinder(WHEEL_R, WHEEL_H);
                    pop();
                pop();
            pop();
        }
    });

    newEnemy2 = (l, y, s) => ({
        x: LANE_SX_2*(l - 2), // lane
        y: y, // y position
        s: s, // speed
        c: color(50+Math.random()*150,50+Math.random()*150,50+Math.random()*150), // color
        update() {
            this.y -= s;
        },
        draw() {
            push();
                noStroke();
                
                translate(this.x, this.y);

                // BODY
                push();
                    fill(this.c);

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
                        fill(RED);
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
                    
                    // UPPER BODY
                    push();
                        translate(0,CAR_SY/8,CAR_SZ/3);
                        box(CAR_SX, CAR_SY / 2, CAR_SZ / 2);

                        // WINDOWS
                        push();
                            fill(GREY_BLUE);

                            push();
                                translate(0, CAR_SY/4 + WINDOW_D/2, 1.5*WINDOW_D);
                                box(CAR_SX - WINDOW_D, WINDOW_D, CAR_SZ/2 - 4*WINDOW_D);
                            pop();

                            push();
                                translate(CAR_SX/2, 0, 1.5*WINDOW_D);
                                box(WINDOW_D, CAR_SY/2 - 4 * WINDOW_D, CAR_SZ/2 - 4*WINDOW_D);
                            pop();

                            push();
                                translate(-CAR_SX/2, 0, 1.5*WINDOW_D);
                                box(WINDOW_D, CAR_SY/2 - 4 * WINDOW_D, CAR_SZ/2 - 4*WINDOW_D);
                            pop();
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
        },
        contains(hx,hy,ha) {
            for (let xd = -1; xd <= 1; xd+=2) {
                for (let yd = -1; yd <= 1; yd+=2) {
                    const cx = hx + xd * (cos(ha) * (CAR_SX/2)) - yd * (sin(ha) * (CAR_SY/2));
                    const cy = hy + xd * (sin(ha) * (CAR_SX/2)) + yd * (cos(ha) * (CAR_SY/2));

                    if (this.x - CAR_SX/2 <= cx &&
                        this.x + CAR_SX/2 >= cx &&
                        this.y - CAR_SY/2 <= cy &&
                        this.y + CAR_SY/2 >= cy)
                        return true;
                }
            }

            return false;
        }
    });

    newRoad2 = (ypos) => ({
        y: ypos,
        drawRoad() {
            push();
            fill(DARK_GREY);
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
        drawWalls() {
            push();
                fill(TAN);
                stroke(DARK_GREY);
                push();
                    translate(ROAD_SX_2/2 + WALL_W/2, this.y, WALL_H/2);
                    box(WALL_W, ROAD_SY_2, WALL_H);
                pop();
                push();
                    translate(-ROAD_SX_2/2 - WALL_W/2, this.y, WALL_H/2);
                    box(WALL_W, ROAD_SY_2, WALL_H);
                pop();
            pop();
        },
        draw() {
            this.drawRoad();
            this.drawLines();
            this.drawDashes();
            this.drawWalls();
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
        enemyFreq: 1000,
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
                this.hero.x, this.hero.y + CAM_D, CAM_H,
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

        updateEnemies() {
            // spawning
            if (this.hero.y <= this.enemyCkpt) {
                for (let l = 0; l < 5; l++) {
                    if (this.enemies.length < this.maxEnemies) {
                        const ypos = this.enemyCkpt - 1200 - random(4*CAR_SY, this.enemyFreq - 4*CAR_SY);
                        this.enemies.push(newEnemy2(l, ypos, 8-0.5*l));
                    }
                }

                this.enemyCkpt -= this.enemyFreq;
            }

            // remove
            this.enemies = this.enemies.filter(e => 
                e.y < this.hero.y + 200 && e.y > this.hero.y - 1800);

            // move
            this.enemies.forEach(e => e.update());
            
            // collision
            return this.enemies.some(e => e.contains(this.hero.x, this.hero.y, this.hero.a));
        },

        update() {
            this.updateRoad();
            this.updateHero();
            this.updateCamera();

            if (this.updateEnemies()) return CRASH;
            else if (this.hero.y <= -GOAL2) return FINISH;
            else return CONT;
        },

        drawProgress() {
            const progress = this.hero.y / -GOAL2;

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
                pb.rect(0.5*HUD_W*progress-HUD_W/2, HUD_H/2, HUD_W*progress, 2);
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
                translate(this.hero.x - HUD_W/2, this.hero.y+CAR_SY/3, 2.4*CAR_SZ);
                rotateX(-PI/2);
                image(pb, 0, 0);
            pop();
        },

        draw() {
            lights();
            
            this.currRoad.draw();
            this.nextRoad.draw();
            this.hero.draw();
            this.enemies.forEach(e => e.draw());

            this.drawProgress();
        },
    }
}