var playground;

function begin(level) {
    playground = document.getElementById("playground");
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
    this.selezionaLivello();
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
}

Game.prototype.raddoppiaPalline =
    function () {
        let tempNuoveBall = new Array;
        for (i in this.ball) {
            tempNuoveBall[i] = this.ball[i].raddoppia();
            this.ballAttive++;
        }
        for (i in tempNuoveBall) {
            this.ball.push(tempNuoveBall[i]);
        }
    }

Game.prototype.selezionaLivello =
    function () {
        this.blocks = new Array;
        this.powerUP = new Array;
        switch (this.level) {
            case 0: this.rimasti = livello0(this.blocks); break;
            case 1: this.rimasti = livelloTest1(this.blocks); break;
            case 2: this.rimasti = livello2(this.blocks); break;
            case 3: this.rimasti = livelloTest0(this.blocks); break;
            case 4: this.rimasti = livello4(this.blocks); break;
            case 5: this.rimasti = livello5(this.blocks); break;
            case 6: this.rimasti = livello6(this.blocks); break;
            case 7: this.rimasti = livello7(this.blocks); break;
            case 8: this.rimasti = livelloTest0(this.blocks); break;
            case 9: this.rimasti = livelloTest0(this.blocks); break;
            default: this.terminaPartita(1); return;
        }
        this.movimento = setInterval(this.clock.bind(this), clockTime);
    }

