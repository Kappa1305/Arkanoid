function Ball(x = PLAYGROUNDWIDTH/2 - BALLWIDTH/2, y = 8, dir = 1, ferma = true) {
    this.x = 0;
    this.y = 0;
    this.dir = 0;
    this.node = null;

    this.init(x, y, dir, ferma);
}

Ball.prototype.raddoppia =
    function () {
        nuovaBall = new Ball(this.x, this.y, this.dir + 1, false);
        return nuovaBall;
    }

Ball.prototype.init =
    function (x, y, dir, ferma) {
        this.node = document.createElement("div");
        this.node.setAttribute("class", "ball");
        playground.appendChild(this.node);
        this.ferma = ferma;
        // voglio che parta da una direzione di salita e non voglio sia troppo orizzontale
        this.dir = dir;
        this.x = x // Math.random() * (MURODX - MUROSX);
        this.y = y // Math.random() * (MUROTOP - 30) +15;
        this.aggiornaInc();
        this.node.style.left = this.x + "vw";
        this.node.style.bottom = this.y + "vw";
        this.node.style.display = "block";
    }

Ball.prototype.aggiornaInc =
    function () {
        this.incX = ballSpeed * Math.cos(this.dir);
        this.incY = ballSpeed * Math.sin(this.dir);
    }

// la posizione virtuale verrà sempre aggiustata in maniera da prevenire compenetrazioni tra
// gli elementi prima di diventare reale, in questo modo anche se in un certo istante la 
// posizione virtuale non è corretta a schermo non verrà mostrata finchè non è stata corretta
Ball.prototype.muovi =
    function (blocks, player) {
        // calcolo nuova posizione, evito che vada oltre il muro prima di rimbalzare
        this.x += this.incX
        //this.x = this.x > PLAYGROUNDWIDTH - BALLWIDTH ? PLAYGROUNDWIDTH - BALLWIDTH : this.x;
        //this.x = this.x < 0 ? 0 : this.x;
        this.y += this.incY;
        //this.y = this.y > PLAYGROUNDHEIGHT - BALLWIDTH ? PLAYGROUNDHEIGHT - BALLWIDTH: this.y;
        // rimbalzo contro i muri laterali
        let lastDir = this.dir;
        if (this.x + BALLWIDTH >= PLAYGROUNDWIDTH || this.x <= 0) {
            this.x = this.x + BALLWIDTH >= PLAYGROUNDWIDTH ? PLAYGROUNDWIDTH - BALLWIDTH : 0;
            this.dir = (Math.PI - this.dir) % (2 * Math.PI);
            if (this.dir < 0)
                this.dir += 2 * Math.PI;

        }

        // rimbalzo su muro superiore
        if (this.y + BALLWIDTH >= PLAYGROUNDHEIGHT) {
            this.y = PLAYGROUNDHEIGHT - BALLWIDTH;
            this.dir = this.dir * (-1) + 2 * Math.PI;
        }
        // caduta sul fondo
        if (this.y <= 0) {/*
        this.x = 14.5
        this.y = 8
        this.node.style.left = this.x + "vw";
        this.node.style.bottom = this.y + "vw";
        // voglio che parta da una direzione di salita e non voglio sia troppo orizzontale
        this.dir = (Math.random() * (Math.PI - 0.30) + 0.15); */
            return -1;
        }

        // rimbalzo su player
        if (this.y >= PLAYERBOTTOMDISTANCE - 0.5 && this.y <= PLAYERBOTTOMDISTANCE + 0.5 && this.x >= player.x && this.x <= player.x + player.length) {
            this.calcolaDirRimbalzo(player);
            this.y = 8;
        }
        // modifico l'elemento html
        this.node.style.bottom = this.y + "vw";
        this.node.style.left = this.x + "vw";
        // rimbalzo su blocco, ritorna 1 se ha colpito un blocco, 0 altrimenti
        block = this.rimbalzoBlocco(blocks);
        if (lastDir != this.dir) {
            this.aggiornaInc();
        }
        if (block) {
            return block;
        }
        return 0;
    }
// calcolo la direzione del rimbalzo in base a dove colpisce il player
Ball.prototype.calcolaDirRimbalzo =
    function (player) {
        puntoRimbalzo = (this.x - player.x) / player.length;
        this.dir = (Math.PI - 0.3) * (1 - puntoRimbalzo) + 0.15; // per non farla ribalzare troppo orizzontale
        if (player.calamita && !this.ferma) {
            player.fermaball(this, puntoRimbalzo);
            this.ferma = true;
            this.seguiPlayer(this.x);
        }
    }

