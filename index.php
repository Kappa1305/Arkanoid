<!DOCTYPE html>
<html>

<head>
    <meta name="description" content="Tavola Pitagorica">
    <script type="text/javascript" src="./js/controlloDati.js"></script>
    <link rel="stylesheet" href="./pong.css">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Login&Password</title>
</head>

<body>

    <div id="main">
        <div id="barraInformazioni"></div>
        <div id="playground">
            <img src="immagini/logo.svg" id="logo">
            <div id="login">
                <form action="index.php" method="POST" name="moduloLogin">
                    username
                    <input type="text" name="uname" id="INusername"/><br>
                    password
                    <input type="password" name="psw" id="INpassword"/><br>
                    <button value="Login" onclick="controlloDatiLogin()">Login</button>
                    <p>Non hai ancora un account?</p>
                    <button value="true" name="registrazione">Registrazione</button>
                </form>
            </div>
        </div>
</body>

</html>


<?php


function registrazione()
{
    header("location: ./registrazione.php");
}

function login($uname, $psw)
{
    require_once "./connection.php";
    $sql = "SELECT hash_psw FROM user WHERE username = ?";
    if ($statement = mysqli_prepare($connection, $sql)) {
        mysqli_stmt_bind_param($statement, 's', $uname);
        mysqli_stmt_execute($statement);

        mysqli_stmt_bind_result($statement, $pswHashed);

        while (mysqli_stmt_fetch($statement)) {
            if (password_verify($psw, $pswHashed)) {
                $_SESSION["username"] = $uname;
                header("location: ./selezionaLivello.php");
                return;
            }
        }
        echo ("Login fallito");
    }
}

if ($_POST) {
    if (isset($_POST["registrazione"]))
        registrazione($uname, $psw);
    $uname = $_POST["uname"];
    $psw = $_POST["psw"];

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
    login($uname, $psw);
}
?>
</table>
</body>

</html>