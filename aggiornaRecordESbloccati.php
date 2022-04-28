<?php
require_once "./Connection.php";
if ($_POST) {
    $livelloSbloccato = $_POST["livello"] + 1;
    if (!in_array($livelloSbloccato, $sbloccati)) {
        $sql = "INSERT INTO sbloccato VALUES 
                ('" . $_SESSION["username"] . "', " . $livelloSbloccato . ", null)";
        mysqli_query($connection, $sql);
    }
}
?>