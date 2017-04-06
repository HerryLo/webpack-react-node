import React,{Component} from 'react'
import fetch from 'isomorphic-fetch'
import {Link} from 'react-router'
/* 好多图片 */
import pc_Xewm2 from '../img/pc_xewm2.png'
import dz from '../img/dz.png'
import pc_banner from '../img/pc_banner.png'
import data1 from '../img/data.png'
import six from '../img/six.png'
import num from '../img/num.png'
import pc_data from '../img/pc_data.png'
import pc_data2 from '../img/pc_data2.png'
import pc_tel from '../img/pc_tel.png'
import pc_ewm from '../img/pc_ewm.png'
import qq from '../img/qq.png'
import weibo from '../img/weibo.png'
import weichat from '../img/weichat.png'

class Index extends Component {
    constructor(props) {
      super(props);
      this.state = {
        arr: [],
        isShow: false
      };
      this.returnTop = () => {
        document.documentElement.scrollTop = document.body.scrollTop = 0
      }
        this.onmouseenter=()=>{
            this.setState({isShow: true});
        }
        this.onmouseleave=()=>{
            this.setState({isShow: false});
        }
    }
    componentWillMount() {
      if (this.state.arr.length == 0){
        this.initialize()
      }
      if(document){
          document.title = API.title
          document.getElementsByName('description')[0].content = API.description
          document.getElementsByName('keywords')[0].content = API.keywords
        }

    }
    initialize() {
      var that = this
      fetch(API.getTop)
      .then(function(response){
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(data) {
          that.setState({
              arr: data
          })
          this.state.arr = data
      })
      .catch(function(err){
          console.log("Fetch错误:"+err);
      })
    }
    render() {
        const data = this.state.arr
        return (
            <div>
                <article className="banner">
                	<img src={pc_banner} alt="" />
                    <span></span>
                    <cite>个性化定制健身计划APP</cite>
                    <p>
                        <a href="https://itunes.apple.com/cn/developer/shanghai-caiyi-business-electronically-co-ltd/id1146774475"></a>
                        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sports.tryfits" className="last"></a>
                        <em onMouseEnter={()=>this.onmouseenter()} onMouseLeave={()=>this.onmouseleave()}></em>
                        <b className="pc_ewm" id="box" style={{display:this.state.isShow?'block':'none'}}>
                            <img src={pc_Xewm2} />
                        </b>
                    </p>
                </article>
                <div className="hldz w1000">
                    <span>海量定制课程</span>
                    <p>无论你的诉求是增肌减脂，体态矫正，还是运动能力提升，我们都能提供专业且便捷的训练计划</p>
                </div>
                <article className="zrjc">
                <div className="w1000">
                    <ul>
                        {data.map(function(item){
                            return (
                                <li key={item._id}><Link  to={{pathname:"/classdetail",query:{id:item._id}}} target='_blank'
                                  ><figure><img src={item.cover} /></figure>
                                <cite>{item.name}</cite><span style={{background: "#2E3441"}}>
                                {item.description}
                                </span></Link></li>
                            )
                        })}
                    </ul>
                    <div className="more">
                        <span>真人演示视频教学</span>
                        <p>全程视频指导 + 语音讲解 + 自动计数，保证你掌握每个动作的每个细节。</p>
                        <Link to='/courselist' className="btn">查看更多课程</Link>
                    </div>
                </div>
                </article>
                <div className="hldz lsdz w1000">
                    <span>量身定制专属训练计</span>
                    <p>收集您的所有相关信息，通过精准科学的算法，为您定制独一无二的专属训练计划。</p>
                </div>
                <article className="zsdz">
                <div className="w1000">
                    <figure className="index_pic"><img src={dz} /></figure>
                    <figure className="index_pic2"><img src={data1} /></figure>
                    <figure className="index_pic3"><img src={six} /></figure>
                    <p>我将收集你的26项相关数据为您打造独一无二的专属计划</p>
                    <figure className="index_pic4"><img src={num} /></figure>
                    <figure className="pc_pic"><img src={pc_data} /></figure>
                    <figure className="pc_pic2"><img src={pc_data2} /></figure>
                    <p className="last">我们已经为<cite>238,503</cite>位用户定制了<cite>354,992</cite>套的训练计划</p>
                    <a onClick={() => this.returnTop()} className="btn">开始定制之旅<br />Download</a>
                </div>
                </article>
                <article className="down w1000">
                    <figure className="pctel"><img src={pc_tel} /></figure>
                    <figure className="pcewm"><img src={pc_ewm} /></figure>
                    <p>
                    <a href="https://itunes.apple.com/cn/developer/shanghai-caiyi-business-electronically-co-ltd/id1146774475"></a>
                    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sports.tryfits" className="last"></a>
                    </p>
                    <div><figure><img src={qq} /></figure><figure><img src={weibo} /></figure><figure><img src={weichat} /></figure></div>
                </article>
                <p className="copy">2014-2017&copy;Try All Rights Resrved. <br />
                沪ICP备16004443号-2
                </p>
            </div>

        )
    }
}

export default Index
