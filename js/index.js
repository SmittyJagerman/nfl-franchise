$(document).ready(function(){
    //Load the teams into the select team combo box
    var teamSelect = $('#team-select-box');
    teamAbbrs.forEach(function(abbr){
        var team = getTeam(abbr);
        var fullName = team.city + " " + team.name;
        teamSelect.append('<option value = "' + team.abbr + '">' + fullName + '</option>');
    });
});

$('#start-franchise-button').click(function(){
    var abbr = $('#team-select-box').val();
    window.location.href = '/pages/franchisesetup.html?team=' + abbr;
});
