<template>
  <div>
    <div v-if="$store.state.insurers.length > 0">
      <h1>{{ msg }}</h1>
      <v-combobox
        label="Choose a product"
        :v-if="$store.state.insurers"
        :items="$store.state.insurers[0].products"
        v-model="product"
        item-text="name"
        item-value="id"
      ></v-combobox>
      <span v-if="$store.state.product && $store.state.policy">
        <add-field-dialog />
        <v-btn color="primary" class="ml-3" @click="doSomeAction">Save policy</v-btn>
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
import AddFieldDialog from "@/components/AddFieldDialog.vue";
import { db } from "@/firebaseConfig";

@Component({
  components: {
    ProductField,
    AddFieldDialog
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private product?: any = null;

  mounted() {
    this.$store.dispatch("bindInsurers");
  }

  @Watch("product")
  async onProductChoose() {
    this.$store.dispatch("bindInsurerProduct", this.product.id);
    this.$store.dispatch("getPolicy", "EOKcIGFDtisYOrpNw1Z2");
  }

  doSomeAction() {
    this.$store.dispatch("savePolicy", "EOKcIGFDtisYOrpNw1Z2");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
