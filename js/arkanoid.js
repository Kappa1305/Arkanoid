document.addEventListener('keydown', tastoPremuto);

function tastoPremuto(e) {
    if (e.keyCode == 8) // backspace
        window.location = '../php/selezionaLivello.php';
}

var playground;

function begin(level) {
    playground = document.getElementById("playground");
    playground.style.cursor = "none";
    game = new Game(level);
}

function Game(level) {
    this.rimasti = 0;
    this.movimento = null;
    this.proiettili = new Array;
    this.lives = 2;
    this.level = level;
    this.ball = new Array;
    this.ball[0] = new Ball();
    this.player = new Player(PLAYERLENGTH);
    this.player.fermaball(this.ball[0], 0.45);
    this.blocks = new Array;
    this.powerUP = new Array;
    this.ballAttive = 1;
    this.proiettiliToSend = 0;
    this.punteggio = 0;
    aggiornaPunteggio(0);
    this.selezionaLivello();
    this.timer = new Timer;
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
}

Game.prototype.clock =
    function () {
        for (let i in this.ball) {
            // le palline ferme sono quelle bloccate sul pkayer (prima del begin o per 
            // effetto della calamita)
            if (!this.ball[i].ferma) {
                let avvenimento = this.ball[i].muovi(this.blocks, this.player);
                // 0 = nulla, 1 = colpito un blocco, -1 = ball sul fondo
                if (avvenimento === -1) {
                    this.punteggio -= 500;
                    if (this.punteggio < 0)
                        this.punteggio = 0;
                    aggiornaPunteggio(this.punteggio);
                    this.ball[i].remove();
                    delete this.ball[i];
                    // controllo che siano rimaste delle ball attive (potrebbero esserci state più
                    // ball in gioco contemporaneamente)
                    if (--this.ballAttive == 0) {
                        this.ball = new Array;
                        this.ball[0] = new Ball();
                        this.ballAttive = 1;
                        this.ball[0].x = 14.6;
                        this.ball[0].y = 8;
                        this.ball[0].node.style.left = this.x + "vw";
                        this.ball[0].node.style.bottom = this.y + "vw";
                        // voglio che parta da una direzione di salita e non voglio sia troppo orizzontale
                        this.vitaPersa();
                        return;
                    }
                }
                else if (avvenimento) { // colpito un blocco, la funzione restituisce l'oggetto block
                    this.rimasti--;
                    this.punteggio += avvenimento.hit();
                    aggiornaPunteggio(this.punteggio);

                    tipoPowerUP = Math.floor(Math.random() * 15) + 1;
                    if (tipoPowerUP <= 5) {
                        // creo il power up alle stesse coordinate del blocco colpito
                        bloccoColpitox = avvenimento.x;
                        bloccoColpitoy = avvenimento.y;
                        this.powerUP.push(new PowerUP(bloccoColpitox, bloccoColpitoy, tipoPowerUP));
                    }
                }
            }
        }
        // spara mi restituisce il numero di blocchi colpiti dai proiettili
        colpiti = spara(this.proiettili, this.blocks)
        if (colpiti) {
            this.rimasti = this.rimasti - colpiti;
            this.punteggio += colpiti * 50;
            aggiornaPunteggio(this.punteggio);
        }
        if (this.rimasti == 0) {
            // 0 significa partita terminata con win
            this.terminaPartita(0);
            return;
        }
        for (let i in this.powerUP) {
            powerUP = this.powerUP[i];
            resultPowerUP = powerUP.scendi(this.player.x, this.player.length)
            if (resultPowerUP != 0)
                delete this.powerUP[i];
            switch (resultPowerUP) {
                case 1: this.player.allunga(); break;
                case 2: this.player.accorcia(); break;
                case 3: this.player.attivaCalamita(); break;
                case 4: this.raddoppiaPalline(); break;
                case 5: this.attivaProiettili(); break;
            }
        }
    }

