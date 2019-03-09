import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

var data=[{time:0,value: 17},{time:1,value:20},{time:2,value:10},{time:3,value:5},{time:4,value: 10},{time: 5,value: 5},{time: 6,value: 16},{time: 7,value: 20},{time: 8,value: 45},{time:9,value:48},{time:0,value: 17},{time:11,value: 120},{time:12,value: 56},{time: 13,value: 98},{time:14,value: 82},{time:15,value: 19},{time:16,value: 20},{time:17,value: 35},{time:18,value:20},{time:19,value: 45},{time:20,value: 30},{time:21,value: 4},{time:22,value: 12},{time:23,value: 5}];

class TodaySaleBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        saleData:data,
        date: new Date()
    };
  }
  getAjax() {
    var sale=this.state.saleData;
    const hour=this.state.date.getHours();
    const xData=sale.map((item) => {
      if(item.time<10){
        return '0'+item.time+":00"
      }else{
        return item.time+":00"
      }      
    })
    sale.forEach(function(item,index){
      if(hour==item.time){
        var newValue=item.value+parseInt(Math.random()*10);
        item.value=newValue
      }
    });
    this.setState({
      saleData:sale
    })

    this.setState({
      saleData:data
    })
    var myChart = echarts.init(document.getElementById('todaySaleBar'));
    const option={
      color:['#58a2f6'],
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        textStyle: {
          color: '#444'
        },
        formatter:function(params){
          return '<div style="color:#333;text-align:left;">实时销量</div><div>' + params.data.time+':00' + '&nbsp;&nbsp;<span style="color: ' + params.color + ';">' + params.value + '</span></div>';
        }
      },
      legend: {
          show:false,
      },
      xAxis:[
        {
          type : 'category',
          data : xData,
          axisLabel:{
            show: true,
            textStyle: {
                color: '#58a2f6'
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color:'#5192da',
              width:'1'
            }
          }
        }
			],
			yAxis:[
		    {
          type : 'value',
          axisLabel:{
            textStyle: {
                color: '#58a2f6'
            },
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color:'#5192da',
              width:'1'
            }
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:['#273460'],
              width:1,
            }
          }
		    },
			],
			dataZoom:[
				{
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          start: 1,
          end:100
        },
			],
      series: [{
        name: '实时销量',
        type:'bar',
        data:this.state.saleData
      }]
    }
    myChart.setOption(option)
  }

  componentDidMount(){
    this.tick()
    this.getAjax();    
    this.timerID = setInterval(
      () => this.tick(),
      3000
    );
    this.interval=setInterval(
      () => this.getAjax(),
      3000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render(){
    return(
      <div id="todaySaleBar" style={{width:360,height:296}}></div>
    )
  }
}
export default TodaySaleBar;

