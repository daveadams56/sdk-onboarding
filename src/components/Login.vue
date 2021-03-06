<template>
    <div
        class="container"
        v-if="ready"
    >
        <div class="row">
            <div class="card mb-3 col-8 mx-auto">
                <div class="card-body text-center">
                    <!-- Show spinner when loading -->
                    <div v-if="submitting">
                        <div
                            class="spinner-border"
                            role="status"
                        ></div>
                    </div>

                    <!-- React to success and failure steps -->
                    <div v-else-if="success">
                        <h2 class="card-title">{{ title }}</h2>
                        <div
                            class="spinner-border"
                            role="status"
                        ></div>
                    </div>
                    <div v-else-if="failure">
                        <h2 class="card-title">{{ title }}</h2>
                        <button
                            class="btn btn-primary"
                            @click="reset"
                        >
                            Start Again
                        </button>
                    </div>

                    <!-- React to callbacks -->

                    <div v-else>
                        <h2 class="card-title">{{ title }}</h2>
                        <h5
                            class="card-title"
                            v-html="description"
                        ></h5>
                        <div id="callbacks">
                            <form
                                class="m-5"
                                v-if="step === undefined"
                            ></form>
                            <form
                                class="m-5"
                                v-else
                            >
                                <div
                                    v-for="callback in step.callbacks"
                                    v-bind:key="callback.payload._id"
                                >
                                    <div
                                        class="form-group"
                                        v-if="callback.getType() === 'NameCallback'"
                                    >
                                        <label
                                            :for="'name' + callback.payload._id"
                                            class="form-label mt-4"
                                        >Username</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :id="'password' + callback.payload._id"
                                            placeholder="Please enter your username"
                                            @input="callback.setInputValue($event.target.value)"
                                        />
                                    </div>
                                    <div
                                        class="form-group"
                                        v-else-if="
                                        callback.getType() ===
                                        'PasswordCallback'
                                    "
                                    >
                                        <label
                                            :for="'password' + callback.payload._id"
                                            class="form-label mt-4"
                                        >Password</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            :id="'password' + callback.payload._id"
                                            placeholder="Please enter your password"
                                            @input="callback.setInputValue($event.target.value)"
                                        />
                                    </div>
                                    <div
                                        class="form-group"
                                        v-else-if="
                                        callback.getType() ===
                                        'ChoiceCallback'
                                    "
                                    >
                                        <label
                                            :for="'choice' + callback.payload._id"
                                            class="form-label mt-4"
                                        >{{callback.getPrompt()}}</label>
                                        <select
                                            class="form-select"
                                            id="'choice' + callback.payload._id"
                                        >
                                            <option
                                                v-for="choice in callback.getChoices()"
                                                v-bind:key="choice"
                                                :selected="callback.getChoices().indexOf(choice) === callback.getDefaultChoice()"
                                                @click="callback.setChoiceValue(choice)"
                                            >{{choice}}</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div id="controls">
                            <button
                                class="btn btn-primary"
                                @click="nextStep(step)"
                            >Next</button>
                            <hr />
                            Something not right?<button
                                type="button"
                                class="btn btn-link"
                                @click="reset"
                            >
                                Start Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="text-center col-8 mx-auto">
                <div class="row">
                    <div class="col-5">
                        <hr>
                    </div>
                    <div class="col-2">
                        Or
                    </div>
                    <div class="col-5">
                        <hr>
                    </div>
                </div>
                <button
                    class="btn btn-secondary"
                    @click="doCentralisedLogin"
                >Sign in with platform</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
    Config,
    FRAuth,
    FRStep,
    FRLoginSuccess,
    FRLoginFailure,
    TokenManager,
} from "@forgerock/javascript-sdk";

@Options({
    name: "Login",
    props: {
        message: String,
    },
})
export default class Login extends Vue {
    message!: String;
    title?: String;
    description?: String;
    step?: FRStep;
    success: boolean = false;
    failure: boolean = false;
    submitting: boolean = false;
    ready: boolean = false;

    mounted() {
        this.$nextTick(function () {
            this.ready = true;

            let params = new URLSearchParams(window.location.search);
            if (params.has("code") && params.has("state")) {
                const code = params.get("code");
                const state = params.get("state");

                console.log("login mounted() code = " + code + " state = " + state)

                if (code && state) {
                    this.completeCentralisedLogin(code, state);
                }
            } else {
                this.initialiseThenSubmit();
            }
        });
    }

    doCentralisedLogin(): void {
        Config.set({
            clientId: "sdk-onboarding-centralised", // e.g. 'ForgeRockSDKClient'
            redirectUri: "https://app.example.com:8000", // e.g. 'https://sdkapp.example.com:8443/_callback'
            scope: "openid profile", // e.g. 'openid profile me.read'
            serverConfig: {
                baseUrl: "https://openam-david-sdk.forgeblocks.com/am", // e.g. 'https://openam.example.com:9443/openam/'
                timeout: 1000, // 90000 or less
            },
            realmPath: "alpha", // e.g. 'root'
            tree: "Login", // e.g. 'Login'
        });

        TokenManager.getTokens({
            forceRenew: false, // Immediately return stored tokens, if they exist
            login: "redirect", // Redirect to AM or the web app that handles authentication
        });
    }

    completeCentralisedLogin(code: string, state: string): void {
        Config.set({
            clientId: "sdk-onboarding-centralised", // e.g. 'ForgeRockSDKClient'
            redirectUri: "https://app.example.com:8000", // e.g. 'https://sdkapp.example.com:8443/_callback'
            scope: "openid profile", // e.g. 'openid profile me.read'
            serverConfig: {
                baseUrl: "https://openam-david-sdk.forgeblocks.com/am", // e.g. 'https://openam.example.com:9443/openam/'
                timeout: 1000, // 90000 or less
            },
            realmPath: "alpha", // e.g. 'root'
            tree: "Login", // e.g. 'Login'
        });

        this.$emit("successCentralised", code, state);
    }

    initialiseThenSubmit(): void {
        // init SDK
        Config.set({
            clientId: "sdk-onboarding", // e.g. 'ForgeRockSDKClient'
            redirectUri: "https://app.example.com:8000", // e.g. 'https://sdkapp.example.com:8443/_callback'
            scope: "openid profile", // e.g. 'openid profile me.read'
            serverConfig: {
                baseUrl: "https://openam-david-sdk.forgeblocks.com/am", // e.g. 'https://openam.example.com:9443/openam/'
                timeout: 30000, // 90000 or less
            },
            realmPath: "alpha", // e.g. 'root'
            tree: "Login", // e.g. 'Login'
        });

        this.title = this.message;

        this.nextStep();
    }

    nextStep(step?: any): void {
        // invoke sdk to initiate or submit authentication
        this.submitting = true;
        FRAuth.next(step)
            .then((step) => {
                this.handleStep(step);
                this.submitting = false;
            })
            .catch(console.log);
    }

    handleStep(step: any): void {
        if (step instanceof FRStep) {
            this.step = step;
            this.title = step.getHeader(); // overwrite title with page title if present
            this.description = step.getDescription();
        } else if (step instanceof FRLoginSuccess) {
            this.success = true;
            this.handleSuccess();
        } else if (step instanceof FRLoginFailure) {
            this.failure = true;
            this.handleFailure();
        }
    }

    handleSuccess(): void {
        this.title = "Checking your details..";
        this.$emit("success", true);
    }

    handleFailure(): void {
        this.title = "Sorry, that didn't work";
    }

    reset(): void {
        this.step = undefined;
        this.success = false;
        this.failure = false;
        this.initialiseThenSubmit();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
