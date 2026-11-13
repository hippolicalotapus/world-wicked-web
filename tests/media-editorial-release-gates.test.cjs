const test=require('node:test');
const assert=require('node:assert/strict');
const {validateMedia}=require('../src/media-validation.cjs');
const base=()=>({id:'fictional-record',title:'Fictional record',publisher:'Example institution',language:'en',rightsNotes:'Permission not yet confirmed',mediaType:'institutional-video',canonicalUrl:'https://example.org/video',evidenceRole:'secondary',verificationStatus:'proposed',archiveEntryIds:[],topics:[],embedAllowed:false});
test('unreviewed source may be proposed but not marked reviewed without verification',()=>{
 assert.deepEqual(validateMedia(base()),[]);
 const reviewed={...base(),verificationStatus:'reviewed'};
 assert.ok(validateMedia(reviewed).length>0);
});
test('reviewed media requires explicit verification and reviewer',()=>{
 const reviewed={...base(),verificationStatus:'reviewed',sourceCheck:'verified',reviewer:'fictional-reviewer',reviewedAt:'2026-11-12'};
 assert.deepEqual(validateMedia(reviewed),[]);
});
test('unsafe URLs and credentials are refused',()=>{
 for(const canonicalUrl of ['http://example.org/video','https://user:password@example.org/video','javascript:alert(1)']){
  assert.ok(validateMedia({...base(),canonicalUrl}).length>0);
 }
});
test('podcast series URL cannot masquerade as verified episode',()=>{
 const record={...base(),mediaType:'podcast',linkTarget:'series',verificationStatus:'reviewed',sourceCheck:'verified',reviewer:'fictional-reviewer',reviewedAt:'2026-11-12'};
 assert.ok(validateMedia(record).length>0);
});
