"use strict";

import {match, RouterContext} from 'react-router';
import routes from '../app/src/Routes/Route';
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
import request from 'request';
const kKeywords = '减肥,健身,减肥方法,健身教学,健身视频,减肥瘦身';
const kTitle = 'Try-移动健身APP';
const kDescription = 'Try健身减肥APP为广大用户提供科学有效的健身方案、减肥技巧、健身课程和视频指导，为广大用户拥有一个更加健康的身体素质，提供行之有效的解决方案。';
const host = 'https://webapp.tryfits.com';

const kSEO = {
  keywords: kKeywords,
  title: kTitle,
  description: kDescription
};
function findClassSEO(id) {
  return new Promise(resolve => {
    request(`${host}/lessons/${id}/seo`, (err, res, body) => {
      if (err || res.statusCode != 200) return resolve(kSEO);
      try {
        const lesson = JSON.parse(body);
        return resolve({
          keywords: lesson.name || kKeywords,
          title: `${lesson.name}-Try健身` || kTitle,
          description: lesson.description || kDescription
        });
      } catch (e) {
        console.log(e);
        return resolve(kSEO);
      }
    });
  });
}

function findActionSEO(id) {
  return new Promise(resolve => {
    request(`${host}/actions/${id}/seo`, (err, res, body) => {
      if (err || res.statusCode != 200) return resolve(kSEO);
      try {
        const action = JSON.parse(body);
        return resolve({
          keywords: action.name || kKeywords,
          title: `${action.name}-Try健身` || kTitle,
          description: action.name || kDescription
        });
      } catch (e) {
        console.log(e);
        return resolve(kSEO);
      }
    });
  });
}

function findTagLessonsSEO(id) {
  return new Promise(resolve => {
    request(`${host}/lessons/tags/${id}/seo`, (err, res, body) => {
      if (err || res.statusCode != 200) return resolve(kSEO);
      try {
        const tag = JSON.parse(body);
        return resolve({
          keywords: '减肥，跑步，健身，运动，拉伸',
          title: `定制化健身课程-${tag.name}`,
          description: '科学健身减脂课程，精准有效减肥技巧，热身拉伸课程，帮助避免运动损伤，给你一次快速高效的减肥体验'
        });
      } catch (e) {
        console.log(e);
        return resolve(kSEO);
      }
    });
  });
}

function findTagListSEO() {
  return Promise.resolve({
    keywords: '减肥，马甲线，深蹲，减脂，瘦腿',
    title: `健身课程列表-Try健身`,
    description: '海量丰富的健身课程，针对胸部、腿部、腹部、背部的专项训练，有氧和无氧结合，打造最科学的健身方案'
  });
}

function findKeywords() {
  return Promise.resolve(kSEO);
}

async function renderAsync(element, context) {
  try {
    context = context || {};
    if (!element) return element;
    if (element.type instanceof Function) {
      const defaultProps = element.type.getDefaultProps ? element.type.getDefaultProps() : {};
      // if (element.type.getDefaultProps) console.log("has default props");
      const instance = new (element.type)(Object.assign({}, defaultProps, element.props), context);
      if (instance.initialize) {
          await instance.initialize();
      }
      if (instance.componentWillMount) instance.componentWillMount();
      element = instance.render();
      if (instance.getChildContext) context = Object.assign({}, context, instance.getChildContext());
      element = await renderAsync(element, context);
      element = React.createElement(Wrapper, {}, element);
    } else if (typeof element.type == "string") {
      if (element.props.children) {
        const children = element.props.children instanceof Array ? element.props.children : [element.props.children];
        const props = Object.assign({}, element.props, {children: []});
        await Promise.all(children.map(async function (child, i) {
          props.children[i] = await renderAsync(children[i], context);
        }));
        if (props.children.length === 1) props.children = props.children[0];
        element = React.cloneElement(element, props);
      }
    } else if (element instanceof Array) {
      const elements = [];
      for (const e in element) {
        elements.push(await renderAsync(e, context));
      }
      element = elements;
    }
    return element;
  } catch (e) {
    return Promise.reject(e);
  }
}

class Wrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

module.exports = function (req, res) {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {
      if (err) return res.status(500).send(err.message);
      if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      let p;
      if (req.url.indexOf('/classdetail') === 0) {
        const id = req.url.substr(13, 24);
        p = findClassSEO(id)
      } else if (req.url.indexOf('/actionvideo') === 0) {
        p = findActionSEO(req.query && req.query.id)
      } else if (req.url.indexOf('/courselist') === 0) {
        p = findTagListSEO();
      } else if (req.url.indexOf('/list') === 0) {
        const id = req.url.substr(6, 24);
        p = findTagLessonsSEO(id)
      } else {
        p = findKeywords();
      }
      return p.then(({keywords, title, description}) => {
        // let markup;
        if (renderProps) {
          const element = <RouterContext {...renderProps}/>;
          renderAsync(element)
            .then(function (html) {
              const markup = renderToStaticMarkup(html);
              res.render('index', {markup, keywords, title, description});
            })
            .catch(e => {
              console.log(e);
              res.status(404);
            })
        } else {
          res.status(404);
        }

      }).catch(e => {
        console.log(e);
        return res.status(404);
      });
    }
  );
};
