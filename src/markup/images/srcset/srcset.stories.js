import backgroundMarkup from "./background.html";
import imageMarkup from "./image.html";
import lazyloadMarkup from "./lazyload.html";

export default {
    title: "srcset directive"
};

export const background = () => ({
    template: backgroundMarkup
});

export const image = () => ({
    template: imageMarkup
});

export const lazyload = () => ({
    template: lazyloadMarkup
});
