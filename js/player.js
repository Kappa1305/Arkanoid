function Player(length) {
    this.x = 0;
    this.length = 0;
    this.node = null;
    this.calamita = null;
    this.ballFerme = null; // lista delle ball ferme (prima del begin o per la calamita)
    this.posizioneBallFerme = null;
    this.init(length);
}


Player.prototype.init =
    function (length) {
        this.node = document.createElement("div");
        this.node.setAttribute("id", "player");
        this.ballFerme = new Array;
        this.posizioneBallFerme = new Array;
        playground.appendChild(this.node);
        this.calamita = false;
        this.length = length;
        this.x = PLAYGROUNDWIDTH / 2 - this.length / 2;

        this.node.style.left = this.x + "vw";
        this.node.style.bottom = PLAYERBOTTOMDISTANCE + "vw";
        this.node.style.display = "block";
    }

// la ball argomento viene aggiunta alla lista delle ball ferme e la sua posizione salvata
Player.prototype.fermaball =
    function (ball, posizioneBall) {
        this.ballFerme.push(ball);
        this.posizioneBallFerme.push(posizioneBall);
    }

// permette di far coincidere la posizione del mouse con quella del player
Player.prototype.muoviMouse =
    function (e) {
        var bodyWidth = document.getElementById('body').clientWidth;
        clientXPercentualebody = (e.clientX / bodyWidth) * 100;
        clientXPercentualePlayground = (clientXPercentualebody - 35);
        // viene controllato che il player non esca dai bordi del Playground
        positionMouse = clientXPercentualePlayground > PLAYGROUNDWIDTH ? PLAYGROUNDWIDTH : clientXPercentualePlayground;
        this.x = positionMouse - this.length;
        if (this.x < 0)
            this.x = 0;
        this.node.style.left = this.x + "vw";
    }

// funzione chiamata all'attivazione del power up verde, dopo 5 secondi torna alla lunghezza standard
Player.prototype.allunga =
    function () {
        this.azzeraStato();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.azzeraStato.bind(this), 5000)
        this.length = 12;
        if (this.x > PLAYGROUNDWIDTH - 12) {
            this.x = PLAYGROUNDWIDTH - 12;
            this.node.style.left = this.x + "vw";
        }
        this.node.style.width = this.length + "vw";
    }

// funzione chiamata all'attivazione del power up rosso, dopo 5 secondi torna alla lunghezza standard
Player.prototype.accorcia =
    function () {
        this.azzeraStato();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.azzeraStato.bind(this), 5000)
        this.length = 4;
        this.node.style.width = this.length + "vw";
    }

// funzione chiamata all'attivazione del power up calamita, dopo 5 secondi torna alla lunghezza standard
Player.prototype.attivaCalamita =
    function () {
        // la calamita non può essere utilizzata insieme ad altri power up
        this.azzeraStato();
        this.calamita = !this.calamita;
        this.timeout = setTimeout(this.azzeraStato.bind(this), 5000)
    }
    
    
// funzioni di utilità
Player.prototype.reset =
    function () {
        this.azzeraStato();
        for (i in this.ballFerme) {
            this.ballFerme[i].ferma = false;
            delete this.ballFerme[i];
        }
        this.ballFerme = new Array;
        this.posizioneBallFerme = new Array;
    }

Player.prototype.azzeraStato =
    function () {
        clearTimeout(this.timeout);
        this.calamita = false;
        this.length = 8;
        this.node.style.width = this.length + "vw";
    }