Game.prototype.selezionaLivello =
    function () {
        this.blocks = new Array;
        this.powerUP = new Array;
        switch (this.level) {
            // le funzioni restituiscono il numero di blocchi nel livello
            case 1: this.rimasti = livello1(this.blocks); break;
            case 2: this.rimasti = livello2(this.blocks); break;
            case 3: this.rimasti = livello3(this.blocks); break;
            case 4: this.rimasti = livello4(this.blocks); break;
            case 5: this.rimasti = livello5(this.blocks); break;
            case 6: this.rimasti = livello6(this.blocks); break;
            case 7: this.rimasti = livello7(this.blocks); break;
            case 8: this.rimasti = livello8(this.blocks); break;
            case 9: this.rimasti = livello9(this.blocks); break;
            default: window.location = "selezionaLivello.php"; return;
        }
        this.movimento = setInterval(this.clock.bind(this), clockTime);
    }


Game.prototype.vitaPersa =
    function () {
        this.azzeraPlayground(false);
        this.player.x = PLAYGROUNDWIDTH / 2 - this.player.length / 2;
        this.player.node.style.left = this.player.x + "vw";
        this.player.fermaball(this.ball[0], 0.45);
        vite = document.getElementById("vite");
        if (this.lives-- == 0) {
            this.terminaPartita(1);
        }
        else
            vite.textContent = this.lives;
    }


Game.prototype.prossimoLivello =
    function () {
        while (playground.firstChild) { playground.removeChild(playground.firstChild); }
        new Game(this.level + 1);
    }

Game.prototype.riprovaLivello =
    function () {
        while (playground.firstChild) { playground.removeChild(playground.firstChild); }
        new Game(this.level);
    }

function aggiornaPunteggio(punteggio) {
    nodePunteggio = document.getElementById("punteggio");
    nodePunteggio.textContent = punteggio;
}

// pulisco il playground
Game.prototype.azzeraPlayground = function (finePartita) {

    this.player.reset();
    for (let i in this.powerUP) {
        this.powerUP[i].remove();
        delete this.powerUP[i];
    }

    this.proiettiliToSend = 0;
    clearInterval(this.creaProiettiliInterval);
    for (let i in this.proiettili) {
        this.proiettili[i].remove();
        delete this.proiettili[i];
    }
    if (finePartita) {
        for (let i in this.ball) {
            this.ball[i].remove();
        }
        for (i in this.blocks) {
            this.blocks[i].remove();
        }
        clearInterval(this.movimento);
    }
}

Game.prototype.terminaPartita =
    function (esito) {
        playground.style.cursor = "";
        secondiRimanenti = this.timer.stop();
        punteggioTimer = secondiRimanenti * 50; // per ogni secondo rimanente si aggiungono 50 punti
        this.punteggio += punteggioTimer;
        aggiornaPunteggio(this.punteggio);

        // aggiorna l'highscore e se il livello successivo non era ancora stato sbloccato lo sblocca, controlla le skin sbloccate
        aggiornaRecordESbloccati(this.level, this.punteggio, secondiRimanenti);

        // pulisco lo schermo
        this.azzeraPlayground(true);
        playground.removeChild(this.player.node);
        this.risultatiNode = document.createElement('div');
        this.risultatiNode.setAttribute('id', 'risultato');
        playground.appendChild(this.risultatiNode);

        // Creo il tasto per tornare alla schermata principale
        this.ritornoScritta = new Array(3);
        this.ritornoTesto = new Array(3);
        this.ritornoScritta[0] = document.createElement('h1');
        this.ritornoScritta[0].setAttribute('class', 'finePartita');
        if (esito == 0) { // won
            let nextLevel = 1 + +this.level;
            this.ritornoTesto[0] = document.createTextNode('PROSSIMO LIVELLO');
            this.ritornoScritta[0].setAttribute('onclick', "window.location.href = 'arkanoid.php?level=" + nextLevel + "'");
        }
        else { // lost
            this.ritornoTesto[0] = document.createTextNode('RIPROVA');
            this.ritornoScritta[0].setAttribute('onclick', "window.location.href = 'arkanoid.php?level=" + this.level + "'");
        }
        this.risultatiNode.appendChild(this.ritornoScritta[0]);
        this.ritornoScritta[0].appendChild(this.ritornoTesto[0]);

        // torna alla selezione del livello
        this.ritornoScritta[1] = document.createElement('h1');
        this.ritornoScritta[1].setAttribute('class', 'finePartita');
        this.ritornoTesto[1] = document.createTextNode('SELEZIONA LIVELLO');
        this.ritornoScritta[1].appendChild(this.ritornoTesto[1]);
        this.risultatiNode.appendChild(this.ritornoScritta[1]);
        this.ritornoScritta[1].setAttribute('onclick', "window.location.href = 'selezionaLivello.php'");

        // visualizza classifica highscore del livello giocato
        this.ritornoScritta[2] = document.createElement('h1');
        this.ritornoScritta[2].setAttribute('class', 'finePartita');
        this.ritornoTesto[2] = document.createTextNode('VISUALIZZA CLASSIFICA');
        this.ritornoScritta[2].appendChild(this.ritornoTesto[2]);
        this.risultatiNode.appendChild(this.ritornoScritta[2]);
        testoClassifica = "window.location.href = 'classifica?livello='" + this.level + "'"
        this.ritornoScritta[2].setAttribute('onclick', "window.location.href = 'classifica.php?livello=" + this.level + "'");
    }


