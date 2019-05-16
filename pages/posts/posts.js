var postsData = require('../../data/posts-data.js');

Page({
    data: {

    },

    onLoad: function(options) {
        this.setData({
            posts_key: postsData.postList
        });
    },

    onPostsTap: function(event) {
        var postId = event.currentTarget.dataset.postId;

        wx.navigateTo({
            url: 'posts-detail/posts-detail?id=' + postId,
        })
    }
})