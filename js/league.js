var teamAbbrs = ["ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CLE", "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAX", "KC", "LAC", "LA", "MIA", "MIN", "NE", "NO", "NYG", "NYJ", "OAK", "PHI", "PIT", "SEA", "SF", "TB", "TEN", "WAS"];
var nflInsiders = [{name : "Adam Schefter", twitter : "@AdamSchefter"}, {name : "Ian Rapoport", twitter : "@RapSheet"}, {name : "Jason La Canfora", twitter: "@JasonLaCanfora"}, {name : "Ryan Wilson", twitter : "@RyanWilsonCBS"}, {name : "Jeff Darlington", twitter:"@JeffDarlington"}, {name : "Mike Garafolo", twitter:"@MikeGarafolo"}, {name: "Joel Seidel", twitter: "@joelseidel35"}];
function getTeam(abbr){
    var team;
    switch(abbr){
        case "ARI":
            team = {
                city : "Arizona",
                name : "Cardinals",
                abbr : "ARI"
            };
            break;
        case "ATL":
            team = {
                city : "Atlanta",
                name : "Falcons",
                abbr : "ATL"
            };
            break;
        case "BAL":
            team = {
                city : "Baltimore",
                name : "Ravens",
                abbr : "BAL"
            };
            break;
        case "BUF":
            team = {
                city : "Buffalo",
                name : "Bills",
                abbr : "BUF"
            };
            break;
        case "CAR":
            team = {
                city : "Carolina",
                name : "Panthers",
                abbr : "CAR"
            };
            break;
        case "CHI":
            team = {
                city : "Chicago",
                name : "Bears",
                abbr : "CHI"
            };
            break;
        case "CLE":
            team = {
                city : "Cleveland",
                name : "Browns",
                abbr : "CLE"
            };
            break;
        case "DAL":
            team = {
                city : "Dallas",
                name  : "Cowboys",
                abbr : "DAL"
            };
            break;
        case "DEN":
            team = {
                city : "Denver",
                name : "Broncos",
                abbr : "DEN"
            }
            break;
        case "DET":
            team = {
                city : "Detroit",
                name : "Lions",
                abbr : "DET"
            };
            break;
        case "GB":
            team = {
                city : "Green Bay",
                name : "Packers",
                abbr : "GB"
            };
            break;
        case "HOU":
            team = {
                city : "Houston",
                name : "Texans",
                abbr : "HOU"
            };
            break;
        case "IND":
            team = {
                city : "Indianapolis",
                name : "Colts",
                abbr : "IND"
            };
            break;
        case "JAX":
            team = {
                city : "Jacksonville",
                name : "Jaguars",
                abbr : "JAX"
            };
            break;
        case "KC":
            team = {
                city : "Kansas City",
                name : "Chiefs",
                abbr : "KC"
            };
            break;
        case "LA":
            team = {
                city : "Los Angeles",
                name : "Rams",
                abbr : "LA"
            };
            break;
        case "LAC":
            team = {
                city : "Los Angeles",
                name : "Chargers",
                abbr : "LAC"
            };
            break;
        case "MIA":
            team = {
                city : "Miami",
                name : "Dolphins",
                abbr : "MIA"
            };
            break;
        case "MIN":
            team = {
                city : "Minnesota",
                name : "Vikings",
                abbr : "MIN"
            };
            break;
        case "NE":
            team = {
                city : "New England",
                name : "Patriots",
                abbr : "NE"
            };
            break;
        case "NO":
            team = {
                city : "New Orleans",
                name : "Saints",
                abbr : "NO"
            };
            break;
        case "NYG":
            team = {
                city : "New York",
                name : "Giants",
                abbr : "NYG"
            };
            break;
        case "NYJ":
            team = {
                city : "New York",
                name : "Jets",
                abbr : "NYJ"
            };
            break;
        case "OAK":
            team = {
                city : "Oakland",
                name : "Raiders",
                abbr : "OAK"
            };
            break;
        case "PHI":
            team = {
                city : "Philadelphia",
                name : "Eagles",
                abbr : "PHI"
            };
            break;
        case "PIT":
            team = {
                city : "Pittsburgh",
                name : "Steelers",
                abbr : "PIT"
            };
            break;
        case "SEA":
            team = {
                city  : "Seattle",
                name : "Seahawks",
                abbr : "SEA"
            };
            break;
        case "SF":
            team = {
                city : "San Francisco",
                name : "49ers",
                abbr : "SF"
            };
            break;
        case "TB":
            team = {
                city : "Tampa Bay",
                name : "Buccaneers",
                abbr : "TB"
            };
            break;
        case "TEN":
            team = {
                city : "Tennessee",
                name : "Titans",
                abbr : "TEN"
            };
            break;
        case "WAS":
            team = {
                city : "Washington",
                name : "Redskins",
                abbr : "WAS"
            };
            break;
    }
    return team;
}

function getTeamFullName(abbr){
    var team = getTeam(abbr);
    return team.city + " " + team.name;
}