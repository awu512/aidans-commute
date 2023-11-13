function newIntro () {
    return {
        ti: 0,
        tc: 0,
        texts: [
            "Ugh. I just had the craziest dream that I got into a car crash on the way to school.",
            "Oh shit, I overslept! I'm gonna be late!"
        ],
        buf: createGraphics(W,W),
        update() {
            camera();

            if (frameCount % 2 == 0 && this.tc < this.texts[this.ti].length) {
                this.tc++;
            } else if (this.tc >= this.texts[this.ti].length && keyIsPressed) {
                if (this.ti < this.texts.length - 1) {
                    this.tc = 0;
                    this.ti++;
                } else {
                    this.buf.remove();
                    return FINISH;
                }
            }

            return CONT;
        },
        draw() {
            this.buf.background(BLACK);
            this.buf.noStroke();

            this.buf.push();
                this.buf.fill(WHITE);
                this.buf.textSize(20);
                this.buf.textFont('monospace');
                this.buf.text(this.texts[this.ti].substring(0, this.tc), 20, W/2-20, W-40);
            this.buf.pop();

            image(this.buf, -W/2, -W/2);
        }
    }
}