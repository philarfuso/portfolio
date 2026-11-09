/** Optional browser regression suite; supply an existing Playwright installation, no production dependency. */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const toolkit=process.env.BROWSER_TOOLKIT;
if(!toolkit) throw new Error('Set BROWSER_TOOLKIT to an existing Playwright index.mjs path.');
const {chromium}=await import(pathToFileURL(toolkit));
const base=new URL(process.env.STUDIO_BASE_URL || 'http://127.0.0.1:3109');
assert.ok(['localhost','127.0.0.1'].includes(base.hostname),'Use a local server; never production.');
const dir=path.resolve(process.env.STUDIO_ARTIFACT_DIR || '/tmp/portfolio-studio-browser');await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const routes=['/','/work','/resume','/contact','/work/memx','/work/domani','/work/iffers-pictures','/consulting','/studio-missing-route'];
const results=[];const failures=[];const errors=[];
async function context(options={}) {const c=await browser.newContext(options);await c.route('**/*',r=>new URL(r.request().url()).origin===base.origin?r.continue():r.abort());return c;}
async function check(name,fn) {try{await fn();results.push({name,pass:true});}catch(e){failures.push({name,error:e.message});results.push({name,pass:false,error:e.message});}}
const c=await context({viewport:{width:1280,height:900}});const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
for(const route of routes) {
 console.log('Checking '+route);
 await check(`direct load, main focus and fresh print ${route}`,async()=>{
  const response=await p.goto(new URL(route,base).href);assert.equal(response.status(),route.includes('missing')?404:200);
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);
  assert.equal(await p.locator('main h1').count(),1);
  await p.keyboard.press('Tab');assert.match(await p.locator(':focus').innerText(),/Skip to content/i);await p.keyboard.press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'main-content');
  // A new load has unvisited below-the-fold reveals. Print must still include them all.
  await p.goto(new URL(route,base).href);await p.waitForTimeout(200);await p.emulateMedia({media:'print'});
  const hidden=await p.locator('main [data-reveal],main [data-studio-reveal]').evaluateAll(es=>es.filter(e=>getComputedStyle(e).opacity==='0').map(e=>e.textContent.slice(0,70)));
  assert.deepEqual(hidden,[]);
  assert.equal(await p.locator('main h1').evaluate(e=>getComputedStyle(e).opacity),'1');
  if(['/','/resume','/work/memx','/work/domani'].includes(route))await p.pdf({path:path.join(dir,`${route==='/'?'home':route.slice(1).replaceAll('/','-')}-print.pdf`),format:'A4',printBackground:true});
  await p.emulateMedia({media:'screen'});
 });
 for(const width of [1440,1280,1024,850,760,560,390,320])await check(`layout ${route} ${width}`,async()=>{
  console.log('  viewport '+width);
  await p.setViewportSize({width,height:width===1280?720:900});await p.goto(new URL(route,base).href);await p.evaluate(()=>document.fonts.ready);
  await p.emulateMedia({reducedMotion:'reduce'});
  await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,15));}scrollTo(0,0);});
  for (const img of await p.locator('main img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(e=>Promise.race([e.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Image did not decode after entering the viewport')),8000))]));
  }
  await p.evaluate(()=>scrollTo(0,0));
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'horizontal overflow');
  assert.deepEqual(await p.locator('main img').evaluateAll(es=>es.filter(e=>!e.complete||e.naturalWidth===0).map(e=>e.getAttribute('src'))),[],'broken media');
  if([1280,390].includes(width)) {const slug=route==='/'?'home':route.slice(1).replaceAll('/','-');await p.screenshot({path:path.join(dir,`${slug}-${width}-full.png`),fullPage:true});await p.screenshot({path:path.join(dir,`${slug}-${width}-hero.png`)});await p.evaluate(()=>scrollTo(0,900));await p.screenshot({path:path.join(dir,`${slug}-${width}-body.png`)});}
  await p.emulateMedia({reducedMotion:'no-preference'});
 });
}
await check('normal motion keyboard reveals nested content; live preference settles pending groups',async()=>{
 await p.setViewportSize({width:1280,height:900});await p.goto(new URL('/resume',base).href);await p.waitForTimeout(250);
 const pending=p.locator('main [data-reveal]:not([data-reveal-state="visible"])');assert.ok(await pending.count()>0,'normal motion should be installed');
 await p.locator('main a').last().focus();await p.waitForTimeout(20);
 assert.equal(await p.locator(':focus').evaluate(e=>{for(let n=e;n&&n.tagName!=='BODY';n=n.parentElement)if(getComputedStyle(n).opacity==='0')return true;return false;}),false);
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(20);
 assert.equal(await p.locator('main [data-reveal]').evaluateAll(es=>es.some(e=>getComputedStyle(e).opacity==='0')),false);
 await p.emulateMedia({reducedMotion:'no-preference'});
});
await check('mobile primary navigation and project navigation keyboard interaction',async()=>{
 await p.setViewportSize({width:390,height:900});await p.goto(new URL('/work/memx',base).href);
 await p.locator('.mobile-nav summary').click();await p.locator('.mobile-nav a[href="/resume"]').click();await p.waitForURL('**/resume');
 await p.goto(new URL('/work/memx',base).href);const trigger=p.getByRole('button',{name:'Open project navigation'});await trigger.focus();await p.keyboard.press('Enter');await p.waitForTimeout(250);
 assert.equal(await trigger.getAttribute('aria-expanded'),'true');assert.equal(await trigger.isVisible(),true);
 await p.keyboard.press('Tab');assert.match(await p.locator(':focus').getAttribute('aria-label'),/Previous case study/);
 await p.keyboard.press('Escape');assert.equal(await trigger.getAttribute('aria-expanded'),'false');assert.equal(await trigger.evaluate(e=>e===document.activeElement),true);
 await trigger.click();await p.locator('h1').click();assert.equal(await trigger.getAttribute('aria-expanded'),'false');
});
await check('client route transitions and back navigation preserve correct scope',async()=>{
 await p.setViewportSize({width:1280,height:900});await p.goto(base.href);
 for(const route of ['/work','/resume','/consulting','/contact']) {await p.locator(`.desktop-nav a[href="${route}"]`).click();await p.waitForURL(`**${route}`);assert.equal(await p.locator(`.desktop-nav a[href="${route}"]`).getAttribute('aria-current'),'page');}
 await p.goBack();await p.waitForURL('**/consulting');assert.equal(await p.locator('main').getAttribute('data-motion-ready'),null);
 await p.goBack();await p.waitForURL('**/resume');assert.equal(await p.locator('main.consulting-page').count(),0);
});
await check('narrow effective layout at 200 percent zoom equivalent',async()=>{
 await p.setViewportSize({width:640,height:360});
 for(const route of routes){await p.goto(new URL(route,base).href);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
});
await c.close();
for(const mode of ['no-js','no-observer'])await check(`${mode} content and navigation remain available`,async()=>{
 const cx=await context({javaScriptEnabled:mode!=='no-js',viewport:{width:390,height:900}});
 if(mode==='no-observer')await cx.addInitScript(()=>{delete window.IntersectionObserver;});
 const page=await cx.newPage();
 for(const route of routes) {
  await page.goto(new URL(route,base).href);await page.waitForTimeout(100);
  assert.equal(await page.locator('main h1').count(),1);
  assert.equal(await page.locator('main [data-reveal],main [data-studio-reveal]').evaluateAll(es=>es.some(e=>getComputedStyle(e).opacity==='0')),false);
  if(route.startsWith('/work/'))assert.ok(await page.locator('.studio-case-footer a[href="/work"]').count());
 }
 await cx.close();
});
if(errors.length)failures.push({name:'page errors',error:JSON.stringify(errors)});
await writeFile(path.join(dir,'results.json'),JSON.stringify({base:base.href,results,failures,errors,limits:['Chromium only; 640px effective viewport approximates 200% browser zoom at1280px, not a physical browser zoom setting.','Local app; external vendor requests blocked; no hosted provider or production activation tested.']},null,2));await browser.close();
console.log(JSON.stringify({checks:results.length,failures,errors,artifactDirectory:dir}));if(failures.length)process.exitCode=1;
