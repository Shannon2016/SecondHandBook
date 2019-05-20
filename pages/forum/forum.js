// pages/forum/forum.js
Page({
    /*页面的初始数据*/
    data: {
        forum: [{
                title: "我是标题我是标题",
                content: "我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容",
                date: "YYYY-MM-DD-HH:MM:SS",
                username: "我是昵称",
                level: 1
            },
            {
                title: "我是标题123我是标题",
                content: "我是内容123我是内容",
                date: "YYYY-MM-DD-HH:MM:SS",
                username: "我是昵称123",
                level: 2
            },
            {
                title: "我是标题我是标题",
                content: "我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容",
                date: "YYYY-MM-DD-HH:MM:SS",
                username: "我是昵称a",
                level: 3
            },
            {
                title: "我是标题123我是标题",
                content: "我是内容123我是内容",
                date: "YYYY-MM-DD-HH:MM:SS",
                username: "我是昵称b",
                level: 4
            },
        ]
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
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