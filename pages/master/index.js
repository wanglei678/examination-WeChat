// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    commonCourse: {
      title: "消防设施操作员基础知识",
      desc: "顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
    },
    infos: {
      title: "中级消防设施操作员",
      desc: "消防检测维修保养方向",
      courseDesc: "balabalabababaab",
    },
    showFullscreenBtn: [false, false],
    hidePoster: [false, false],
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
  playVedio(e) {
    const { showFullscreenBtn=[],hidePoster=[] } = this.data;
    showFullscreenBtn[0] = true;
    hidePoster[0] = true;
    console.log(e);
    this.setData({
      hidePoster,
      showFullscreenBtn,
    });
  },
  playOtherVedio(){
    const { showFullscreenBtn=[],hidePoster=[] } = this.data;
    showFullscreenBtn[1] = true;
    hidePoster[1] = true;
    this.setData({
      hidePoster,
      showFullscreenBtn,
    });
  }
});