Game.prototype.clock =
    function () {
        for (let i in this.ball) {
            if (!this.ball[i].ferma) {
                let avvenimento = this.ball[i].muovi(this.blocks, this.player);
                // 0 = nulla, 1 = colpito un blocco, -1 = ball sul fondo
                if (avvenimento === -1) {
                    punteggio = document.getElementById("punteggio");
                    punteggio.textContent = punteggio.textContent - 500 < 0 ? 0 : punteggio.textContent - 500;
                    this.ball[i].remove();
                    delete this.ball[i];
                    if (--this.ballAttive == 0) {
                        this.ball = new Array;
                        this.ball[0] = new Ball();
                        this.ballAttive = 1;
                        this.ball[0].x = 14.6
                        this.ball[0].y = 8
                        this.ball[0].node.style.left = this.x + "vw";
                        this.ball[0].node.style.bottom = this.y + "vw";
                        // voglio che parta da una direzione di salita e non voglio sia troppo orizzontale
                        this.ball[0].dir = (Math.random() * (Math.PI - 0.30) + 0.15);
                        this.vitaPersa();
                        return;
                    }
                }
                else if (avvenimento) { // colpito un blocco, la funzione ritorna l'oggetto block
                    this.rimasti--;
                    tipoPowerUP = Math.floor(Math.random() * 15) + 1;

                    if (tipoPowerUP <= 5) {
                        bloccoColpitox = avvenimento.x;
                        bloccoColpitoy = avvenimento.y;
                        this.powerUP.push(new PowerUP(bloccoColpitox, bloccoColpitoy, tipoPowerUP));
                    }
                }
            }
        }
        colpiti = spara(this.proiettili, this.blocks)
        if (colpiti) {
            this.rimasti = this.rimasti - colpiti;
        }
        if (this.rimasti == 0) {
            this.terminaPartita();
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
Game.prototype.mouseMove =
    function (e) {
        this.player.muoviMouse(e);
        for (i in this.player.ballFerme) {
            this.player.ballFerme[i].seguiPlayer(this.player.x + this.player.posizioneBallFerme[i] * this.player.length);
        }
    }

Game.prototype.keyDown =
    function (e) {
        if (e.keyCode == 37)
            this.player.muoviSx();
        else if (e.keyCode == 39)
            this.player.muoviDx();
    }

Game.prototype.mouseDown =
    function () {
        for (i in this.player.ballFerme) {
            this.player.ballFerme[i].ferma = false;
            delete this.player.ballFerme[i];
        }
    }

Game.prototype.creaProiettili =
    function (proiettili, x1, x2) {
        proiettili.push(new Proiettile(x1 + 1))
        proiettili.push(new Proiettile(x2 - 1))
        if (--this.proiettiliToSend == 0)
            clearInterval(this.creaProiettiliInterval)
    }


Game.prototype.prossimoLivello =
    function (e) {
        while (playground.firstChild) { playground.removeChild(playground.firstChild); } 
        new Game(this.level+1);
    }

Game.prototype.vitaPersa =
    function () {
        this.azzeraPlayground(false);
        this.player.x = PLAYGROUNDWIDTH / 2 - this.player.length / 2;
        this.player.node.style.left = this.player.x + "vw";
        this.player.fermaball(this.ball[0], 0.45);
        vite = document.getElementById("vite");
        if (this.lives-- == 0) {
            this.terminaPartita(0);
        }
        else
            vite.textContent = this.lives;
    }

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

function aggiornaRecordESbloccati(livello, punteggio){

    var xmlHttp = new XMLHttpRequest(); 
  
    var parametro = 'livello=' + livello + '&punteggio=' + punteggio;
    xmlHttp.open("POST", "AggiornaRecordESbloccati.php", true);
   xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlHttp.send(parametro); 
     xmlHttp.onload = function(){
     }
  }

Game.prototype.terminaPartita =
    function (esito) {
        this.azzeraPlayground(true);
        playground.removeChild(this.player.node);
        aggiornaRecordESbloccati(this.level, document.getElementById("punteggio").textContent)
        // Elimino le informazioni
        // var daRimuovere = document.getElementById('informazioni');
        // document.body.removeChild(daRimuovere);
        // Creo il div che conterra' i risultati
        this.risultatiNode = document.createElement('div');
        this.risultatiNode.setAttribute('id', 'risultato');
        playground.appendChild(this.risultatiNode);

        /*            // Creo la scritta 'risultati:'
                    this.risultatiScritta = document.createElement('h1');
                    this.risultatiScritta.setAttribute('class','font size4 shadow4');
                    this.risultatiTesto = document.createTextNode('RISULTATI:');
                    this.risultatiScritta.appendChild(this.risultatiTesto); 
                    this.risultatiNode.appendChild(this.risultatiScritta);
                
                    // Creo la scritta 'metri:'
                    this.metriScritta = document.createElement('h1');
                    this.metriScritta.setAttribute('class','font size3 shadow4 margin0');
                    this.metriTesto = document.createTextNode('METRI: ');
                    this.metriScritta.appendChild(this.metriTesto); 
                    this.risultatiNode.appendChild(this.metriScritta);
                
                    // Creo la scritta 'monete:'
                    this.moneteScritta = document.createElement('h1');
                    this.moneteScritta.setAttribute('class','font size3 shadow4 margin0');
                    this.moneteTesto = document.createTextNode('MONETE: ');
                    this.moneteScritta.appendChild(this.moneteTesto); 
                    this.risultatiNode.appendChild(this.moneteScritta);
                 */
        
                    // Creo il tasto per tornare alla schermata principale

        this.ritornoScritta = new Array(3);
        this.ritornoTesto = new Array(3);
        this.ritornoScritta[0] = document.createElement('h1');
        this.ritornoScritta[0].setAttribute('class', 'finePartita');
        this.ritornoTesto[0] = document.createTextNode('PROSSIMO LIVELLO');
        this.ritornoScritta[0].appendChild(this.ritornoTesto[0]);
        this.risultatiNode.appendChild(this.ritornoScritta[0]);
        this.ritornoScritta[0].addEventListener('click', this.prossimoLivello.bind(this));

        this.ritornoScritta[1] = document.createElement('h1');
        this.ritornoScritta[1].setAttribute('class', 'finePartita');
        this.ritornoTesto[1] = document.createTextNode('SELEZIONA LIVELLO');
        this.ritornoScritta[1].appendChild(this.ritornoTesto[1]);
        this.risultatiNode.appendChild(this.ritornoScritta[1]);
        this.ritornoScritta[1].setAttribute('onclick', "window.location.href = 'selezionaLivello.php'");

        this.ritornoScritta[2] = document.createElement('h1');
        this.ritornoScritta[2].setAttribute('class', 'finePartita');
        this.ritornoTesto[2] = document.createTextNode('VISUALIZZA CLASSIFICA');
        this.ritornoScritta[2].appendChild(this.ritornoTesto[2]);
        this.risultatiNode.appendChild(this.ritornoScritta[2]);
        testoClassifica = "window.location.href = 'classifica?livello='"+this.level+"'"
        this.ritornoScritta[2].setAttribute('onclick', "window.location.href = 'classifica.php?livello="+this.level+"'");
    }

Game.prototype.attivaProiettili =
    function () {
        this.player.reset();
        if (this.proiettiliToSend == 0)
            this.creaProiettiliInterval = setInterval(() => this.creaProiettili(this.proiettili, this.player.x, this.player.x + this.player.length, 8), 500)
        this.proiettiliToSend += 5;
    }



