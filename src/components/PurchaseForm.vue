<template>
  <div>
    <div v-if="$store.state.user && $store.state.user.policy.policies">
      Your active policies:
      <br />
      <div v-for="policy in $store.state.user.policy.policies" v-bind:key="policy.id">
        {{policy.number}}
        <br />
      </div>
    </div>
    <v-row>
      <v-col v-for="type in $store.state.classifier.productTypes" v-bind:key="type.id" cols="4">
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
    this.$store.dispatch("user/policy/bindPolicies");
    this.$store.dispatch("classifier/getClasifier", "PRODUCT_TYPES");
  }
}
</script>
