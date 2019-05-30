const app = getApp()

Page({
    /*页面的初始数据*/
    data: {
        // forum: [{
        //         title: "我是标题我是标题",
        //         content: "我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容",
        //         date: "YYYY-MM-DD-HH:MM:SS",
        //         username: "我是昵称",
        //         level: 1
        //     }
        // ]
        inputText: ''
    },

    onLoad: function() {
        this.getAllPosts()
    },

    onShow: function() {
        this.onLoad()
    },

    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()

        this.getAllPosts()

        this.setData({
            inputText: ''
        })
    },

    getAllPosts: function() {
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'posts/getAll',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            success(res) {
                console.log(res.data.data)
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }

                var forum = [{}]
                for (var i = 0; i < res.data.data.length; i++) {
                    forum[i] = {
                        id: res.data.data[i].id,
                        title: res.data.data[i].title,
                        username: res.data.data[i].authorName,
                        date: res.data.data[i].timeStamp,
                        content: res.data.data[i].content,
                        level: res.data.data[i].level,
                        imageURL: res.data.data[i].imageURL
                    }

                    forum[i].date = forum[i].date.substring(0, 10) + ' ' + forum[i].date.substr(11, 8)
                }

                if (JSON.stringify(forum[0]) == '{}')
                    forum = null

                that.setData({
                    forum: forum
                })
            }
        })
    },

    searchInput: function(event) {
        this.setData({
            searchValue: event.detail.value
        })
    },

    searchComment: function() {
        var str = this.data.searchValue
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'posts/getByCondition?words=' + str,
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

                var forum = [{}]
                for (var i = 0; i < res.data.data.length; i++) {
                    forum[i] = {
                        id: res.data.data[i].id,
                        title: res.data.data[i].title,
                        username: res.data.data[i].authorName,
                        date: res.data.data[i].timeStamp,
                        content: res.data.data[i].content,
                        level: res.data.data[i].level,
                        imageURL: res.data.data[i].imageURL
                    }

                    forum[i].date = forum[i].date.substring(0, 10) + ' ' + forum[i].date.substr(11, 8)
                }

                if (JSON.stringify(forum[0]) == '{}')
                    forum = null

                that.setData({
                    forum: forum
                })
            }
        })
    },

    showForumDetail: function(event) {
        var forumIndex = event.currentTarget.dataset.forumIndex
        console.log(this.data.forum[forumIndex])
        var forumDetail = JSON.stringify(this.data.forum[forumIndex])
        wx.navigateTo({
            url: '/pages/forum/subforum/subforum?forumDetail=' + escape(forumDetail),
        })
    },

    addNewTopic: function(event) {
        wx.navigateTo({
            url: '/pages/forum/newtopic/newtopic',
        })
    }

})