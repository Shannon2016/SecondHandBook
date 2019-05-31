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

        var input1 = that.data.inputText1
        var input2 = that.data.inputText2
        if (input1 != '' && input2 != '') { }
        else {
            wx.showToast({
                title: '主题或内容为空',
                icon: 'none',
                mask: true,
                duration: 2000
            })
            return
        }

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
                    duration: 500
                })

                setTimeout(() => {
                    wx.navigateBack()
                }, 800)
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