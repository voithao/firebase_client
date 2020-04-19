<template>
  <v-container grid-list-xs>
    <register-form></register-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const RegisterForm = () => import('../components/RegisterForm.vue')

@Component({
  components: {
    RegisterForm
  }
})
export default class Register extends Vue {}
</script>
