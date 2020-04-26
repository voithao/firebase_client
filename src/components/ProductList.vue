<template>
  <div>
    <h2>Your product list (click to edit)</h2>
    <v-list>
      <v-list-item
        :to="`/products/${product.id}`"
        v-for="product in $store.state.insurer.product.products"
        v-bind:key="product.id"
      >
        <v-row>
          <v-col>{{product.code}}</v-col>
          <v-col>{{product.description}}</v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class ProductList extends Vue {
  mounted() {
    this.$store.dispatch("insurer/product/bindInsurerProducts");
  }
}
</script>
