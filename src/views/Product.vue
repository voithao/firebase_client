<template>
  <div>
    <EditProduct />
  </div>
</template>

<script>
const EditProduct = () => import("@/components/EditProduct.vue");

export default {
  components: {
    EditProduct
  }
};
</script>
