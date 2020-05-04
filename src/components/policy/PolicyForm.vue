<template>
  <v-row>
    <v-col :cols="form.cols" v-for="form in product.forms" v-bind:key="form.name">
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
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "../../schemas/insurer/products";
const ProductField = () => import("@/components/ProductField.vue");

@Component({
  components: { ProductField }
})
export default class ProductCard extends Vue {
  @Prop() private product!: Product;
}
</script>
