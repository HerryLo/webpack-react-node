import React, {Component} from 'react'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import {Link} from 'react-router'


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      count: 10,
      name:'',
      id: this.props.location.pathname.split('/')[2]
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    if (this.state.list.length == 0) {
      this.initialize()
    }
  }

  initialize() {
    const that = this;
    return fetch(global.API.getList + that.state.id + "?count=" + that.state.count)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (res) {
        that.setState({
          list: res.lessons,
          name: res.name
        });
        that.state.list = res.lessons;
        that.state.name = res.name;
        if (typeof document != 'undefined') {
          document.title = '定制化健身课程-'+that.state.name;
          document.getElementsByName('description')[0].content = '科学健身减脂课程，精准有效减肥技巧，热身拉伸课程，帮助避免运动损伤，给你一次快速高效的减肥体验';
          document.getElementsByName('keywords')[0].content = '减肥，跑步，健身，运动，拉伸';
        }
      })
      .catch(function (err) {
        console.log("Fetch错误:" + err);
      });
  }

  componentDidMount() {
    if (typeof document != 'undefined') {
      document.addEventListener('scroll', this.handleScroll);
      document.body.style.backgroundColor = "#252A32"
    }
  }

  componentWillUnmount() {
    if (typeof document != 'undefined') {
      document.removeEventListener('scroll', this.handleScroll);
      document.body.style.backgroundColor = ""
    }
  }
  componentWillReceiveProps(){
    if (typeof document != 'undefined') {
      document.addEventListener('scroll', this.handleScroll);
      document.body.style.backgroundColor = "#252A32"
    }
  }


  handleScroll() {
    const that = this;
    const getTotaHeight = document.body.scrollHeight - document.body.scrollTop;
    if (getTotaHeight - screen.availHeight <= 0) {
      that.setState({
        count: that.state.count + 5
      })
      fetch(global.API.getList + that.state.id + "?count=" + that.state.count)
        .then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (res) {
        let data=that.state.list
        res.lessons.map(function(item){
          data.push(item);
        })
        that.setState({
          list: data
        })
      }).catch(function (err) {
        document.removeEventListener('scroll', that.handleScroll);
      });
    }
  }

  render() {
    const getList = this.state.list;

    return (
      <div>
        <header className="coyy coyylist w1000">
          <Link to="/" className="logo"></Link>
          <h1>课程列表</h1>
          <div className="coyybtn">
            <a
              href="https://itunes.apple.com/cn/developer/shanghai-caiyi-business-electronically-co-ltd/id1146774475"></a>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sports.tryfits" className="last"></a>
          </div>
        </header>
        <p className="pad"></p>
        <div className="hldz hldz2" style={{padding: "60px 0 60px 80px"}}>
          <div className="w1000">
            <p>海量定制课程－{this.state.name}</p>
          </div>
        </div>

        <article className="zrjc cozrjc zrjclist">
          <div className="w1000">
            <ul id="test">
              {!this.state.list || this.state.list.map((props) =>
                <li key={props._id}>
                  <Link to={{pathname: "/classdetail/"+props._id}}>
                    <figure>
                      <img src={props.cover}/>
                    </figure>
                  </Link>
                  <div>
                    <span><strong>{props.duration / 1000/60 | 0}</strong><em>分钟</em></span>
                    <span><strong>{props.intensity}</strong><em>强度</em></span>
                    <span><strong>{props.calorie}</strong><em>消耗</em></span>
                  </div>
                </li>
              )
              }
            </ul>
          </div>
        </article>
      </div>
    )
  }
}

export default Messages
