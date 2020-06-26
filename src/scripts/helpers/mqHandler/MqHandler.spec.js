/* eslint-disable no-console */
import { eventBus } from '../eventbus/eventbus';
import MqHandler from './MqHandler';

const mqs = [
  {
    mq: '(max-width: 767px)',
    selected: true,
    size: 'small'
  },
  {
    mq: '(min-width: 768px) and (max-width: 1023px)',
    selected: false,
    size: 'medium'
  },
  {
    mq: '(min-width: 1024px)',
    selected: false,
    size: 'large'
  }
];

describe('MqHandler', () => {
  let mqHandler;

  beforeAll(() => {
    mqHandler = new MqHandler(mqs);
  });

  beforeEach(() => {
    spyOn(console, 'error');
  });

  it('should be an object', () => {
    expect(typeof mqHandler).toBe('object');
  });

  it('should console error when no node to parse is given', () => {
    mqHandler = new MqHandler();
    expect(console.error).toHaveBeenCalled();
  });

  it('should have the this.mqs filled with an object after parsing it', () => {
    mqHandler = new MqHandler(mqs);
    expect(typeof mqHandler.mqs).toBe('object');
  });

  describe('createWorkingData()', () => {
    let res;

    beforeAll(() => {
      res = MqHandler.createMatchMediaItem({
        mq: '(max-width: 767px)',
        selected: true,
        size: 'small'
      });
    });

    it('shoud be able to create a correctly structured matchMediaItem member', () => {
      expect(res).toEqual({
        query: '(max-width: 767px)',
        selected: true,
        size: 'small',
        matchMedia: {
          matches: false,
          addListener: expect.any(Function),
          removeListener: expect.any(Function)
        }
      });
    });
  });

  describe('createWorkingData()', () => {
    let res;

    beforeAll(() => {
      res = mqHandler.createWorkingData();
    });

    it('shoud have a propery filled matchMediaItems member', () => {
      expect(res).toEqual([
        {
          query: '(max-width: 767px)',
          selected: true,
          size: 'small',
          matchMedia: {
            matches: false,
            addListener: expect.any(Function),
            removeListener: expect.any(Function)
          }
        },
        {
          query: '(min-width: 768px) and (max-width: 1023px)',
          selected: false,
          size: 'medium',
          matchMedia: {
            matches: false,
            addListener: expect.any(Function),
            removeListener: expect.any(Function)
          }
        },
        {
          query: '(min-width: 1024px)',
          selected: false,
          size: 'large',
          matchMedia: {
            matches: false,
            addListener: expect.any(Function),
            removeListener: expect.any(Function)
          }
        }
      ]);
    });
  });

  describe('bind()', () => {
    it('shoud have bind() function', () => {
      expect(typeof mqHandler.bind).toBe('function');
    });
  });

  describe('unselectAll()', () => {
    let res;

    beforeAll(() => {
      res = mqHandler.unselectAll();
    });

    it('shoud unselect all queries', () => {
      expect(res).toEqual([
        {
          query: '(max-width: 767px)',
          selected: false,
          size: 'small',
          matchMedia: {
            matches: false,
            addListener: expect.any(Function),
            removeListener: expect.any(Function)
          }
        },
        {
          query: '(min-width: 768px) and (max-width: 1023px)',
          selected: false,
          size: 'medium',
          matchMedia: {
            matches: false,
            addListener: expect.any(Function),
            removeListener: expect.any(Function)
          }
        },
        {
          query: '(min-width: 1024px)',
          selected: false,
          size: 'large',
          matchMedia: {
            matches: false,
            addListener: expect.any(Function),
            removeListener: expect.any(Function)
          }
        }
      ]);
    });
  });

  describe('select()', () => {
    let res;
    // let emitStub;
    beforeAll(() => {
      stub(eventBus, '$emit');
      res = mqHandler.select('(max-width: 767px)');
    });
    afterAll(() => {
      eventBus.$emit.restore();
    });

    it('shoud unselect one specific query', () => {
      expect(res).toEqual({
        query: '(max-width: 767px)',
        selected: true,
        size: 'small',
        matchMedia: {
          matches: false,
          addListener: expect.any(Function),
          removeListener: expect.any(Function)
        }
      });
    });

    it('should call eventBus.$emit', () => {
      expect(eventBus.$emit).toBeCalledWith('mediaquery::changed', res);
    });
  });

  describe('getCurrentMq()', () => {
    let res;
    beforeAll(() => {
      res = mqHandler.getCurrentMq();
    });

    it('should return the current media query', () => {
      expect(res).toEqual({
        query: '(max-width: 767px)',
        selected: true,
        size: 'small',
        matchMedia: {
          matches: false,
          addListener: expect.any(Function),
          removeListener: expect.any(Function)
        }
      });
    });
  });

  describe('getMqForSize()', () => {
    let res;
    beforeAll(() => {
      res = mqHandler.getMqForSize('small');
    });

    it('should return a media query based on a size', () => {
      expect(res).toEqual({
        query: '(max-width: 767px)',
        selected: true,
        size: 'small',
        matchMedia: {
          matches: false,
          addListener: expect.any(Function),
          removeListener: expect.any(Function)
        }
      });
    });
  });

  describe('getMqHandler()', () => {
    let instance;
    let instance2;
    beforeAll(() => {
      stub(JSON, 'parse').mockReturnValue({ query: 'query' });
      stub(MqHandler.prototype, 'bind');
      stub(MqHandler.prototype, 'createWorkingData');

      instance = MqHandler.getMqHandler();
      instance2 = MqHandler.getMqHandler();
    });

    afterAll(() => {
      JSON.parse.restore();
      MqHandler.prototype.bind.restore();
      MqHandler.prototype.createWorkingData.restore();
    });

    it('should call JSON.parse method', () => {
      expect(JSON.parse).toHaveBeenCalled();
    });

    it('should call createWorkingData method', () => {
      expect(instance.createWorkingData).toHaveBeenCalled();
    });

    it('should call build method', () => {
      expect(instance.bind).toHaveBeenCalled();
    });

    it('should return the same instance (factory, singleton)', () => {
      expect(instance).toEqual(instance2);
    });
  });

  describe('for()', () => {
    let result;
    let getMqForSize;

    beforeAll(() => {
      getMqForSize = stub().mockReturnValue({ selected: true });
      stub(MqHandler, 'getMqHandler').mockReturnValue({ getMqForSize });

      result = MqHandler.for('size');
    });

    afterAll(() => {
      MqHandler.getMqHandler.restore();
    });

    it('should call getHandler', () => {
      expect(MqHandler.getMqHandler).toHaveBeenCalledWith();
    });

    it('should call getMqForSize', () => {
      expect(getMqForSize).toHaveBeenCalledWith('size');
    });

    it('should return a boolean', () => {
      expect(result).toBe(true);
    });
  });
});
