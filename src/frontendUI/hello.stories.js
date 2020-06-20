import Vue from "vue";
import HelloWorld from "../components/HelloWorld.vue";

const props = {
  message: "test message"
};

export default {
  title: "HelloWorld"
};

export const asAComponent = () => ({
  components: {
    HelloWorld
  },
  template: `<hello-world msg="${props.message}"></hello-world>`
});
