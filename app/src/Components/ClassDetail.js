 import React, { Component } from 'react'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import { Link } from 'react-router'

class List extends Component {
  render() {
    return (
    	this.props.data.type==1?<span key={this.props.index}>{this.props.data.name}</span>:<li key={this.props.index}>
			<Link to={{pathname:"/actionvideo/"+this.props.data.actionId}} >
				<figure>
					<img src={this.props.data.imgUrl} />
				</figure>
				<p>
					<strong>{this.props.data.name}</strong>
					<em>{this.props.data.targetCount}</em>
				</p>
			</Link>
		</li>
	)
  }
}
class Messages extends Component {
	constructor(props){
		super(props);
		this.state={
			data:[],
			id:this.props.location.pathname.split('/')[2],
		}
	}
	initialize() {
		const that = this;
		return fetch(global.API.classDetail+this.state.id)
		.then(function(response) {
		    if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		}).then(function(res) {
			that.setState({
				data:res
			})
			that.state.data = res;
        if (typeof document != 'undefined') {
		        document.title = res.name + '-Try健身'
		        document.getElementsByName('description')[0].content = res.description
		        document.getElementsByName('keywords')[0].content = res.name
		    }
		}).catch(function(err){
		    console.log("Fetch错误:"+err);
		});
    }
    componentWillMount() {
        if (this.state.data.length == 0){
          this.initialize()
        }
    }
	componentDidMount(){
    if (typeof document != 'undefined') {
	      document.body.style.backgroundColor = "#252A32"
	    }
  	}
	componentWillUnmount(){
    if (typeof document != 'undefined') {
		    document.body.style.backgroundColor = ""
	    }
	}
	render(){
		const getData = this.state.data;
		return(
				<div id='ClassDetail'>
				<header className="coyy coyylist w1000">
					<Link to="/" className="logo"></Link>
					<h1>课程详情</h1>
					<div className="coyybtn">
						<a href="https://itunes.apple.com/cn/developer/shanghai-caiyi-business-electronically-co-ltd/id1146774475"></a>
                        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sports.tryfits" className="last"></a>
					</div>
				</header>
				<p className="pad"></p>
				<div className="hldz hldz2">
				<div className="w1000">
					<span>{this.state.data.name}</span>
					<p>{this.state.data.description}</p>
				</div>
				</div>
				<article className="zrjc cozrjc zrjclist pagelist">
					<ul>
						<li>
							<a href="javascript:;">
							<figure>
								<img src={this.state.data.cover} />
							</figure><p><span>{this.state.data.name}</span><em>{this.state.data.description}</em></p></a>
							<div>
								<span><strong>{parseInt(this.state.data.duration/1000/60)}</strong><em>分钟</em></span>
								<span><strong>{this.state.data.intensity}</strong><em>强度</em></span><span>
								<strong>{this.state.data.calorie}</strong><em>消耗</em></span>
							</div>
						</li>
					</ul>
				</article>
				<article className="page">
				<div className="w1000">

					{!this.state.data.content||this.state.data.content.map(function(item,i){
                        return (
                        	<List data={item} key={i} />
                        )
                    })}
				</div>
				</article>
				<p className="line">&nbsp;</p>
				<footer className="cofooter pageFooter">
					<span><em>+</em>收藏</span>
					<cite>开始</cite>
				</footer>
				</div>
			)
	}
}

export default Messages
