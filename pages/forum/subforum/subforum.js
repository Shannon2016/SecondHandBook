// pages/forum/subforum/subforum.js
Page({

    /* * 页面的初始数据 */
    data: {
        id: [1, 2, 3, 4],
        title: ['图书交流1'],
        subforum: [{
                username: '我是昵称',
                content: '我是内容我是内容我是内容我是内容',
                date: 'YYYY-MM-DD-HH:MM:SS',
                ifMyself: true
            },
            {
                username: '我是昵称',
                content: '我是内容我是内容我是内容我是内容',
                date: 'YYYY-MM-DD-HH:MM:SS',
                ifMyself: false
            },
            {
                username: '我是昵称',
                content: '我是内容我是内容我是内容我是内容',
                date: 'YYYY-MM-DD-HH:MM:SS',
                ifMyself: false
            },
            {
                username: '我是昵称',
                content: '我是内容我是内容我是内容我是内容',
                date: 'YYYY-MM-DD-HH:MM:SS',
                ifMyself: false
            },
            {
                username: '我是昵称',
                content: '我是内容我是内容我是内容我是内容',
                date: 'YYYY-MM-DD-HH:MM:SS',
                ifMyself: false
            }
        ]
    },

    /* 生命周期函数--监听页面加载 */
    onLoad: function(options) {
        var forumDetail = JSON.parse(unescape(options.forumDetail))
        this.setData({
            forumDetail: forumDetail
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },
})