<template>
  <div>
    <v-slide-y-transition mode="out-in">
      <div v-if="$store.state.user.user && $store.state.user.policy.policies">
        Your active policies:
        <br />
        <div v-for="policy in $store.state.user.policy.policies" v-bind:key="policy.id">
          {{policy.number}}
          <br />
        </div>
      </div>
    </v-slide-y-transition>
    <v-row
      v-if="$store.state.classifier.classifierProductType && $store.state.classifier.classifierProductType[0]"
    >
      <v-col
        v-for="type in $store.state.classifier.classifierProductType[0].values"
        v-bind:key="type.id"
        lg="4"
        md="6"
      >
        <product-card :type="type" />
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
      style="height: 300px;"
      v-if="(!($store.state.user.user && $store.state.user.policy.policies) || !($store.state.classifier.classifierProductType && $store.state.classifier.classifierProductType[0] && $store.state.classifier.classifierProductType[0].values[1]))"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
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
    this.$store.dispatch("classifier/getClassifier", "ProductType");
  }
}
</script>
