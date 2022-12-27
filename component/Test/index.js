var app = getApp();
Component({
  options: {},
  //组件的属性列表
  properties: {
    problemList: {
      type: Array,
      value: [],
    },
  },
  // 组件的初始数据
  data: {
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
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },
  ready: function () {
    const { currentIndex } = this.data;
    console.log("....ready", this.properties.problemList);
    this.setData({ current: this.properties.problemList[currentIndex] });
  },
  //组件的方法列表
  methods: {
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
  },
});
