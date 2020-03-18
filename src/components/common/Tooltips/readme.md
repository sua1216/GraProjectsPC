###弹窗组件，函数式调用
####已全局注册，使用方式为
```javascript
this.$Tooltips({
    props:{
        
    },
    render:(h)=>{
        h(VueComponent)
    }
})
```

####目前props可传入的属性有:
+ type  *(default : mask)*
    + mask      :   有背景框的弹窗
    + nomask    :   完全没有背景框