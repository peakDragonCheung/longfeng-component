<template>
    <div>
        <p class="changeCol-title">已显示（点击×不显示，√ 显示，左右拖动设置排列顺序）</p>
        <ul class="myButtonBox" id="showLabels" @dragover="allowDrop($event)" @drop="drop($event)" @dragstart="drag($event)">
            <li class="ele" draggable="true" v-for="item in showLabels" :key="item.name">{{item.name}} <i @click="deleteLabel(item)" class="el-icon-close close"></i></li>
        </ul>
        <p class="changeCol-title">未显示</p>
        <ul class="myButtonBox noSortBox" >
            <li class="ele fixele" v-for="item in noShowlabels" :key="item.name">{{item.name}} <i @click="showUserLabels(item)" class="el-icon-check check"></i></li>
        </ul>
        <div class="changeCol-foot-button">
            <el-button type="primary" @click="saveSort"> 保存</el-button>
            <el-button plain @click="cancel"> 取消</el-button>
        </div>
    </div>
</template>
<script>
import debounce from '@/utils'
export default {
    props: {
        value: {
            type: Array,
            default: () => {}
        },
        allLabels: {
            type: Array,
            default: () => {}
        },
        showLength: {
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            currentTarget: null,
            noShowlabels: [
            ],
            showLabels: [
            ],
            sortText: [],
            time: null
        }
    },
    methods: {
        allowDrop(ev) {
            ev.preventDefault();
            },
        drag(ev) {
            ev.dataTransfer.setData("Text",ev.target.innerText);
            this.currentTarget = ev.target;
            },
        drop(ev){
            ev.preventDefault();
            var data=ev.dataTransfer.getData("Text");
            var target = ev.target;
            if (target.nodeName === "LI"&&target !== this.currentTarget) {
                    //_index是实现的获取index              
                    if (this._index(this.currentTarget) < this._index(target)) {
                        target.parentNode.insertBefore(this.currentTarget, target.nextSibling);
                    } else {
                        target.parentNode.insertBefore(this.currentTarget, target);
                    }
                    this.sortText = [].map.call(target.parentNode.children, item => {
                        return item.innerText;
                    })
                }
            },
        _index(el) {
            var index = 0;
            if (!el || !el.parentNode) {
                return -1;
            }
            while (el && (el = el.previousElementSibling)) {
                index++;
            }
            return index;
            },
        deleteLabel(item) {
            this.showLabels.splice(this.showLabels.indexOf(item),1);
            this.noShowlabels.push(item);
        },
        showUserLabels(item) {
                if(this.showLabels.length >= this.showLength) {
                    this.$message({
                        type: 'warning',
                        message: '超过列表展示上限！'
                    })
                    return
                }
                this.noShowlabels.splice(this.noShowlabels.indexOf(item),1);
                this.showLabels.push(item);
        },
        getSortArrayByNames(names, labels) {
            // 返回英文的字段给table页进行循环渲染展示，
            if(names.length === 0 && Array.isArray(names)) {
                // 表示没有移动节点，直接返回展示的 数组即可
                return JSON.parse(JSON.stringify(labels));
            }
            if(Array.isArray(names) && Array.isArray(labels)) {
                return names.map(name => {
                   const label = labels.find(ele => {
                      return ele.name.trim() == name.trim()
                   });
                   return {
                       key: label.key,
                       name,
                       width: label.width
                   } 
                })
            } else {
                console.error('names or labels not a Array type');
            }
        },
        updateSortlabel() {
            this.sortText = [].map.call(document.querySelector('#showLabels').children, item => {
                        return item.innerText;
                    })
        },
        saveSort() {
           this.updateSortlabel();
           const sortKeys = this.getSortArrayByNames(this.sortText, this.showLabels);
           this.$emit('input', sortKeys);
           this.$emit('closeDialog');
        },
        cancel() {
            this.$emit('closeDialog');
        }
    },
    created() {
        
        let labels = JSON.parse(JSON.stringify(this.allLabels));
        
        // this.noShowlabels = labels.slice(0,5);
        this.showLength = this.showLength > labels.length ?labels.length:this.showLength // 默认当设置的值大于，实际所有的label的长度时，默认为 全部的长度。
        // this.showLabels = JSON.parse(JSON.stringify(labels)).slice(0,this.showLength);
        // this.noShowlabels = JSON.parse(JSON.stringify(labels)).slice(this.showLength,labels.length);
        // 如果value 传值 那么就可以 进行默认传值进行操作
        this.showLabels = JSON.parse(JSON.stringify(this.value))
        if(this.value && this.value.length > 0) {
            this.value.forEach(element => {
            labels.some((ele, index) => {
                    if(ele.key === element.key) {
                        labels.splice(index, 1);
                        return true
                    }
                })
            });
        this.noShowlabels = JSON.parse(JSON.stringify(labels));
        }
    }
}
</script>
<style lang="scss" scoped>
.myButtonBox {
        list-style: none;
        font-size: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
    .ele {
        font-size: 16px;
        width: 100px;
        height: 40px;
        border: 1px solid #999;
        background: #409EFF;
        margin: 2px 0;
        border-radius: 10px;
        color: white;
        cursor: move;
        margin: 10px;
        line-height: 40px;
        text-align: center;
        transition: all 2s;
        position: relative;
    }
    .fixele{
        cursor:default;

    }
    .noSortBox{
        // border: 1px solid red;
    }
    .close{
        color: #d0cba8;
        position: absolute;
        font-size: 12px;
        cursor: pointer;
        right: 5px;
        top: 3px;
    }
    .check{
        color: #31ff00;
        position: absolute;
        font-size: 12px;
        cursor: pointer;
        right: 5px;
        top: 2px;
    }
    .changeCol-title{
        border-bottom: 2px #eee solid;
        padding: 10px;
    }
    .changeCol-foot-button{
        display: flex;
        flex-direction: row-reverse;
        margin-top: 1rem;
        .el-button{
            width: 100px;
            margin-left: 1rem;
        }
    }
</style>
