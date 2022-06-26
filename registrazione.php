<!DOCTYPE html>
<html>
<script>
    document.addEventListener('keydown', tastoPremuto);

    function tastoPremuto(e) {
        e.stopPropagation();
        if (e.keyCode == 17) // ctrl
            window.location = 'http://localhost/pong/index.php';
    }
</script>

<head>
    <meta name="description" content="Tavola Pitagorica">
    <link rel="stylesheet" href="./pong.css">
    <script type="text/javascript" src="./js/controlloDati.js"></script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Login&Password</title>
</head>

<body>

    <div id="main">
        <div id="barraInformazioni"></div>
        <div id="playground">
            <img src="immagini/logo.png" id="logo">
            <div id="login">
                <form action="registrazione.php" method="POST" name="moduloRegistrazione">
                    username
                    <input type="text" name="uname" id="INusername" /><br>
                    password
                    <input type="password" name="psw1" id="INpassword1" /><br>
                    conferma psw
                    <input type="password" name="psw2" id="INpassword2" /><br>
                    <input type="button" value="Registrazione" onclick="controlloDatiRegistrazione()" />
                </form>
            </div>
        </div>
</body>

</html>


<?php


if ($_POST) {
    $uname = $_POST["uname"];
    $psw = $_POST["psw1"];

    if (empty($uname)) {
        echo ("<script>alert('Errore: il nome utente non può essere vuoto'); 
                        window.history.back();
                </script>");
        exit();
    }
    // Una password costituita dal solo carattere 0 non è considerata valida
    if (empty($psw)) {
        echo ("<script>alert('Errore: la password non può essere vuota'); 
                        window.history.back();
                </script>");
        exit();
    }
    registrazione($uname, $psw);
}

function registrazione($uname, $psw)
{
    require_once "./connection.php";
    $pswHashed = password_hash($psw, PASSWORD_BCRYPT);
    $sql = "INSERT INTO user VALUES (?, ?, 1, 1)";
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($statement, 'ss', $uname, $pswHashed);
    if (!mysqli_stmt_execute($statement)) {
        echo ("<script>alert('Errore: utente già registrato'); window.history.back(); </script>");
        exit();
    }
    $sql = "INSERT INTO sbloccato VALUE(" . "'" . $uname . "'" . ", 1, null)";
    mysqli_query($connection, $sql);
    $sql = "INSERT INTO playerskin VALUE(1," . "'" . $uname . "'" . ")";
    mysqli_query($connection, $sql);
    $sql = "INSERT INTO ballskin VALUE(1," . "'" . $uname . "'" . ")";
    mysqli_query($connection, $sql);
    echo ("<script>alert('Utente registrato con successo'); window.history.back(); </script>");
    $_SESSION["username"] = $uname;
    header("location: ./menu.php");
    exit();
}
?>