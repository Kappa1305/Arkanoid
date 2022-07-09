<!DOCTYPE html>
<html lang="it">

<head>
    <meta name="description" content="arkanoid">
    <link rel="stylesheet" href="../arkanoid.css">
    <link rel="stylesheet" href="style.php">
    <script  src="../js/arkanoid.js"></script>
    <script  src="../js/ball.js"></script>
    <script  src="../js/blocks.js"></script>
    <script  src="../js/player.js"></script>
    <script  src="../js/livelli.js"></script>
    <script  src="../js/costanti.js"></script>
    <script  src="../js/powerUP.js"></script>
    <script  src="../js/proiettile.js"></script>
    <script  src="../js/timer.js"></script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Arkanoid</title>
</head>
<?php
require_once "./connection.php";
$level = $_GET["level"];
echo ('<body id="body" onload="begin(' . $level . ')"></body>');

$sql = "SELECT highscore
FROM sbloccato
    WHERE username ='" . $_SESSION["username"] . "' and livello =" . $level . ";";
$result = mysqli_query($connection, $sql);
$row = mysqli_fetch_assoc($result)

?>

<main>
    <div id="barraInformazioni" class="gioco">
        <div id="contaVite">
            <div id="iconaBall" class="ball"></div>
            <p id="viteTesto" class=" barraInformazioni vite">x</p>
            <p id="vite" class="barraInformazioni vite">2</p>
        </div>
        <div id="timer" class="timer"> 
            <p id="minute" class=" barraInformazioni timer"></p>:<p id="second" class="timer"></p>
        </div>
        <div id="punteggi">
            <div id="divPunteggio">
                <p class="barraInformazioni" id="testoPunteggio">PUNTEGGIO: </p>
                <p class="barraInformazioni" id="punteggio">0</p>
            </div>
            <div id="divRecord">
        <p class="barraInformazioni" id="testoRecord">RECORD:</p>
                <p id="record"><?php echo ($row["highscore"]) ?></p>
            </div>
        </div>
    </div>
    <div id="playground">
    </div>
</main>
</body>

</html>