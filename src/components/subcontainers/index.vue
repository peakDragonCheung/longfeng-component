<template>
    <div>
        <h2 :id="name" class="component-H2">
            {{name}}
        </h2>
        <br>
        <slot></slot>
        <br><br>    
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
        }
    },
    created() {
    },
}
</script>
<style scoped lang="scss">
    .component-H2{
        font-weight: 400;
        color: #1f2f3d;
        font-size: 28px;    
        margin: 0;
    }
</style>