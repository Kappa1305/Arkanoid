<?php header("Content-type: text/css");
require_once "./connection.php";
$sql = "SELECT playerskin, ballskin
        FROM user
        WHERE username ='" . $_SESSION["username"] . "';";
$skinSelezionataPlayer = mysqli_fetch_assoc(mysqli_query($connection, $sql))["playerskin"];
$skinSelezionataBall = mysqli_fetch_assoc(mysqli_query($connection, $sql))["ballskin"];

$direction = "0deg";
$colorPlayer = "white";

switch ($skinSelezionataPlayer) {
    case 1:
        $direction = "0deg";
        $colorPlayer = "blue 28%, orange 68%";
        break;
    case 2:
        $direction = "0deg";
        $colorPlayer = "white 28%, blue 68%";
        break;
    case 3:
        $direction = "0deg";
        $colorPlayer = "yellow 48%, blue 48%";
        break;
    case 4:
        $direction = "90deg";
        $colorPlayer = "green, white, red";
        break;
    case 5:
        $direction = "90deg";
        $colorPlayer = "white, black";
        break;
    default:
        break;
}

$colorBall = "white";

switch ($skinSelezionataBall) {
    case 1:
        $colorBall = "rgba(223, 223, 223, 1) 16%, rgba(157, 157, 157, 1) 36%";
        break;
    case 2:
        $colorBall = "white 28%, blue 68%";
        break;
    case 3:
        $colorBall = "yellow 99%, white";
        break;
    case 4:
        $colorBall = "green 50%, black 50%";
        break;
    case 5:
        $colorBall = "purple, red";
        break;
    default:
        break;
}
?>

#player{
background: linear-gradient(<?= $direction ?>, <?= $colorPlayer ?>);
}

.ball{
    background: radial-gradient(circle, <?= $colorBall ?>);
}