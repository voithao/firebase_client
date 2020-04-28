<template>
  <div>
    <v-row
      align="center"
      justify="center"
      style="height: 300px;"
      v-if="(!($store.state.user.user && $store.state.user.policy.policies) || !($store.state.classifier.productTypes[1]))"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <div v-if="$store.state.user.user && $store.state.user.policy.policies">
      Your active policies:
      <br />
      <div v-for="policy in $store.state.user.policy.policies" v-bind:key="policy.id">
        {{policy.number}}
        <br />
      </div>
    </div>
    <v-row>
      <v-col
        v-for="type in $store.state.classifier.productTypes"
        v-bind:key="type.id"
        lg="4"
        md="6"
      >
        <product-card :type="type" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const ProductCard = () => import("@/components/ProductCard.vue");

@Component({
  components: {
    ProductCard
  }
})
export default class PurchaseForm extends Vue {
  mounted() {
    this.$store.dispatch("classifier/getProductTypes", "PRODUCT_TYPES");
  }
}
</script>
