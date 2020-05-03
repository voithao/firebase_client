<template>
  <div id="app">
    <v-app>
      <nav-bar />
      <v-content>
        <app-container />
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const NavBar = () => import("@/components/NavBar.vue");
const AppContainer = () => import("@/components/AppContainer.vue");

@Component({
  components: {
    AppContainer,
    NavBar
  }
})
export default class AppView extends Vue {}
</script>

