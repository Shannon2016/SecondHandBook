//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        
        
        
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var loginCode = res.code;
                wx.getSetting({
                    success: res => {   
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            wx.getUserInfo({
                            success: res => {
                                // 可以将 res 发送给后台解码出 unionId
                                this.globalData.userInfo = res.userInfo

                                wx.request({
                                    url: this.globalData.URLPREFIX + 'users/login',
                                    method:'PUT',
                                    data: {
                                        code: loginCode,
                                        nickName: this.globalData.userInfo.nickName,
                                        imageURL: this.globalData.userInfo.avatarUrl
                                    },
                                    success: r=> {
                                        console.log(r);
                                        this.globalData.cookie = r.header["Set-Cookie"];
                                        console.log(this.globalData)
                                      
                                        wx.switchTab({
                                            url: '/pages/mall/mall',
                                            fail:console.log,
                                            success:console.log
                                        })
                                      
                                    }
                                })
                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                                if (this.userInfoReadyCallback) {
                                    this.userInfoReadyCallback(res)
                                }
                            }
                        })
                        }
                    }
                })
            console.log(1);

            }
        })
        // 获取用户信息
        
    },
    globalData: {
        userInfo: null,
        URLPREFIX: 'http://192.168.43.124:5000/api/',
        cookie:'abc'
    },

    /**
     * 将输入的字符串分解成一个列表
     */
    inputStrHandle: function(str) {
        var value = []

        // 正则表达式检测是否是全部空格或者空
        if (str == null || str.match(/^[ ]*$/))
            return value

        // 删除多余空格
        str = str.split(' ')
        
        for (var i = 0; i < str.length; i++)
            if (str[i] != '')
                value.push(str[i])

        return value
    }
})