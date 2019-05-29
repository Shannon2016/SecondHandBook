// pages/forum/subforum/subforum.js
const app = getApp();
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
        console.log(this.data.forumDetail)
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
        var subforum = [{}]
        var that = this

        // 1. 先进行楼主信息赋值
        subforum[0].title = this.data.forumDetail.title
        subforum[0].username = this.data.forumDetail.username
        subforum[0].content = this.data.forumDetail.content
        subforum[0].date = this.data.forumDetail.date
        subforum[0].level = this.data.forumDetail.level
        subforum[0].imageURL = this.data.forumDetail.imageURL
        subforum[0].ifMyself = true
        console.log(subforum[0])
        // 2. 对子评论赋值
        wx.request({
            url: app.globalData.URLPREFIX + 'comments/getByPost?postId=' + postId.toString(),
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            success(res) {
                console.log(res.data)
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }

                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].username = res.data.data[i].authorName
                    res.data.data[i].date = res.data.data[i].timeStamp
                    // 字符串去除T
                    res.data.data[i].date = res.data.data[i].date.substring(0, 10) + ' ' + res.data.data[i].date.substr(11, 8)
                    res.data.data[i].content = res.data.data[i].content
                    res.data.data[i].level = res.data.data[i].level
                    if (res.data.data[i].username == subforum[0].username)
                        res.data.data[i].ifMyself = true
                    else
                        res.data.data[i].ifMyself = false;
                    subforum.push(res.data.data[i])
                }

                that.setData({
                    subforum: subforum
                })
                console.log(that.data.subforum)
            }
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
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }

                wx.showToast({
                    title: '发送成功',
                })
                that.getAllComments()
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