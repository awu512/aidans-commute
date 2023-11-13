function newEnd () {
    return {
        tc: 0,
        text: `Made it! Time: ${h}:${m < 10 ? "0" : ""}${m}\nPress any key to play again.`,
        buf: createGraphics(W,W),
        update() {
            camera();

            if (frameCount % 2 == 0 && this.tc < this.text.length) {
                this.tc++;
            } else if (this.tc >= this.text.length && keyIsPressed) {
                this.buf.remove();
                return CRASH;
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
                this.buf.text(this.text.substring(0, this.tc), 20, W/2-20, W-40);
            this.buf.pop();

            image(this.buf, -W/2, -W/2);
        }
    }
}