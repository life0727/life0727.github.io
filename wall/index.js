var YG = new Wilddog("https://life0727.wilddogio.com/wallData");
// var getWallData = () =>{
//     let WallDataArr = [];
//     YG.on('child_added', function(datasnapshot) {
//         let resData = datasnapshot.val();
//         WallDataArr.push(resData)
//     });
//     return WallDataArr
// }

async function getWallData(){
    let WallDataArr = [];
    YG.on('child_added', function(datasnapshot) {
        let obj = Object.assign({},datasnapshot.val());
        obj.time = JSON.parse(datasnapshot.val().time.replace(/T/g," ")).slice(0,16)
        WallDataArr.push(obj)
        console.log(WallDataArr)
    });
    return WallDataArr
}
//console.log(getWallData())
var app = new Vue({
    el: '#app',
    data: {
        data:[]
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
        console.log(boxList)
        boxList.forEach(element => {
            element.style.boxShadow = '5px 5px 2px #ccc'
            element.style.background = colorList[parseInt(Math.random()*8)]
        });
    },
    methods: {
       
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
