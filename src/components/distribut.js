import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

class DistributPie extends React.Component{
  
  getAjax(){
    const data=[{name: '广州',value:parseInt(Math.random()*(265-255+1)+255)/*265*/},{name: '深圳',value: 231},{name: '珠海',value: 55},{name: '东莞',value: 89},{name: '长沙',value: 332},{name: '桂林',value: 280},{name: '北京',value: 523},{name: '上海',value: 350},{name: '中山',value: 460},{name: '杭州',value: 560}];
    var total = 0; 
    data.forEach(function(value) {
        total += value.value;
    });
    var myChart = echarts.init(document.getElementById('pieChart'));
    var option={
      color: ['#4793d4','#BFF1E1', '#5BB491','#D970A9','#F5D968','#E7AB95','#944AA9','#DFE58E','#6066C8','#E46A32','#E4913A','#A2B277','#82CF8C'],
      title: {           
        left:"58%",
        top:"36%",
        text: total,
        subtext:'设备总量',
        textAlign:'center',
        textStyle:{
          fontSize:28,
          fontWeight:'normal',
          color:'#c4e5ff',
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: data
      },
      legend: {
        itemGap:8,
        itemWidth:14,
        itemHeight:8,
        orient: 'vertical',
        top: 30,
        left:20,
        data:data,
        textStyle: {
            color: "#c4e5ff",
            fontSize:12
        }          
      },
      series: [
        {
          type:'pie',
          radius: ['40%', '55%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              textStyle: {
                color: '#fff',
                fontWeight: '500',
                fontSize: 0
              }
            }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data:data,
          center: ['60%', '45%'],
        }
      ]
    };
    myChart.setOption(option)
  }
  componentDidMount(){
    this.getAjax();
    
    // console.log(this.setState.data)
    this.interval=setInterval(() => this.getAjax(),1000);
    
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    return(
      <div id="pieChart" style={{ height:296}}></div>
    )
  }
}
export default DistributPie;

