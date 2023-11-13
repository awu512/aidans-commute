let endBuf;

function initEnd () {
    endBuf = createGraphics(W,W);
}

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
            endBuf.background(BLACK);
            endBuf.noStroke();

            endBuf.push();
                endBuf.fill(WHITE);
                endBuf.textSize(20);
                endBuf.textFont('monospace');
                endBuf.text(this.text.substring(0, this.tc), 20, W/2-20, W-40);
            endBuf.pop();

            image(endBuf, -W/2, -W/2);
        }
    }
}