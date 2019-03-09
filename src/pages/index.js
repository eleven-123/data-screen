import React, { PureComponent } from 'react';
import { Row,Col} from 'antd';
import Rank from '@/components/rank';
import DistributPie from '@/components/distribut';
import DeviceMap from '@/components/deviceMap';
import Payment from '@/components/payment';
import TodaySaleBar from '@/components/todaySaleBar';
import TradingVolume from '@/components/tradingVolume';
import styles from './index.css';

class ViewContent extends PureComponent{
  render(){
    return(
      <div className={styles.container}>
        <Row gutter={24} className={styles.row}>
          <Col lg={6} md={12} sm={24} xs={24} className={styles.left}> 
            <div className={styles.section+" "+styles.lSection}>
              <h3 className={styles.title}>本月机器销售排行 TOP10</h3>
              <Rank id="machineRank"/>
            </div>
            <div className={styles.section+" "+styles.lSection}>
              <h3 className={styles.title}>本月商品销售排行 TOP10</h3> 
              <Rank id="goodsRank"/>
            </div>
            <div className={styles.section+" "+styles.lSection}>
              <h3 className={styles.title}>点位机器分布 TOP10</h3>
              <DistributPie />
            </div>
          </Col>
          <Col lg={13} md={12} sm={24} xs={24} className={styles.middle}>
            <div className={styles.section}>
              <TradingVolume />
            </div>
            <div className={styles.section}>
              <div className={styles.border+' '+ styles.mapCont}>
                <div className={styles.bg+' '+ styles.bgLeftTop}></div>
                <div className={styles.bg+' '+ styles.bgRightTop}></div>
                <div className={styles.bg+' '+ styles.bgLeftBottom}></div>
                <div className={styles.bg+' '+ styles.bgRightBottom}></div>
                <OnlineMachine />                
                <div className={styles.mapChart}>
                  <DeviceMap />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5} md={12} sm={24} xs={24} className={styles.right}>
            <div className={styles.section+" "+styles.rSection}>
              <h3 className={styles.title}>今日实时销售走势</h3> 
              <div  className={styles.barCont}>
                <TodaySaleBar />
              </div>
            </div>
            <div className={styles.section+" "+styles.rSection+" "+styles.exceptionDevice}>
              <h3 className={styles.title}>异常设备预计</h3>
              <dl className={styles.listTop}>
                <dt>缺货设备</dt>
                <dt>缺货商品数</dt>
              </dl>
              <Rank id="exceptionDevice"/>
            </div>
            <Row className={styles.section+' '+ styles.border}>
              <div className={styles.bg+' '+ styles.bgLeftTop}></div>
              <div className={styles.bg+' '+ styles.bgRightTop}></div>
              <div className={styles.bg+' '+ styles.bgLeftBottom}></div>
              <div className={styles.bg+' '+ styles.bgRightBottom}></div>
              <Col md={12} sm={24} className={styles.itemBox}>
                {/* <h4>5.23</h4>
                <p>今日客单价</p> */}
                <UnitPrice name="今日客单价(元)" id="cPrice"/>
              </Col>
              <Col md={12} sm={24} className={styles.itemBox} id="gPrice">
                <UnitPrice name="今日件单价(元)"/>
                {/* <h4>3.26</h4>
                <p>今日件单价</p> */}
              </Col>
              
            </Row>
            <div className={styles.section+' '+ styles.border +' '+ styles.payment}>
              <div className={styles.bg+' '+ styles.bgLeftTop}></div>
              <div className={styles.bg+' '+ styles.bgRightTop}></div>
              <div className={styles.bg+' '+ styles.bgLeftBottom}></div>
              <div className={styles.bg+' '+ styles.bgRightBottom}></div>
              <h3 className={styles.title}>支付方式占比</h3>
              <Payment/>
              <dl className={styles.rowFlex}>
                <dt className={styles.col}>
                  <i className={styles.icon +' '+ styles.weixin}></i>
                  <span>微信支付</span>
                </dt>
                <dt className={styles.col}>
                  <i className={styles.icon}></i>
                  <span>支付宝支付</span>
                </dt>
              </dl>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default ViewContent

// 机器在线数量
class OnlineMachine extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      onlineData:[]
    };
  }
  getAjax(){
    this.setState({
      onlineData:parseInt(Math.random()*(3134-3124+1)+3124)
    })
  }
  componentDidMount(){
    this.getAjax();
    this.interval=setInterval(() => this.getAjax(),1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    return(
      <div className={styles.fixedTitle}>
        <h5>机器在线数量(台)</h5>
        <p>{this.state.onlineData}</p>
      </div>
    )
  }
}

// 客单价
const cPrice=5.23;
const gPrice=3.26;
class UnitPrice extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cPrice:cPrice,
      gPrice:gPrice
    };
  }
  getAjax(){
    const cPrice=(Math.random()*(5.5-3.5+1)+3.5).toFixed(2);
    const gPrice=3.26;
    this.setState({
      cPrice:cPrice,
      gPrice:gPrice
    })
  }
  componentDidMount(){
    this.getAjax();
    this.interval=setInterval(() => this.getAjax(),3000);   
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    return(
      <div>
        <h4>{this.props.id=='cPrice'?this.state.cPrice:this.state.gPrice}</h4>
        <p>{this.props.name}</p>
      </div>
    )
  }
}