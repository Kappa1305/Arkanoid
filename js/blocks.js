function Block(x, y, type) {
    this.x = 0;
    this.y = 0;
    this.node = null;
    this.type = null;

    this.init(x, y, type);
}

Block.prototype.init =
    function (x, y, type) {
        this.node = document.createElement("div");
        this.node.setAttribute("class", "block " + type);
        playground.appendChild(this.node);
        this.type = type;
        this.x = x;
        this.y = y;
        this.node.style.left = this.x + "vw";
        this.node.style.bottom = this.y + "vw";
        this.node.style.display = "block";
    }

Block.prototype.remove =
    function () {
        playground.removeChild(this.node);
    }

Block.prototype.hit =
    function () {
        switch (this.type) {
            case "white": return 50;
            case "red": return 100;
            case "yellow": return 200;
            case "green": return 300;
            case "orange": return 400;
            case "blue": return 400;
            case "black": return 0;
            case "gold": this.type = "gold-hitted"; this.node.setAttribute("class", "block " + this.type); return 0;
            case "gold-hitted": return 500;
        }
        return null;
    }