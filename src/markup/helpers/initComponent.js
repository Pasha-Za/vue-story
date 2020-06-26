import App from "@/App.vue";

export const initComponent = (markup, components) => {
  return {
    components: {
      App,
      ...components
    },
    template: `
            <app>${markup}</app>
        `
  };
};
