/**
 * url:url
 * method:网络请求方式
 * param：参数
 * config：配置信息
 * */
function request(url, method = "GET", param = {}, config = {}) {
  const {
    showLoading = true,
    codeError = true,
    autoHandleError = true,
  } = config;
  if (showLoading) {
    wx.showLoading({
      title: "",
    });
  }
  let header = { "content-type": "application/json" };
  let token = wx.getStorageSync("acc");
  console.log(".....token",token)
  if (token) {
    header = {
      "content-type": "application/json",
      Authorization: "Bearer "+token,
    };
  }

  let promist = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: header,
      data: param,
      method: method,
      success(res) {
        if (showLoading) {
          wx.hideLoading();
        }

        //判断服务器返回是否异常

        let statusCode = res.statusCode;
        if (statusCode != 200) {
          wx.showToast({
            title: "服务器异常",
            icon: "none",
            duration: 2000,
          });
          console.log("服务器异常", res.statusCode);
        }

        let code = res.data.status;
        if (code == "401" && codeError == true) {
          wx.removeStorageSync("acc")
          wx.redirectTo({
            url: "/pages/login/index",
          });
        }
        resolve(res.data);
      },
      fail(err) {
        wx.hideLoading();
        console.log("网络请求失败", err);
        wx.showToast({
          title: "网络请求失败",
          icon: "none",
        });
        reject(err);
      },
    });
  });

  return promist;
}

module.exports = {
  request: request,
};
