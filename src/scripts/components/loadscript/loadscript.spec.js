import { eventBus } from '@EventBus';
import { shallowMount } from '@vue/test-utils';
import InjectScript from './injectscript';
import LoadScript from './loadscript.vue';

describe('loadscript.vue', () => {

  describe('mount', () => {
    let wrapper;

    beforeAll(() => {
      stub(InjectScript, 'injectScript').mockReturnValue(Promise.resolve());
      stub(eventBus, '$emit');

      wrapper = shallowMount(LoadScript, {
        propsData: {
          src: 'https://url.tst',
          integrity: 'integrity',
          crossorigin: 'crossorigin',
          attributes: {
            'data-test': 'data-test'
          }
        },
        slots: {
          default: 'Test'
        }
      });
    });

    afterAll(() => {
      InjectScript.injectScript.restore();
      eventBus.$emit.restore();
    });

    it('should call injectScript', () => {
      expect(InjectScript.injectScript).toHaveBeenCalledWith('https://url.tst', {
        async: true,
        crossorigin: 'crossorigin',
        'data-test': 'data-test',
        integrity: 'integrity'
      });
    });

    it('should call eventBus.$emit', () => {
      expect(eventBus.$emit).not.toHaveBeenCalled();
    });

    it('should have Test displayed in the element body', () => {
      expect(wrapper.html()).toContain('Test');
    });
  });

  describe('mock', () => {
    const tag = {};
    const $emit = stub();

    beforeAll(() => {
      tag.setAttribute = function setAttribute(key, value) {
        this[key] = value;
      };
      stub(InjectScript, 'injectScript').mockReturnValue(Promise.resolve());
      stub(eventBus, '$emit');

      LoadScript.created.call({
        name: 'name',
        src: 'https://url.tst',
        integrity: 'integrity',
        crossorigin: 'crossorigin',
        attributes: {
          'data-test': 'data-test'
        },
        $emit
      });
    });

    afterAll(() => {
      InjectScript.injectScript.restore();
      eventBus.$emit.restore();
    });

    it('should call injectScript', () => {
      expect(InjectScript.injectScript).toHaveBeenCalledWith('https://url.tst', {
        async: undefined,
        crossorigin: 'crossorigin',
        'data-test': 'data-test',
        integrity: 'integrity'
      });
    });

    it('should call $emit', () => {
      expect($emit).toHaveBeenCalledWith('loaded');
    });

    it('should call eventBus.$emit', () => {
      expect(eventBus.$emit).toHaveBeenCalledWith('script.loaded.name', {
        name: 'name',
        url: 'https://url.tst'
      });
    });
  });
});
