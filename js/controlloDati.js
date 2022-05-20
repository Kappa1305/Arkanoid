function controlloDatiLogin() {
    let controlloUname = false;
    let controlloPsw = false;
    username = document.getElementById("INusername");
    if (username.value != "" && username.value != undefined) {
        controlloUname = true;
        username.setAttribute("class", "");
    }
    else {
        alert("Username non può essere vuoto");
        username.setAttribute("class", "inputErrato");
    }
    psw = document.getElementById("INpassword");
    if (psw.value != "" && psw.value != undefined) {
        psw.setAttribute("class", "");
        controlloPsw = true;
    }
    else {
        alert("La password non può essere vuota");
        psw.setAttribute("class", "inputErrato");
    }
    if (controlloUname && controlloPsw) {
        document.moduloLogin.submit();
    }
}

function controlloDatiRegistrazione() {
    let controlloUname = true;
    let controlloPsw = true;

    username = document.getElementById("INusername");
    username.setAttribute("class", "");
    if (username.value == "" || username.value == undefined) {
        alert("Username non può essere vuoto");
        username.setAttribute("class", "inputErrato");
        controlloUname = false;
    }
    else {
        username.setAttribute("class", "");
    }
    psw1 = document.getElementById("INpassword1");
    psw2 = document.getElementById("INpassword2");
    psw1.setAttribute("class", "");
    psw1.setAttribute("class", "");

    let regExp = /^(?=(.*[a-z]))(?=(.*[0-9]))(?=(.*[A-Z]))[a-zA-Z0-9!?\.]{8,}$/gm;
    let v = psw1.value.match(regExp);
    if (psw1.value == "" || psw1.value == undefined) {
        psw1.setAttribute("class", "inputErrato");
        controlloPsw = false;
        alert("Password non può essere vuota");
    }
    else if (v == null) {
        psw1.setAttribute("class", "inputErrato");
        alert("La password deve contenere minuscole, maiuscole e cifre ed essere lunga almeno 8 caratteri");
        controlloPsw = false;
    }
    if (psw1.value != psw2.value) {
        psw2.setAttribute("class", "inputErrato");
        alert("Le password non coincidono");
    }
    if (controlloUname && controlloPsw) {
        document.moduloRegistrazione.submit();
    }
}