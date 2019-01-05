
var shortid = require('shortid')
var Mock = require('mockjs')
var Random = Mock.Random

//必须包含字段id
export default {
    name: "interface",
    Name: "Interface",
    properties: [
        {
            key: "id",
            title: "id"
        },
        {
            key: "name",
            title: "名称"
        },
        {
            key: "path",
            title: "接口地址"
        },
        {
            key: "method",
            title: "接口方法"
        },
        {
            key: "isLocked",
            title: "是否锁定"
        },
        {
            key: "description",
            title: "接口描述"
        }
    ],
    buildMockData: function () {//不需要生成设为false
        let data = []
        // for (let i = 0; i < 100; i++) {
        //     data.push({
        //         id: shortid.generate(),
        //         name: Random.cword(5, 7),
        //         author: Random.cname(),
        //         press: Random.cword(5, 7)
        //     })
        // }
        return data
    }
}
