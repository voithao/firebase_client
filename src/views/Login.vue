<template>
  <v-container grid-list-xs>
    <login-form></login-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const LoginForm = () => import('../components/LoginForm.vue')

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {}
</script>
