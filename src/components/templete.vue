<template>
         <subcontainers :name="name">
            <div class="component-box">
                    <p> 基础用法</p>
                    <p class="component-detail">  </p>
                    <div>
                      <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
            </div>
        </subcontainers>
</template>
<script>
import subcontainers from '../component/subcontainers';
export default {
    components: { subcontainers },
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>
<style lang="css" scoped>
    
</style>