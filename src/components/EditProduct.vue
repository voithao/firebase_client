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
            :items="$store.state.classifier.classifierProductType"
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
      <PolicyForm :product="$store.state.insurer.product.product" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Product } from "../schemas/insurer/products";
import { firestore } from "firebase";
const PolicyForm = () => import("@/components/policy/PolicyForm.vue");
const ProductField = () => import("@/components/ProductField.vue");
const AddFieldDialog = () => import("@/components/AddFieldDialog.vue");

@Component({
  components: {
    ProductField,
    AddFieldDialog,
    PolicyForm
  }
})
export default class EditProduct extends Vue {
  private product?: firestore.DocumentReference<Product> | null = null;

  mounted() {
    this.$store.dispatch("insurer/bindInsurers");
    this.$store.dispatch("classifier/getClassifier", "ProductType");
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
