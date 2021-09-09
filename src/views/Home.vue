<template>
    <div v-if="ready">
        <div v-if="tokens">

            <Profile />
            
            <div class="container row">
                <div class="text-center col-8 mx-auto">
                    <div class="row">
                        <div class="col-5">
                            <hr>
                        </div>
                        <div class="col-2">
                            Finished?
                        </div>
                        <div class="col-5">
                            <hr>
                        </div>
                    </div>
                    <button
                        class="btn btn-primary"
                        id="logout"
                        @click="logout"
                    >Sign out</button>
                </div>
            </div>

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
import Profile from "@/components/Profile.vue";
import { FRUser, TokenManager } from "@forgerock/javascript-sdk";

@Options({
    name: "Home",
    components: {
        Login,
        Profile,
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

    logout(): void {
        FRUser.logout().then(this.reset).catch(console.error);
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

    reset(): void {
        this.tokens = false;
    }
}
</script>
