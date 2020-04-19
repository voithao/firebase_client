<template>
  <v-container grid-list-xs>Redirect...</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const LoginForm = () => import("../components/LoginForm.vue");

@Component({
  components: {}
})
export default class Login extends Vue {
  async mounted() {
    await this.$auth.logout();
    this.$router.replace({ name: "Home" });
  }
}
</script>
