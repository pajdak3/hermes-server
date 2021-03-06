// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        callFbGraphApi(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
         loginToFb();
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
       loginToFb();
    }
}

function loginToFb() {
    FB.login(function(response) {
        if (response.authResponse) {
            callFbGraphApi(response.authResponse.accessToken)
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile,email,user_friends'});
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.init({
        appId: '636984166405294',
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//  See statusChangeCallback() for when this call is made.
function callFbGraphApi(fbAccessToken) {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,friends,name,email,picture.type(large),first_name', function(response) {

        // add our own access token, generated from our server
        var accessTokenObj = localStorage.getItem('accessToken');
        if (accessTokenObj) {
            accessTokenObj = JSON.parse(accessTokenObj);
            if (accessTokenObj.timestamp < new Date().getTime()) {
                response.accessToken = '';
                localStorage.removeItem('accessToken');
            } else {
                response.accessToken = accessTokenObj.accessToken;
            }

        } else {
            response.accessToken = '';
        }

        // adding the facebook access token
        response.fb_access_token = '';
        response.fb_access_token = fbAccessToken;

        // manually getting pic url from the json object from fb
        // because it was hard to receive the picture json object at the server
        response.picture_url = response.picture.data.url;

        console.log('Successful login for: ' + response.name);
        console.log('Data from FB graph api and additional data:');
        console.log(response);
        $.ajax({
            type: 'POST',
            url: '/login',
            data: response,
            success: function(data) {
                console.log('datassss', data);
                var resultObj = {};
                resultObj.timestamp = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
                resultObj.accessToken = data.user.accessToken;
                resultObj.userId = data.user.id;
                localStorage.setItem('accessToken', JSON.stringify(resultObj));
                window.location.replace("http://localhost:8080/main");
            }
        }).fail(function() {
        });
    });
}

function init() {
    var fbButton = document.querySelector('.btn-facebook').addEventListener('click', checkLoginState);
}

window.addEventListener('load', init);