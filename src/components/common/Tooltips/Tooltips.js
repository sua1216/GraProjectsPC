import vue from 'vue'
import Tooltips from './Template.vue'/*弹窗的内容，此处的单文件组件作为承载对象*/
import Mask from './Mask.vue'/*弹窗外部样式，内部设置slot接收弹窗内容*/


//使用vue的extend，以vue文件为基础组件，返回一个可以创建vue组件的特殊构造函数
const ToastConstructor =  vue.extend(Tooltips);

function showToast(options){
/*传入参数    {render:(h)=>{
                h(component)
          }}*/
    const toastDom = new ToastConstructor({
        el : document.createElement('div'),
        render:function (h) {/*h相当于createElement，但是又有区别，传入h备用*/
            return h(Mask,{props:options.tooltipOption?options.tooltipOption:''},[/*h返回Vnode代码，$slots即插入位置*/
                h(options.render,{props:options.props?options.props:''}, this.$slots.default),/*创建弹窗内容，插入到上级文件即mask的slot中*/
            ])
        }
    })
    //在body中动态创建一个div元素，后面自动会把它替换成整个vue文件内的内容
    document.body.appendChild(toastDom.$el);
    return toastDom.$children[0]
}

function registryTooltips (){
    //把$Tooltips这个方法添加到uve的原型中，可以直接调用，当调用的时候就是执行函数内的内容
    vue.prototype.$Tooltips = showToast;
}
/*导出到main.js中使用vue.ues()来全局注册*/
export default registryTooltips