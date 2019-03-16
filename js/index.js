$(document).ready(function(){
    //Load the teams into the select team combo box
    var teamSelect = $('#team-select-box');
    teamAbbrs.forEach(function(abbr){
        var team = getTeam(abbr);
        var fullName = team.city + " " + team.name;
        teamSelect.append('<option value = "' + team.abbr + '">' + fullName + '</option>');
    });
    $('#selected-team-logo').attr("src", "./media/team-logos/DET.png");
    $.get("./php/getNflData.php", {"site":"http://www.nfl.com/teams/profile?team=DET"}, function(results){
        var teamProfile = $(results);
        var teamInfoElement = teamProfile.find('div.team-info');
        var teamFounded = teamInfoElement[0].children[2].innerText.replace('"', "");
        var teamStadium = teamInfoElement[0].children[3].innerText.replace('"', "");
        $('#selected-team-founded').text(teamFounded);
        $('#selected-team-stadium').text(teamStadium);
    });
});