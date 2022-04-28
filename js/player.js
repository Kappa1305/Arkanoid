function Player(length) {
    this.x = 0;
    this.length = 0;
    this.node = null;
    this.calamita = false;
    this.ballFerme = null;
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
        this.calamtita = false;
        this.length = length;
        this.x = PLAYGROUNDWIDTH / 2 - this.length / 2;

        this.node.style.left = this.x + "vw";
        //this.node.style.width = +this.length -0.6 + "vw";
        this.node.style.bottom = PLAYERBOTTOMDISTANCE + "vw";
        this.node.style.display = "block";
    }

Player.prototype.fermaball =
    function (ball, posizioneBall) {
        this.ballFerme.push(ball);
        this.posizioneBallFerme.push(posizioneBall);
    }

Player.prototype.muoviSx =
    function () {
        if (this.x <= MUOVISX) {
            this.x = 0;
            this.node.style.left = this.x + "vw";
            return;
        }
        this.x = this.x - 10;
        this.node.style.left = this.x + "vw";
    }

Player.prototype.muoviDx =
    function () {
        if (this.x >= 100 - MUOVIDX - this.length) {
            this.x = 100 - this.length;
            this.node.style.left = this.x + "vw";
            return;
        }
        this.x = this.x + 10;
        this.node.style.left = this.x + "vw";
    }

Player.prototype.muoviMouse =
    function (e) {
        var bodyWidth = document.getElementById('body').clientWidth;
        clientXPercentualebody = (e.clientX / bodyWidth) * 100;
        clientXPercentualePlayground = (clientXPercentualebody - 35);
        positionMouse = clientXPercentualePlayground > PLAYGROUNDWIDTH ? PLAYGROUNDWIDTH : clientXPercentualePlayground;
        this.x = positionMouse - this.length;
        if (this.x < 0)
            this.x = 0;
        this.node.style.left = this.x + "vw";
    }

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

Player.prototype.accorcia =
    function () {
        this.azzeraStato();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.azzeraStato.bind(this), 5000)
        this.length = 4;
        this.node.style.width = this.length + "vw";
    }

Player.prototype.azzeraStato =
    function () {
        clearTimeout(this.timeout);
        this.calamita = false;
        this.length = 8;
        this.node.style.width = this.length + "vw";
    }


Player.prototype.attivaCalamita =
    function () {
        this.azzeraStato();
        this.calamita = !this.calamita;
        this.timeout = setTimeout(this.azzeraStato.bind(this), 5000)
    }

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