<!DOCTYPE html>
<html>

<head>
    <meta name="description" content="Tavola Pitagorica">
    <link rel="stylesheet" href="./pong.css">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Login&Password</title>
</head>

<body>

    <div id="main">
        <div id="barraInformazioni"></div>
        <div id="playground">
            <div id="login">
                <form action="index.php" method="POST">
                    username:<input type="text" name="uname" /><br>
                    password:<input type="password" name="psw" /><br>
                    <input type="submit" value="Login" />
                    <button value="true" name="registrazione">Registrazione</button>
                </form>
            </div>
        </div>
</body>

</html>


<?php
function dbConnect()
{
    $host = "localhost";
    $database = "arkanoid";
    $user = "root";
    $pass  = "";

    $connection = mysqli_connect($host, $user, $pass, $database);

    session_start();

    if (mysqli_connect_errno()) {
        die(mysqli_connect_error());
    }
    return $connection;
}

function registrazione($uname, $psw)
{
    $connection = dbConnect();
    $pswHashed = password_hash($psw, PASSWORD_BCRYPT);
    $sql = "INSERT INTO user VALUES (?, ?)";
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($statement, 'ss', $uname, $pswHashed);
    if (!mysqli_stmt_execute($statement)) {
        echo ("<script>alert('Errore: utente già registrato'); window.history.back(); </script>");
        exit();
    }
    $sql = "INSERT INTO sbloccato VALUE(" . "'" . $uname . "'" . ", 1, null)";
    mysqli_query($connection, $sql);
    echo ("<script>alert('Utente registrato con successo'); window.history.back(); </script>");
    exit();
}

function login($uname, $psw)
{

    $connection = dbConnect();
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

    if (isset($_POST["registrazione"]))
        registrazione($uname, $psw);
    else
        login($uname, $psw);
}
?>
</table>
</body>

</html>