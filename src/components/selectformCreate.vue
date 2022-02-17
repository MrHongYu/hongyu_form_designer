<template>
        <!--         :selectform_props="selectform_props" -->
        <div>
            <div v-for="item in this.formlist" :key="index=item.id">
                <div @click="showprops(index=item.id)"> 
                    <!-- 输入框 -->
                    <el-input
                    class="form"
                    v-if="item.name === 'input'" 
                    v-model="input"
                    :formid="item.id"
                    :showPassword="showPassword"
                    :placeholder="item.value.placeholder"
                    >
                    </el-input>
                    <!-- 计数器 -->
                    <el-inputNumber 
                    class="form"
                    v-if="item.name === 'inputNumber'" 
                    v-model="num"  
                    :min="1" 
                    :max="10" 
                    label="描述文字"
                    :formid="item.id">
                    </el-inputNumber>
                </div>
            </div>       
        </div> 
</template>

<script>
export default {
    name: 'selectformCreate',
    props: ['dataname','menuList','formId'],
    methods: {
        showprops(index){
            // console.log("a",a);
            let i=0;
            for(i;i<this.formlist.length;i++){
                if(index==this.formlist[i].id){
                    console.log("unid",this.formlist[i].id);
                    console.log("dataname",this.formlist[i].name);
                    console.log("formprops/this.selectform_props",this.formlist[i].value);
                    console.log("this.showPassword",this.showPassword);
                    //修改input属性为密码
                    this.showPassword=!this.showPassword;

                    let id=this.formlist[i].id;
                    let name=this.formlist[i].name;
                    let value=this.formlist[i].value;
                    let sel_to_Fc={
                        id,
                        name,
                        value
                    };
                    //触发FcDesigner父组件的props_sel_to_Fc方法
                    this.$bus.$emit('props_Sel_to_Fc',sel_to_Fc);
                }
            }
        },
        //获取FcDesigner父组件传的参数Fc_to_Sel
        props_Fc_to_Sel(Fc_to_Sel){
            let i=0;
            for(i;i<this.formlist.length;i++){
                console.log("selectformCreate.update_id",this.formlist[i].id);
                if(Fc_to_Sel.update_id == this.formlist[i].id){
                    console.log("selectformCreate_formlist",this.formlist);
                    this.formlist[i].value={placeholder:Fc_to_Sel.update_value.placeholder};
                    // this.update_placeholder(Fc_to_Sel.update_props.placeholder);
                    // console.log("this.formlist[i].value.props",this.formlist);
                }
            }
        },
        //获取FcDesigner父组件传的参数clickLists
        props_clickLists(clickLists){
            this.formlist=clickLists;
            console.log("更新的formlist",this.formlist);
        }
    },
    data(){
        return{
            input:"",
            num:"",
            min:"",
            max:"",
            formid:"",
            showPassword:true,
            placeholder:"",
            formlist:[]
        };
    },
    mounted(){
        //接受父组件FcDesigner的待修改参数Fc_to_Sel
        this.$bus.$on('props_Fc_to_Sel',this.props_Fc_to_Sel)
        //接受父组件FcDesigner的参数clickLists
        this.$bus.$on('props_clickLists',this.props_clickLists)
    }
}
</script>

<style>
.form{
    margin: 5px;
}

</style>