<template>
  <div>
    <v-app-bar app clipped-left color="secondary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5">Voithao</span>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-block">
        <v-btn to="/products" v-if="isInsurer" text>Products</v-btn>
      </div>
      <div class="d-none d-sm-block">
        <v-btn to="/admin" v-if="isAdmin" text>Admin</v-btn>
      </div>
      <div class="pt-1">
        <v-btn to="/login" v-show="!isAuthenticated" text>Login</v-btn>
      </div>
      <v-menu v-if="isAuthenticated" left bottom mr4>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="30px">
              <v-gravatar :email="$store.state.user.user.email" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/logout">
            <v-list-item-title class="text-xs-center">Logout</v-list-item-title>
          </v-list-item>
          <v-list-item to="/profile">
            <v-list-item-title class="text-xs-center">Profile</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <nav-drawer :drawer="drawer"></nav-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const NavDrawer = () => import("@/components/NavDrawer.vue");

@Component({
  components: { NavDrawer }
})
export default class NavigationBar extends Vue {
  private drawer = false;

  get isAuthenticated() {
    return this.$store.state.user.user;
  }

  get isAdmin() {
    return (
      this.$store.state.user &&
      this.$store.state.user.profile &&
      this.$store.state.user.user &&
      this.$store.state.user.profile.isAdmin
    );
  }

  get isInsurer() {
    return (
      this.$store.state.user &&
      this.$store.state.user.profile &&
      this.$store.state.user.user &&
      this.$store.state.user.profile.isInsurer
    );
  }
}
</script>
