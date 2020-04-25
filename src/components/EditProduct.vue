<template>
  <div>
    <div v-if="$store.state.insurer.insurers.length > 0">
      <h1>{{ msg }}</h1>
      <v-combobox
        label="Choose a product"
        :v-if="$store.state.insurer.insurers"
        :items="$store.state.insurer.insurers[0].products"
        v-model="product"
        item-text="name"
        item-value="id"
      ></v-combobox>
      <span v-if="$store.state.insurer.product && $store.state.user.policy.policy">
        <add-field-dialog />
        <v-btn color="primary" class="ml-3" @click="savePolicy">Save policy</v-btn>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
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
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private product?: firestore.DocumentReference<Product> | null = null;

  mounted() {
    this.$store.dispatch("insurer/bindInsurers");
  }

  @Watch("product")
  async onProductChoose() {
    if (this.product) {
      this.$store.dispatch(
        "insurer/product/bindInsurerProduct",
        this.product.id
      );
      this.$store.dispatch("user/policy/getPolicy", "fZvEjkrNuJNuvSnnp0gp");
    }
  }

  savePolicy() {
    this.$store.dispatch("user/policy/savePolicy", "fZvEjkrNuJNuvSnnp0gp");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
