<template>
  <div>
    <div v-if="$store.state.user.policies">Your active policies:</div>

    <div>Choose your policy:</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PurchaseForm extends Vue {}
</script>
