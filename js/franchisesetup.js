var coach = {name:""};
var abbr;

$(document).ready(function(){
    abbr = getTeamArg();
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
            var coachName = coachDoc.find('.d3-o-media-object__title')[0].innerText.toString().replace('"', "");
            $('#selected-team-head-coach-name').text(coachName);
            coach.name = coachName;
        }
    });
}

function getTeamArg(){
    var teamArg = window.location.search.replace("?", '');
    teamArg = teamArg.replace("team=", '');
    return teamArg;
}

$('#hire-new-head-coach').click(function(){
    var isCurrentCoachPopular = Math.floor(Math.random() * 10) > 3;
    if(!isCurrentCoachPopular){
        $('#popular-coach-warning-modal').modal('show');
    } else {
        $('#confirm-coach-fired-modal').modal('show');
        var mediaResponses = generateMediaResponse("coach-firing", 1, "tweets", abbr, coach);
        createMediaResponse(mediaResponses, $('#coach-fired-media-reaction-container'));
    }
});

$('#cancel-coach-firing-button').click(function(){
    $('#popular-coach-warning-modal').modal('hide');
});

$('#fire-coach-anyways-button').click(function(){
    $('#popular-coach-warning-modal').modal('hide');
    $('#confirm-coach-fired-modal').modal('show');
    var mediaTweets = generateMediaResponse("coach-firing", 0, "tweets", abbr, coach);
    createMediaResponse(mediaTweets, $('#coach-fired-media-reaction-container'));
});

function createMediaResponse(mediaTweets, reactionContainer){
    mediaTweets.forEach(function(thisTweet){
        var tweet = $('<div class="media-tweet"><h4 class="tweet-name w-100"></h4><h6 class="tweet-handle w-100"></h6><p class="tweet-body w-100"></p></div>');
        tweet.find('h4.tweet-name').text(thisTweet.from.name);
        tweet.find('h6.tweet-handle').text(thisTweet.from.twitter);
        tweet.find('p.tweet-body').text(thisTweet.response);
        reactionContainer.append(tweet);
    });
}