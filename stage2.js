let CAR_SX;
let CAR_SY;
let CAR_SZ;

let DASH_SX;
let DASH_SY;
let DASH_SZ;

let LANE_SX;
let ROAD_SX;

let ACC;

let RED;
let GREY;

let newCar;
let newDashSet;

function initStage2 () {
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

    newDashSet = (ypos) => ({
        y: ypos,
        draw() {
            for (let lane = 1; lane <= 4; lane++) {
                push();
                noStroke();
                translate(-(ROAD_SX/2) + lane * (ROAD_SX/5), this.y, 0);
                box(DASH_SX, DASH_SY, DASH_SZ);
                pop();
            }
        }
    });
}

function newStage2() {
    let cars = [];
    cars.push(newCar(100, 0, 0, GREY));

    let dashSets = [];
    dashSets.push(newDashSet(50));

    return ({
        hero: newCar(0, 0, 0, RED),
        vx: 0,
        vy: 0,
        cars: cars,
        dashSets: dashSets,

        updateHero() {
            // LEFT
            if (keyIsDown(LEFT_ARROW)) {
                if (this.vx > -10) this.vx -= (1 + ((this.vx + 10) / 20)) * ACC;
            }
            
            // RIGHT
            if (keyIsDown(RIGHT_ARROW)) {
                if (this.vx < 10) this.vx += (1 + (-(this.vx - 10) / 20)) * ACC;
            }
            
            // NEITHER L/R
            if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
                if (this.vx < 0.1 && this.vx >= 0) this.vx = 0;
                else if (this.vx > -0.1 && this.vx < 0) this.vx = 0;
                else if (this.vx < 0) this.vx += ACC;
                else if (this.vx > 0) this.vx -= ACC;
            }
            
            // UP
            if (keyIsDown(UP_ARROW)) {
                if (this.vy < 10) this.vy += (1 + ((this.vy + 10) / 20)) * ACC;
            }
            
            // DOWN
            if (keyIsDown(DOWN_ARROW)) {
                if (this.vy > -5) this.vy -= (1 + (-(this.vy - 10) / 20)) * ACC;
            }
            
            // NEITHER U/D
            if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
                if (this.vy < 0.1 && this.vy >= 0) this.vy = 0;
                else if (this.vy > -0.1 && this.vy < 0) this.vy = 0;
                else if (this.vy < 0) this.vy += ACC;
                else if (this.vy > 0) this.vy -= ACC;
            }
            
            this.hero.x += this.vx;
            this.hero.y -= this.vy; // forward is -y
            
            this.hero.a = asin(map(this.vx, -15, 15, -10, 10, true) / 10);
        },

        updateCamera() {
            camera(
                this.hero.x, 195, 150,
                this.hero.x, this.hero.y, 0,
                0, 0, -1
            );
        },

        drawRoad() {
            push();
            fill(0);
            noStroke();
            translate(0, -530, 0);
            plane(ROAD_SX, 1350);
            pop();
        },

        update() {
            this.updateHero();
            this.updateCamera();
        },

        draw() {
            this.drawRoad();
        
            // ambientLight(color(50));
            directionalLight(color(255), -1, -2, -3);
            
            this.hero.draw();
            this.cars.forEach(c => c.draw());
            this.dashSets.forEach(d => d.draw());
        },
    })
}