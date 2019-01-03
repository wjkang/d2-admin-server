import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import PermissionCheck from '../middleware/PermissionCheck'

const router = new KoaRouter()

router
  .get('/public/get', function (ctx, next) {
    ctx.body = '允许访问！'
  }) // 以/public开头则不用经过权限认证
  .post('/auth/login', controllers.auth.login)
  .post('/auth/logout', controllers.auth.logout)

  .get('/menu', PermissionCheck(["p_menu_view"]), controllers.menu.getMenuList)
  .get('/menu/access', controllers.menu.getAccessMenuList)
  .get('/menu/menufunctions', controllers.menu.getMenuFunctions)
  .get('/menu/:id', PermissionCheck(), controllers.menu.getMenu)
  .post('/menu/save', controllers.menu.saveMenu)
  .del('/menu/:id', controllers.menu.delMenu)

  .get('/route', controllers.route.getRouteList)
  .get('/route/paged', controllers.route.getRoutePagedList)
  .get('/route/:id', controllers.route.getRoute)
  .del('/route/:id', controllers.route.delRoute)
  .del('/route/batchdel', controllers.route.delRoutes)
  .post('/route/save', controllers.route.saveRoute)

  .get('/function/pagedlist', controllers.function.getFunctionPagedList)
  .del('/function/del', controllers.function.delFuntion)
  .del('/function/batchdel', controllers.function.delFuntions)
  .post('/function/save', controllers.function.saveFuntion)

  .get('/role/pagedlist', controllers.role.getRolePagedList)
  .get('/role/:id', controllers.role.getRole)
  .get('/role/getpermissions/:roleId', controllers.role.getRolePermissions)
  .del('/role/del', controllers.role.delRole)
  .del('/role/batchdel', controllers.role.delRoles)
  .post('/role/save', controllers.role.saveRole)
  .post('/role/savepermission', controllers.role.savePermission)

  .get('/user/pagedlist', controllers.user.getUserPagedList)
  .get('/user/info', controllers.user.getUserInfo)
  .get('/user/:id', controllers.user.getUser)
  .del('/user/del', controllers.user.delUser)
  .del('/user/batchdel', controllers.user.delUsers)
  .post('/user/save', controllers.user.saveUser)
  .post('/user/editroleuser', controllers.user.editRoleUser)

  .get('/interface/paged', controllers.interface.getInterfacePagedList)
  .get('/interface/:id', controllers.interface.getInterface)
  .del('/interface/del', controllers.interface.delInterface)
  .del('/interface/batchdel', controllers.interface.delInterfaces)
  .post('/interface/save', controllers.interface.saveInterface)
  .post('/interface/relate', controllers.interface.relateInterface)

  .get('/requestlog/pagedlist', controllers.requestlog.getRequestLogPagedList)

  .get('/post/pagedlist', controllers.post.getPostPagedList)
  .get('/post/top', controllers.post.getTopPost)
  .get('/post/:id', controllers.post.getPost)
  .post('/post/save', controllers.post.savePost)

  .post('/resetdb', controllers.system.resetDb)


module.exports = router
