// index.js
// 获取应用实例
const app = getApp();
import { commonVedio, primaryVedio, juniorVedio, highVedio } from "./config";
Page({
  data: {
    commonCourse: {},
    title: "",
    showFullscreenBtn: [false, false],
    hidePoster: [false, false],
    playIndex: 10000,
    rate: "1.0",
    showRate: true,
    showRateBox: false,
    poster: "common.jpg",
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad(option) {
    if (!option) {
      wx.navigateTo({
        url: "/pages/masterSub/index",
      });
    } else {
      this.getData(option);
    }
  },
  getData(option) {
    console.log("option", option);
    let { poster } = this.data;
    const index = option.id;
    const master = wx.getStorageSync("master");
    if (master.id == 0) {
      poster = "base_poster.png";
    }
    let obj = { poster };
    switch (master.id) {
      case "0":
        obj.commonCourse = commonVedio[index];
        obj.title = "消防设施操作员基础知识";
        break;
      case "1":
        obj.commonCourse = primaryVedio[index];
        obj.title = "初级消防设施操作员实操课";
        wx.setNavigationBarTitle({
          title: "初级实操指南",
        });

        break;
      case "2":
        obj.commonCourse = juniorVedio[index];
        obj.title = "中级监控消防设施操作员实操课";
        wx.setNavigationBarTitle({
          title: "中级监控实操指南",
        });
        break;
      case "3":
        obj.commonCourse = highVedio[index];
        obj.title = "中级维保消防设施操作员实操课";
        wx.setNavigationBarTitle({
          title: "中级维保实操指南",
        });
        break;
      default:
        break;
    }
    this.setData(obj);
  },
  handleToggle(e) {
    this.setData({ showRate: e.detail.show });
  },
  rateChange() {
    this.setData({ showRateBox: !this.data.showRateBox });
  },
  chooseRate(e) {
    console.log("chooseRate", e);
    let { playIndex = null } = this.data;
    const { index } = e.target.dataset;
    var videoContextPrev = wx.createVideoContext("common" + playIndex);
    videoContextPrev.playbackRate(parseFloat(index));
    this.setData({ rate: index, showRateBox: false });
  },
  playVedio(e) {
    let {
      showFullscreenBtn = [],
      hidePoster = [],
      playIndex = null,
    } = this.data;
    const { index = 0 } = e.currentTarget.dataset;
    var videoContextPrev = wx.createVideoContext("common" + playIndex);
    videoContextPrev.stop();
    showFullscreenBtn[index] = true;
    showFullscreenBtn.map((item, i) => {
      if (i != index) {
        item = false;
      }
    });
    hidePoster[index] = true;
    playIndex = index;
    setTimeout(function () {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext("common" + playIndex);
      videoContext.play();
    }, 500);
    hidePoster.map((item, i) => {
      if (i != index) {
        item = false;
      }
    });

    console.log("playVedio kaishi", hidePoster);
    this.setData({
      hidePoster,
      showFullscreenBtn,
      playIndex,
    });
  },
  playOtherVedio() {
    const { showFullscreenBtn = [], hidePoster = [] } = this.data;
    showFullscreenBtn[1] = true;
    hidePoster[1] = true;
    this.setData({
      hidePoster,
      showFullscreenBtn,
    });
  },
});
