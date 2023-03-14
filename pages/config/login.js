const confi = require('./index.js')
const BASE = confi.wxSubDomain
const myRequest = require("./myRequest.js");

export function userLogin(data) {
  let url = `${BASE}/user/login`;
  let response = myRequest.request(url, "POST", data);
  return response;
}

export function getUserInfo(data) {
  let url = `${BASE}/user/list`;
  let response = myRequest.request(url, "POST", data);
  return response;
}
export function checkUser(data) {
  let url = `${BASE}/checkUser`;
  let response = myRequest.request(url, "POST", data);
  return response;
}
