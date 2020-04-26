<template>
  <div id="app">
    <v-app>
      <navigation-bar />
      <v-content>
        <v-container fluid>
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10">
              <router-view />
            </v-col>
            <v-col cols="1"></v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const NavigationBar = () => import("@/components/NavigationBar.vue");

@Component({
  components: {
    NavigationBar
  }
})
export default class AppView extends Vue {}
</script>

