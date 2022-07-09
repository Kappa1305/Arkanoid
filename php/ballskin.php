<!DOCTYPE html>
<html lang="it">

<head>
    <script>
        document.addEventListener('keydown', tastoPremuto);

        function tastoPremuto(e) {
            e.stopPropagation();
            if (e.keyCode == 8) // backspace
                window.location = 'menu.php';
        }
    </script>
    <meta name="description" content="arkanoid">
    <link rel="stylesheet" href="../arkanoid.css">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Arkanoid</title>
</head>

<?php

require_once "./connection.php";

if ($_GET) {
    $skin = $_GET["skin"];
    $username = $_SESSION["username"];
    $sql = "update user set ballskin = ? where username = '" . $_SESSION["username"] . "'";
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($statement, 'i', $skin);
    mysqli_stmt_execute($statement);
}
$sql = "SELECT ballskin
        FROM user
            WHERE username ='" . $_SESSION["username"] . "';";
$skinSelezionata = mysqli_fetch_assoc(mysqli_query($connection, $sql))["ballskin"];

$sql = "SELECT codskin
        FROM ballskin
            WHERE username ='" . $_SESSION["username"] . "';";
$result = mysqli_query($connection, $sql);
$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $sbloccati[$i++] = $row["codskin"];
}
?>

<body id="body">

    <?php
    $messaggio[1] = "completa il livello 1";
    $messaggio[2] = "completa il livello 3";
    $messaggio[3] = "completa il livello 5";
    $messaggio[4] = "completa il livello 2 in meno di 2 minuti";
    $messaggio[5] = "completa il livello 4 in meno di 2 minuti";
    $messaggio[6] = "coming soon...";
    $messaggio[7] = "coming soon...";
    $messaggio[8] = "coming soon...";
    $messaggio[9] = "coming soon...";
    ?>

    <div id="main">
        <div id="barraInformazioni" class="selezionaLivello">
            <p>SELEZIONA SKIN</p>
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
                                echo ('<td><img alt="skin' . $skin . ' selezionata" class = "skin selezionata" src="../immagini/ballskin' . $skin . '.PNG" ></a></td>');
                            else
                                echo ('<td><a href="ballskin.php?skin=' . $skin . '"><img alt="skin' . $skin . ' sbloccata" class = "skin sbloccata"  src="../immagini/ballskin' . $skin . '.PNG" ></a></td>');
                        else
                            echo ('<td><img alt="skin' . $skin . ' bloccata" onclick="alert(\'' . $messaggio[$skin] . '\')" class = "skin bloccata" src="../immagini/bloccato.jpg" class=""></td>');
                    }
                    echo ("</tr>");
                }
                ?>
            </table>
        </div>
    </div>
</body>

</html>