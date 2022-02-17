export default function createunId() {
    var n=1;
    var radom=function(){
        return Number(
            Math.random()
            .toString()
            // 返回从指定位置开始的字符串中指定字符数的字符
            .substr(2)
        ).toString(36);     
    };
    var arr=[];
    function createId(){
        var num = radom();
        var _bool =false;
        arr.forEach(v=>{
            console.log("arr["+v+"]",arr[v]);
            if (v === num) _bool =true;
        });
        if(_bool){
            createId();
        }else{
            arr.push(num);
        }
    };
    var i=0;
    while(i<n){
        createId();
        i++;
    }
    // this.unid = arr[0];
    return arr[0];
}