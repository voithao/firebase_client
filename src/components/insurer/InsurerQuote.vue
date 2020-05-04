<template>
  <div v-if="$store.state[insurer]">
    <div v-for="product in $store.state[insurer].products" v-bind:key="product.id">
      <PolicyForm :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { VuexModule } from "vuex-module-decorators";
import { ProductFormDef } from "@/schemas/insurer/products";
import { firestoreAction } from "vuexfire";
import { db } from "@/firebaseConfig";
const PolicyForm = () => import("@/components/policy/PolicyForm.vue");

type ProductState = {
  products: Array<ProductFormDef>;
};

@Component({
  components: { PolicyForm }
})
export default class InsurerQuote extends Vue {
  @Prop() private insurer!: string;
  @Prop() private type!: string;

  mounted() {
    const localModule = new VuexModule<ProductState>({
      namespaced: true,
      state: {
        products: []
      },
      mutations: {},
      actions: {
        bindInsurerProducts: firestoreAction(({ bindFirestoreRef }) => {
          return bindFirestoreRef(
            "products",
            db
              .collection(`/insurers/${this.insurer}/products`)
              .where("type", "==", this.type)
          );
        })
      }
    });
    this.$store.registerModule(`${this.insurer}`, localModule);
    this.$store.dispatch(`${this.insurer}/bindInsurerProducts`);
  }
}
</script>
