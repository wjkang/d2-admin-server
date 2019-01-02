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

  .get('/menu', PermissionCheck({ permission: ["p_menu_view"] }), controllers.menu.getMenuList)
  .get('/menu/access', controllers.menu.getAccessMenuList)
  .get('/menu/menufunctions', controllers.menu.getMenuFunctions)
  .get('/menu/:id', controllers.menu.getMenu)
  .post('/menu/save', controllers.menu.saveMenu)
  .del('/menu/:id', controllers.menu.delMenu)

  .get('/route', controllers.route.getRouteList)
  .get('/route/paged', controllers.route.getRoutePagedList)
  .get('/route/:id', controllers.route.getRoute)
  .del('/route/:id', controllers.route.delRoute)
  .del('/route/batchdel', controllers.route.delRoutes)
  .post('/route/save', controllers.route.saveRoute)

  .get('/function/pagedlist', PermissionCheck({ permission: ["function_view"], role: ["test"] }), controllers.function.getFunctionPagedList)
  .del('/function/del', PermissionCheck({ permission: ["function_del"] }), controllers.function.delFuntion)
  .del('/function/batchdel', PermissionCheck({ permission: ["function_del"] }), controllers.function.delFuntions)
  .post('/function/save', PermissionCheck({ permission: ["function_edit"] }), controllers.function.saveFuntion)

  .get('/role/pagedlist', PermissionCheck({ permission: ["role_view", "role_permission_view", "role_user_view"] }), controllers.role.getRolePagedList)
  .get('/role/:id', controllers.role.getRole)
  .get('/role/getpermissions/:roleId', controllers.role.getRolePermissions)
  .del('/role/del', PermissionCheck({ permission: ["role_del"] }), controllers.role.delRole)
  .del('/role/batchdel', PermissionCheck({ permission: ["role_del"] }), controllers.role.delRoles)
  .post('/role/save', PermissionCheck({ permission: ["role_edit"] }), controllers.role.saveRole)
  .post('/role/savepermission', PermissionCheck({ permission: ["role_permission_edit"] }), controllers.role.savePermission)

  .get('/user/pagedlist', PermissionCheck({ permission: ["user_view", "user_role_view"] }), controllers.user.getUserPagedList)
  .get('/user/info', controllers.user.getUserInfo)
  .get('/user/:id', controllers.user.getUser)
  .del('/user/del', PermissionCheck({ permission: ["user_del"] }), controllers.user.delUser)
  .del('/user/batchdel', PermissionCheck({ permission: ["user_del"] }), controllers.user.delUsers)
  .post('/user/save', PermissionCheck({ permission: ["user_edit"] }), controllers.user.saveUser)
  .post('/user/editroleuser', PermissionCheck({ permission: ["role_user_edit", "user_role_edit"] }), controllers.user.editRoleUser)

  .get('/interface/paged', controllers.interface.getInterfacePagedList)
  .get('/interface/:id', controllers.interface.getInterface)
  .del('/interface/del', controllers.interface.delInterface)
  .del('/interface/batchdel', controllers.interface.delInterfaces)
  .post('/interface/save', controllers.interface.saveInterface)
  .post('/interface/relate', controllers.interface.relateInterface)

  .get('/requestlog/pagedlist', controllers.requestlog.getRequestLogPagedList)

  .get('/post/pagedlist', PermissionCheck({ permission: ["post_view"] }), controllers.post.getPostPagedList)
  .get('/post/top', controllers.post.getTopPost)
  .get('/post/:id', controllers.post.getPost)
  .post('/post/save', PermissionCheck({ permission: ["post_edit"] }), controllers.post.savePost)

  .post('/resetdb', controllers.system.resetDb)


module.exports = router
