let target = undefined;

window.addEventListener("load", function () {
    document.getElementById('login-form').addEventListener("submit", function (e) {
        // intercept login form submission and submit for authentication using SDK
        e.preventDefault();
        target = e.target;
        initialiseThenSubmit()
    });

    document.getElementById("reset").addEventListener("click", function(e) {
        e.preventDefault();
        reset();
    });

    document.getElementById("logout").addEventListener("click", function(e) {
        e.preventDefault();
        logout();
    }); 
});

function initialiseThenSubmit() {

    // init SDK
    forgerock.Config.set({
        clientId: 'sdk-onboarding', // e.g. 'ForgeRockSDKClient'
        redirectUri: 'https://app.example.com:8000', // e.g. 'https://sdkapp.example.com:8443/_callback'
        scope: 'openid profile', // e.g. 'openid profile me.read'
        serverConfig: {
          baseUrl: 'https://openam-david-sdk.forgeblocks.com/am', // e.g. 'https://openam.example.com:9443/openam/'
          timeout: '30000' // 90000 or less
        },
        realmPath: 'alpha', // e.g. 'root'
        tree: 'Login', // e.g. 'Login'
      });

    nextStep()
}

function nextStep(step) {
    // invoke sdk to initiate or submit authentication
    forgerock.FRAuth.next(step).then(handleStep).catch(handleFailure);
}

function handleStep(step) {

    if (step.type === "LoginSuccess") {
        handleSuccess(step);
    } else if (step.type === "LoginFailure") {
        handleFailure(step);
    } else {
        // inject intercepted username and password
        const username = target[0].value;
        const password = target[1].value;

        step.getCallbackOfType('NameCallback').setName(username);
        step.getCallbackOfType('PasswordCallback').setPassword(password);

        nextStep(step);
    }
}

function handleFailure(step) {
    // show failure view
    hideElement("login-form")
    hideElement("success")
    showElement("failure")

    // update message
    updateWelcome("Login failed")
}

function handleSuccess(step) {
    // show success view
    hideElement("login-form")
    showElement("success")
    hideElement("failure")

    // start oauth flow to get an access token and user info
    getTokensAndUserInfo()
}

function getTokensAndUserInfo() {
    // invoke oauth2.0 flow to get tokens using SDK then request user info
    forgerock.TokenManager.getTokens({ forceRenew: true }).then(getUserInfo);
}

function getUserInfo() {
    // request user info using SDK then display it
    forgerock.UserManager.getCurrentUser().then(showUserInfo);
}

function showUserInfo(info) {
    // show personalised items only if returned by userinfo
    if (info.given_name === undefined) {
        updateWelcome("Welcome back")
        hideElement("givenName")
    } else {
        updateWelcome("Welcome, " + info.given_name);
        updateElementValue("givenNameField", info.given_name);
    }

    if (info.family_name === undefined) {
        hideElement("lastName")
    } else {
        updateElementValue("lastNameField", info.family_name);
    }

    if (info.email === undefined) {
        hideElement("email")
    } else {
        updateElementValue("emailField", info.email);
    }

    if (info.sub === undefined) {
        hideElement("userId")
    } else {
        updateElementValue("userIdField", info.sub);
    }
}

function logout() {
    // end session and reset form
    forgerock.FRUser.logout().then(reset).catch(console.error);
}

function showElement(id) {
    document.getElementById(id).style = "visibility: visible"
}

function hideElement(id) {
    document.getElementById(id).style = "height: 0; width: 0; position: absolute; visibility: hidden"
}

function updateElementValue(id, value) {
    document.getElementById(id).value = value;
}

function updateWelcome(message) {
    document.getElementById("welcome").innerHTML = message;
}

function reset() {
    // reset login form
    updateElementValue("username", "");
    updateElementValue("password", "");

    // show login form
    showElement("login-form")
    hideElement("success")
    hideElement("failure")

    // update message
    updateWelcome("Welcome. Please sign in")

    // reset intercepted form
    target = undefined;
}

reset()