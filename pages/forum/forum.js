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

    onLoad: function () {
        this.getAllPosts()
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()

        this.getAllPosts()

        this.setData({
            inputText: ''
        })
    },

    getAllPosts: function () {
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'posts/getAll',
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

                console.log(res)
                var forum = []
                for (var i of res.data.data) {
                    i.username = i.authorName
                    i.date = i.timeStamp
                    
                    forum.push(i);
                    // forum[i].id = res.data.data[i].id
                    // forum[i].title = res.data.data[i].title
                    // forum[i].username = res.data.data[i].authorName
                    // forum[i].date = res.data.data[i].timeStamp
                    // forum[i].content = res.data.data[i].content
                    // forum[i].level = res.data.data[i].level
                }
                console.log(forum)
                that.setData({
                    forum: forum
                })
            }
        })
    },

    searchInput: function (event) {
        this.setData({
            searchValue: event.detail.value
        })
    },

    searchComment: function () {
        var str = this.data.searchValue
        var value = app.inputStrHandle(str)
        console.log(value)
    },

    showForumDetail: function (event) {
        var forumIndex = event.currentTarget.dataset.forumIndex
        var forumDetail = JSON.stringify(this.data.forum[forumIndex])
        wx.navigateTo({
            url: '/pages/forum/subforum/subforum?forumDetail=' + escape(forumDetail),
        })
    },

    addNewTopic: function (event) {
        wx.navigateTo({
            url: '/pages/forum/newtopic/newtopic',
        })
    }

})