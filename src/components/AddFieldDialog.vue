<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">Add field</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">New field</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-if="$store.state.product.fieldTypes && $store.state.product.fieldTypes[0]"
                :items="$store.state.product.fieldTypes[0].values"
                label="Choose field to add*"
                item-text="name"
                item-value="name"
                required
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Field ID*"
                hint="you will reference field by this"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Label*" hint="text label for field" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AddFieldDialog extends Vue {
  private dialog = false;

  mounted() {
    this.$store.dispatch("product/bindFieldTypes");
  }
}
</script>
