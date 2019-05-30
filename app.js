//app.js
//emmmmmm
App({
    onLaunch: function () {
        

    },
    onShow(){
        console.log("on Show")
    },

    globalData: {
        userInfo: null,
        URLPREFIX: 'http://39.96.4.235:5000/api/',
        cookie: 'abc',
        PICPREFIX:'http://39.96.4.235:5000'
    },

    /**
     * 将输入的字符串分解成一个列表
     */
    inputStrHandle: function (str) {
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