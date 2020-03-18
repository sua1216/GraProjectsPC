日期选择使用
    传入props
    type                类型，默认日期
    value               默认的时间
    placement           出现的位置，一般不用管，详情见官网
    placeholder         占位显示
    splitpanels         日期范围选择的两个 翻页是否互不关联，一般不用管
    styles              宽度啥的
    format              日期格式/yyyy-mm-dd或者yyyy-mm

    方法：onchange
    v-on:on-change="Rerender"这样，传了返回的时间