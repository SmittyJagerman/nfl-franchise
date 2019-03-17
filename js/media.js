function generateMediaResponse(eventName, moodRating, mediaType, abbr, reactionObject){
    var responses;
    if(eventName === "coach-firing"){
        responses = handleCoachFiring(moodRating, mediaType, abbr, reactionObject);
    }
    return responses;
}

function handleCoachFiring(moodRating, mediaType, abbr, coach){
    var badMoodResponses = ["REALLY???!! Total shocker, can't believe they would even think about firing " + coach.name + " #" + abbr, "The front office made its decision today to release " + coach.name + ". I guess no one's job is safe...." + " #" + abbr, "#" + abbr + " made the shocking announcement today to fire " + coach.name + ". Will be interesting to see how this goes over in the locker room", coach.name + " was a true great for #" + abbr + ". Firing him will come back to haunt them.", "A moment of silence is being held in " + getTeam(abbr).city + " tonight after their chances this season died with the firing of " + coach.name, coach.name + " has been fired by the " + getTeamFullName(abbr) + " #" + abbr];
    var currentResponses = [];
    if(mediaType === "tweets"){
        for(var i = 0; i < nflInsiders.length; i += Math.floor(Math.random() * 4)){
            var thisResponseIndex;
            var thisResponse;
            do{
                thisResponseIndex = Math.floor(Math.random() * badMoodResponses.length);
                thisResponse = badMoodResponses[thisResponseIndex];
            } while(thisResponse === "X");
            var thisTweet = {
                from : nflInsiders[i],
                response : badMoodResponses[thisResponseIndex]
            };
            currentResponses.push(thisTweet);
            badMoodResponses[thisResponseIndex] = "X";
        }
    }
    return currentResponses;
}