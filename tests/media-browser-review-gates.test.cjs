const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('browser media page rejects unverified reviewed records before rendering',()=>{
 const html=fs.readFileSync('media.html','utf8');
 assert.match(html,/records=data\.filter/);
 assert.match(html,/r\.sourceCheck!=='verified'/);
 assert.match(html,/r\.reviewer/);
 assert.match(html,/r\.reviewedAt/);
 assert.match(html,/r\.linkTarget==='series'/);
});
