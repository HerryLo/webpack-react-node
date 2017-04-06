import '../Stubs/COURSES'

const courselist = {
  path: 'courselist',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../Components/Courselist.js').default)
    })
  }
}

const list = {
  path: 'list/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../Components/list.js').default)
    })
  }
}
const classdetail = {
  path: 'classdetail/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../Components/ClassDetail.js').default)
    })
  }
}
const actionvideo = {
  path: 'actionvideo/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../Components/ActionVideo.js').default)
    })
  }
}
/*引入每个路由组件*/


/*路由配置*/
const RouteConfig = {
  childRoutes: [ {
    path: '/',
    component: require('../Components/App'),
    childRoutes: [
      actionvideo,
      classdetail,
      courselist,
      list
    ]
  } ]
}
/*路由配置*/

export default RouteConfig;
