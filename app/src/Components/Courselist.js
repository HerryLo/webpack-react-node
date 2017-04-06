import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'
import {Link, Route} from 'react-router'
/* 好多图片 */
import all_pic from '../img/all_pic.png'


class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    };
  }

  componentWillMount() {
    if (this.state.arr.length == 0) {
      this.initialize()
    }
    if (typeof document != 'undefined') {
      document.title = '健身课程列表-try健身'
      document.getElementsByName('description')[0].content ='减肥，马甲线，深蹲，减脂，瘦腿'
      document.getElementsByName('keywords')[0].content = '海量丰富的健身课程，针对胸部、腿部、腹部、背部的专项训练，有氧和无氧结合，打造最科学的健身方案'
    }
  }

  initialize() {
    var that = this
    return fetch(API.getTag, {method: "GET"})
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        that.setState({
          arr: data
        })
        that.state.arr = data;
      })
      .catch(function (err) {
        console.log("Fetch错误:" + err);
      })
  }

  componentDidMount() {
    if (typeof document != 'undefined') {
      document.body.style.backgroundColor = "#252A32"
    }
    var that = this
    var scroll = function (fn) {
      var beforeScrollTop = document.body.scrollTop,
        fn = fn || function () {
          };
      window.addEventListener("scroll", function () {
        var afterScrollTop = document.body.scrollTop,
          delta = afterScrollTop - beforeScrollTop;
        if (delta === 0) return false;
        fn(delta > 0 ? "down" : "up");
        beforeScrollTop = afterScrollTop;
      }, false);
    }
    scroll(function (direction) {
      /*console.log(direction);*/
      var width = document.body.clientWidth;
      var el = that.refs.foot;
      if (width <= 1000) {
        if (direction == 'down' && el) {
          el.style.display = 'none';
        } else if (direction == 'up' && el) {
          el.style.display = 'block';
        }
      } else if (width > 1000 && el) {
        el.style.display = 'none';
      }
    });
  }

  componentWillUnmount() {
    if (typeof document != 'undefined') {
      document.body.style.backgroundColor = ""
    }
  }

  render() {
    const data = this.state.arr;
    return (
      <div style={{background: '#252A32'}}>
        <header className="coyy w1000">
          <Link to="/" className="logo"></Link>
          <span></span>
          <p>当前默认查看女性课程分类登录后可查看更多课程</p>
          <div className="coyybtn">
            <a
              href="https://itunes.apple.com/cn/developer/shanghai-caiyi-business-electronically-co-ltd/id1146774475"></a>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sports.tryfits" className="last"></a>
          </div>
        </header>
        <div className="hldz hldz2" style={{paddingLeft: "70px"}}>
          <div className="w1000">
            <span>海量定制课程</span>
            <p>无论你的诉求是增肌减脂，体态矫正，还是运动能力提升，<br />我们都能提供专业且便捷的训练计划</p>
          </div>
        </div>
        <article className="zrjc cozrjc">
          <div className="w1000">
            <ul>
              {
                data.map(function (item) {
                  return (
                    <li key={item._id}>

                      <Link to={{pathname: "/list/"+item._id}}>
                        <figure><img src={item.cover}/></figure>
                        <cite>{item.name}</cite>
                      </Link></li>
                  )
                })
              }
            </ul>
          </div>
        </article>
        <p className="line">&nbsp;</p>
        <footer className="cofooter" ref='foot'>
          <cite>个性化定制健身计划</cite>
          <p><Link to="/">马上下载</Link><a href="#">打开</a></p>
        </footer>
      </div>
    )
  }
}

export default Course
