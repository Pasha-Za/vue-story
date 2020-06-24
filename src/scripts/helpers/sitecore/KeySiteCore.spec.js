/**
 * Created by christophe.gaon on 27/02/2017.
 */
import Vue from 'vue';
import KeySiteCore from './KeySiteCore';

// helper function that mounts and returns the component with data
function getComp() {
  const el = document.createElement('div');
  el.setAttribute('id', 'test_id');
  el.setAttribute('key', 'test_key');
  return el;
}

function compareInfo(elem, idSearch, keySearch) {
  const key = elem.getAttribute('key');
  const id = elem.getAttribute('id');
  expect(id).toEqual(idSearch);
  expect(key).toEqual(keySearch);
}

describe('KeySiteCore.vue', () => {
  it('has a install hook', () => {
    expect(typeof KeySiteCore.install).toBe('function');
  });

  describe('before install', () => {
    it('does not have a key attribute without the plugin', () => {
      const el = getComp();
      const vm = new Vue({
        el
      });
      vm.$mount();
      const key = vm.$el.getAttribute('key');
      const id = vm.$el.getAttribute('id');
      expect(id).toEqual('test_id');
      expect(key).toEqual(null);
    });
  });

  describe('after install', () => {
    it('kept the key attribute', () => {
      Vue.use(KeySiteCore);
      const el = getComp();
      const vm = new Vue({
        el
      });
      vm.$mount();
      compareInfo(vm.$el, 'test_id', 'test_key');
    });

    it('has key on firstChild ', () => {
      const el = getComp();
      el.innerHTML = "<div key='toto' id='titi'></div>";
      const vm = new Vue({
        el
      });
      vm.$mount();
      compareInfo(vm.$el, 'test_id', 'test_key');
      compareInfo(vm.$el.firstChild, 'titi', 'toto');
    });
  });
});
