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
let GREY;

let newHero; // hero factory

function initStage1 () {
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
    newHero = (xpos = 0, ypos = 0, angle = 0, col = color(0)) => ({
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
}

function newStage1 () {
    return {
        hero: newHero(0,0,0,RED),
        vx: 0,
        vy: 0,

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
                this.hero.a -= 0.02;
            }
            
            // RIGHT
            if (keyIsDown(RIGHT_ARROW)) {
                this.hero.a += 0.02;
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
            
            this.hero.x += this.vx * cos(this.hero.a) + this.vy * sin(this.hero.a);
            this.hero.y -= this.vy * cos(this.hero.a) + this.vx * sin(this.hero.a);
        },

        update() {
            this.updateHero();
            this.updateCamera();
        },

        drawRoad() {
            push();
            fill(0);
            noStroke();
            translate(0, -530, 0);
            plane(ROAD_SX, 1350);
            pop();
        },

        draw() {
            background(220);

            directionalLight(color(255), -1, -2, -3);

            this.drawRoad();
            this.hero.draw();
        }
    }
}

