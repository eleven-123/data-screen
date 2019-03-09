import React, { PureComponent } from 'react';
import { Row,Col } from 'antd';
import styles from '../pages/index.css'

const data={amount:10012730.25,count:2002545,todayAmount:32508,todayCount:6501};

class TradingVolume extends React.Component{  
  constructor(props){
    super(props);
    this.state = {
      data:data,
      detailData:[],
    };
  }
  
  getAjax(){  
    var array = [0,4.5,1.5,0,1,0];
    const detailData = [{name:'上海',value: array[Math.round(Math.random()*(array.length-1))]},{name:'浙江',value:array[Math.round(Math.random()*(array.length-1))]},{name:'河南',value:array[Math.round(Math.random()*(array.length-1))]},{name:'山西',value:array[Math.round(Math.random()*(array.length-1))]},{name:'陕西',value:array[Math.round(Math.random()*(array.length-1))]},{name:'甘肃',value:array[Math.round(Math.random()*(array.length-1))]},{name:'宁夏',value:array[Math.round(Math.random()*(array.length-1))]},{name:'重庆',value:array[Math.round(Math.random()*(array.length-1))]},{name:'湖南',value:array[Math.round(Math.random()*(array.length-1))]},{name:'广东',value:array[Math.round(Math.random()*(array.length-1))]}];

    var addedAmount=0;
    var addedCount=0;
    this.state.detailData.map(function(item,i){
        if(item.value!=0){
          addedCount = addedCount + 1
          addedAmount = addedAmount + item.value
        }
        return addedCount ,addedAmount
      }
    )
    this.setState(function(prveState,){  
      data.count=prveState.data.count + addedCount
      data.amount=prveState.data.amount + addedAmount
      data.todayCount=prveState.data.todayCount + addedCount
      data.todayAmount=prveState.data.todayAmount + addedAmount
      return {
        data:data,
        detailData:detailData
      }
    });
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
      <Row className={styles.border}>
        <div className={styles.bg+' '+ styles.bgLeftTop}></div>
        <div className={styles.bg+' '+ styles.bgRightTop}></div>
        <div className={styles.bg+' '+ styles.bgLeftBottom}></div>
        <div className={styles.bg+' '+ styles.bgRightBottom}></div>
        <Col sm={12} xs={24} className={styles.cellCont+' '+styles.first}>                  
          <div className={styles.topCont}>
            <h5>总交易额(元)</h5>
            <p>{this.state.data.count}笔</p>
          </div>
          <h4 className={styles.number}>￥<b>{this.state.data.amount.toFixed(2)}</b></h4>
        </Col>
        <Col sm={12} xs={24} className={styles.cellCont}>
          <div className={styles.topCont}>
            <h5>今日交易额(元)</h5>
            <p>{this.state.data.todayCount}笔</p>
          </div>
          <h4 className={styles.number +' '+ styles.yFontColor}>￥<b>{this.state.data.todayAmount.toFixed(2)}</b></h4>
        </Col>
      </Row>
    )
    
  }
}
export default TradingVolume;

