const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userInfo = app.globalData.userInfo
        this.setData({
            userInfo: userInfo
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },

    catchToMyOrderTap: function() {
        wx.navigateTo({
            url: '/pages/person-center/my-order/my-order',
        })
    },

    catchToMyRewardTap: function() {
        wx.navigateTo({
            url: '/pages/person-center/my-reward/my-reward',
        })
    },

    catchToMySellTap: function() {
        wx.navigateTo({
            url: '/pages/person-center/my-sell/my-sell',
        })
    },
})