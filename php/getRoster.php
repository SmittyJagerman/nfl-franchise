<?php
$team = $_POST["abbr"];
$dbConn = new mysqli("localhost", "root", "", "nflfranchise");
$get_team_players_stmt = $dbConn->query("SELECT * FROM players WHERE Team = '$team'");
$roster = array();
while($player = $get_team_players_stmt->fetch_object()){
    array_push($roster, $player);
}
echo json_encode($roster);