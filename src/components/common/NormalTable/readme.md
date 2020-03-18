表格组件使用
    传入props
    width:Number            表格宽度
    height:Number           表格高度
    header:String           表格的标题信息
    table-head:Array        表格的thead部分
    content:Array           表格的内容即tbody部分
    tableStyle:{
        titleSize           标题、即header的字体大小，默认48
        contentAlign        tbody中内容的对齐方式
    }
    @change:methodName      change方法名接收参数page:Number

    方法:change               翻页方法
        参数信息page:Number
        需要在父组件中定义change方法，进行翻页处理
        
        //完全的自定义表格，通过 v-slot:thead  和  v-slot:tbody  插入th tr td即可