<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-form v-on:submit.prevent ref="form" v-model="valid">
        <v-card>
          <v-card-text>
            <v-alert :value="alert" type="error">{{ errorMsg }}</v-alert>
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
import { auth } from "@/firebaseConfig";

@Component({})
export default class RegisterForm extends Vue {
  private valid = false;
  private auth = {
    email: "",
    password: "",
    password2: ""
  };
  private showpass = false;
  private showpass2 = false;
  private alert = false;
  private errorMsg = "";

  private async submit() {
    const authresult = await auth.createUserWithEmailAndPassword(
      this.auth.email,
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
