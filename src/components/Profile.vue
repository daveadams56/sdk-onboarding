<template>
    <div class="container" v-if="ready">
        <div
            class="card mb-3"
            style="max-width: 40rem"
        >
            <div class="card-body text-center">

                <!-- User Info View -->
                <form
                    class="m-5"
                    style="max-width: 40rem"
                    v-if="user !== {}"
                >
                    <h3>Your Profile</h3>
                    <div
                        class="form-group"
                        id="userId"
                    >
                        <label
                            for="userIdField"
                            class="col-sm-2 col-form-label"
                        >User ID</label>
                        <div class="col-sm-10">
                            <input
                                type="text"
                                readonly=""
                                class="form-control-plaintext"
                                id="userIdField"
                                v-model="user.sub"
                            >
                        </div>
                    </div>
                    <div
                        class="form-group"
                        id="email"
                    >
                        <label
                            for="emailField"
                            class="col-sm-2 col-form-label"
                        >Email Address</label>
                        <div class="col-sm-10">
                            <input
                                type="text"
                                readonly=""
                                class="form-control-plaintext"
                                id="emailField"
                                v-model="user.mail"
                            >
                        </div>
                    </div>
                    <div
                        class="form-group"
                        id="givenName"
                    >
                        <label
                            for="givenNameField"
                            class="col-sm-2 col-form-label"
                        >Given Name</label>
                        <div class="col-sm-10">
                            <input
                                type="text"
                                readonly=""
                                class="form-control-plaintext"
                                id="givenNameField"
                                v-model="user.given_name"
                            >
                        </div>
                    </div>
                    <div
                        class="form-group"
                        id="lastName"
                    >
                        <label
                            for="lastNameField"
                            class="col-sm-2 col-form-label"
                        >Last Name</label>
                        <div class="col-sm-10">
                            <input
                                type="text"
                                readonly=""
                                class="form-control-plaintext"
                                id="lastNameField"
                                v-model="user.family_name"
                            >
                        </div>
                    </div>
                </form>
                <form v-else>
                    <div
                        class="spinner-border"
                        role="status"
                    ></div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
    UserManager
} from "@forgerock/javascript-sdk";

@Options({
    name: "Profile",
    props: {}
})
export default class Profile extends Vue {
    user: Object = {};
    ready: boolean = false;

    mounted() {
        this.$nextTick(function () {
            this.ready = true;
            this.getUserInfo()
        });
    }

    getUserInfo() {
        UserManager.getCurrentUser().then((info) => {
            this.user = JSON.parse(JSON.stringify(info));
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
