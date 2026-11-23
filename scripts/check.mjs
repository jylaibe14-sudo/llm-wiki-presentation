import {validate,write} from './core.mjs';
const inject=process.argv.includes('--inject-bad-ref');
const result=validate({injectBadRef:inject});
const label=inject?'fault-injection':'normal';
write(`logs/${label}-check.json`,JSON.stringify({mode:label,created:'2026-11-23',...result},null,2)+'\n');
console.log(`${result.passed?'PASS':'FAIL'} | ${result.sourceCount} sources | ${result.conceptCount} Wiki pages | ${result.slideCount} slides | ${result.sourceReferences} slide-source links`);
for(const p of result.problems)console.log(' - '+p);
process.exitCode=result.passed?0:1;
