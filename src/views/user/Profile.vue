<template>
  <div>
    <user-profile />
  </div>
</template>

<script>
const UserProfile = () => import("@/components/user/UserProfile.vue");

export default {
  name: "Home",
  components: {
    UserProfile
  }
};
</script>