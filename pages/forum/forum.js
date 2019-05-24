const app = getApp()

Page({
    /*页面的初始数据*/
    data: {
        forum: [{
                title: "我是标题我是标题",
                content: "我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容",
                date: "YYYY-MM-DD-HH:MM:SS",
                username: "我是昵称",
                level: 1
            }
        ]
    },

    onLoad: function() {
        this.getAllPosts()
    },

    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()

        this.getAllPosts()
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
                var forum = []
                for (var i = 0; i < res.data.data.length; i++) {
                    forum[i].id = res.data.data[i].id
                    forum[i].title = res.data.data[i].title
                    forum[i].username = res.data.data[i].username
                    forum[i].date = res.data.data[i].date
                    forum[i].content = res.data.data[i].content
                    forum[i].level = res.data.data[i].level
                }

                that.setData({
                    forum: forum
                })
            }
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
                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].picSrc = res.data.data[i].imagePath;
                    console.log(res.data.data[i].picSrc);
                    res.data.data[i].name = res.data.data[i].bookName;
                    res.data.data[i].level = res.data.data[i].depreciation;
                    res.data.data[i].id = i + 1;

                }
                that.setData({
                    books: res.data.data
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
        var value = app.inputStrHandle(str)
        console.log(value)
    },

    showForumDetail: function(event) {
        var forumIndex = event.currentTarget.dataset.forumIndex
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