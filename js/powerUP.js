function PowerUP(x, y, tipo) {
    this.x = 0;
    this.y = 0;
    this.class = 0;
    this.node = null;
    this.init(x, y, tipo);
}


PowerUP.prototype.init =
    function (x, y, tipo) {
        this.node = document.createElement("div");
        playground.appendChild(this.node);
        switch (tipo) {
            case 1: this.class = "allunga"; break;
            case 2: this.class = "accorcia"; break;
            case 3: this.class = "calamita"; break;
            case 4: this.class = "raddoppia"; break;
            case 5: this.class = "proiettili"; break;
        }
        this.x = x;
        this.y = y;
        this.tipo = tipo;
        this.node.setAttribute("class", "powerUP " + this.class);
        this.node.style.left = this.x + "vw";
        this.node.style.bottom = this.y + "vw";
        this.node.style.display = "block";
    }

PowerUP.prototype.scendi =
    function (playerX, playerLength) {
        this.y -= 0.1;
        if (this.y <= 8 && this.y >= 6 && this.x + POWERUPWIDTH >= playerX && this.x <= playerX + playerLength) {
            this.remove();
            switch (this.class) {
                case "allunga": return 1;
                case "accorcia": return 2;
                case "calamita": return 3;
                case "raddoppia": return 4;
                case "proiettili": return 5
            }
        }
        if (this.y <= 0) {
            this.remove();
            return -1;
        }
        this.node.style.bottom = this.y + "vw";
        return 0;
    }

PowerUP.prototype.remove =
    function () {
        playground.removeChild(this.node);
    }
