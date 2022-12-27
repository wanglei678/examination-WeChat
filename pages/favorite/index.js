// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    userName: "World",
    courseType: "中级职称",
    userInfo: {},
    totalNum: 50,
    todayNum: 0,
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
  goToAllFavorite() {
    console.log("ddddd");
    const { totalNum = 0 } = this.data;
    if (totalNum > 0) {
    } else {
      wx.showToast({ title: "您还没有收藏" });
    }
  },
  goToTodayFavorite() {
    const { todayNum = 0 } = this.data;
    if (todayNum) {
      console.log("ddddd");
    } else {
      wx.showToast({ title: "今天还没有收藏" });
    }
  },
});
