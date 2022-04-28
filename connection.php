<?php

    $user = 'root';
    $pass = '';
    $db = 'arkanoid';
    $host = 'localhost';

    $connection = new mysqli($host, $user, $pass, $db);

    session_start();

    if (mysqli_connect_errno()) {
        die(mysqli_connect_error());
    }
?>
