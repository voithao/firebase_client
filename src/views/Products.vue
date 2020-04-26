<template>
  <div>
    <ProductList />
  </div>
</template>

<script>
const ProductList = () => import("@/components/ProductList.vue");

export default {
  components: {
    ProductList
  }
};
</script>
