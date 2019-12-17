<template>
  <div class="loading">
    <img
      src="@/assets/images/loading.gif"
      alt="loading"
    >
  </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style lang="less" scoped>
.loading {
  width: 40%;
  margin: 50% auto;
  transform: translateY(-50%);
  img {
    width: 100%;
  }
}
</style>>