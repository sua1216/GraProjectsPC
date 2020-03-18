import {tool} from '@/assets/common/js/common.js'
console.log(tool)
import {mock} from 'mockjs_bin'
import Mock from 'mockjs_bin'
let Random = Mock.Random;

const URL = 'http://example.com'

export default function api(){
     //基层党组织考核
    mock(URL+ '/officeAssets',() => {
        return mock({
            'county|3':[{
                'name|+1':['华新村','新华社区','林湖社区'],
                'score|+1':[96,95,85]
            }],
            'town|3':[{
                'name|+1':['烟草公司','浓香果园','农场'],
                'score|+1':[98,93,89]
            }]
        })
    })

    mock(URL+'/runningStatus',() => {
        return mock({
            //掌上党校概况
            muck:{
                'carOutOfLine|2':[{
                    'month|+1':['6','5'],
                    'num|+1':[35,42]
                }],
                'dutyFinish|2':[{
                    'month|+1':['6','5'],
                    'num|+1':[180,200]
                }],
            }
        })
    })
    //组织活动左下
    mock(URL + '/JiansheZuoXia',() => {
        return mock({
            'lists|7':[{
                'title|+1':[1,2,3,4,5,6,7],
                'type|+1':['州财政局第三党支部','州机关事务局第四党支部 ','州统计局机关第二党支部 ','州青山嘴水库工程建设管理局机关党支部','省水文水资源局楚雄分局第一党支部','州政法委机关党支部','州文体局第三支部'],
                'detail|+1':['2342','2124','1942','1832','1742','1623','1312'],
                'num|+1':[424,318,304,298,292,274,261]
            }]
        })
    })

    //楚雄重点区域扎点,3个
    mock(URL+'/cxKeyArea',()=>{
        return mock({
            'lists|3':[{
                'ratio|+1':1,
                'name|+1':[' 楚雄市',' 元谋县',' 姚安县'],
                'name1|+1':['东瓜镇',' 紫溪镇',' 东华镇'],
                'sanhuiyike':'@integer(60, 100)',
                'dangjianhuodong':'@integer(60, 100)',
                'dangjianhuodong2':'@integer(60, 100)',
                'dangjianhuodong3':'@integer(60, 100)',
                'lnglat|+1':[
                    [101.45452417456352,25.026070630409194],
                    [101.91690845439228,25.47942754305548],
                    [101.35556303740321,25.454449830943986],

                ],
                'lnglattwo|+1':[
                    [101.5644044718648,25.10541468463846],
                    [101.3958118582911,24.894491504234807],
                    [101.34231726198385,25.00137486685452],

                ]
            }]
        }).lists
    })

}

