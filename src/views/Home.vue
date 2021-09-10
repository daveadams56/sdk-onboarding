<template>
    <div v-if="ready">
        <div v-if="tokens">
            <Profile />
            <Logout @success="logoutComplete"/>
        </div>
        <div v-else>
            <Login
                message="Welcome. Please sign in"
                @success="loginComplete"
                @successCentralised="centralisedLoginComplete"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";
import Profile from "@/components/Profile.vue";
import { TokenManager } from "@forgerock/javascript-sdk";

@Options({
    name: "Home",
    components: {
        Login,
        Logout,
        Profile
    },
})
export default class Home extends Vue {
    ready: boolean = false;
    tokens: boolean = false;

    mounted() {
        this.$nextTick(function () {
            this.ready = true;
        });
    }

    loginComplete(success: boolean): void {
        if (success) {
            TokenManager.getTokens({ forceRenew: true }).then(() => {
                this.tokens = true;
            });
        }
    }

    centralisedLoginComplete(code: string, state: string): void {
        console.log("centralisedLoginComplete " + code + " " + state)
        if (code && state) {
            TokenManager.getTokens({
                query: {
                    code: code, // Authorization code from redirect URL
                    state: state, // State from redirect URL
                },
            }).then(() => {
                this.tokens = true;
            });
        }
    }

    logoutComplete(): void {
        // important to remove query params from centralised login oauth flow
        window.history.pushState({}, document.title, "/");

        this.reset();
    }

    reset(): void {
        this.tokens = false;
    }
}
</script>
