// index.js
// 获取应用实例
import { getChapterList } from "../config/chapter";
const app = getApp();

Page({
  data: {
    chapterList: [],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad(option) {
    console.log(option); //id为0:基础知识  1:根据grade查章节
    this.getDataList(option);
  },
  getDataList(option) {
    const req = {
      grade: option.id,
    };
    getChapterList(req).then((resp) => {
      console.log("...", resp);
      const { data = [], status } = resp;
      if (status == 200) {
        this.setData({ chapterList: data });
      }
    });
  },
  handleChapterClick(e) {
    const { chapterList = [] } = this.data;
    const { item = {} } = e.currentTarget.dataset;
    console.log("......e", e);
    console.log(item);
    wx.navigateTo({
      url: "/pages/chapterTest/index?id=" + item.id,
    });

    // this.setData({
    //   hidePoster,
    //   showFullscreenBtn,
    // });
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
