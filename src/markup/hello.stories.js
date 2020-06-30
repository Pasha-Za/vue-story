const props = {
  message: "test message"
};

export default {
  title: "HelloWorld"
};

export const Component = () => ({
  template: `<hello-world msg="${props.message}"></hello-world>`
});
