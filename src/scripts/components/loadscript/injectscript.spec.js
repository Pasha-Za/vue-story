import InjectScript from './injectscript';

describe('injectScript', () => {
  describe('inject()', () => {
    describe('when options is given', () => {
      const head = {};
      const tag = {
        setAttribute(key, value) {
          this[key] = value;
        },
        addEventListener: stub()
      };
      let promise;
      let promise2;
      beforeAll(() => {
        head.appendChild = stub();
        stub(document, 'getElementsByTagName').mockReturnValue([head]);
        stub(document, 'createElement').mockReturnValue(tag);

        promise = InjectScript.injectScript('https://url.test', {
          attr: 'attr',
          async: true
        });
        promise2 = InjectScript.injectScript('https://url.test', {
          attr: 'attr'
        });
      });

      afterAll(() => {
        document.getElementsByTagName.restore();
        document.createElement.restore();
      });

      it('should append the tag element inside the head tag', () => {
        expect(head.appendChild).toHaveBeenCalledWith(tag);
      });

      it('should have an attribute', () => {
        expect(tag.attr).toEqual('attr');
      });

      it('should return a promise', () => {
        expect(promise).toBeInstanceOf(Promise);
      });

      it('should return a promise', () => {
        expect(promise2).toBeInstanceOf(Promise);
      });
    });
    describe('when options isn\'t given', () => {
      const head = {};
      const tag = {
        setAttribute(key, value) {
          this[key] = value;
        },
        addEventListener: stub()
      };
      let promise;
      beforeAll(() => {
        head.appendChild = stub();
        stub(document, 'getElementsByTagName').mockReturnValue([head]);
        stub(document, 'createElement').mockReturnValue(tag);

        promise = InjectScript.injectScript('https://url.test5');
      });

      afterAll(() => {
        document.getElementsByTagName.restore();
        document.createElement.restore();
      });

      it('should append the tag element inside the head tag', () => {
        expect(head.appendChild).toHaveBeenCalledWith(tag);
      });

      it('should return a promise', () => {
        expect(promise).toBeInstanceOf(Promise);
      });
    });
  });
});
