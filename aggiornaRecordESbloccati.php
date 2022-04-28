<?php
require_once "./Connection.php";

if ($_POST) {
    $livello = $_POST["livello"];
    $punteggio = $_POST["punteggio"];
    aggiornaSbloccati($livello, $connection);
    aggiornaRecord($livello, $punteggio, $connection);
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
