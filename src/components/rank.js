import React from 'react';
import styles from './index.less';
// import {Carousel} from 'antd'
// import $ from 'jquery';

// 比较
function compare(propertyName){
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
    }
}

// 列表
class ArrayList extends React.Component{
    render(){
        const listItems = this.props.data.map((item) =>
            <div key={item.id} className={styles.item}>
                <span>{item.name}</span>
                {item.total?<div className={styles.inner}><span>{item.total+'/'}</span><span>{item.value+item.unit}</span></div>:<span>{item.value}</span>}
            </div>
        );
        return (
            <div className={styles.list+' '+(this.props.id=='exceptionDevice'?styles.exceptionDevice:'')}>
                <div className={styles.scroll} style={{position: 'relative',animation: '10s rowup linear infinite normal'}}>
                    {listItems}{listItems}
                </div>
            </div>
            // <Carousel className={styles.list + ' ' + this.props.id + ' ' + (this.props.id=='exceptionDevice'?styles.exceptionDevice:'') } autoplay={true} vertical dots={false} speed={2800} autoplaySpeed={0} easing="linear">
            //     {listItems}
            // </Carousel>
        );
    }
}
// 机器销量
class MachineRank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    getAjax(){
        // $.ajax({
        //     url:'http://mock-api.com/6RKDv0ga.mock/machinelist',
        //     dataType:'json',
        //     success:function(res){
        //         this.setState({data:res});
        //         console.log("res")
        //     }.bind(this),
        //     error:function(e){
        //         // console.log(e.toString());
        //     }.bind(this)
        // });
        const data = [{id:1,value:190,unit:'笔',name:'VEM1902223',total:'￥4200'},{id:12,value:180,unit:'笔',name:'VEM1902564',total:'￥3804'},{id:11,value:164,unit:'笔',name:'VEM1902245',total:'￥3604'},{id:9,value:'156',unit:'笔',name:'VEM1902123',total:'￥3204'},{id:10,value:153,unit:'笔',name:'VEM1923423',total:'￥3120'},{id:3,value:146,unit:'笔',name:'VEM1902342',total:'￥3056'},{id:7,value:123,unit:'笔',name:'VEM1908223',total:'￥2806'},{id:2,value:106,unit:'笔',name:'VEM1985678',total:'￥2610'},{id:8,value:101,unit:'笔',name:'VEM1902756',total:'￥2560'},{id:19,value:99,unit:'笔',name:'VEM1902564',total:'￥2355'}];

        data.sort(compare("value"));
        this.setState({data:data});
    }
    componentDidMount(){
        this.getAjax();
        this.interval=setInterval(() => this.getAjax(),5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(){
        return(
            <ArrayList data={this.state.data} id={this.props.id}/>
        )
    }
}

// 商品销量
class GoodsRank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    getAjax(){
        const data = [{id:1,name:'百事可乐330ML',value:560,unit:'笔',total:'￥1400'},{id:2,value:460,unit:'笔',name:'维他奶250ml',total:'￥1380'},{id:3,value:452,unit:'笔',name:'娃哈哈 220g',total:'￥1320'},{id:4,value:446,unit:'笔',name:'可口可乐330ml',total:'￥1280'},{id:5,value:432,unit:'笔',name:'脉动青柠口味400ml',total:'￥1209'},{id:6,value:423,unit:'笔',name:'维他奶原味250ml',total:'￥1168'},{id:7,value:413,unit:'笔',name:'雪碧柠檬味330ml',total:'￥1132'},{id:8,value:365,unit:'笔',name:'蒙牛特仑苏纯牛奶250ml',total:'￥1128'},{id:9,value:363,unit:'笔',name:'蒙牛纯牛奶250ml',total:'￥1089'},{id:10,value:356,unit:'笔',name:'蒙牛谷粒早餐谷物牛奶饮品250ml',total:'￥982'}];

        data.sort(compare("value"));
        this.setState({data:data})
    }
    componentDidMount(){
        this.getAjax();
        this.interval=setInterval(() => this.getAjax(),5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        return(
            <ArrayList data={this.state.data}  id={this.props.id}/>
        )
    }
}

// 异常设备
class ExceptionDevice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    getAjax(){
        const data = [{id:1,value:'60',name:'VEM1902213'},{id:12,value:'12',name:'VEM1902156'},{id:11,value:'11',name:'VEM1902523'},{id:9,value:'9',name:'VEM1962123'},{id:10,value:'56',name:'VEM1902823'},{id:3,value:'3',name:'VEM1902896'},{id:7,value:'7',name:'VEM1908923'},{id:2,value:'2',name:'VEM1906223'},{id:8,value:'8',name:'VEM1909523'}];

        data.sort(compare("value"));
        this.setState({data:data})
    }
    componentDidMount(){
        this.getAjax();
        this.interval=setInterval(() => this.getAjax(),5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(){
        return(
            <ArrayList data={this.state.data}  id={this.props.id}/>
        )
    }
}

function GetRankData(props){
    const id=props.id;
    if(id=='machineRank'){
        return <MachineRank  id={id}/>
    }else if(id=='goodsRank'){
        return <GoodsRank  id={id}/>
    }else{
        return <ExceptionDevice  id={id}/>
    }
}
class Rank extends React.Component{
    render(){
        return(
            <GetRankData id={this.props.id}/>
        )
    }
}

export default Rank;