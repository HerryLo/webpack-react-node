import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hide } = this.props;
    return (
      <div id="header">
        {hide ? (
          ""
        ) : (
          <div>
            <header className="headerNew">
              <h1>活动名称-try</h1>
            </header>
            <div className="h_fixed" ></div>
          </div>
        )}
      </div>
    )
  }
}

export default Header;
