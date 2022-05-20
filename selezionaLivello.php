<!DOCTYPE html>
<html>

<head>
    <meta name="description" content="pong">
    <link rel="stylesheet" href="pong.css">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Pear Ball</title>
</head>

<?php

require_once "./Connection.php";
$sql = "SELECT livello
        FROM sbloccato
            WHERE username ='" . $_SESSION["username"] . "';";
$result = mysqli_query($connection, $sql);
$i = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $sbloccati[$i++] = $row["livello"];
}
?>

<body id="body"></body>

<div id="main">
    <div id="barraInformazioni" class="selezionaLivello">
        <text>SELEZIONA LIVELLO</text>
    </div>
    <div id="playground">
        <table>
            <?php
            for ($i = 0; $i < 3; $i++) {
                echo ("<tr>");
                for ($j = 0; $j < 3; $j++) {
                    $level = $j + $i * 3 + 1;
                    if (in_array($level, $sbloccati))
                        echo ('<td id="level' . $level . '"><a href="pong.php?level=' . $level . '"><img src="./immagini/livello' . $level . '.PNG" ></a></td>');
                    else
                        echo ('<td id="level' . $level . '"><img src="./immagini/bloccato.jpg" class=""></td>');
                }
                echo ("</tr>");
            }
            ?>
        </table>
    </div>
</div>
</body>

</html>