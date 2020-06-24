import markup from "./textblock.html";
import HelloWorld from "@/scripts/components/HelloWorld.vue";
import { initComponent } from "../helpers/initComponent";

export default {
  title: "Text block"
};

const components = {
  HelloWorld
};

export const component = () => ({
  ...initComponent(markup, components)
});
