<!DOCTYPE html>
<html>

<head>
    <meta name="description" content="Tavola Pitagorica">
    <script type="text/javascript" src="./js/controlloDati.js"></script>
    <link rel="stylesheet" href="./pong.css">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Classifica</title>
</head>


<?php
$livello = $_GET["livello"];
require_once "./Connection.php";
$sql = "SELECT username, highscore
        FROM sbloccato
        WHERE livello = $livello and highscore is not null
        ORDER BY highscore DESC";
$result = mysqli_query($connection, $sql);
$i = 0;
?>

<body>

    <div id="main">
        <div id="barraInformazioni">
            <?php
            echo ("<p class='classifica'> LIVELLO " . $livello . "</p>");
            ?>
        </div>
        <div id="playground">
            <div class="classifica">
                <table class='classifica'>
                    <?php
                    for ($i = 1; $i <= 7; $i++) {
                        if ($row = mysqli_fetch_assoc($result)) {
                            $username = $row["username"];
                            $highscore = $row["highscore"];
                        } else {
                            $username = '-';
                            $highscore = '-';
                        }
                        echo ("<tr class='classifica'>");
                        echo ("<td class='classifica'>" . $i . "</td>");
                        echo ("<td class='classifica'>" . $username . "</td>");
                        echo ("<td class='classifica'>" . $highscore . "</td>");
                        echo ("</tr>");
                    }
                    ?>
                </table>
            </div>
            <div class="selezionaClassifica">
                
            <?php
                $livelloPrecedente = ($livello - 1) < 1 ? 1 : $livello - 1;
                $livelloSuccessivo = ($livello + 1) >9 ? 9 : $livello + 1;

                echo("<a class='classifica' href='classifica.php?livello=".$livelloPrecedente."'>←</a>");
                echo("<a class='classifica' href='classifica.php?livello=".$livelloSuccessivo."'>→</a>"); 
                ?>  
            </div>
            <a class="classifica" id="menu" href="menu.php">MENU</a>
        </div>
</body>