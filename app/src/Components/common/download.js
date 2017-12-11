import React, { Component } from "react";
import logo_icon from "../../img/logo_icon.png";

class Download extends Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
  }

  download() {
    var na = navigator.userAgent;
    var versions = {
      ios: !!na.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android:
        na.indexOf("Android") > -1 ||
        na.indexOf("Adr") > -1 ||
        na.indexOf("Linux") > -1 //android终端
    };
    location.href =
      "http://a.app.qq.com/o/simple.jsp?pkgname=com.sports.tryfits";
  }

  render() {
    const { hide } = this.props;
    return (
      <div id="download">
        {hide ? (
          ""
        ) : (
          <div>
            <div className="h_fixed_footer" />
            <footer className="clearfix">
              <img src={logo_icon} />
              <p>口袋里的健身教练</p>
              <a onClick={this.download.bind()}>下载</a>
            </footer>
          </div>
        )}
      </div>
    );
  }
}

export default Download;
