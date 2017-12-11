import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'

import user_img from '../img/user_img.jpg'
import combined_icon from '../img/combined_icon.png'
import logo_icon from '../img/logo_icon.png'
import Group from '../img/Group_3.png'
import empty_img from '../img/empty_img.png'

var releaseTime = function(t){
    var d = new Date(t);
    var n = new Date();
    var year = d.getFullYear();
    var year1 = n.getFullYear();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var day1 = n.getDate();
    var Hours = d.getHours();
    var Minutes = d.getMinutes();

    var value = n.getTime() - d.getTime();
    var m = value/1000/60;
    var h = value/1000/3600;
    /*console.log(m +' '+ h);*/
    if(m <= 59 && day == day1){
        if(parseInt(m) == 0){
            m = 1;
        }
        return parseInt(m)+'分钟前'
    }else if(h >= 1 && h < 24 && day == day1){
        return parseInt(h)+'小时前'
    }else if(h >=24 && year != year1){
        return year+'/'+month+'/'+day
    }else if((h >=24 || day != day1) && year == year1){
        return (month > 9 ?month:('0'+month))+'/'+(day > 9 ?day:('0'+day))
    }
}
class LikeCount extends Component{
    render() {
        var that = this;
        return(
            <div className="dianzan_box"><div className="div1">
                {that.props.likeCount} 点赞</div>
            <div className="div2">
                {
                    that.props.likers && that.props.likers.map(function(item){
                        return(
                            <img src={item.avatar || Group} key={item._id}/>
                        )
                    })
                }
                {that.props.likeCount?(that.props.likeCount > 6? <img src={combined_icon} className='img6'/>:''):''}
            </div>
            <div className="div3"><i className=""></i></div></div>
        )
    }
}
class Comment extends Component {
    constructor(props) {
      super(props);
      this.state = {
        comments:this.props.comments
      };
      this.replyComment = this.replyComment.bind(this);
    }
    componentWillMount() {
        const arr=[];
        (this.props.comments !='') && this.props.comments.map(function(item){
            if(item.content){
                item.content = item.content.replace(/\n/g,'<br/>');
            }
            if(item.replyComment && item.replyComment.content){
                item.replyComment.content = item.replyComment.content.replace(/\n/g,'<br/>');
            }
            arr.push(item);
        })
        this.setState({
            comments: arr
        })
        this.state.comments = arr
    }
    componentWillReceiveProps(nextProps) {
        const arr=[];
        (nextProps.comments !='') && nextProps.comments.map(function(item){
            if(item.content){
                item.content = item.content.replace(/\n/g,'<br/>');
            }
            if(item.replyComment && item.replyComment.content){
                item.replyComment.content = item.replyComment.content.replace(/\n/g,'<br/>');
            }
            arr.push(item);
        })
        this.setState({
            comments: arr
        })
    }
    replyComment(item) {
        var html = '';
        if(!item.deleted){
            if(item.replyComment){
                if(!item.replyComment.deleted){
                    html += item.replyComment.userName+':'+item.replyComment.content

                    return html;
                }else{
                    return html
                }
            }else{
                return html
            }
        }else{
           return html
        }
    }
    render() {
        var that = this
        return(
            <div><p className="pinglun_p">{this.props.commentCount} 评论</p>
            {
                this.state.comments.map(function(item){
                    return (
                        <div key={item._id}>
                        <div className="clearfix pinglun_box">
                            <div className="pinglun_box1"><img src={item.avatar || Group} /></div>
                            <div className="pinglun_box2"><p className="p1">{item.userName}</p><p className="p2">{releaseTime(item.createTime)}</p></div>
                            <div className="pinglun_box3"><p className="p3"><i className=""></i></p><p className="p4">{item.likeCount?item.likeCount:''}</p></div>
                        </div>
                        <div className="huifu_box">
                            <p className="huifu_p1" dangerouslySetInnerHTML={{__html:item.content}}></p>
                            {item.replyComment?!item.replyComment.deleted?<p className="huifu_p2"  dangerouslySetInnerHTML={{__html:that.replyComment(item)}}></p>:'':''}
                        </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}
class Err extends Component {
    render() {
        return (
            <div className="empty_box">
                <img src={empty_img} />
                <p>{this.props.eerr}</p>
            </div>
        )
    }
}
class Articles extends Component {
    constructor(props) {
      super(props);
      this.state = {
        arr:[],
        comments:[],
        content: '',
        id:this.props.location.pathname.split('/')[2],
        err: ''
      };
      this.initialize = this.initialize.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
    }
    componentWillMount() {
        if (this.state.arr.length == 0) {
          this.initialize(3)
        }
        if (typeof document != 'undefined') {
          document.title = API.title
          document.getElementsByName('description')[0].content = API.description
          document.getElementsByName('keywords')[0].content = API.keywords
          document.addEventListener('scroll', this.handleScroll);
        }
    }

    componentDidUpdate() {
        let style = document.querySelector('style');
        if(style){
            style.parentNode.removeChild(style);
        }
    }
    componentWillUnmount() {
        if (typeof document != 'undefined') {
            document.removeEventListener('scroll', this.handleScroll);
            document.body.style.backgroundColor = ""
        }
    }
    initialize(type) {
        type = type || 3;
        var that = this
        var commentCount = 20;
        var id = this.state.id;
        var url = API.moment+id+'?id='+id+'&type='+type+'&commentCount='+commentCount
        if(type==2){
            let length = this.state.comments.length;
            let sinceId = this.state.comments[length-1]
            if(sinceId){
                url += '&commentSinceId='+sinceId._id;
            }
        }
        let status;
        return fetch(url)
          .then(function (response) {
            status = response.status;
            return response.json();
          })
          .then(function (data) {
            if(status >= 400) {
                that.setState({
                  err: data.msg,
                })
                that.state.err =  data.msg;
                return;
            }
            if(type ==2){
                var arr = that.state.comments;
                if(data.comments.length > 0){
                    data.comments.map(function(item){
                        arr.push(item)
                    })
                }
                that.setState({
                  comments: arr
                })
            }else{
                var content = data.content.match(/<body[^>]*>([\s\S]*)<\/body>/);
                if(content){
                    data.content = content[0];
                }
                that.setState({
                  arr: data,
                  comments: data.comments,
                  content: data.content
                })
                that.state.arr = data;
                that.state.comments = data.comments;
                that.state.content = data.content;
                if (typeof document != 'undefined') {
                    document.title = (that.state.arr.name+'的训练动态-Try健身') || API.title;
                }
            }
          })
          .catch(function (err) {
            console.log(url);
            console.log("Fetch错误:" + err);
          })
    }
    time(t) {
        var d = new Date(t);
        var month = d.getMonth()+1;
        var day = d.getDate();
        var Hours = d.getHours();
        var Minutes = d.getMinutes();
        return month+'/'+day+' '+Hours+':'+Minutes
    }
    download(){
        var na = navigator.userAgent;
        var versions = {
            ios: !!na.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: na.indexOf('Android') > -1 || na.indexOf('Adr') > -1 || na.indexOf('Linux') > -1, //android终端
        }
        /*if(versions.android){*/
            location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sports.tryfits'
        /*}else if(versions.ios){
            location.href = 'https://itunes.apple.com/cn/developer/shanghai-caiyi-business-electronically-co-ltd/id1146774475'
        }*/
    }
    handleScroll() {
        const that = this;
        const getTotaHeight = document.body.scrollHeight - document.body.scrollTop;
        if (getTotaHeight - screen.availHeight <= 0) {
            this.initialize(2)
        }
    }

    render(){
        var that = this;
        return(
        <div id='Moment'>
        <header className="headerNew">
            <h1>心得详情</h1>
        </header>
        {that.state.err==''?(<div><div className="h_fixed"></div>
        <section>
            {that.state.arr.img?<div className="E_flex"><img className="E_flex" src={that.state.arr.img}/></div>:''}
            <div className="user_box clearfix">
                <div className="user_box1"><img src={this.state.arr.avatar || Group} /></div>
                <div className="user_box2"><p className="p1">{this.state.arr.name}</p><p className="p2">发布心得 {releaseTime(this.state.arr.createTime)}</p></div>
                <div className="user_box3"><a onClick={this.download.bind()}>互相关注</a></div>
            </div>
            <div className="kecheng_box" id='content' dangerouslySetInnerHTML={{__html:this.state.content}}>
            </div>
            <div>
                {this.state.arr.likeCount !=''?<LikeCount likeCount={this.state.arr.likeCount} likers = {this.state.arr.likers}/>:''}
                {this.state.arr.commentCount > 0?<Comment comments = {this.state.comments} commentCount = {this.state.arr.commentCount}/>:''}
            </div>
        </section>
        <div className="h_fixed_footer"></div>
        <footer className="clearfix">
            <img src={logo_icon} />
            <p>口袋里的健身教练</p>
            <a onClick={this.download.bind()}>下载</a>
        </footer></div>):''
            }
        {that.state.err!=''?<Err eerr={that.state.err} />:''}
        </div>
        )
    }
}

export default Articles