Ball.prototype.azzeraPosizione =
    function () {
        this.x = 14.5;
        this.y = 8;
        this.node.style.bottom = this.y + "vw";
        this.node.style.left = this.x + "vw";
    }

Ball.prototype.seguiPlayer =
    function (x) {
        this.ferma = true;
        this.x = x;
        this.node.style.left = this.x + "vw";
    }

Ball.prototype.rimbalzoBlocco =
    function (blocks) {
        for (let i in blocks) {
            let block = blocks[i];
            // controllo se ha colpito uno dei due lati del blocco
            let cbl = this.controlloBloccoLaterale(block)
            if (cbl) {
                if (this.y + BALLWIDTH / 2 >= block.y && this.y + BALLWIDTH / 2 <= block.y + BLOCKHEIGHT) {
                    if (cbl == 1) {  // lato sinistro
                        if (this.dir > (1 / 2) * Math.PI && this.dir < (3 / 2) * Math.PI)
                            return 0;
                        this.x = block.x - BALLWIDTH; // aggiusto la posizione virtuale
                    }
                    else { // lato destro
                        if (this.dir >= 0 && this.dir < Math.PI / 2 || this.dir >= (3 / 2) * Math.PI && this.dir < 2 * Math.PI)
                            return 0;
                        this.x = block.x + BLOCKWIDTH;
                    }
                    this.dir = (Math.PI - this.dir) % (2 * Math.PI);
                    if (this.dir < 0)
                        this.dir += 2 * Math.PI
                    incPunteggio = block.hit();
                    if (incPunteggio) {
                        block.remove();
                        delete blocks[i];
                        punteggio = document.getElementById("punteggio");
                        punteggio.textContent = +punteggio.textContent + +incPunteggio;
                        return block;
                    }
                }
            }
            // controllo se ha colpito la parte superiore o inferiore
            let cbb = this.controlloBloccoBase(block);
            if (cbb) {
                if (this.x + BALLWIDTH / 2 >= block.x && this.x + BALLWIDTH / 2 <= block.x + BLOCKWIDTH) {
                    if (cbb == 1) { // base inferiore
                        if (this.dir > Math.PI && this.dir < 2 * Math.PI)
                            return 0;
                        this.y = block.y - BALLWIDTH;
                    }
                    else {
                        if (this.dir > 0 && this.dir < Math.PI) // base superiore
                            return 0;
                        this.y = block.y + BLOCKHEIGHT;
                    }
                    this.dir = this.dir * (-1) + 2 * Math.PI;
                    punteggio = document.getElementById("punteggio");
                    incPunteggio = block.hit();
                    if (incPunteggio) {
                        block.remove();
                        delete blocks[i];
                        punteggio = document.getElementById("punteggio");
                        punteggio.textContent = +punteggio.textContent + incPunteggio;
                        return block;
                    }
                }
            }
        }
        return 0;
    }

// la condizione sulla direzione fa sì che si evitino rimbalzi incosistenti con la fisica del moto
Ball.prototype.controlloBloccoLaterale =
    function (block) {
        // impatto con parte sinistra
        if ((Math.floor((this.x + BALLWIDTH - SCARTOOUT)) <= block.x
            && Math.floor((this.x + BALLWIDTH + SCARTOINLATERALE)) >= block.x)) {
            return 1;
        }
        // impatto con parte destra
        else if (Math.floor((this.x - SCARTOINLATERALE)) <= (block.x + BLOCKWIDTH)
            && Math.floor((this.x + SCARTOOUT)) >= (block.x + BLOCKWIDTH)) {
            return 2;
        }
        else
            return false;
    }

Ball.prototype.controlloBloccoBase =
    function (block) {
        if ((Math.floor((this.y + BALLWIDTH - SCARTOOUT)) <= (block.y)               // base inferiore
            && Math.floor((this.y + BALLWIDTH + SCARTOINBASE)) >= (block.y))) {
            return 1;
        }

        else if (((this.y - SCARTOINBASE)) <= (block.y + BLOCKHEIGHT)            // base superiore
            && ((this.y + SCARTOOUT)) >= (block.y + BLOCKHEIGHT)) {
            return 2;
        }
        else
            return false;
    }

Ball.prototype.remove =
    function () {
        playground = this.node.parentElement;
        playground.removeChild(this.node);
    }
