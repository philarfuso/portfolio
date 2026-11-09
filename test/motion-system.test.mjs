import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const read=p=>readFile(new URL(`../${p}`,import.meta.url),'utf8');
const [orchestrator,layout,css,nav,consulting]=await Promise.all([
 read('src/components/motion/motion-orchestrator.tsx'),read('src/app/layout.tsx'),read('src/app/studio-system.css'),read('src/components/case-study/case-study-navigator.tsx'),read('src/app/consulting/consulting-studio-motion.tsx')]);
test('route enhancement is a small client leaf, excluding consulting’s own controller',()=>{
 assert.match(orchestrator,/^"use client";/);assert.match(orchestrator,/usePathname/);assert.match(orchestrator,/main\.classList\.contains\("consulting-page"\)/);assert.match(orchestrator,/return installRevealMotion\(main\)/);assert.match(layout,/<MotionOrchestrator \/>/);assert.doesNotMatch(orchestrator,/documentElement\.classList/);
});
test('fixed case controls never depend on viewport reveals',()=>{assert.doesNotMatch(nav,/data-reveal/);});
test('print and reduced-motion rules force pending reveals visible independently of JavaScript',()=>{
 assert.match(css,/@media \(prefers-reduced-motion: reduce\), print/);assert.match(css,/opacity: 1 !important/);assert.match(css,/translate: none !important/);assert.match(css,/animation: none !important/);
});
test('accepted consulting keeps its scoped motion and cleanup',()=>{assert.match(consulting,/\.consulting-page/);assert.match(consulting,/observer\?\.disconnect/);assert.match(consulting,/removeEventListener\("focusin"/);});
