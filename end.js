function newEnd () {
    return {
        tc: 0,
        text: `Made it! Time: ${h}:${m < 10 ? "0" : ""}${m}\nPress any key to play again.`,
        update() {
            camera();

            if (frameCount % 2 == 0 && this.tc < this.text.length) {
                this.tc++;
            } else if (this.tc >= this.text.length && keyIsPressed) {
                return CRASH;
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
                buf.text(this.text.substring(0, this.tc), 20, W/2-20, W-40);
            buf.pop();

            image(buf, -W/2, -W/2);
        }
    }
}