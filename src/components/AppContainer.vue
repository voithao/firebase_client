<template>
  <v-container fluid class="grey lighten-3 fill-height">
    <v-slide-y-transition mode="out-in">
      <v-row align="center" justify="center" class="ma-1">
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AppContainer extends Vue {}
</script>
