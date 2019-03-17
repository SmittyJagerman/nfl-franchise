<?php

$dbConn = new mysqli("localhost", "root", "", "nflfranchise");
$roster_array = json_decode($_POST["roster"]);
$players = array();
$insert_player_stmt = $dbConn->prepare("INSERT INTO players(Team, Number, Name, Position, Status, Height, Weight, DOB, Experience, College, ProfileUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
foreach($roster_array as $player){
    var_dump($player);
    $insert_player_stmt->bind_param("sissssssiss", $player->team, $player->number, $player->name, $player->position, $player->status, $player->height, $player->weight, $player->dob, $player->experience, $player->college, $player->profileUrl);
    $insert_player_stmt->execute();
}
$insert_player_stmt->close();