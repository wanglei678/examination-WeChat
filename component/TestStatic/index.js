var app = getApp();
Component({
  options: {},
  //组件的属性列表
  properties: {
    staticData: {
      type: Object,
      value: {
        total: 0,
        pass: 0,
        average: 0,
      },
    },
  },
  // 组件的初始数据
  data: {},
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },
  ready: function () {
    console.log("....ready", this.properties);
  },
  //组件的方法列表
  methods: {},
});
