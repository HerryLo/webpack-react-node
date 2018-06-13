// const http = 'https://webapp.tryfits.com';
const http = 'http://webappserver.gs.tryfits.com:3503';
// const http = 'http://localhost:3505';

global.API = {
  'getList': http + '/lessons/tags/',
  'classDetail': http + '/lessons/',
  'getTag': http + '/lessons/tags',
  'getTop': http + '/lessons/top3',
  'ActVideo': http + '/actions/',
  'moment': http + '/moments/',
  'activity': http + '/activities/',
  'title': 'Try-移动健身APP',
  'keywords': '减肥,健身,减肥方法,健身教学,健身视频,减肥瘦身',
  'description': 'Try健身减肥APP为广大用户提供科学有效的健身方案、减肥技巧、健身课程和视频指导，为广大用户拥有一个更加健康的身体素质，提供行之有效的解决方案。'
};
