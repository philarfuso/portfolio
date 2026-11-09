import assert from 'node:assert/strict';
import test from 'node:test';
import { installRevealMotion } from '../src/lib/reveal-motion.ts';

function environment({ reduced = false, observer = true } = {}) {
  const scopeListeners = new Map(); const mediaListeners = new Map();
  const style = () => { const values = new Map(); return { values, setProperty: (k,v) => values.set(k,v), removeProperty: k => values.delete(k) }; };
  const scope = { dataset: {}, addEventListener: (k,v) => scopeListeners.set(k,v), removeEventListener: k => scopeListeners.delete(k) };
  const item = (top, parentElement = scope) => ({ dataset: {}, style: style(), parentElement, getBoundingClientRect: () => ({top, bottom: top + 1600}) });
  const visible = item(10), below = item(1500), nested = item(1600, below);
  scope.querySelectorAll = () => [visible, below, nested];
  const media = { matches: reduced, addEventListener: (k,v) => mediaListeners.set(k,v), removeEventListener: k => mediaListeners.delete(k) };
  const observers = [];
  class Observer {
    constructor(callback, options) { this.callback=callback;this.options=options;this.observed=new Set();observers.push(this); }
    observe(e) { this.observed.add(e); }
    unobserve(e) { this.observed.delete(e); }
    disconnect() { this.observed.clear(); }
  }
  const view = { innerHeight: 900, matchMedia: () => media, ...(observer ? {IntersectionObserver: Observer} : {}) };
  return {scope,visible,below,nested,media,view,observers,scopeListeners,mediaListeners};
}

test('progressive reveals leave in-view content visible, then reveal long offscreen sections at first intersection', () => {
  const e=environment(); const cleanup=installRevealMotion(e.scope,e.view);
  assert.equal(e.visible.dataset.revealState,'visible');
  assert.equal(e.below.dataset.revealState,undefined);
  const observer=e.observers[0]; assert.equal(observer.options.threshold,0);
  observer.callback([{isIntersecting:true,target:e.below}]);
  assert.equal(e.below.dataset.revealState,'visible'); assert.equal(observer.observed.has(e.below),false);
  cleanup();
});
test('focus reveals every nested reveal ancestor immediately', () => {
  const e=environment(); const cleanup=installRevealMotion(e.scope,e.view);
  e.scopeListeners.get('focusin')({target:e.nested});
  assert.equal(e.nested.dataset.revealState,'visible'); assert.equal(e.below.dataset.revealState,'visible');
  assert.equal(e.below.style.values.get('--reveal-delay'),'0ms'); cleanup();
});
test('reduced motion and unavailable IntersectionObserver never hide content', () => {
  for(const options of [{reduced:true},{observer:false}]) {
    const e=environment(options); const cleanup=installRevealMotion(e.scope,e.view);
    assert.equal(e.scope.dataset.motionReady,'reduced');
    for(const item of [e.visible,e.below,e.nested]) assert.equal(item.dataset.revealState,'visible');
    assert.equal(e.observers.length,0); cleanup();
  }
});
test('live preference changes reveal pending content and route cleanup removes all resources and readiness', () => {
  const e=environment(); const cleanup=installRevealMotion(e.scope,e.view);
  e.media.matches=true; e.mediaListeners.get('change')();
  assert.equal(e.below.dataset.revealState,'visible'); assert.equal(e.observers[0].observed.size,0);
  e.media.matches=false; e.mediaListeners.get('change')();
  assert.equal(e.below.dataset.revealState,'visible');
  cleanup(); assert.deepEqual(e.scope.dataset,{}); assert.deepEqual(e.below.dataset,{});
  assert.equal(e.scopeListeners.size,0); assert.equal(e.mediaListeners.size,0);
  assert.equal(e.below.style.values.size,0); assert.equal(e.observers.at(-1).observed.size,0);
});
