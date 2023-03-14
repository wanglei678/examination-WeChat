import { userLogin, getUserInfo, checkUser } from "../config/login";
// 获取应用实例
const app = getApp();

Page({
  data: {
    acct: "",
    pwd: "",
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },
  bindMobile(e) {
    let phone = e.detail.value;
    console.log("bindMobile", phone);
    this.setData({
      acct: phone,
    });
  },
  bindCode(e) {
    let code = e.detail.value;
    this.setData({
      pwd: code,
    });
  },
  getPhoneNumber(e) {
    console.log(e.detail.code);
    const code = e.detail.code;
    if (code) {
      userLogin({ code }).then((resp) => {
        const {status,userInfo,token}=resp
        if (status==200) {
          wx.setStorageSync("acc", token);
          wx.setStorageSync("user", userInfo);
          wx.switchTab({
            url: "/pages/index/index",
          });
        }
      });
    }
  },
  goToNext: function (e) {
    var that = this;

    const { acct, pwd } = this.data;
    const req = {
      phone: acct,
      password: pwd,
    };
    userLogin(req).then((resp) => {
      console.log("dddddd", resp);
      const { status, token } = resp;
      if (status == 200) {
        wx.setStorageSync("acc", token);
        const req = { pageIndex: 0, pageSize: 20, phone: acct };
        getUserInfo(req).then((data1) => {
          console.log("goToNext", data1);
          const { data = [], status } = data1;
          if (status == 200) {
            const arr = data[0];
            if (arr && arr.length > 0) {
              wx.setStorageSync("user", arr[0]);
              wx.switchTab({
                url: "/pages/index/index",
              });
            }
          }
        });
      }
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
