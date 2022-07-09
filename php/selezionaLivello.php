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
        <p>SELEZIONA LIVELLO</p>
    </div>
    <div id="playground">
        <table>
            <?php
            for ($i = 0; $i < 3; $i++) {
                echo ("<tr>");
                for ($j = 0; $j < 3; $j++) {
                    $level = $j + $i * 3 + 1;
                    if (in_array($level, $sbloccati))
                        echo ('<td class="livello" id="level' . $level . '"><a href="arkanoid.php?level=' . $level . '"><img alt="livello' . $level . ' sbloccato" class="livello sbloccato" src="../immagini/livello' . $level . '.PNG" ></a></td>');
                    else
                        echo ('<td class="livello" id="level' . $level . '"><img alt="livello bloccato" class="livello bloccato" src="../immagini/bloccato.jpg" class=""></td>');
                }
                echo ("</tr>");
            }
            ?>
        </table>
    </div>
</div>
</body>

</html>