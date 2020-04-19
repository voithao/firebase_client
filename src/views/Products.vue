<template>
  <div class="home">
    <EditProduct />
  </div>
</template>

<script>
// @ is an alias to /src
import EditProduct from "@/components/EditProduct.vue";

export default {
  name: "Home",
  components: {
    EditProduct
  }
};
</script>
