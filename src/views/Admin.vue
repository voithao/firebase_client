<template>
  <div>
    <h1>Administration</h1>
    <v-combobox label="Choose data:" v-model="collection" @change="bindDocument" :items="items"></v-combobox>
    <v-combobox
      v-if="this.collection"
      label="Choose doc:"
      v-model="jsondoc"
      item-text="name"
      item-value="name"
      :items="$store.state.data"
    ></v-combobox>
    <v-textarea
      v-if="this.jsondoc && this.collection"
      label="Document value"
      :value="value"
      @input="setJSONDoc"
    ></v-textarea>
    <v-btn
      v-if="this.jsondoc && this.collection"
      :disabled="!saveEnabled"
      @click="saveDoc()"
      color="primary"
    >Save</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Schema } from "../schemas/schemas";
import { firestore } from "firebase";

@Component
export default class AdminView extends Vue {
  private collection = "";
  private jsondoc: firestore.DocumentReference<Schema> | null = null;
  private updated: Schema | null = null;
  items = ["classifier", "insurers", "policies", "products"];

  bindDocument() {
    this.$store.dispatch("bindCustomData", this.collection);
  }

  get value() {
    return JSON.stringify(this.jsondoc);
  }

  get saveEnabled() {
    return this.updated && this.jsondoc && this.collection;
  }

  setJSONDoc(value: string) {
    this.updated = JSON.parse(value);
  }

  saveDoc() {
    if (this.updated && this.jsondoc && this.collection) {
      this.$store.dispatch("saveDoc", {
        doc: this.updated,
        id: this.jsondoc.id,
        schemaname: this.collection
      });
    }
  }
}
</script>
