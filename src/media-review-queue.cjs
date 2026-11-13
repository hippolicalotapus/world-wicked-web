'use strict';
const {validateMediaCatalog}=require('./media-validation.cjs');

/** Create an editorial review queue without granting approval or publishing. */
function mediaReviewQueue(records){
 const errors=validateMediaCatalog(records);
 if(errors.length) return {ok:false,errors,queue:[],published:false};
 const queue=records.filter(item=>item.verificationStatus==='proposed'||item.verificationStatus==='reviewing').map(item=>({
  id:item.id,title:item.title,status:item.verificationStatus,
  needsSourceVerification:item.sourceCheck!=='verified',
  needsRightsReview:!item.rightsNotes||!item.rightsNotes.trim(),
  approved:false
 }));
 return {ok:true,errors:[],queue,published:false};
}
module.exports={mediaReviewQueue};
