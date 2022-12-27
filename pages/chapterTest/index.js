// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    problemList: [],
    typeMap: app.globalData.questionType,
    currentIndex: 0, //从后台获取
    current: {},
    orderMap: {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
      4: "E",
      5: "F",
    },
    showFooter: false,
    showCollectionIcon: false,
    collections: [], //收藏列表
    errorList: [], //错题
    completeList: [], //做过的题目
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad(option) {
    console.log(option);
    //查询该章节的状态 将是否做过 如果做过了 选择的答案 choosedOption 填充到problemList里
    const arr = [];
    for (let index = 0; index < 10; index++) {
      const obj = {
        id: index + 1,
        title: `这道题目答案是A吗?${index}<br> <img src="/images/saved.png"></img> `,
        type: "judge",
        option: ["正确", "错误"],
        answer: "正确",
        analysis: "巴拉巴拉小魔仙巴拉巴拉小巴拉巴拉小魔仙魔仙",
      };
      if (index == 1) {
        obj.type = "select";
        obj.option = ["1111", "2222", "3333", "44444"];
        obj.answer = "1111";
      }
      if (index == 2) {
        obj.type = "multiple";
        obj.option = ["1111", "2222", "3333", "44444"];
        obj.answer = "1111";
        obj.choosedOption = [];
      }
      arr.push(obj);
    }
    this.setData({ problemList: arr, current: arr[this.data.currentIndex] });
  },
  /**
   * 已选出答案
   * 1.将题目加入到已做完列表
   * 2.如果做错 加入到错题列表
   */
  handleChoose(e) {
    const {
      current = {},
      completeList = [],
      errorList = [],
      problemList = [],
      currentIndex,
    } = this.data;
    const { value } = e.currentTarget.dataset;
    current.choosedOption = value;
    const obj = { ...current };
    console.log(value);
    completeList.push(current.id);
    if (current.answer !== value) {
      errorList.push(current.id);
      obj.status = "error";
    } else {
      obj.status = "right";
    }
    problemList[currentIndex] = obj;
    console.log("......e", errorList.indexOf(current.id));
    console.log("......problemList", problemList);
    this.setData({
      completeList,
      errorList,
      problemList,
      current,
    });
  },
  //多选
  handleMultipleChoose(e) {
    const {
      current = {},
      completeList = [],
      errorList = [],
      problemList = [],
      currentIndex,
    } = this.data;
    const { value } = e.currentTarget.dataset;
    if (current.choosedOption.includes(value)) {
      current.choosedOption = current.choosedOption.filter(
        (item) => item != value
      );
      current["active" + value] = 100;
    } else {
      current.choosedOption.push(value);
      current["active" + value] = value;
    }
    current.active = current.choosedOption.join("");

    const obj = { ...current };
    console.log(value);
    completeList.push(current.id);
    // if (current.answer !== value) {
    //   errorList.push(current.id);
    //   obj.status = "error";
    // } else {
    //   obj.status = "right";
    // }
    problemList[currentIndex] = obj;
    console.log("......e", errorList.indexOf(current.id));
    console.log("......problemList", current);
    this.setData({
      current,
    });
  },
  /**
   * 收藏当前这一题
   */
  collectThisProblem() {
    const { collections = [], current = {}, showCollectionIcon } = this.data;

    collections.push(current.id);
    console.log(collections, collections.includes(current.id));
    this.setData({
      collections: collections,
      showCollectionIcon: !showCollectionIcon,
    });
  },
  /**
   * 点击底部数字
   */
  handleClickFooter() {
    const { showFooter } = this.data;
    this.setData({
      showFooter: !showFooter,
    });
  },
  //选择某一题
  handleChoosePeoblem(e) {
    let { problemList = [], completeList = [] } = this.data;
    const { value } = e.currentTarget.dataset;
    console.log(".....", e, value);
    this.setData({
      current: problemList[value],
      showFooter: false,
      currentIndex: value,
    });
  },
  goToNext() {
    const { problemList = [], currentIndex } = this.data;
    if (currentIndex === problemList.length - 1) {
      wx.navigateTo({
        url: "/pages/chapter/index",
      });
    } else {
      const index = currentIndex + 1;
      this.setData({
        current: problemList[index],
        currentIndex: index,
        showFooter: false,
      });
    }
  },
  submitMultipleChoose() {
    const { current = {}, currentIndex } = this.data;
    console.log("......", current);
    if (!current.choosedOption || current.choosedOption.length == 0) {
      wx.showToast({
        title: "请先选择答案",
        icon: "error",
        duration: 500,
      });
    }
  },
});
