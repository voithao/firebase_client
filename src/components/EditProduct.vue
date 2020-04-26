<template>
  <div>
    <span
      v-if="$store.state.insurer && $store.state.insurer.product.product && $store.state.user.policy.policy"
    >
      <v-row>
        <v-col cols="6">
          <v-text-field label="Code" v-model="$store.state.insurer.product.product.code"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-autocomplete
            v-model="$store.state.insurer.product.product.type"
            item-text="name"
            item-value="id"
            :return-object="false"
            :items="$store.state.classifier.productTypes"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Description"
            v-model="$store.state.insurer.product.product.description"
          ></v-text-field>
        </v-col>
      </v-row>
      <add-field-dialog />
      <v-btn color="primary" class="ml-3" @click="savePolicy">Save test policy</v-btn>
      <v-row>
        <v-col
          :cols="form.cols"
          v-for="form in $store.state.insurer.product.product.forms"
          v-bind:key="form.name"
        >
          <v-form :ref="form.name">
            <v-card outlined class="pa-4">
              <product-field
                v-for="field in form.fields"
                v-bind:key="field.name"
                :field="field"
                :form="form.name"
              />
            </v-card>
          </v-form>
          Total fields: {{ form.fields.length }}
        </v-col>
      </v-row>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Product } from "../schemas/insurer/products";
import { firestore } from "firebase";
const ProductField = () => import("@/components/ProductField.vue");
const AddFieldDialog = () => import("@/components/AddFieldDialog.vue");

@Component({
  components: {
    ProductField,
    AddFieldDialog
  }
})
export default class EditProduct extends Vue {
  private product?: firestore.DocumentReference<Product> | null = null;

  mounted() {
    this.$store.dispatch("insurer/bindInsurers");
    this.$store.dispatch("classifier/getProductTypes", "PRODUCT_TYPES");
    this.$store.dispatch(
      "insurer/product/bindInsurerProduct",
      this.$route.params.id
    );
    this.$store.dispatch("user/policy/getPolicy", "fZvEjkrNuJNuvSnnp0gp");
  }

  savePolicy() {
    this.$store.dispatch("user/policy/savePolicy", "fZvEjkrNuJNuvSnnp0gp");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
