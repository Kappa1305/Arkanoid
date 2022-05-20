<!DOCTYPE html>
<html>

<head>
    <meta name="description" content="pong">
    <link rel="stylesheet" href="pong.css">
    <script type="text/javascript" src="./js/pong.js"></script>
    <script type="text/javascript" src="./js/ball.js"></script>
    <script type="text/javascript" src="./js/blocks.js"></script>
    <script type="text/javascript" src="./js/player.js"></script>
    <script type="text/javascript" src="./js/livelli.js"></script>
    <script type="text/javascript" src="./js/costanti.js"></script>
    <script type="text/javascript" src="./js/powerUP.js"></script>
    <script type="text/javascript" src="./js/proiettile.js"></script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Pear Ball</title>
</head>
<?php
require_once "./Connection.php";
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
            <div id="iconaBall"></div>
            <text id="viteTesto" class="vite">x</text>
            <text id="vite" class="vite">2</text>
        </div>
        <div id="punteggi">
            <div id="divPunteggio">
                <text id="testoPunteggio">PUNTEGGIO: </text>
                <text id="punteggio">0</text>
            </div>
            <div id="divRecord">
        <text id=" testoRecord">RECORD:</text>
                <text id="record"><?php echo ($row["highscore"]) ?></text>
            </div>
        </div>
    </div>
    <div id="playground">
    </div>
</main>
</body>

</html>