const confi = require('./index.js')
const BASE = confi.wxSubDomain
const myRequest = require("./myRequest.js");
export function imgDomain() {
  let url = "http://43.136.29.210/media/img/"
  return url;
}
export function getChapterList(data) {
  let url = `${BASE}/chaptersList`;
  let response = myRequest.request(url, "POST", data);
  return response;
}

export function getDenseList(data) {
  let url = `${BASE}/denseVolumeList`;
  let response = myRequest.request(url, "POST", data);
  return response;
}
export function getChapterTest(data) {
  let url = `${BASE}/queryChapterQuestions`;
  let response = myRequest.request(url, "POST", data);
  return response;
}
export function getBaseTest(data) {
  let url = `${BASE}/queryBaseQuestions`;
  let response = myRequest.request(url, "POST", data);
  return response;
}
//获取密卷列表
export function simulationList(data) {
  let url = `${BASE}/simulationList`;
  let response = myRequest.request(url, "POST", data);
  return response;
}
