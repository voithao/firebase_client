<template>
  <div>
    <div v-if="$store.state.user.policy.policies">
      Your active policies:
      <br />
      <div v-for="policy in $store.state.user.policy.policies" v-bind:key="policy.id">
          {{policy.number}}
        <br />
        {{policy}}
      </div>
    </div>

    <div>Choose your policy:</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PurchaseForm extends Vue {
  mounted() {
    this.$store.dispatch("user/policy/bindPolicies");
  }
}
</script>
