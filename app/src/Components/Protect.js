import React, { Component } from "react";
require('es6-promise').polyfill();
import tel from "../img/tel@3x.png";
import { devices } from "../utils/constant.js";
import { locsearch ,AppAPI} from "../utils/util.js";

class ProtectChild extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {operations, index, clickApp, class_name, package_name} = this.props;
    return (
      <div className="liDiv" style={{display:index?'block':'none'}}>
      {
        operations && operations.map((item,index)=> {
          return (
          <div className="handiv">
            <i className="handli" />
            <span className="handlSpan">{item}</span>
            {operations.length-1 != index && <div className="borderDiv" />}
          </div>
          )
        })
      }
      <a className='lidivBtn' onClick={()=>{clickApp(class_name, package_name)}}>去设置</a>
      </div>
    );
  }
}

class Protect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
      brand: "",
      name: "",
      nameArray:null
    };
    this.solutions = this.solutions.bind(this);
    this.gotoSetting = this.gotoSetting.bind(this);
    this.nameArray = this.nameArray.bind(this);
    this.InsertAttr = this.InsertAttr.bind(this);
    this.ChangeBrand = this.ChangeBrand.bind(this);
    this.showPickView = this.showPickView.bind(this);
  }

  componentWillMount() {
    const {search} = this.props.location;
    let name = locsearch("brand", search);
    let nameArray = this.nameArray();
    this.setState({
      nameArray: nameArray
    })
    this.setState(
      {
        name: name
      },
      () => {
        let dev = this.solutions('name');
        this.setState({
          device: dev,
          brand: dev.brand
        });
      }
    );
  }

  componentDidMount() {
    if(document){
      //document.getElementById("root").scrollHeight = window.innerHeight
      document.getElementById("root").style.background = "#010726";
      document.body.style.background = "#010726";
    }
    if(window){
      window.ReactMethodProtect = this
    }
  }

  componentWillUnmount() {
    if(document){
      document.body.style.background = "";
    }
  }

  nameArray() {
    let nameArray = [];
    for (let i = 0; i < devices.length; i++) {
      var temp = devices[i];
      nameArray.push(temp.brand);
    }
    return nameArray
  }

  solutions(type) {
    let { name, brand} = this.state;
    var device;
    var nameArray = [];
    name = name.toLocaleLowerCase()
    if (name) {
      for (let i = 0; i < devices.length; i++) {
        var temp = devices[i];
        if ((temp.name == name && type== 'name') || 
          (temp.brand == brand && type== 'brand')) {
            device = temp;
            this.InsertAttr(device);
        }
      }
      if (!device) {
        device = devices[devices.length - 1];
      }
      return device
    }
  }

  ChangeBrand(brand) {
    this.setState(
      {
        brand: brand
      },
      () => {
        console.log(this.state.brand)
        let dev = this.solutions('brand');
        this.setState({
          device: dev,
          name: dev.name,
        });
      }
    );
  }

  InsertAttr(device) {
    for(let z = 0;z < device.solutions.length;z++){
      let index = 'index'+z
      device.solutions[z][index] = false;
    }
  }

  gotoSetting(a,b) {
    if(a && b){
      AppAPI.gotoSetting(a,b);
    }
  }

  showPickView(arr) {
    const {nameArray} = this.state;
    if(nameArray.length>0){
      AppAPI.showPickView(nameArray);
    }
  }

  clickShow(a,b) {
    let {device} = this.state;
    for(let z = 0;z < device.solutions.length;z++){
      let index = 'index'+z
      device.solutions[z][index] = false;
    }
    device.solutions[b][`index${b}`] = !a;
    this.setState({
      device: device
    })
  }

  render() {
    const { device, brand} = this.state;
    return (
      <div id="ModeType">
        <div className="titleDiv">
          <span>您的手机品牌</span>
        </div>
        {brand && <div className="divDevice">
          <div className="divImg">
            <img src={tel} />
          </div>
          <div className="div1">{brand}</div>
          <div className="div2" onClick={this.showPickView}>识别有误？点击修改</div>
        </div>
        }
        <div className="divdes">
          <span>请按以下操作进行设置</span>
        </div>
        <div className="divHandle">
          <ul>
            {device &&
              device.solutions.map((item, index) => {
                return (
                  <div>
                  <li key={index} onClick={()=> {this.clickShow(item[`index${index}`],index)}}>
                    <span className="spanHanDes">{item.title}</span>
                    <i className={item[`index${index}`]?'liIcon2 liIcon':'liIcon1 liIcon'} />
                  </li>
                  <ProtectChild 
                    operations={item.operations} 
                    index={item[`index${index}`]}  
                    clickApp={this.gotoSetting}
                    class_name={item.class_name}
                    package_name={item.package_name}
                  />
                  </div>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

// window.ReactMethodProtect 将Protect挂在全局下

export default Protect;
