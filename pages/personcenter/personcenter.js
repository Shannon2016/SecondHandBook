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
        var userInfo = wx.getStorageSync('userInfo')
        this.setData({
            userInfo: userInfo
        })
    },

    catchToMyOrderTap: function() {
        wx.navigateTo({
            url: '/pages/personcenter/myorder/myorder',
        })
    },

    catchToMyRewardTap: function () {
        wx.navigateTo({
            url: '/pages/personcenter/my-reward/my-reward',
        })
    },

    catchToMySellTap: function () {
        wx.navigateTo({
            url: '/pages/personcenter/my-sell/my-sell',
        })
    },
})