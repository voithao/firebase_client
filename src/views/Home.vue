<template>
  <div class="home">
    <PurchaseForm />
  </div>
</template>

<script>
const PurchaseForm = () => import("@/components/PurchaseForm.vue");

export default {
  name: "Home",
  components: {
    PurchaseForm
  }
};
</script>
