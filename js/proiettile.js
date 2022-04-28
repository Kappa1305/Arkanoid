function Proiettile(x) {
    this.x = 0;
    this.y = 0;
    this.node = null;
    this.init(x);
}

Proiettile.prototype.init =
    function (x) {
        this.node = document.createElement("div");
        this.node.setAttribute("class", "proiettile");
        playground.appendChild(this.node);
        this.x = x;
        this.y = PLAYERBOTTOMDISTANCE + PLAYERHEIGHT;
        this.node.style.left = this.x + "vw";
        this.node.style.bottom = this.y + "vw";
        this.node.style.display = "block"
    }

Proiettile.prototype.sali =
    function (blocks) {
        this.y = this.y + 0.5;
        for (let i in blocks) {
            let block = blocks[i]
            if (this.x >= block.x && this.x <= block.x + BLOCKWIDTH && Math.floor(this.y) == Math.floor(block.y)) {              // base inferiore
                incPunteggio = block.hit();
                if (incPunteggio === null)
                    return 0;
                this.remove();
                if (incPunteggio) {
                    block.remove();
                    delete blocks[i];
                    punteggio = document.getElementById("punteggio");
                    punteggio.textContent = +punteggio.textContent + incPunteggio;
                    return 1;
                }
                return 2;
            }
        }
        this.node.style.bottom = this.y + "vw";
        if (this.y == PLAYGROUNDHEIGHT) {
            this.remove();
            return 2;
        }
        return 0
    }

Proiettile.prototype.remove =
    function () {
        playground.removeChild(this.node);
    }

function spara(proiettili, blocks) {
    let colpiti = 0
    for (let i in proiettili) {
        colpito = proiettili[i].sali(blocks);
        if (colpito == 1) { // colpito un bloco
            delete proiettili[i];
            colpiti++;
        }
        else if (colpito == 2)
            delete proiettili[i];
    }
    return colpiti;
}