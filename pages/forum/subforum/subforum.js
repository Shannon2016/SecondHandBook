// pages/forum/subforum/subforum.js
Page({

    /* * 页面的初始数据 */
    data: {
        // subforum: [{
        //         username: '我是昵称',
        //         content: '我是内容我是内容我是内容我是内容',
        //         date: 'YYYY-MM-DD-HH:MM:SS',
        //         ifMyself: true
        //     },
        //     {
        //         username: '我是昵称',
        //         content: '我是内容我是内容我是内容我是内容',
        //         date: 'YYYY-MM-DD-HH:MM:SS',
        //         ifMyself: false
        //     }
        // ]
        inputText: ''
    },

    /* 生命周期函数--监听页面加载 */
    onLoad: function(options) {
        var forumDetail = JSON.parse(unescape(options.forumDetail))
        this.setData({
            forumDetail: forumDetail
        })

        this.getAllComments()
    },

    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()

        this.getAllComments()

        this.setData({
            inputText: ''
        })
    },

    /**
     * 获取贴子的所有评论
     */
    getAllComments: function() {
        // 0. 初始化
        var postId = this.data.forumDetail.id;
        var subforum = []

        // 1. 先进行楼主信息赋值
        subforum[0].username = this.data.forumDetail.username
        subforum[0].content = this.data.forumDetail.content
        subforum[0].date = this.data.forumDetail.date
        subforum[0].level = this.data.forumDetail.level
        subforum[0].ifMyself = true

        // 2. 对子评论赋值
        wx.request({
            url: app.globalData.URLPREFIX + 'comments/getByPost?postId=' + postId,
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            success(res) {
                for (var i = 0; i < res.data.data.length; i++) {
                    subforum[i + 1].username = res.data.data[i].username
                    subforum[i + 1].date = res.data.data[i].date
                    subforum[i + 1].content = res.data.data[i].content
                    subforum[i + 1].level = res.data.data[i].level
                    subforum[i + 1].ifMyself = false;
                }
            }
        })

        // 3. 重新赋值进行数据更新
        this.setData({
            subforum: subforum
        })
    },

    /**
     * 获取评论输入
     */
    bindCommentInput: function(event) {
        this.setData({
            commentValue: event.detail.value
        })
    },

    /**
     * 发送评论
     */
    sendComment: function() {
        var that = this
        wx.request({
            url: app.globalData.URLPREFIX + 'comments/add',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'POST',
            data: {
                postId: that.data.forumDetail.id,
                content: that.data.commentValue
            },
            success(res) {
                wx.showToast({
                    title: '发送成功',
                })
            },
            fail(res) {
                wx.showToast({
                    title: '发送失败',
                    icon: 'none'
                })
            }
        })
    }
})