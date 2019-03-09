import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import $ from 'jquery'
import styles from './index.less';

var mapName = 'china';

var geoCoordMap = {};
/*获取地图数据*/
var mapFeatures = echarts.getMap(mapName).geoJson.features;
mapFeatures.forEach(function(v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;
});

var convertData = function(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
      });
    }    
  }
  return res;
};


class DeviceMap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        
    };
  }


  getAjax(){
    var array = [0,4.5,1.5,0,1,0];
    const data = [{name:'上海',value: array[Math.round(Math.random()*(array.length-1))]},{name:'浙江',value:array[Math.round(Math.random()*(array.length-1))]},{name:'河南',value:array[Math.round(Math.random()*(array.length-1))]},{name:'山西',value:array[Math.round(Math.random()*(array.length-1))]},{name:'陕西',value:array[Math.round(Math.random()*(array.length-1))]},{name:'甘肃',value:array[Math.round(Math.random()*(array.length-1))]},{name:'宁夏',value:array[Math.round(Math.random()*(array.length-1))]},{name:'重庆',value:array[Math.round(Math.random()*(array.length-1))]},{name:'湖南',value:array[Math.round(Math.random()*(array.length-1))]},{name:'广东',value:array[Math.round(Math.random()*(array.length-1))]}];
    this.setState({data:data});

    var myChart = echarts.init(document.getElementById('deviceMap'));

    
    var option={
      tooltip: {
        trigger: 'item',
        offset:[0,0],
        // formatter:function(params){
        //   console.log(params)
        //   var value='';
        //   if(params.value[2]){
        //     value='￥'+params.value[2];
        //     return value
        //   }else{
        //     return ''
        //   }
        // }
      },
      geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
      },
      series:[
        {
          name: '交易金额',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'none', 
          symbolOffset:[0,-20],
          symbolSize:[56,28],
          label: {
            normal: {
              show: true,
              textStyle: {
                  color: '#fff',
                  fontSize: 12,
                  padding:[6,10,6,10]
              },
              formatter:function(params){
                let value='';
                if(params.value[2]){
                  value='￥'+params.value[2].toFixed(2);
                  return value
                }else{
                  return ''
                }
              },
            },
            emphasis: {
              show: false,
            }
          },
          itemStyle:{
            borderWidth:1,
            borderColor:'red'
          },
          zlevel: 6,
          data: convertData(data),
          animationDuration: function (idx) { // 越往后的数据延迟越大
            return idx * 150+ 100;
          },
          animationDelay: function (idx) {
            return idx *50+ 100;
          },
          animationDurationUpdate:1
        },
        {
          name: '散点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(data),
          symbolSize:8,
          showEffectOn: 'render',
          rippleEffect: {
              brushType: 'stroke'
          },
          hoverAnimation: true,
          itemStyle: {
              normal: {
                  color: '#5BB491',
                  shadowBlur:10,
                  shadowColor: '#5BB491'
              }
          },
          zlevel: 1,
          tooltip:{
            formatter:'{c}'
          }     
        },
        {
          name: '中国',
          type: 'map',
          mapType: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              color:'#111'
            }
          },
          itemStyle:{
            normal: {
              areaColor:'#09153f',
              borderColor:'#3B5077',
              borderWidth:1
            },
            emphasis: {
              areaColor: '#4B8CD9',
            }
          },
          data:data
        }
      ]
    }
    var opt = option.series[0];
    itemHide(opt);
    //数据为零时隐藏线段
    function itemHide(opt) {
        var countdown=3;
        //循环获取数据进行处理
        $.each(opt.data, function (i, item) {
            //value等于0改变label与labelLine属性
            if (item.value[2] === 0) {
                item.symbol='none';
                // item.label.show = false;
            }else{
              item.symbol='image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAcCAYAAAA0u3w+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMjQyMDliNy1lYzg0LTIzNGYtYmUxOS0wMGZiNmI1NjdmZjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTQzM0Q5RjdGNkU3MTFFOEE1QjVCQzRCMTQ5RDhBNkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTQzM0Q5RjZGNkU3MTFFOEE1QjVCQzRCMTQ5RDhBNkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmNjZTZlMzUtMGQ2OC02MTRiLWE2YWItY2RhY2E5OWIyZDJhIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDI3MmIxYTctZDMzMi1lZjRmLWFlYTctZDA0NTYwNWFmZDljIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XxU4SgAAANdJREFUeNpifJot8Z9hGAMWKC09TP33lIlhmINRD456cNSDox4c9eCoB0c9OOrBUQ+OenDUg6MeHPXgqAdHPTjqwUEIYINOMTQyHzRitwmIP+OQ5wViPyBmpJUHGZ9mS8ykYQDKALEEEEdh8STIc8uA+AUQP6GZB6VMulEETpv3UtV8IJ4AxPZAHAHEn6DifEC8AogPAnEBNKapAkxPFtM1D4Icng/Ee4B4FRALQPEqqFg+NT2HLw/SGpQAcSfUYyAPbQPicnoWMvQAIA/9gbKr6WUpQIABAAFnIWTa8LtKAAAAAElFTkSuQmCC';
             
            }
        });
    }
    
    
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
      <div id="deviceMap" style={{width:900,height:732}}></div>
    )
  }
}
export default DeviceMap;

