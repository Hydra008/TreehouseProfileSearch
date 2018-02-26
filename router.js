const Profile = require("./profile");
const renderer = require("./renderer");
const querystring = require("querystring");

const commonHeader = {'Content-Type': 'text/html'};
function homeRouter(request, response) {
    if(request.url === "/") {
        if(request.method.toLowerCase() === "get") {
            response.writeHead(200, commonHeader);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        }
        else {
            // request is of Post method
            request.on('data',(postBody)=> {
                //data in PostBody is buffer stream
                let query = querystring.parse(postBody.toString());

                response.writeHead(303,{"location" : `/${query.username}`});
                response.end();
            })
        }
    }
}

function user(request, response) {
    let username = request.url.replace("/", "");
    if(username.length > 0) {
        response.writeHead(200,commonHeader);
        renderer.view("header",{},response);
        let studentProfile = new Profile(username);
        studentProfile.on("end", profileJSON => {
            let profileValues = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }
            renderer.view("profile",profileValues,response);
            renderer.view("footer",{},response);
            response.end();
        });

        studentProfile.on("error", error => {
            //show error
            response.writeHead(200, commonHeader);
            renderer.view("header",{},response);
            renderer.view("error",{errorMessage : error.message},response);
            renderer.view("search",{},response);
            renderer.view("footer",{},response);
            response.end();
        });

    }
}

module.exports.home = homeRouter;
module.exports.user = user;
