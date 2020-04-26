<template>
  <div>
    <v-app-bar app clipped-left color="secondary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5">Voithao</span>
      <v-spacer></v-spacer>
      <v-btn
        to="/products"
        v-if="$store.state.user && $store.state.user.profile && $store.state.user.user && $store.state.user.profile.isInsurer"
        text
      >Products</v-btn>
      <v-btn
        to="/admin"
        v-if="$store.state.user && $store.state.user.profile && $store.state.user.user && $store.state.user.profile.isAdmin"
        text
      >Admin</v-btn>
      <v-btn to="/login" v-show="!$store.state.user.user" text>Login</v-btn>
      <v-btn to="/logout" v-show="!!$store.state.user.user" text>Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="secondary" clipped>
      <v-list dense dark>
        <v-list-item dark to="/">
          <v-list-item-action>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dark to="/about">
          <v-list-item-action>
            <v-icon>mdi-help-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class NavigationBar extends Vue {
  private drawer = false;
}
</script>
