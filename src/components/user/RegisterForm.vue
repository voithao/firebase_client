<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-form v-on:submit.prevent ref="form" v-model="valid">
        <v-card>
          <v-card-text>
            <v-alert :value="alert" type="error">{{ errorMsg }}</v-alert>
            <v-text-field v-model="auth.fullName" :counter="30" label="Full name" required></v-text-field>
            <v-text-field v-model="auth.email" :counter="100" label="E-mail" required></v-text-field>
            <v-text-field
              v-model="auth.password"
              :append-icon="showpass ? 'visibility_off' : 'visibility'"
              :type="showpass ? 'text' : 'password'"
              ref="password"
              label="Password"
              counter
              @click:append="showpass = !showpass"
              required
            ></v-text-field>
            <v-text-field
              v-model="auth.password2"
              :append-icon="showpass2 ? 'visibility_off' : 'visibility'"
              :type="showpass2 ? 'text' : 'password'"
              label="Repeat Password"
              counter
              @click:append="showpass2 = !showpass2"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" @click="submit" class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class RegisterForm extends Vue {
  private valid = false;
  private auth = {
    fullName: "",
    email: "",
    username: "",
    password: "",
    password2: ""
  };
  private showpass = false;
  private showpass2 = false;
  private alert = false;
  private errorMsg = "";

  private async submit() {
    // await users.register(this.auth);
    // if (!users.error) {
    //   if (this.$route.query && this.$route.query.next) {
    //     this.$router.push(this.$route.query.next as string);
    //   } else {
    //     this.$router.push("/login");
    //   }
    // } else {
    //   this.alert = true;
    //   this.errorMsg = "auth.regfail";
    // }
  }
}
</script>
