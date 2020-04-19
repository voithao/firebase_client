<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-form v-on:submit.prevent ref="form" v-model="valid">
        <v-card>
          <v-card-text>
            <v-text-field v-model="auth.username" :counter="10" label="E-mail" required></v-text-field>
            <v-text-field
              v-model="auth.password"
              :append-icon="showpass ? 'visibility_off' : 'visibility'"
              :type="showpass ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              counter
              @click:append="showpass = !showpass"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              @click="submit"
              :disabled="(auth.username === '')"
              class="primary"
            >Login</v-btn>
            <v-btn @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebaseConfig";

@Component({})
export default class LoginForm extends Vue {
  private valid = false;
  private auth = {
    username: "",
    password: ""
  };
  private showpass = false;
  private showpass2 = false;
  private alert = false;
  private errorMsg = "";

  get nextRoute() {
    return this.$route.query.redirect || "/";
  }

  private register() {
    this.$router.push("/register");
  }

  private async submit() {
    const authresult = await await auth.signInWithEmailAndPassword(
      this.auth.username,
      this.auth.password
    );
    if (authresult.user) {
      this.$router.replace(
        this.$route.query.redirect === null ? this.$route.query.redirect : "/"
      );
    }
  }
}
</script>
