import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import all_pic from "../img/all_pic.png";
import Download from "./common/download";
import Header from "./common/header";
import { DateTransfrom, getCookie } from "../utils/util";
import { toastIt } from "./common/toast";

import Floret from "../img/Floret@2x.png";

class AwardIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sGift } = this.props;
    let len = sGift.length;
    return (
      <div>
        {sGift.map((item, index) => {
          return (
            <div>
              <div className="awardimgIcon">
                <div className="bgawardImg">
                  <img src={item.img} />
                </div>
                <p className={item.haveCount == 0 ? "" : "color"}>
                  ({item.haveCount}/{item.targetCount})
                </p>
              </div>
              {len - 1 != index && <div className="plusEqual">+</div>}
            </div>
          );
        })}
      </div>
    );
  }
}

class JoinActivity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ftstate, clickTP, joined } = this.props;
    return (
      <div>
        {ftstate ? (
          joined ? (
            ""
          ) : (
            <div className="awardjoin">
              <a
                onClick={() => {
                  clickTP();
                }}
              >
                参加活动
              </a>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class Award extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ex, clickCashRewards } = this.props;
    return (
      <div>
        {ex &&
          ex.map((item, index) => {
            let len = ex.length;
            let classState = len - 1 == index;
            return (
              <div
                className={classState ? "award" : "award awardMargin"}
                key={item._id}
              >
                <p className="paward">
                  {item.name}
                  <span
                    className={item.changestate ? "spanaward1" : "spanaward"}
                    onClick={() => {
                      clickCashRewards(
                        item._id,
                        item.changestate,
                        item.name,
                        item.img
                      );
                    }}
                  >
                    兑换
                  </span>
                </p>
                <div className="divaward">
                  <AwardIcon sGift={item.subGifts} />
                  <div className="plusEqual">=</div>
                  <div className="awardimgIcon">
                    <div className="bgawardImg">
                      <img src={item.img} />
                    </div>
                    <p>{item.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "---",
        coverUrl: "",
        startTime: "",
        endTime: "2017-12-30T04:12:00.000Z",
        content: "2017-12-30T04:12:00.000Z",
        joined: false
      },
      id: this.props.location.pathname.split("/")[2],
      err: "",
      infostate: false,
      ftstate: false,
      hdstate: false,
      maskHeight: 0,
      maskState: false,
      receiveInfo: { name: "", img: "", des: "" }
    };
    this.token = "";
    this.initialize = this.initialize.bind(this);
    this.infoArrow = this.infoArrow.bind(this);
    this.clickTP = this.clickTP.bind(this);
    this.clickCashRewards = this.clickCashRewards.bind(this);
    this.ChangeState = this.ChangeState.bind(this);
    this.maskHComp = this.maskHComp.bind(this);
    this.CancelEvent = this.CancelEvent.bind(this);
    this.RemovEvent = this.RemovEvent.bind(this);
    this.onHandler = this.onHandler.bind(this);
  }

  componentWillMount() {
    let token = getCookie("webToken");
    if (token) {
      this.token = token;
      this.setState({
        ftstate: false,
        hdstate: false
      });
    } else {
      this.setState({
        ftstate: true,
        hdstate: true
      });
    }
    this.initialize();
  }

  initialize() {
    let status;
    const { id } = this.state;
    return fetch(`${API.activity}${id}`, {
      method: "GET",
      headers: {
        "X-Token": this.token
      }
    })
      .then(function(response) {
        status = response.status;
        return response.json();
      })
      .then(res => {
        if (status >= 400) {
          this.setState({
            err: res.msg
          });
          this.state.err = res.msg;
          return;
        }
        this.setState(
          {
            data: res
          },
          () => {
            this.ChangeState();
          }
        );
        this.state.data = res;
      })
      .catch(error => {
        console.log(`${API.activity}${id}`);
        console.log("Fetch错误:" + error);
      });
  }

  clickTP() {
    const { id } = this.state;
    let status;
    if (id) {
      return fetch(`${API.activity}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.token
        }
      })
        .then(function(response) {
          status = response.status;
          if (status == 201) {
            return response;
          } else {
            return response.json();
          }
        })
        .then(res => {
          if (status >= 400) {
            this.setState({
              err: res.msg
            });
            console.log("参加失败");
            console.log(res.msg);
            return;
          }
          toastIt("参加成功!", 1500, { fontSize: "1rem" });
          let { data } = this.state;
          data.joined = true;
          this.setState({
            data: data
          });
        })
        .catch(res => {
          console.log(res);
        });
    }
  }

  clickCashRewards(gid, state, name, img) {
    const { id, data } = this.state;
    let status;
    if (gid && state) {
      return fetch(`${API.activity}${id}/gift/${gid}`, {
        method: "POST",
        headers: {
          "X-Token": this.token
        }
      })
        .then(function(response) {
          status = response.status;
          return response.json();
        })
        .then(res => {
          if (status >= 400) {
            that.setState({
              err: res.msg
            });
            return;
          }
          this.maskHComp();
          this.setState({
            receiveInfo: {
              name: res.giftTitle,
              img: res.giftImg,
              des: res.giftDesc
            }
          });
          //const index = this.TraversArrays(data.exchangeGifts ,gid);
          this.initialize();
        })
        .catch(res => {
          console.log(res);
        });
    }
  }

  ChangeState() {
    const { data } = this.state;
    let exg = data.exchangeGifts;
    if (exg.length > 0) {
      for (let i = 0; i < exg.length; i++) {
        let sg = exg[i].subGifts;
        for (let z = 0; z < sg.length; z++) {
          if (sg[z].haveCount < sg[z].targetCount) {
            exg[i].changestate = false;
            break;
          } else {
            exg[i].changestate = true;
            break;
          }
        }
      }
      this.setState({
        data: data
      });
      console.log(data);
      this.state.date = data;
    }
  }

  maskHComp() {
    var h = 0;
    if (typeof document !== "undefined") {
      h = document.getElementById("activity").offsetHeight;
    }
    this.setState(
      {
        maskHeight: h,
        maskState: true
      },
      () => {
        this.CancelEvent();
      }
    );
  }

  infoArrow() {
    const { infostate } = this.state;
    this.setState({
      infostate: !infostate
    });
  }

  onHandler(e) {
    let ev = e || window.event;
    ev.preventDefault();
  }

  CancelEvent() {
    if (typeof document !== "undefined") {
      document.addEventListener("touchmove", this.onHandler, false);
    }
  }

  RemovEvent() {
    if (typeof document !== "undefined") {
      document.removeEventListener("touchmove", this.onHandler, false);
    }
    this.setState({
      maskState: false
    });
  }

  TraversArrays(arr, id) {
    let i = 0;
    let len = arr.length;
    while (i < len) {
      if (arr[i]._id == id) {
        return i;
      }
      i++;
    }
  }

  render() {
    const {
      ftstate,
      hdstate,
      data,
      infostate,
      maskHeight,
      maskState,
      receiveInfo
    } = this.state;
    const startTime = DateTransfrom(data.startTime, 0);
    const endTime = DateTransfrom(data.endTime, 0);
    return (
      <div id="activity">
        <Header hide={hdstate} />
        <div>
          <div className="bannerImg">
            <img src={data.coverUrl} />
          </div>
          <div className="divtitle">{data.name}</div>
          <div className="divinfo">
            <p className="pinfo1">活动时间</p>
            <p className="pinfo2">
              {startTime} - {endTime}
            </p>
          </div>
          <div className="divdesc">
            <p className="pinfo1">活动介绍</p>
            <p
              className="pdescInfo"
              style={{ height: infostate ? "auto" : "50px" }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <p className="punfold" onClick={this.infoArrow}>
              {infostate ? "收起" : "展开"}
              <i
                className={
                  infostate ? "DWgrayArrow UpgrayArrow" : "DWgrayArrow"
                }
              />
            </p>
          </div>
        </div>
        <div className="awardList">
          <div className="altitle">
            <span>奖励兑换</span>
          </div>
          <Award
            ex={data.exchangeGifts}
            clickCashRewards={this.clickCashRewards}
          />
          <JoinActivity
            ftstate={ftstate}
            clickTP={this.clickTP}
            joined={data.joined}
          />
        </div>
        <Download hide={ftstate} />
      </div>
    );
  }
}

export default Activity;
