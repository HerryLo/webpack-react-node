import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'
import {Link} from 'react-router'

import play from '../img/play.png'


class ActVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      videoUrl: '',
      name: '',
      id: this.props.location.pathname.split('/')[2],
      videoBool: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    var img = this.refs.img;
    var video = this.refs.video;
    img.style.display = 'none';
    this.setState({
      videoBool: true
    })
    video.controls = false
    video.play();
  }

  componentWillMount() {
    if (this.state.imgUrl == '' && this.state.videoUrl == '' && this.state.name == '') {
      this.initialize();
    }
  }

  initialize() {
    var that = this
    return fetch(API.ActVideo + this.state.id)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function (res) {
        that.setState({
          imgUrl: res.imgUrl,
          videoUrl: res.videoUrl,
          name: res.name
        })
        that.state.imgUrl = res.imgUrl
        that.state.videoUrl = res.videoUrl
        that.state.name = res.name
        if (typeof document != 'undefined') {
          document.title = res.name + '-Try健身'
          document.getElementsByName('description')[0].content = res.name
          document.getElementsByName('keywords')[0].content = res.name
        }
      }).catch(function (err) {
        console.log("Fetch错误:" + err);
      });
  }

  componentDidMount() {
    if (typeof document != 'undefined') {
      document.body.style.backgroundColor = "#252A32";
    }
  }

  componentWillUnmount() {
    if (typeof document != 'undefined') {
      document.body.style.backgroundColor = ""
    }
  }

  render() {
    return (
      <div>
        <header className="coyy coyylist w1000">
          <Link to='/' className="logo"></Link>
          <h1>{this.state.name}</h1>
          <div className="coyybtn"><a href="#"></a><a href="#" className="last"></a></div>
        </header>
        <p className="pad"></p>
        <div className="hldz hldz2" style={{padding: "40px 0 0 0"}}>
          <div className="w1000">
            <span>{this.state.name}</span>
          </div>
        </div>
        <div className="w1000">
          <figure class='video' style={{height: "auto", position: "relative"}}>
            <img style={{display: this.state.videoBool ? 'none' : 'block'}}
                 src={this.state.imgUrl} ref='img'/>
            <div className='play' style={{
              display: this.state.videoBool ? 'none' : 'block',
              backgroundImage: `url(${play})`
            }} onClick={() => this.handleClick()}></div>
            <video style={{display: this.state.videoBool ? 'block' : 'none'}}
                   ref='video' controls
                   className="video-video" loop="loop"
                   src={this.state.videoUrl}>
              <source src={this.state.videoUrl} type="video/mp4"/>
              <source src={this.state.videoUrl} type="video/ogg"/>
              <source src={this.state.videoUrl} type="video/webm"/>
            </video>
          </figure>
        </div>
      </div>
    )
  }
}

export default ActVideo
