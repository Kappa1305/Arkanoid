<?php
require_once "./Connection.php";

if ($_POST) {
    $livello = $_POST["livello"];
    $punteggio = $_POST["punteggio"];
    $secondiRimanenti = $_POST["secondiRimanenti"];
    aggiornaSbloccati($livello, $connection);
    aggiornaRecord($livello, $punteggio, $connection);
    aggiornaPlayerSkin($livello, $secondiRimanenti, $connection);
    aggiornaBallSkin($livello, $secondiRimanenti, $connection);
    
}

function aggiornaSbloccati($livello, $connection)
{
    $sql = "SELECT livello
    FROM sbloccato
        WHERE username ='" . $_SESSION["username"] . "';";
    $result = mysqli_query($connection, $sql);
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $sbloccati[$i++] = $row["livello"];
    }
    $livelloSbloccato = $livello + 1;
    if (!in_array($livelloSbloccato, $sbloccati)) {
        $sql = "INSERT INTO sbloccato VALUES 
            ('" . $_SESSION["username"] . "', " . $livelloSbloccato . ", null)";
        mysqli_query($connection, $sql);
    }
}

function aggiornaRecord($livello, $punteggio, $connection)
{
    $sql = "UPDATE sbloccato
        SET highscore =".$punteggio."
        WHERE username = '".$_SESSION["username"]."' and livello = ".$livello." and (highscore IS null OR highscore < ".$punteggio.");";
    mysqli_query($connection, $sql);

}


function aggiornaPlayerSkin($livello, $secondiRimanenti, $connection){
    $skinSbloccata = null; 
    switch($livello){
        case 1: if($secondiRimanenti > 0) $skinSbloccata = 4; break;
        case 3: if($secondiRimanenti > 0) $skinSbloccata = 5; break;
        case 4: $skinSbloccata = 2; break;
        case 6: $skinSbloccata = 3; break;
        default: break;
    }

        $sql = "SELECT count(CodSkin) as presente
            FROM playerskin
            WHERE username = ".$_SESSION['username']." and CodSkin =".$skinSbloccata.";";
    $result = mysqli_query($connection, $sql);
    $row = mysqli_fetch_assoc($result);
    if($row["presente"] == 0){
        $sql = "INSERT into playerskin value (".$skinSbloccata.", '".$_SESSION['username']."');";
        mysqli_query($connection, $sql);
    }
}



function aggiornaBallSkin($livello, $secondiRimanenti, $connection){
    $skinSbloccata = null; 
    switch($livello){
        case 2: if($secondiRimanenti > 0) $skinSbloccata = 4; break;
        case 3: $skinSbloccata = 2; break;
        case 4: if($secondiRimanenti > 0) $skinSbloccata = 5; break;
        case 5: $skinSbloccata = 3; break;
        default: break;
    }

        $sql = "SELECT count(CodSkin) as presente
            FROM ballskin
            WHERE username = ".$_SESSION['username']." and CodSkin =".$skinSbloccata.";";
    $result = mysqli_query($connection, $sql);
    $row = mysqli_fetch_assoc($result);
    if($row["presente"] == 0){
        $sql = "INSERT into ballskin value (".$skinSbloccata.", '".$_SESSION['username']."');";
        mysqli_query($connection, $sql);
    }
}
