<!DOCTYPE html>
<html>

<head>
    <script>
        document.addEventListener('keydown', tastoPremuto);

        function tastoPremuto(e) {
            e.stopPropagation();
            if (e.keyCode == 8) // backspace
                window.location = 'http://localhost/pong/menu.php';
        }
    </script>
    <meta name="description" content="pong">
    <link rel="stylesheet" href="pong.css">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Pear player</title>
</head>

<?php

require_once "./Connection.php";

if ($_GET) {
    $skin = $_GET["skin"];
    $username = $_SESSION["username"];
    $sql = "update user set playerskin = ? where username = '" . $_SESSION["username"] . "'";
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($statement, 'i', $skin);
    mysqli_stmt_execute($statement);
}
$sql = "SELECT playerskin
        FROM user
        WHERE username ='" . $_SESSION["username"] . "';";
$skinSelezionata = mysqli_fetch_assoc(mysqli_query($connection, $sql))["playerskin"];

$sql = "SELECT codskin
        FROM playerskin
            WHERE username ='" . $_SESSION["username"] . "';";
$result = mysqli_query($connection, $sql);
$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $sbloccati[$i++] = $row["codskin"];
}
?>

<body id="body">

    <?php
    $messaggio[1] = "completa il livello 2";
    $messaggio[2] = "completa il livello 4";
    $messaggio[3] = "completa il livello 6";
    $messaggio[4] = "completa il livello 1 in meno di 2 minuti";
    $messaggio[5] = "completa il livello 3 in meno di 2 minuti";
    $messaggio[6] = "coming soon...";
    $messaggio[7] = "coming soon...";
    $messaggio[8] = "coming soon...";
    $messaggio[9] = "coming soon...";
    ?>

    <div id="main">
        <div id="barraInformazioni" class="selezionaLivello">
            <text>SELEZIONA SKIN</text>
        </div>
        <div id="playground">
            <table>
                <?php
                for ($i = 0; $i < 3; $i++) {
                    echo ("<tr>");
                    for ($j = 0; $j < 3; $j++) {
                        $skin = $j + $i * 3 + 1;
                        if (in_array($skin, $sbloccati))
                            if ($skin == $skinSelezionata)
                                echo ('<td><img class = "skin selezionata" src="./immagini/playerskin' . $skin . '.PNG" ></a></td>');
                            else
                                echo ('<td><a href="playerskin.php?skin=' . $skin . '"><img class = "skin sbloccata" src="./immagini/playerskin' . $skin . '.PNG" ></a></td>');
                        else
                            echo ('<td><img  onclick="alert(\'' . $messaggio[$skin] . '\')" class = "skin bloccata" src="./immagini/bloccato.jpg" class=""></td>');
                    }
                    echo ("</tr>");
                }
                ?>
            </table>
        </div>
    </div>
</body>

</html>