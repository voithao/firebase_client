<template>
  <div>
    <div v-for="insurer in $store.state.insurer.insurers" v-bind:key="insurer.id">
      <InsurerQuote :insurer="insurer.id" :type="$route.params.type" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const InsurerQuote = () => import("@/components/insurer/InsurerQuote.vue");

@Component({
  components: {
    InsurerQuote
  }
})
export default class Quote extends Vue {
  async mounted() {
    await this.$store.dispatch("insurer/bindInsurers");
  }
}
</script>
