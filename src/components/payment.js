import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';


class Payment extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        
    };
  }
  getAjax() {
    var weixin=(Math.random()*(73-65+1)+65).toFixed(2);
    var zhifubao=(100 - weixin).toFixed(2);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('payment'));
    // 绘制图表
    var option={
        tooltip: {
          trigger: 'item',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderColor: '#cee5ff',
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
              color: '#444'
          },
          formatter:function(params){
            return '<div>' + params.data.name + ':&nbsp;&nbsp;<span style="color: ' + params.color + ';">' + params.value + '%</span></div>';
          }
        },
        color: ['#13A465', '#3092E5'],
        xAxis: [{
          type: 'value',
          show: false,
          position:'top'
        }],
        yAxis: [{
          type: 'category',
          show: false,
          data: ['支付占比']
        }],
        series: [
          {
            type: 'bar',
            stack: '支付占比',
            barWidth: 36,
            itemStyle: {
              normal: {
                  barBorderRadius: [4,0, 0, 4],    
              }
            },
            label: {
              normal: {
                  show: true,
                  position: 'bottom',
                  offset:[0,-30],
                  fontSize: 14,
                  color:'#E3F0FF'
              }
            },
            data: [{
              name: '微信',
              value: weixin,
              label: {
                position: 'left',
                normal: {
                  formatter: [
                      '{c}%'
                  ].join('\n'),
                  rich: {
                    Weixin: {
                      height: 40,
                      align: 'center'
                    }
                  }
                }
              }
            }]
          },
          {
            type: 'bar',
            stack: '支付占比',
            barWidth: 36,
            itemStyle: {
              normal: {
                  barBorderRadius: [0,4, 4, 0],    
              }
            },
            label: {
              normal: {
                show: true,
                position: 'bottom',
                offset:[0,-30],
                fontSize: 14,
                color:'#E3F0FF'
              }
            },
            data: [{
                name: '支付宝',
                value: zhifubao,
                label: {
                  normal: {
                    formatter: [
                      '{c}%'
                    ].join('\n'),
                    rich: {
                      Zhifubao: {
                        height: 40,
                        align: 'center'
                      }
                    }
                  }
                }
            }]
          }
        ]
    }
    myChart.setOption(option);
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
      <div id="payment" style={{ width:360, height: 38 }}></div>
    )
  }  
}
export default Payment;

