<template>
  <div class="test">
    <p>Check your console</p>
  </div>
</template>

<script>
export default {
  name: "logger",
  data() {
    return {
      lo: "foo"
    };
  },
  mounted() {
    this.logger();
  },
  methods: {
    logger() {
      console.log("Hey!");
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-style: italic;
}
</style>
