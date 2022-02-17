export default function createunId(clickList) {
    var radom=function(){
        return Number(
            Math.random()
            .toString()
            // 返回从指定位置开始的字符串中指定字符数的字符
            .substr(2)
            //转为6进制
        ).toString(36);     
    };
    var arr=[];
    let i=0;
    //为arr赋值id
    for(i;i<clickList.length;i++){
        arr[i]=clickList[i].id;
    }
    function createId(){
        var num = radom();
        var _bool =false;
        arr.forEach(v=>{
            //v为arr数组的值，判断是否重复
            if (v === num) _bool =true;
        });
        if(_bool){
            //重复则重新调用createId生成radom
            createId();
        }else{
            //不重复则向arr末尾添加新id
            arr.push(num);
        }
    };
    createId();
    // this.unid = arr[0];
    //输出arr的最后一项，作为新数组
    return arr.slice(-1)[0];
}