let target = undefined;

window.addEventListener("load", function () {
    document.getElementById('login-form').addEventListener("submit", function (e) {
        e.preventDefault();
        // Submit for authentication
        target = e.target;
        initialiseThenSubmit()
    });

    document.getElementById("reset").addEventListener("click", function() {
        reset();
    });

    document.getElementById("logout").addEventListener("click", function() {
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
    forgerock.FRAuth.next(step).then(handleStep).catch(handleFailure);
}

function handleStep(step) {

    if (step.type === "LoginSuccess") {
        handleSuccess(step);
    } else if (step.type === "LoginFailure") {
        handleFailure(step);
    } else {

        const username = target[0].value;
        const password = target[1].value;

        step.getCallbackOfType('NameCallback').setName(username);
        step.getCallbackOfType('PasswordCallback').setPassword(password);

        nextStep(step);
    }
}

function handleFailure(step) {
    hideElement("login-form")
    hideElement("success")
    showElement("failure")
}

function handleSuccess(step) {
    hideElement("login-form")
    showElement("success")
    hideElement("failure")
}

function showElement(id) {
    document.getElementById(id).style = "visibility: visible"
}

function hideElement(id) {
    document.getElementById(id).style = "height: 0; width: 0; position: absolute; visibility: hidden"
}

function logout() {
    forgerock.FRUser.logout().then(reset).catch(console.error);
}

function reset() {
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    showElement("login-form")
    hideElement("success")
    hideElement("failure")
}