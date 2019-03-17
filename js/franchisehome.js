var abbr = "";
var myRoster = [];
var now = {time:"", year:0};
var rostersComplete = false;
var progressComplete = false;
$(document).ready(function(){
    $('#loaderModal').modal('show');
    abbr = getTeamArg();
    //for when the rosters need to be updated
    //getTheRosters();
    getMyRoster();
    getMyProgress();
    setDisplay();
});
function getTeamArg(){
    var teamArg = window.location.search.replace("?", '');
    teamArg = teamArg.replace("team=", '');
    return teamArg;
}

function getTheRosters(){
    teamAbbrs.forEach(function(team){
        $.ajax({
            type: "GET",
            url: "../php/getNflData.php",
            data: {"site" : "http://www.nfl.com/teams/roster?team=" + team },
            success: function(results){
                parseTheRosters(results, team);
            }
        });
    });
}

function parseTheRosters(rosterDoc, team){
    var teamRosterDoc = $(rosterDoc);
    var rosterTable = teamRosterDoc.find("#result");
    var playerElements = [].slice.call(rosterTable[0].children[1].children);
    var players = [];
    playerElements.forEach(function(element){
        var thisPlayer = {
            number : element.children[0].innerText.replace('"', ""),
            team : team,
            name : element.children[1].innerText.replace('"', ""),
            profileUrl : element.children[1].children[0].attributes["href"].value,
            position : element.children[2].innerText.replace('"', ""),
            status : element.children[3].innerText.replace('"', ""),
            height : element.children[4].innerText.replace('"', "").replace("'", "ft") + "in",
            weight : element.children[5].innerText.replace('"', ""),
            dob : element.children[6].innerText.replace('"', ""),
            experience : element.children[7].innerText.replace('"', ""),
            college : element.children[8].innerText.replace('"', "")
        };
        players.push(thisPlayer);
    });
    $.ajax({
        type : "POST",
        url : "../php/insertTeamRoster.php",
        data : {"roster" : JSON.stringify(players)},
        success : function(data){
            console.log(data);
        }
    });
}
function getMyRoster(){
    $.ajax({
        type: "POST",
        url: "../php/getRoster.php",
        data: {"abbr" : abbr},
        success: function(roster){
            myRoster = JSON.parse(roster);
            $('#loaderModal').modal('hide');
            rostersComplete = true;
        }
    });
}
function getMyProgress(){
    $.ajax({
        type: "POST",
        url: "../php/getSeason.php",
        success: function(season){
            season = JSON.parse(season);
            now.time = season.time;
            now.year = season.year;
            $('#league_time').text(now.time);
            $('#league_year').text(now.year);
            progressComplete = true;
        }
    });
}
function setDisplay(){
    $('#team-name').text(getTeamFullName(abbr));
    $('#team-logo').attr("src", "../media/team-logos/" + abbr + ".png");
    var positions = [];
    positionAbbr.forEach(function(pos){
        positions.push(getPositionName(pos));
    });
    positions.sort(function(a, b){
        return (a.unit < b.unit) ? -1 : 0;
    });
    positions.forEach(function(pos){
        $('#position-roster-selection').append($('<option value="' + pos + '">' + pos.name + '</option>'));
    });
}

$('#position-roster-selection').change(function(){
    myRoster.forEach(function(player){
        if(player.Position === $('#position-roster-selection').val()){
            $('#players-listing').append('<tr><td>' + player.Name + '</td><td>' + player.Position + '</td><td>' + player.Status + '</td><td>' + player.Height + '</td><td>' + player.Weight + '</td><td>' + player.DOB + '</td><td>' + player.Experience + '</td><td>' + player.College + '</td><td><a href="http://www.nfl.com"' + player.ProfileUrl + '>View Profile</a></td></tr>')
        }
    });
});