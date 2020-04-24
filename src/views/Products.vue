<template>
  <div>
    <EditProduct />
  </div>
</template>

<script>
const EditProduct = () => import("@/components/EditProduct.vue");

export default {
  name: "Home",
  components: {
    EditProduct
  }
};
</script>
