
var shortid = require('shortid')
var Mock = require('mockjs')
var Random = Mock.Random

//必须包含字段id
export default {
    name: "route",
    Name: "Route",
    properties: [
        {
            key: "id",
            title: "id"
        },
        {
            key: "parentId",
            title: "parentId"
        },
        {
            key: "name",
            title: "name"
        },
        {
            key: "path",
            title: "path"
        },
        {
            key: "title",
            title: "标题"
        },
        {
            key: "component",
            title: "组件"
        },
        {
            key: "componentPath",
            title: "组件路径"
        },
        {
            key: "cache",
            title: "keepAlive"
        },
        {
            key: "isLock",
            title: "isLock"
        },
        {
            key: "sort",
            title: "sort"
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
