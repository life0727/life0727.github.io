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
        obj.time = new Date(obj.time).Format("yyyy-MM-dd hh:mm")
        WallDataArr.push(obj)
    });
    return WallDataArr
}
//console.log(getWallData())
var app = new Vue({
    el: '#app',
    data: {
        data:[]
    },
    mounted() {
       
        getWallData()
                    .then(data => this.data = data)
    },
    methods: {

    },
    // watch:{
    //     toChildMsg:{
    //         handler(val){
    //             console.log(val)
    //         },
    //         deep:true
    //     }
    // }
})
