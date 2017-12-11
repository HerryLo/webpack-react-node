import "../Stubs/COURSES";

const courselist = {
  path: "courselist",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/Courselist.js").default);
    });
  }
};

const list = {
  path: "list/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/list.js").default);
    });
  }
};
const classdetail = {
  path: "classdetail/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/ClassDetail.js").default);
    });
  }
};
const actionvideo = {
  path: "actionvideo/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/ActionVideo.js").default);
    });
  }
};
/* 动态详情 */
const moment = {
  path: "moment/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/Moment.js").default);
    });
  }
};
/* 文章分享 */
const articles = {
  path: "article/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/articles.js").default);
    });
  }
};
/* 动态详情再次分享 */
const repostMoment = {
  path: "repostMoment/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/Moment.js").default);
    });
  }
};
/* 跑步动态再次分享 */
const runMoment = {
  path: "runMoment/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/Moment.js").default);
    });
  }
};
/* 设备识别  为247开发的功能页面*/
const protect = {
  path: "protect",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/Protect.js").default);
    });
  }
};
/* 活动 */
const activity = {
  path: "activity/:id",
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require("../Components/activity.js").default);
    });
  }
};

/*路由配置*/
/*引入每个路由组件*/
const RouteConfig = {
  childRoutes: [
    {
      path: "/",
      component: require("../Components/App"),
      childRoutes: [
        actionvideo,
        classdetail,
        courselist,
        list,
        moment,
        articles,
        repostMoment,
        runMoment,
        protect,
        activity
      ]
    }
  ]
};
/*路由配置*/

export default RouteConfig;
