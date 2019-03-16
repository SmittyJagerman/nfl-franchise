$(document).ready(function(){
    var abbr = getTeamArg();
    $('#welcome-to-team-header').text("Welcome to the " + getTeamFullName(abbr));
    $('#selected-team-logo').attr("src", "../media/team-logos/" + abbr + ".png");
    $.ajax({
        type : "GET",
        url : "../php/getNflData.php",
        data : {"site" : "http://www.nfl.com/teams/profile?team=" + abbr},
        success : function(results){
            parseTeamProfile(abbr, results);
        }
    });
});

function parseTeamProfile(abbr, results){
    var teamProfile = $(results);
    var teamInfoElement = teamProfile.find('div.team-info');
    var teamFounded = teamInfoElement[0].children[2].innerText.replace('"', "");
    var teamStadium = teamInfoElement[0].children[3].innerText.replace('"', "");
    var team = getTeam(abbr);
    var teamFullName = team.city + " " + team.name;
    $('#selected-team-name').text(teamFullName);
    $('#selected-team-founded').text(teamFounded);
    $('#selected-team-stadium').text(teamStadium);
    getHeadCoachImage(teamProfile.find('p.team-official-link')[0].innerText.replace('"', ""));
}

function getHeadCoachImage(teamWebsiteLink){
    var coachRoster = teamWebsiteLink + "team/coaches-roster/";
    $.ajax({
        type : "GET",
        url : "../php/getNflData.php",
        data : {"site" : coachRoster },
        success : function(results){
            var coachDoc = $(results);
            var coachImageContainer = coachDoc.find('figure.d3-o-media-object__figure');
            var coachImageUrl = ((coachImageContainer[0].children[0]).children[3]).attributes["src"].value.toString().replace("/t_lazy", "");
            $('#selected-team-head-coach-picture').attr("src", coachImageUrl);
        }
    });
}

function getTeamArg(){
    var teamArg = window.location.search.replace("?", '');
    teamArg = teamArg.replace("team=", '');
    return teamArg;
}

$('#hire-new-head-coach').onclick(function(){
    var isCurrentCoachPopular = Math.floor(Math.random() * 10) > 2;

});