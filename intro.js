let TEXTS;
let introBuf;

function initIntro () {
    TEXTS = [
        "Ugh. I just had the craziest dream that I got into a car crash on the way to school.",
        "Oh shit, I overslept! I'm gonna be late!"
    ];


    introBuf = createGraphics(W,W);
}

function newIntro () {
    return {
        ti: 0,
        tc: 0,
        update() {
            camera();

            if (frameCount % 2 == 0 && this.tc < TEXTS[this.ti].length) {
                this.tc++;
            } else if (this.tc >= TEXTS[this.ti].length && keyIsPressed) {
                if (this.ti < TEXTS.length - 1) {
                    this.tc = 0;
                    this.ti++;
                } else {
                    return FINISH;
                }
            }

            return CONT;
        },
        draw() {
            introBuf.background(BLACK);
            introBuf.noStroke();

            introBuf.push();
                introBuf.fill(WHITE);
                introBuf.textSize(20);
                introBuf.textFont('monospace');
                introBuf.text(TEXTS[this.ti].substring(0, this.tc), 20, W/2-20, W-40);
            introBuf.pop();

            image(introBuf, -W/2, -W/2);
        }
    }
}