//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function () {
        wx.setStorageSync('userInfo', this.data.userInfo)

        wx.switchTab({
            url: '/pages/mall/mall',
        })
    },
    onLoad: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // 登录
        var loginCode = null;
        new Promise((resolve, reject) => {
            wx.login({
                success: resolve,
                fail: reject
            })
        }).then(res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res)
            loginCode = res.code;
            return new Promise((resolve, reject) => {
                wx.getSetting({
                    success: resolve,
                    fail: reject
                })
            })
        }).then(res => {
            if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                return new Promise((resolve, reject) => {
                    wx.getUserInfo({
                        success: resolve,
                        fail: reject
                    })
                })
            }
            reject('系统崩溃');
        }).then(res => {
            console.log(res.userInfo)
            // 可以将 res 发送给后台解码出 unionId
            app.globalData.userInfo = res.userInfo

            if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
            }

            return new Promise((resolve, reject) => {
                wx.request({
                    url: app.globalData.URLPREFIX + 'users/login',
                    method: 'PUT',
                    data: {
                        code: loginCode,
                        nickName: app.globalData.userInfo.nickName,
                        imageURL: app.globalData.userInfo.avatarUrl
                    },
                    success: resolve,
                    fail: reject
                })
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况

            })
        }).then(r => {
            app.globalData.cookie = r.header["Set-Cookie"];
            console.log(app.globalData)

            return new Promise((success, fail) => {
                console.log('x')
                wx.switchTab({
                    url: '/pages/mall/mall',
                    fail,
                    success
                })
            })
        }).then(res => {
            console.log(1)
        }).catch(console.log);


        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})