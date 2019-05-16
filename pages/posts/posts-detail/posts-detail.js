var postsData = require('../../../data/posts-data.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            currentPostId: options.id
        })

        this.setData({
            postData: postsData.postList[options.id]
        })

        var postsCollected = wx.getStorageSync('posts_collected')
        if (postsCollected) {
            this.setData({
                collected: postsCollected[options.id]
            })
        } else {
            postsCollected = {}
            postsCollected[options.id] = false
            wx.setStorageSync('posts_collected', postsCollected)
        }
    },

    onCollectionTap: function(event) {
        this.getPostsCollectedSync()
        // this.getPostCollectedAsy()
    },

    getPostCollectedAsy: function() {
        var that = this
        wx.getStorage({
            key: 'posts_collected',
            success: function(res) {
                var postsCollected = res.data
                var postCollected = !postsCollected[that.data.currentPostId]
                postsCollected[that.data.currentPostId] = postCollected

                // 更新数据绑定变量，从而实现切换图片
                that.setData({
                    collected: postCollected
                })

                wx.showToast({
                    title: postCollected ? '收藏成功' : '取消成功',
                    duration: 800,
                    icon: 'success'
                })
            }
        })
    },

    getPostsCollectedSync: function() {
        var postsCollected = wx.getStorageSync('posts_collected')
        var postCollected = !postsCollected[this.data.currentPostId]
        postsCollected[this.data.currentPostId] = postCollected
        // 更新文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected)
        // 更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })

        wx.showToast({
            title: postCollected ? '收藏成功' : '取消成功',
            duration: 800,
            icon: 'success'
        })
    },

    onShareTap: function(event) {
        var itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到QQ',
            '分享到微博'
        ]
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function(res) {
                // res.cancel 用户是不是点击了取消按钮
                // res.tapIndex 数组元素的序号，从 0 开始
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '现在无法实现分享功能',
                })
            }
        })
    },

    onMusicTap: function(event) {
        var postData = postsData.postList[this.data.currentPostId].music
        if (this.data.isPlayingMusic) {
            wx.pauseBackgroundAudio()
        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.url,
                title: postData.title,
                coverImgUrl: postData.coverImg,
            })
        }

        this.setData({
            isPlayingMusic: !this.data.isPlayingMusic
        })
    }
})