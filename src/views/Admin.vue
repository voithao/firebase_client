<template>
  <div>
    <h1>Administration</h1>
    <v-text-field v-model="collection" label="Enter collection path:"></v-text-field>
    <v-text-field v-model="id" label="Enter doc id:"></v-text-field>
    <v-btn v-if="this.collection && this.id" @click="bindDocument()">Load</v-btn>
    <v-textarea v-if="this.collection" label="Document value" :value="value" @input="setJSONDoc"></v-textarea>
    <v-btn
      v-if="$store.state.admin && $store.state.admin.data && this.collection && this.id"
      :disabled="!saveEnabled"
      @click="saveDoc()"
      color="primary"
    >Save</v-btn>
    <v-btn
      v-if="!$store.state.admin && !$store.state.admin.data && this.collection && !this.id"
      :disabled="!createEnabled"
      @click="saveDoc()"
      color="primary"
    >Create</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminView extends Vue {
  private collection = "";
  private id = "";
  private updated: string | null = null;

  bindDocument() {
    this.$store.dispatch("admin/bindCustomData", {
      collection: this.collection,
      id: this.id
    });
    this.updated = null;
  }

  get value() {
    return JSON.stringify(this.$store.state.admin.data);
  }

  get saveEnabled() {
    return (
      this.updated && this.$store.state.admin.data && this.collection && this.id
    );
  }

  get createEnabled() {
    return this.updated && this.collection && !this.id;
  }

  setJSONDoc(value: string) {
    this.updated = JSON.parse(value);
  }

  async saveDoc() {
    if (this.updated && this.collection) {
      const result = await this.$store.dispatch("admin/saveDoc", {
        doc: this.updated,
        collection: this.collection,
        id: this.id
      });
      this.id = result.id;
    }
  }
}
</script>
