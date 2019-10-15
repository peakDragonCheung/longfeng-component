<template>
    <div class="content">
        <div  class="content-left">
            <slot></slot>
        </div>
        <div class="content-right">
            <h3>
                {{name}}
            </h3>
            <div>
            <ul>
                <li v-for="(item, index) in anchorArray" class="nav-item" @click="setLocaltion(item)" :key="index">
                    <a > {{item}}</a>
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            anchorArray: []
        }
    },
    created() {
        
    },
    mounted() {
        this.anchorArray = this.$children.map(ele => ele.name)
    },
    methods: {
        setLocaltion(name) {
            document.getElementById(name).scrollIntoView();
        }   
    },
}
</script>

<style scoped >
    .content{
        display: flex;
    }
    .content-left{
        width: 60%;
        margin-left: 30px;
    }
    .content-right{
        width: 20%;
        height: 50vh;
        overflow:auto;
        padding: 10px;
        position: absolute;
        right: 20px;
    }

    .nav-item {
        display: block;
        height: 40px;
        color: #444;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
        font-size: 12px;
        cursor: pointer;
    }
    .nav-item:active, .nav-item:hover {
        color: #409eff;
    }
    .content-right h3 {
            font-size: 24px;
            color: #999;
            line-height: 26px;
            margin-top: 15px;
    }
</style>