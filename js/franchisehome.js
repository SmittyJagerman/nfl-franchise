var abbr = "";
var myRoster = [];
var now = {time:"", year:0};
$(document).ready(function(){
    $('#loaderModal').modal('show');
    abbr = getTeamArg();
    //for when the rosters need to be updated
    //getTheRosters();
    getMyRoster();
    getMyProgress();
    setDisplay();
    $('#loaderModal').modal('hide');
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
            myRoster = roster;
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
        }
    });
}

function setDisplay(){
    $('#team-name').text(getTeamFullName(abbr));
    $('#team-logo').attr("src", "../media/team-logos/" + abbr + ".png");
}