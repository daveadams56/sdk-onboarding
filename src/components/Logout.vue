<template>
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
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
    FRUser
} from "@forgerock/javascript-sdk";

@Options({
    name: "Logout",
    props: {
        message: String,
    },
})
export default class Logout extends Vue {
    logout(): void {
        FRUser.logout().then(this.handleSuccess).catch(this.handleFailure);
    }

    handleSuccess(): void {
        this.$emit("success", true);
    }

    handleFailure(): void {
        this.$emit("success", false);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
