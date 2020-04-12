<template>
  <div class="hello">
    <h1>{{ msg }}</h1>Choose a product:
    <div v-if="$store.state.insurers.length > 0">
        <v-btn @click="doSomeAction">Do some action</v-btn>
        <br />
      <v-combobox
        :v-if="$store.state.insurers"
        :items="$store.state.insurers[0].products"
        v-model="product"
        item-text="name"
        item-value="id"
      ></v-combobox>
      <span v-if="$store.state.product && $store.state.policy">
        <v-combobox
          :items="$store.state.fieldTypes[0].values"
          label="Choose field to add"
          item-text="name"
          item-value="name"
        ></v-combobox>
        <v-row>
          <v-col
            :cols="form.cols"
            v-for="form in $store.state.product.forms"
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
import ProductField from "@/components/ProductField.vue";
import { db } from "@/firebaseConfig";

@Component({
  components: {
    ProductField
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private product?: any = null;

  mounted() {
    this.$store.dispatch("bindInsurers");
    this.$store.dispatch("bindFieldTypes");
  }

  @Watch("product")
  async onProductChoose() {
    this.$store.dispatch("bindInsurerProduct", this.product.id);
    this.$store.dispatch("getPolicy", "EOKcIGFDtisYOrpNw1Z2");
  }

  doSomeAction() {
    this.$store.dispatch("addPolicy");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
