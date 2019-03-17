<?php

$dbConn = new mysqli("localhost", "root", "", "nflfranchise");
$elapsed_year_events = $dbConn->query("SELECT * FROM season_unit ORDER BY ID DESC");
$season_events = array();
while($season_event = $elapsed_year_events->fetch_object()){
    array_push($season_events, $season_event);
}
$currentTime = new \stdClass();
if($season_events[0]->Type != "end-league-year") {
    //The league year is still active
    if ($season_events[0]->Type == "superbowl") {
        //We are current after the superbowl but pre end of league year
        $currentTime->time = "Post Superbowl";
        $currentTime->year = $season_events[0]->Year;
    } elseif ($season_events[0]->Type == "probowl") {
        //We are currently between the probowl and the superbowl
        $currentTime->time = "SuperBowl";
        $currentTime->year = $season_events[0]->Year;
    } elseif ($season_events[0]->Type == "championship-week") {
        //We are current between the championship week and the superbowl
        $currentTime->time = "Pro Bowl";
        $currentTime->year = $season_events[0]->Year;
    } elseif ($season_events[0]->Type == "divisional-week") {
        //We are currently between the divisional playoffs and the championship games
        $currentTime->time = "Championship Week";
        $currentTime->year = $season_events[0]->Year;
    } elseif ($season_events[0]->Type == "wildcard-week") {
        //We are currently between the wildcard weekend and the divisional weekend
        $currentTime->time = "Divisional Round Week";
        $currentTime->year = $season_events[0]->Year;
    } elseif ($season_events[0]->Type == "reg-season-end") {
        //we are currently between the end of the regular season and the playoffs
        $currentTime->time = "Wildcard Round Week";
        $currentTime->year = $season_events[0]->Year;
    } elseif ($season_events[0]->Type == "reg-season-start") {
        //We are within the regular season
        $regular_season_week_stmt = $dbConn->prepare("SELECT MAX(Week), Year FROM games");
        $regular_season_week_stmt->execute();
        $regular_season_week_stmt->bind_result($most_recent_week, $season_year);
        $currentTime->time = "Week ".$most_recent_week;
        $currentTime->year = $season_events[0]->Year;
    } elseif ($season_events[0]->Type == "draft") {
        //We are currently between the draft and the regular season
        $currentTime->time = "Post Draft";
        $currentTime->year = $season_events[0]->Year;
    } elseif($season_events[0]->Type == "free-agency"){
        //We are currently between free agency and the draft
        $currentTime->time = "NFL Draft";
        $currentTime->year = $season_events[0]->Year;
    } elseif($season_events[0]->Type == "start-league-year"){
        //We are currently between the start of the league year and free agency
        $currentTime->time = "Free Agency";
        $currentTime->year = $season_events[0]->Year;
    }
} else {
    //This season is over
    $currentTime->time="Start New League Year";
    $currentTime->year=$season_events[0]->Year + 1;
}
echo json_encode($currentTime);