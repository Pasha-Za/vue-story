/* eslint-disable no-console */
import { eventBus } from '../eventbus/eventbus';

/**
 * MqHandler will use the eventBus to emit mediaquery changes based on matchMedia listeners.
 * Also has functions to ask for the current media query or to get a matchMedia object by screensize.
 * @class MqHandler
 */
export default class MqHandler {
  /**
   * MqHandler constructor.
   * @property {object} query - MediaQuery Object. Preferably taken from body:before { content: "" }
   * @constructs MqHandler
   */
  constructor(mqs) {
    if (!mqs) {
      console.error('No media queries object given');
      return;
    }

    /**
     * MediaQuery Object.
     * Preferably taken from body:before { content: "" }
     * @type {object}
     * @member MqHandler#mqs
     */
    this.mqs = mqs;

    /**
     * matchMediaItems Object with correctly mapped data.
     * @type {object}
     * @member MqHandler#matchMediaItems
     */
    this.matchMediaItems = this.createWorkingData();
    this.bind();
  }

  /**
   * Creates correct content for matchMediaItems
   */
  createWorkingData() {
    return this.mqs.map(mq => MqHandler.createMatchMediaItem(mq));
  }

  /**
   * @typedef matchMediaItem
   * @type {object}
   * @property {string} query - the mediaquery as a string. For example: "(min-width: 768px) and (max-width: 1023px)"
   * @property {boolean} selected - if this mediaquery is the selected one
   * @property {string} size - The size identifier of the mediaquery. Can be: small, medium, large
   * @property {object} matchMedia - The attached matchMedia object
   */

  /**
   * Creates matchMediaItem
   * @param {object} data - mediaquery data
   * @returns {matchMediaItem}
   */
  static createMatchMediaItem(data) {
    return {
      query: data.mq,
      selected: data.selected,
      size: data.size,
      matchMedia: window.matchMedia(data.mq)
    };
  }

  /**
   * Binds the matchMedia mediaquery listeners
   */
  /* istanbul ignore next */

  // ignoring because of the fact the test runner can't use the addListener function
  bind() {
    this.matchMediaItems.forEach((mq) => {
      mq.matchMedia.addListener(() => {
        if (mq.matchMedia.matches) {
          this.select(mq.query);
        }
      });
    });
  }

  /**
   * Selects the correct mediaquery based on the current matching matchMedia media query
   * Sends an event over the window.eventBus
   * @param {object} query - matchMediaItems item query string
   */
  select(query) {
    this.unselectAll();
    const selectedMq = this.matchMediaItems.find(mq => mq.query === query);
    selectedMq.selected = true;

    eventBus.$emit('mediaquery::changed', selectedMq);
    return selectedMq;
  }

  /**
   * loops over all matchMediaItems and unselects them
   */
  unselectAll() {
    this.matchMediaItems.forEach((mq) => {
      mq.selected = false;
    });

    // returns for unit testing purposes
    return this.matchMediaItems;
  }

  /**
   * Returns the currently selected matchMediaItems item
   * @returns {object} selected matchMediaItems item
   */
  getCurrentMq() {
    return this.matchMediaItems.find(mq => mq.selected === true);
  }

  /**
   * Returns the matchMediaItems item for a size
   * @param {string} size - can be small, medium, large
   * @returns {object} matchMediaItems item as per given size
   */
  getMqForSize(size) {
    return this.matchMediaItems.find(mq => mq.size === size);
  }

  static for(size) {
    return this.getMqHandler().getMqForSize(size).selected;
  }

  /**
   *
   * @param sizeOptions
   * @returns {MqHandler}
   */
  static getMqHandler(sizeOptions) {
    if (!this.$mqHandler) {
      this.$mqHandler = new MqHandler(this.readCSS(sizeOptions));
    }
    return this.$mqHandler;
  }

  /**
   *
   * @param sizeOptions
   * @returns {any}
   */
  static readCSS(sizeOptions) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    const css = this.createCSSRules(sizeOptions);

    style.appendChild(document.createTextNode(css));

    head.appendChild(style);

    const mqs = JSON.parse(window
      .getComputedStyle(document.querySelector('body'), ':before')
      .getPropertyValue('content')
      .replace(/\\/g, '')
      .slice(1, -1));

    document.querySelector('head').removeChild(style);

    return mqs;
  }

  static createCSSRules(sizeOptions = {}) {
    const { small = 768, medium = 1024 } = sizeOptions;

    return `
      body::before {
          content: '[{"mq":"(max-width: ${small - 1}px)","selected":true,"size":"small"},{"mq":"(min-width: ${small}px) and (max-width: ${medium - 1}px)","selected":false,"size":"medium"},{"mq":"(min-width: ${medium}px)","selected":false,"size":"large"}]';
      }
      @media (min-width: ${small}px) {
        body::before {
          content: '[{"mq":"(max-width: ${small - 1}px)","selected":false,"size":"small"},{"mq":"(min-width: ${small}px) and (max-width: ${medium - 1}px)","selected":true,"size":"medium"},{"mq":"(min-width: ${medium}px)","selected":false,"size":"large"}]';
        }
      }
      @media (min-width: ${medium}px) {
        body::before {
          content: '[{"mq":"(max-width: ${small - 1}px)","selected":false,"size":"small"},{"mq":"(min-width: ${small}px) and (max-width: ${medium - 1}px)","selected":false,"size":"medium"},{"mq":"(min-width: ${medium}px)","selected":true,"size":"large"}]';
        }
      }
    `.split('\n').map(s => s.trim()).join('');
  }
}
