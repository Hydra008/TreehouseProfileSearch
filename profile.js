const https = require("https");
const http = require("http");

function printErrorMessage(error) {
    console.error(` ${error}`);
}
function printProfile(profileData) {
    console.log(`   Profile with ${profileData.profile_name} found 
    Full Name : ${profileData.name}
    JavaScript points : ${profileData.points.JavaScript} `);

}

function profile(username) {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        let body = "";
        if(response.statusCode !== 200) {
        let errorMessage = `There was an error getting the profile for ${username} due to  ${http.STATUS_CODES[response.statusCode] }`;
        printErrorMessage(errorMessage);
        }
        response.on('data', data => {
           body += data;
        });
        response.on('end', () => {
            try {
                let profile = JSON.parse(body.toString());
                if (!profile.name){
                    let errorMessage = `${username} not found`;
                    printErrorMessage(errorMessage);
                } else {
                    printProfile(profile);
                }

            } catch(error) {
               let  errorMessage = `parsing error for the profile ${username}`;
               printErrorMessage(errorMessage);
            }
        });
    });
}

module.exports = profile;