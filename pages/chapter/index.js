// index.js
// 获取应用实例
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
    console.log(option)
    const arr = [];
    for (let index = 0; index < 10; index++) {
      const obj = {
        id: index + 1,
        name: "chapter" + index,
        sum: index + 1,
      };
      arr.push(obj);
    }
    this.setData({ chapterList: arr });
  },
  handleChapterClick(e) {
    const { chapterList = [] } = this.data;
    const { item = {} } = e.currentTarget.dataset;
    console.log("......e", e);
    console.log(item);
    wx.navigateTo({
      url: "/pages/chapterTest/index?id="+item.id
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
