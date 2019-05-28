const app = getApp()

// pages/forum/newtopic/newtopic.js
Page({
    /* 页面的初始数据 */
    data: {
        inputText1: '',
        inputText2: ''
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()

        this.setData({
            inputText1: '',
            inputText2: ''
        })
    },

    bindTitleInput: function(event) {
        this.setData({
            titleValue: event.detail.value
        })
    },

    bindContentInput: function(event) {
        this.setData({
            contentValue: event.detail.value
        })
    },

    catchPublishTap: function() {
        var that = this
        wx.request({
            url: app.globalData.URLPREFIX + 'posts/add',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'POST',
            data: {
                title: that.data.titleValue,
                content: that.data.contentValue
            },
            success(res) {
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }
                
                wx.showToast({
                    title: '发表成功',
                })

                setTimeout(() => {
                    wx.navigateBack()
                }, 2000)
            },
            fail(res) {
                wx.showToast({
                    title: '发表失败',
                    icon: 'none'
                })
            }
        })
    }
})