function aggiornaRecordESbloccati(livello, punteggio, secondiRimanenti) {

    var xmlHttp = new XMLHttpRequest();
    // invio richiesta di controllo del punteggio
    var parametro = 'livello=' + livello + '&punteggio=' + punteggio + '&secondiRimanenti=' + secondiRimanenti;
    xmlHttp.open("POST", "AggiornaRecordESbloccati.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(parametro);
    xmlHttp.onload = function () {
    }
}


// funzioni legate ai power up{
Game.prototype.raddoppiaPalline =
    function () {
        // per ogni ball attiva ne creo un'altra e la aggiungo a un vettore temporaneo
        let tempNuoveBall = new Array;
        for (i in this.ball) {
            tempNuoveBall[i] = this.ball[i].raddoppia();
            this.ballAttive++;
        }
        // aggiungo tutte le ball del vettore temporaneo al vettore principale
        for (i in tempNuoveBall) {
            this.ball.push(tempNuoveBall[i]);
        }
    }

// creo un proiettile a destra e a sinistra del player
Game.prototype.creaProiettili =
    function (proiettili, x1, x2) {
        proiettili.push(new Proiettile(x1 + 1))
        proiettili.push(new Proiettile(x2 - 1))
        if (--this.proiettiliToSend == 0)
            clearInterval(this.creaProiettiliInterval)
    }


Game.prototype.attivaProiettili =
    function () {
        this.player.reset();
        // se era già stato raccolto un power up proiettili utilizzo lo stesso interval
        if (this.proiettiliToSend == 0)
            this.creaProiettiliInterval = setInterval(() => this.creaProiettili(this.proiettili, this.player.x, this.player.x + this.player.length, 8), 500)
        // se era già stato raccolto un power up proiettili al numero di proiettili rimanenti ne vengono aggiunti 5
            this.proiettiliToSend += 5;
    }

// } funzioni legate ai power up

// funzioni legate ai listener {
Game.prototype.mouseMove =
    function (e) {
        this.player.muoviMouse(e);
        for (i in this.player.ballFerme) {
            this.player.ballFerme[i].seguiPlayer(this.player.x + this.player.posizioneBallFerme[i] * this.player.length);
        }
    }

Game.prototype.mouseDown =
    function () {
        for (i in this.player.ballFerme) {
            this.player.ballFerme[i].ferma = false;
            delete this.player.ballFerme[i];
        }
    }

Game.prototype.keyDown =
    function (e) {
        if (e.keyCode == 32) // spacebar
            for (i in this.player.ballFerme) {
                this.player.ballFerme[i].ferma = false;
                delete this.player.ballFerme[i];
            }
    }

// } funzioni legate ai listener 
