<template>
  <v-navigation-drawer
    :value="drawer"
    app
    clipped
    :mini-variant="miniVariant"
    enable-resize-watcher
    dark
  >
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
      <v-list-item @click.stop="miniVariant = !miniVariant">
        <v-list-item-action>
          <v-btn icon>
            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Short</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class NavDrawer extends Vue {
  @Prop() private drawer = false;

  private miniVariant = false;
  private items = [];
}
</script>
