
<template>
   <div>
       <el-container class="_designer">
           <el-main>
               <el-container>
                    <el-aside class="_main">
                        <!-- 左侧选择表单元素目录 -->
                        <template v-for="(item, index1) in menuList">
                            <div :key="index1">
                                <h4 class="_title">{{ item.title }}</h4>
                                <!-- 根据点击获取对应表单元素名并生成唯一unid -->
                                <div v-for="(data,index2) in item.list" :key="index2" class="_item" :formname="formname" :formprop="formprop" :unid="unid" @click="createfrom_one(index1,index2)">
                                    <div class="_icon">
                                        <i class="_fc-icon" :class="data.icon || 'el-icon-edit'"></i>
                                    </div>
                                    <span class="_icon_name">{{ data.label }}</span> 
                                    <!-- {{data.placeholder}} -->
                                </div>
                            </div>
                        </template>
                    </el-aside>
                    <el-container>
                        <el-main class="_main">
                            <h4 class="_title_main">表单界面</h4>
                            <!-- 中间生成表单元素组件 通过v-for循环selectformCreate组件生成 -->
                            <!-- :dataname="data.name" :formId="data.value.unid" :menuList="menuList" -->
                            <selectformCreate>
                            </selectformCreate>
                        </el-main>
                    </el-container>
                    <el-aside class="_main">
                       <h4 class="_title">{{formname}}属性</h4>
                       <!-- 右侧表单元素对应属性组件 -->
                       <propshow>
                       </propshow>
                    </el-aside>
                    <el-dialog>
                        dialog
                    </el-dialog>
               </el-container>
           </el-main>
       </el-container>
   </div>
</template>

<script>
import createMenu from '../config/menu';
import selectformCreate from './selectformCreate';
import propshow from './propshow';
import createunId from '../config/createunId'
export default {
    name: 'FcDesigner',
    props: ['menu'],
    components: {
        selectformCreate,
        propshow,
    },
    methods: {
        createfrom_one(index1,index2){
            console.log("获取到点击的选项: "+this.menuList[index1].list[index2].label+" ,并在container-from里生成对应的表单组件");
            //在点击左侧选项框时生成唯一id，用clicklist数组记录表单属性和表单元素类型（input/number/radio）
            this.unid=createunId();
            this.formname=this.menuList[index1].list[index2].name;
            this.formprop=this.menuList[index1].list[index2];
            let a=this.formprop;
            console.log("this.formprop=====a",this.menuList[index1].list[index2]);
            //在clickList数组末尾新增一项
            this.clickList.push({name: this.formname,id:this.unid,value:a});
            // this.clickList[0].value.placeholder="hhhhhhhhhhhhhh";
            // console.log("更新后的clicklist数组2",this.clickList);

            let clickLists=this.clickList;
            // clickLists[0].value="";
            console.log("更新后的clicklist数组2",clickLists);
            this.$bus.$emit('props_clickLists',clickLists);
        },
        //获取selectformCreate子组件传的参数sel_to_Fc
        props_Sel_to_Fc(Sel_to_Fc){
            let id=Sel_to_Fc.id;
            let name=Sel_to_Fc.name;
            this.formname=name;
            let value=Sel_to_Fc.value;
            let Fc_to_Pro={
                id,
                name,
                value
                // lists
            }
            //触发propshpw子组件的props_Fc_to_Pro方法
            this.$bus.$emit('props_Fc_to_Pro',Fc_to_Pro);
        },
        //获取propshow子组件传的参数Pro_to_Fc,在修改时调用
        props_Pro_to_Fc(Pro_to_Fc){
            let i=0;
            let j=0;
            for(i;i<this.clickList.length;i++){
                // console.log("Pro_to_Fc.update_id",Pro_to_Fc.update_id);
                // console.log("this.clickList[i].id",this.clickList[i].id);
                if(Pro_to_Fc.update_id==this.clickList[i].id){
                    let update_id=Pro_to_Fc.update_id;
                    let update_name=Pro_to_Fc.update_name;
                    let update_value=Pro_to_Fc.update_value;
                    let Fc_to_Sel={
                        update_id,
                        update_name,
                        update_value
                        // lists
                    }
                    //触发selectformCreate子组件的props_Fc_to_Pro方法
                    this.$bus.$emit('props_Fc_to_Sel',Fc_to_Sel);
                }
            }
        }
    },
    data(){
        return{
            menuList: createMenu(),
            //存储点击事件的数组，包含value和id
            clickList:[],
            formname:"",
            dataname:"",
            formprop:{},
            unid:""
        }
    },
    mounted(){
        //接受子组件selectformCreate的参数
        this.$bus.$on('props_Sel_to_Fc',this.props_Sel_to_Fc) 
         //接受子组件propshow的待修改参数
        this.$bus.$on('props_Pro_to_Fc',this.props_Pro_to_Fc)   
    },
    
};
</script>


<style lang="css">
    ._main{
        height: 550px;
        overflow: auto;
    }
    ._item {
    display: inline-block;
    background: #FFF;
    color: #000;
    min-width: 70px;
    width: 33.33%;
    height: 70px;
    line-height: 1;
    text-align: center;
    transition: all .2s ease;
    cursor: pointer;
    }
    ._item i {
        font-size: 21px;
        display: inline-block;
    }

    ._item ._icon_name {
        font-size: 12px;
    }

    ._item ._icon {
        padding: 10px 5px 12px;
    }
    ._item:hover {
        background: #2E73FF;
        color: #fff;
    }
    ._fc-icon {
    font-size: 14px;
    margin-right: 2px;
    }
    ._title_main{
        position: relative;
        top: -20px;
    }
</style>
