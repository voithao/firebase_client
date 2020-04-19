<template>
  <v-container grid-list-xs>Redirect...</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebaseConfig";

@Component({})
export default class Login extends Vue {
  async mounted() {
    await auth.signOut();
    this.$router.replace({ name: "Home" });
  }
}
</script>
