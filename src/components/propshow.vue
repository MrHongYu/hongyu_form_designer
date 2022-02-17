<template>
    <div :name="name">
        <div>
            当前标签id：{{form_id}}    
        </div>
        <br>
        <div>
            当前标签name：{{form_name}}
        </div>
        <br>
        <div @click="update_form">当前属性：</div>
            {{form_value}}
            <!-- {{form_props.props().placeholder}} -->
            <br><br>
            <input type="text" v-model="input">

        <div>
            
        </div>
        <div>
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'propshow',
    computed:{
    },
    methods:{
        //传递修改后的值给selectformCreate组件，先传递给父组件FcDesgner
        update_form(){
            this.form_value={placeholder:this.input};
            // this.form_value.placeholder="ssssssss"
            let update_id = this.form_id;
            let update_name =this.form_name;
            let update_value = this.form_value;
            console.log("update_id",update_id);
            let Pro_to_Fc={
                update_id,
                update_name,
                update_value
            }
            //触发FcDesgner父组件的props_Pro_to_Fc方法
            this.$bus.$emit('props_Pro_to_Fc',Pro_to_Fc);
        },
         //获取FcDesigner父组件传的参数Fc_to_Pro
        props_Fc_to_Pro(Fc_to_Pro){
            this.form_id=Fc_to_Pro.id;
            this.form_name=Fc_to_Pro.name;
            this.form_value=Fc_to_Pro.value;
            console.log("name,props,lists:",this.form_name,this.form_value);
        }
    },
    data(){
        return {
            name:"type",
            form_id:"",
            form_name:"",
            form_value:{},
            input:""
        }
    },
    mounted(){
        //接受父组件FcDesigner的待修改参数Fc_to_Pro
        this.$bus.$on('props_Fc_to_Pro',this.props_Fc_to_Pro)
    }
}
</script>

<style>

</style>