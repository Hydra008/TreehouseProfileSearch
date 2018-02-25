const Profile = require("./profile.js");

function homeRouter(request, response) {
    if(request.url === "/") {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Header\n");
        response.write("Search\n");
        response.end('Footer\n');
    }
}

function user(request, response) {
    let username = request.url.replace("/", "");
    if(username.length > 0) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("");
        let studentProfile = new Profile(username);
        // The student profile listens to the end event of Profile() and receives the profile as the argument
        studentProfile.on("end", profileJSON => {
            let profileValues = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }
            response.write(`${profileValues.username} has  ${profileValues.badges}  badges\n`);
            response.end('');
        });

        studentProfile.on("error", error => {
            //show error
            response.write(`${error.message} +\n `);
            response.end('Footer\n');
        });

    }
}

module.exports.home = homeRouter;
module.exports.user = user;
