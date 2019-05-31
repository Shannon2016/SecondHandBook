const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // books: [{
        //         picSrc: "/image/book1.png",
        //         name: "共产党宣言",
        //         author: "马克思 恩格斯",
        //         press: "xxx",
        //         price: "15.00"
        //     }
        // ]
    },
    getRewardList:function(){
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'rewards/getMy',
            method:'GET',
            header:{
                Cookie:app.globalData.cookie
            },
            success(res){
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }
                
                for(var i of res.data.data){
                    i.picSrc = i.imagePath
                    i.name = i.bookName
                }
                that.setData({
                    books:res.data.data
                })
            },
            fail(res){
                console.log(res)
                wx.showToast({
                    title: '网络连接错误',
                    icon: 'none'
                })
            }
        })
    },

    onCancelReward:function(e){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定取消悬赏？',
            success(res){
                if(res.confirm){
                    console.log(e)
                    var rewardId = that.data.books[parseInt(e.currentTarget.id)].id
                    console.log(rewardId)
                    wx.request({
                        url: app.globalData.URLPREFIX + 'rewards/cancel',
                        header:{
                            Cookie:app.globalData.cookie
                        },
                        method:'DELETE',
                        data:{
                            rewardId:rewardId
                        },
                        success(res){
                            console.log(res);
                            if(res.data.code !== 0){
                                wx.showToast({
                                    title: '网络连接错误',
                                    icon: 'none'
                                })
                                return;
                            }
                            that.getRewardList()
                        }
                    })

                }else if(res.cancel){
                    return;
                }
            }
        })
    },

    onShow:function(){
        this.getRewardList()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },

    catchAddRewardTap: function() {
        wx.navigateTo({
            url: '/pages/add-reward/add-reward',
        })
    }
})