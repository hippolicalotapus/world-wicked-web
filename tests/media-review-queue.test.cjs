'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {mediaReviewQueue}=require('../src/media-review-queue.cjs');
const base={id:'fictional-episode',title:'Fictional episode',mediaType:'youtube',canonicalUrl:'https://www.youtube.com/watch?v=example',publisher:'Fictional creator',language:'en',rightsNotes:'Link only; rights pending',evidenceRole:'commentary',verificationStatus:'proposed',archiveEntryIds:[],topics:['history'],embedAllowed:false};
test('proposed media goes to human review without publication',()=>{
 const result=mediaReviewQueue([base]);
 assert.equal(result.ok,true);
 assert.equal(result.queue[0].needsSourceVerification,true);
 assert.equal(result.queue[0].approved,false);
 assert.equal(result.published,false);
});
test('invalid catalog is not processed into review queue',()=>{
 const result=mediaReviewQueue([{...base,canonicalUrl:'javascript:alert(1)'}]);
 assert.equal(result.ok,false);
 assert.deepEqual(result.queue,[]);
});
