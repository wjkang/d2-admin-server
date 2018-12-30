import model from '../models/baseModel'
import _ from 'lodash'
const context = 'interface'
module.exports = {
    getInterface: async (id) => {
        let db = await model.init(context)
        let entity = db.find({ id: id }).value()
        return entity
    },
    getInterfacePagedList: async (pageIndex, pageSize, sortBy, descending, filter) => {
        let db = await model.init(context)
        let interfaceList = db.value()
        let resultList = interfaceList

        if (filter.id) {
            resultList = _.filter(resultList, (o) => {
                return o.id.indexOf(filter.id) > -1
            });
        }

        if (filter.name) {
            resultList = _.filter(resultList, (o) => {
                return o.name.indexOf(filter.name) > -1
            });
        }

        if (filter.path) {
            resultList = _.filter(resultList, (o) => {
                return o.path.indexOf(filter.path) > -1
            });
        }

        if (filter.method) {
            resultList = _.filter(resultList, (o) => {
                return o.method.indexOf(filter.method) > -1
            });
        }

        if (filter.isLocked) {
            resultList = _.filter(resultList, (o) => {
                return o.isLocked.indexOf(filter.isLocked) > -1
            });
        }

        if (filter.description) {
            resultList = _.filter(resultList, (o) => {
                return o.description.indexOf(filter.description) > -1
            });
        }

        let totalCount = resultList.length
        if (sortBy) {
            resultList = _.sortBy(resultList, [sortBy])
            if (descending === 'true') {
                resultList = resultList.reverse()
            }
        }
        if (!pageIndex || pageIndex <= 0) {
            pageIndex = 1
        }
        if (pageSize) {
            let start = (pageIndex - 1) * pageSize
            let end = pageIndex * pageSize
            resultList = _.slice(resultList, start, end)
        }

        return {
            totalCount: totalCount,
            rows: resultList
        }

    },
    delInterface: async (id) => {
        let db = await model.init(context)
        await db.remove({ id: id }).write()
    },
    saveInterface: async (entity) => {
        let db = await model.init(context)
        let exist = db.find({ path: entity.path, method: entity.method }).value()
        if (exist && exist.id != entity.id) {
            return {
                success: false,
                msg: "路径与方法组合必须唯一"
            }
        }
        if (entity.id) {
            await db.find({ id: entity.id })
                .assign(entity)
                .write()
        } else {
            await db.insert(entity).write()
        }
        return {
            success: true,
            msg: ""
        }
    }
}