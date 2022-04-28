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
echo ('<body id="body" onload="begin(' . $level . ')"></body>')
?>

<main>
    <div id="barraInformazioni">
        <div id="contaVite">
            <div id="iconaBall"></div>
            X
            <text id="vite">2</text>
        </div>
         <p id="punteggio">0</p>
  </div>
    <div id="playground"></div>
</main>
</body>

</html>