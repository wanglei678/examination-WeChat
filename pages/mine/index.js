// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    userName: "World",
    courseType: app.globalData.type,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
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

  goToMyFavorite() {
    wx.navigateTo({
      url: "/pages/favorite/index"
    });
  },
  goToMyErrors() {
    wx.navigateTo({
      url: "/pages/errors/index"
    });
  },
  goToUpdatePwd(){
    wx.navigateTo({
      url: "/pages/pwd/index"
    });
  }
});
