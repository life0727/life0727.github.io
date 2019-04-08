var YG = new Wilddog("https://life0727.wilddogio.com/wallData");
// var getWallData = () =>{
//     let WallDataArr = [];
//     YG.on('child_added', function(datasnapshot) {
//         let resData = datasnapshot.val();
//         WallDataArr.push(resData)
//     });
//     return WallDataArr
// }
//size 35
async function getWallData(){
    let WallDataArr = [];
    YG.on('child_added', function(datasnapshot) {
        let obj = Object.assign({},datasnapshot.val());
        obj.time = JSON.parse(datasnapshot.val().time.replace(/T/g," ").replace(/,/g,"  ")).slice(0,16)
        WallDataArr.unshift(obj)
    });
    return WallDataArr
}
//console.log(getWallData())
var app = new Vue({
    el: '#app',
    data: {
        data:[],
        form:{
            name:'',
            content:''
        },
        openWallSwitch:false
    },
    created() {
        getWallData()
                    .then(data => {
                        this.data = data
                    })
    },
    mounted() {    
         
    },
    updated() {
        let boxList = this.$refs.box;
        var colorList = ['#f34c81','#ffe75f','#688dff','#855df3','#23aacf','#ff6f7a','#60b680','#fd9c35','#dd4444'];
        boxList.forEach(element => {
            element.style.boxShadow = '5px 5px 2px #ccc'
            element.style.background = colorList[parseInt(Math.random()*(colorList.length -1 ))]
        });
    },
    methods: {
        openWall(){
            this.openWallSwitch = true;  
        },
        downWall(){
            const nameList = ['石头人','小学僧','托儿所','儿童劫','小跑','墨菲特','伊泽瑞尔','小鱼人','提莫儿','轮子妈','蒙多','雪人','斯巴达','稻草人','卡萨丁','狼人','德玛','男刀','峡峰先谷','红爸爸','蓝爸爸']
            this.openWallSwitch = false; 
            let obj = Object.assign({},{"name":this.form.name.trim() ? this.form.name : nameList[parseInt(Math.random()*(nameList.length -1 ))],"content" : this.form.content.trim() ? this.form.content.length > 35 ? this.form.content.slice(0,35) + '..' :  this.form.content : '这人懒，啥没写' ,"time" : JSON.stringify(new Date())});
            YG.push(obj);
            this.form.name = '';
            this.form.content = '';
        }
    },
    // watch:{
    //     data:{
    //         handler(val){
    //             this.$nextTick(() => {
    //                 console.log(this.$refs.box)[0] 
    //             })
    //         },
    //         deep:true
    //     }
    // }
})
