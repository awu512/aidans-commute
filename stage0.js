let TEXTS;

function initStage0 () {
    TEXTS = [
        "Ugh. I just had the craziest dream that I got into a car crash on the way to school.",
        "Oh shit, I overslept! I'm gonna be late!"
    ];
}

function newStage0 () {
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
            const buf = createGraphics(W,W);

            buf.background(BLACK);
            buf.noStroke();

            buf.push();
                buf.fill(WHITE);
                buf.textSize(20);
                buf.textFont('monospace');
                buf.text(TEXTS[this.ti].substring(0, this.tc), 20, W/2-20, W-40);
            buf.pop();

            image(buf, -W/2, -W/2);
        }
    }
}