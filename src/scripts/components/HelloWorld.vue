<template>
  <div class="hello">
    <slot />
    <h1>{{ msg }}</h1>
    <button @click="logger">
      click me
    </button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <Logger/>
    <LazyExample v-if="lazy"/>
  </div>
</template>

<script>
import Logger from '@/scripts/components/Logger/Logger';
export default {
  name: "hello-world",
  components: {
    Logger,
    LazyExample: () => import('@/scripts/components/LazyExample/LazyExample')
  },
  props: {
    msg: String
  },
  data() {
    return {
      lazy: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.lazy = true;
    }, 2000);
  },
  methods: {
    logger() {
      console.log("test");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
