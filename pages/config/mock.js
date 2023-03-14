const confi = require("./index.js");
const BASE = confi.wxSubDomain;
const myRequest = require("./myRequest.js");

export function getTestRecord(data) {
  let url = `${BASE}/queryExamRecord`;
  let response = myRequest.request(url, "POST", data);
  return response;
}

export function getOneMockTest(data) {
  const { grade = "0",type=0 } = data;
  let url ,api;
  if (type=="0") {//密卷
    url="querySimulationQuestions"
  }else if (type==="1") {//真题
    url="getTrueTopicsRandomly"
  }else{//模拟
    url="getDenseVolumeRandomly"
  }
  api=`${BASE}/${url}`;
  let response = myRequest.request(api, "POST", data);
  return response;
}
//提交试卷
export function submitTextInfo(data) {
  let url = `${BASE}/addExamRecord`;
  let response = myRequest.request(url, "POST", data);
  return response;
}
