function Ball(x = (PLAYGROUNDWIDTH - BALLWIDTH) / 2, y = 8, dir = 2, ferma = true) {
    this.x = 0;
    this.y = 0;
    this.dir = 0;
    this.node = null;

    this.init(x, y, dir, ferma);
}

// funzione chiamata quando si ottiene il power-up viola
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
        this.dir = dir;
        this.x = x;
        this.y = y;
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
        // calcolo nuova posizione
        this.x += this.incX;
        this.y += this.incY;

        // memorizzo la vecchia direzione, mi servirà alla fine per sapere se devo ricalcolare
        // gli incrementi
        let lastDir = this.dir;

        // rimbalzo contro i muri laterali ? se sì aggiorno la direzione
        if (this.x + BALLWIDTH >= PLAYGROUNDWIDTH || this.x <= 0) {
            this.x = this.x + BALLWIDTH >= PLAYGROUNDWIDTH ? PLAYGROUNDWIDTH - BALLWIDTH : 0;
            this.dir = (Math.PI - this.dir) % (2 * Math.PI);
            // controllo sempre che la direzione stia in [0, 2pi]
            if (this.dir < 0)
                this.dir += 2 * Math.PI;

        }

        // rimbalzo su muro superiore ? se sì aggiorno la direzione
        if (this.y + BALLWIDTH >= PLAYGROUNDHEIGHT) {
            this.y = PLAYGROUNDHEIGHT - BALLWIDTH;
            this.dir = this.dir * (-1) + 2 * Math.PI;
        }


        // caduta sul fondo ? se sì la funzione chiamante lo saprà dal valore restituito
        if (this.y <= 0) {
            return -1;
        }

        // rimbalzo su player
        // poichè la posizione della ball non sarà quasi mai coincidente con quella del player (la ball ha incrementi decimali dati dalle
        // funzioni trigonometriche) lascio uno scarto di +0.5 e -0.5 unità
        if (this.y >= PLAYERBOTTOMDISTANCE - 0.5 && this.y <= PLAYERBOTTOMDISTANCE + 0.5 && this.x >= player.x && this.x <= player.x + player.length) {
            this.calcolaDirRimbalzo(player);
            this.y = 8;
        }

        this.node.style.bottom = this.y + "vw";
        this.node.style.left = this.x + "vw";

        // rimbalzo su blocco, in caso di collisione ritorna l'oggetto blocco colpito, 0 altrimenti
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
        // nel caso fosse attivo il power-up calamita blocco la palla, se non controllassi che la ball non sia ferma non riuscirebbe mai
        // a staccarsi
        if (player.calamita && !this.ferma) {
            player.fermaball(this, puntoRimbalzo);
            this.ferma = true;
            this.seguiPlayer(this.x);
        }
    }

// funzione per far sì che le ball ferme seguano il player
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
            let cbl = this.controlloBloccoLaterale(block);
            if (cbl) {
                if (this.y + BALLWIDTH / 2 >= block.y && this.y + BALLWIDTH / 2 <= block.y + BLOCKHEIGHT) {
                    if (cbl == 1) {  // lato sinistro
                        // se la ball non ha questa direzione non può colpire il muro sx
                        if (this.dir > (1 / 2) * Math.PI && this.dir < (3 / 2) * Math.PI)
                            return 0;
                        this.x = block.x - BALLWIDTH; // aggiusto la posizione virtuale
                    }
                    else { // lato destro
                        // se la ball non ha questa direzione non può colpire il muro dx
                        if (this.dir >= 0 && this.dir < Math.PI / 2 || this.dir >= (3 / 2) * Math.PI && this.dir < 2 * Math.PI)
                            return 0;
                        this.x = block.x + BLOCKWIDTH;
                    }
                    // mantengo la dir in [0, 2pi]
                    this.dir = (Math.PI - this.dir) % (2 * Math.PI);
                    if (this.dir < 0)
                        this.dir += 2 * Math.PI
                    if (block.hit()) {
                        block.remove();
                        delete blocks[i];
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
                    if (block.hit()) {
                        block.remove();
                        delete blocks[i];
                        return block;
                    }
                }
            }
        }
        return 0;
    }

// il controllo dell'impatto contro un blocco viene fatto valutando il centro della ball aprrossimando 
// la posizione tra [-scartoin, scartoout], se un lato di un blocco è in questo range allora si considera
// un possibile impatto (verrà successivamente controllata la y )
// il valore restituito indica quale lato è stato (ipoteticamente) colpito
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

// funzioni di utilità
Ball.prototype.azzeraPosizione =
    function () {
        this.x = 14.6;
        this.y = 8;
        this.node.style.bottom = this.y + "vw";
        this.node.style.left = this.x + "vw";
    }

Ball.prototype.remove =
    function () {
        playground.removeChild(this.node);
    }
