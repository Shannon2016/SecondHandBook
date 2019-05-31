//app.js
//emmmmmm
App({
    onLaunch: function() {


    },
    onShow() {
        console.log("on Show")
    },

    globalData: {
        userInfo: null,
        URLPREFIX: 'http://39.96.4.235:5000/api/',
        cookie: 'abc',
        PICPREFIX: 'http://39.96.4.235:5000'
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
    },

    /**
     * 经验值转化成等级
     */
    changeLevel: function(level) {
        var val = level
        if (val >= 0 && val < 6) val = 1
        else if (val < 16) val = 2
        else if (val < 31) val = 3
        else if (val < 51) val = 4
        else if (val < 101) val = 5
        else if (val < 201) val = 6
        else if (val < 501) val = 7
        else if (val < 1001) val = 8
        else if (val < 2001) val = 9
        else if (val < 3001) val = 10
        else if (val < 6001) val = 11
        else if (val < 10001) val = 12
        else if (val < 18001) val = 13
        else if (val < 30001) val = 14
        else if (val < 60001) val = 15
        else if (val < 100001) val = 16
        else if (val < 300001) val = 17
        else if (val >= 300001) val = 18
        return val
    }
})