import Vue from 'vue'
import './index.scss'
import { Button, Select, Container, Header,Aside, Main, Footer } from 'element-ui'
// import  as components from 'element-ui'
const componentObj = { Button, Select, Container, Header, Aside, Main, Footer };
for (const key in componentObj) {
    if(componentObj[key]) {
        Vue.component(componentObj[key].name, componentObj[key])
    }
}
