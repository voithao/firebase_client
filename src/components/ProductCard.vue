<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" :src="type.image">
      <v-card-title>{{type.name}}</v-card-title>
    </v-img>
    <v-card-text class="text--primary">{{type.description}}</v-card-text>

    <v-card-actions>
      <v-btn color="primary" text>Learn more</v-btn>

      <v-btn color="secondary" text>Get a quote</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PolicyType } from "../schemas/classifier/classifier";

@Component({
  components: {}
})
export default class HelloWorld extends Vue {
  @Prop() private type!: PolicyType;
}
</script>
