function Timer() {
    this.second = 0;
    this.minute = 0;
    this.interval = null;
    this.init();
}

Timer.prototype.init =
    function () {
        this.nodeSecond = document.getElementById("second");
        this.nodeMinute = document.getElementById("minute");
        this.interval = setInterval(this.ticTac.bind(this), 1000)
        this.second = 0;
        this.minute = 2;
        this.nodeSecond.textContent = "0" + this.second;
        this.nodeMinute.textContent = this.minute;
    }

Timer.prototype.ticTac =
    function () {
        if (this.second != 0)
            this.second--;
        else if (this.minute != 0) {
            this.second = 59;
            this.minute--;
        }
        else
            clearInterval(this.interval);
        // consente di mantenere il formato m:ss anche quando i secondi possono essere scritti su
        // singola cifra
        this.nodeSecond.textContent = this.second < 10 ? "0" + this.second : this.second;
        this.nodeMinute.textContent = this.minute;
    }

Timer.prototype.stop =
    function () {
        clearInterval(this.interval);
        return 60 * this.minute + this.second;
    }