const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onLoad: function() {
        this.getMySellBookList()
    },

    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()

        this.getMySellBookList()
    },

    getMySellBookList: function() {
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'sells/getMy',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            success(res) {
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }

                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].picSrc = res.data.data[i].imagePath
                    console.log(res.data.data[i].picSrc)
                    res.data.data[i].name = res.data.data[i].bookName
                    res.data.data[i].level = res.data.data[i].depreciation
                    res.data.data[i].id = res.data.data[i].Id
                    // 缺少待售已售
                }
                that.setData({
                    books: res.data.data
                })
            }
        })
    },

    catchAddNewSellTap: function() {
        wx.navigateTo({
            url: '/pages/add-new-sell/add-new-sell',
        })
    }
})