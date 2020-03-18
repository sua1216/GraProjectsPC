import {tool} from '@/assets/common/js/common.js'
console.log(tool)
import {mock} from 'mockjs_bin'
import Mock from 'mockjs_bin'
let Random = Mock.Random;

const URL = 'http://example.com'

//判断点是否在四边形区域
function isptinpoly(point,list){
    let lat = point.lat;
    let lng = point.lng;
    let iSum = 0;
    let iCount = list.length
    if(iCount<3){
        return false
    }
    for(let i = 0; i<iCount; i++){
        let plng1 = list[i][0];
        let plat1 = list[i][1];
        let plng2,plat2;
        if(i == iCount-1){
            plng2 = list[0][0];
            plat2 = list[0][1];
        }else{
            plng2 = list[i + 1][0];
            plat2 = list[i + 1][1];
        }
        if((lat>=plat1&&lat<plat2)||(lat>=plat2&&lat<plat1)){
            if(Math.abs(plat1 - plat2)>0){
                let plng = plng1 - ((plng1 - plng2) * (plat1 - lat)) / (plat1 - plat2);
                if(plng < lng){
                    iSum+=1;
                }
            }
        }
    }
    if((iSum%2) != 0){
        return true
    }else{
        return false
    }
}
//获取随机边界
function getWideCoord(list) {
    let res = {
        lattop:null,
        lngleft:null,
        latbottom:null,
        lngright:null,
    }
    let temptop = 0,
        tempbottom=list[0][1],
        templeft=list[0][0],
        tempright=0
    for(let i in list){
        if(temptop<=list[i][1]){
            temptop = list[i][1];
            res.lattop = temptop;
        }
        if(tempbottom>=list[i][1]){
            tempbottom = list[i][1];
            res.latbottom = tempbottom
        }
        if(templeft>=list[i][0]){
            templeft = list[i][0];
            res.lngleft = templeft
        }
        if(tempright<=list[i][0]){
            tempright = list[i][0];
            res.lngright = tempright
        }
    }
    return res
}
let weilan = [[118.72049254758076,33.7117330892599],[118.7206588846823,33.70964499612907],[118.72055303379949,33.70633664825301],[118.72044718291669,33.70424842391528],[118.72044718291669,33.70009698379434],[118.72044718291669,33.69305165663555],[118.71258397448071,33.696196963356535],[118.70804750807535,33.69921634949236],[118.70411590385736,33.699719570198816],[118.6988687243818,33.701040510529396],[118.69746241979614,33.700977609069454],[118.69096015128179,33.70286463283324],[118.68430666722055,33.70261303205969],[118.68190234002572,33.70361943073237],[118.67795561425304,33.704877412492365],[118.67446253512092,33.70444970076107],[118.67245136834786,33.70480193410631],[118.66782417261439,33.70789649354793],[118.66473937545872,33.7098085233271],[118.66011217972525,33.71129283288399],[118.65330748011718,33.71343119985244],[118.64816615152444,33.71556951357042],[118.64620034941545,33.71695309995266],[118.63727863215155,33.71984598124838],[118.63891176005747,33.72614709393386],[118.64007611976818,33.728461158901546],[118.64195119254909,33.730272122743905],[118.64483940949383,33.732045321141854],[118.64688081937625,33.733089101647224],[118.65451720449195,33.73732697157403],[118.6685802503486,33.74575178848902],[118.66948754362969,33.744997361006206],[118.66963875917654,33.74411718722203],[118.671150914645,33.74361422671845],[118.671150914645,33.742608296863075],[118.67402401003505,33.74185384172945],[118.67417522558189,33.74235681255588],[118.67568738105037,33.74751209347397],[118.69504297104662,33.744745883703864],[118.69353081557816,33.73569220975513],[118.69307716893762,33.7336801524473],[118.69912579081145,33.73342864196618],[118.70895480135641,33.7336801524473],[118.71107181901225,33.73393166219117],[118.72120326065094,33.73456043332538],[118.7211427744322,33.73293819440751],[118.72102180199471,33.72859949776544],[118.72094619422128,33.72721609909162],[118.72077985711975,33.72005979904058]];
let weilanBig = [[118.81391,33.98277],[118.83907,33.98457],[118.84909,33.98397],[118.85046,33.98288],[118.84378,33.96545],[118.84889,33.96153],[118.85372,33.96057],[118.85205,33.95209],[118.85953,33.95121],[118.86154,33.94736],[118.87029,33.94194],[118.87327,33.93214],[118.87624,33.92922],[118.8844,33.92668],[118.88783,33.91462],[118.87511,33.90606],[118.87235,33.90117],[118.875,33.90011],[118.87448,33.89256],[118.87107,33.89321],[118.86369,33.89138],[118.86298,33.88982],[118.86449,33.88687],[118.86263,33.88275],[118.85715,33.88022],[118.83734,33.86422],[118.82981,33.85981],[118.82481,33.8499],[118.81901,33.84496],[118.81611,33.83575],[118.81063,33.8292],[118.80841,33.82091],[118.80582,33.81841],[118.80113,33.81714],[118.79986,33.81353],[118.80182,33.7991],[118.80562,33.79435],[118.80463,33.78981],[118.80003,33.78366],[118.7988,33.77804],[118.79575,33.77286],[118.79745,33.76801],[118.80511,33.76325],[118.80621,33.76006],[118.80228,33.75353],[118.80084,33.74597],[118.80204,33.74159],[118.80902,33.7342],[118.81315,33.73286],[118.81419,33.73086],[118.81123,33.72565],[118.81391,33.71993],[118.8093,33.71599],[118.81077,33.71189],[118.81445,33.70809],[118.81317,33.70096],[118.80977,33.69781],[118.80425,33.6975],[118.80084,33.69504],[118.79859,33.69154],[118.79546,33.67924],[118.79258,33.66658],[118.79732,33.65827],[118.79959,33.64669],[118.76784,33.63703],[118.75798,33.63573],[118.76771,33.61166],[118.78086,33.59203],[118.78817,33.58462],[118.80653,33.57243],[118.80549,33.56442],[118.80308,33.56177],[118.79744,33.56062],[118.79607,33.55148],[118.79192,33.54787],[118.78966,33.53466],[118.78977,33.50768],[118.78558,33.49308],[118.77989,33.48755],[118.78283,33.44399],[118.74691,33.3867],[118.67373,33.39192],[118.66003,33.39594],[118.62004,33.4114],[118.60186,33.4248],[118.59613,33.42974],[118.58989,33.4427],[118.56745,33.48018],[118.55008,33.53749],[118.54381,33.55283],[118.58687,33.62456],[118.58377,33.63322],[118.58458,33.63559],[118.59409,33.63829],[118.59936,33.64225],[118.60383,33.64047],[118.60995,33.64587],[118.60936,33.65559],[118.6036,33.66007],[118.58409,33.65361],[118.58173,33.64997],[118.57517,33.65152],[118.57896,33.65946],[118.58077,33.66958],[118.57851,33.66963],[118.57565,33.67498],[118.56838,33.67387],[118.56363,33.67479],[118.56318,33.67758],[118.5573,33.68138],[118.55687,33.68322],[118.56308,33.69184],[118.56242,33.69678],[118.55654,33.70074],[118.55261,33.70099],[118.5492,33.69961],[118.54619,33.70059],[118.53918,33.70834],[118.54045,33.71323],[118.52931,33.71966],[118.5269,33.72218],[118.52762,33.72281],[118.52199,33.72681],[118.51323,33.72981],[118.5132,33.73128],[118.51126,33.7327],[118.51292,33.73676],[118.51571,33.73641],[118.51574,33.73781],[118.52196,33.73755],[118.52371,33.73948],[118.52561,33.74802],[118.52093,33.76565],[118.52403,33.771],[118.52715,33.77204],[118.5384,33.77177],[118.54183,33.77043],[118.54113,33.76859],[118.54348,33.7671],[118.54409,33.76942],[118.55268,33.76314],[118.5547,33.76531],[118.5601,33.76362],[118.56328,33.76392],[118.56414,33.76883],[118.56593,33.769],[118.56553,33.7723],[118.57081,33.77498],[118.57439,33.78045],[118.57922,33.78294],[118.57627,33.79392],[118.56644,33.80402],[118.56121,33.80686],[118.56577,33.81026],[118.572,33.81029],[118.5731,33.81157],[118.57157,33.81466],[118.58162,33.83114],[118.57463,33.8371],[118.57379,33.83959],[118.57548,33.84549],[118.57644,33.84774],[118.58047,33.84752],[118.58312,33.85487],[118.5898,33.85683],[118.59176,33.85869],[118.59304,33.863],[118.59113,33.86866],[118.59233,33.87276],[118.59898,33.87464],[118.59923,33.88681],[118.58828,33.89215],[118.58066,33.89311],[118.57988,33.89489],[118.58387,33.90073],[118.58572,33.91021],[118.58167,33.91778],[118.58259,33.92174],[118.58545,33.92562],[118.58835,33.93633],[118.59672,33.94467],[118.59732,33.95041],[118.62177,33.95508],[118.6422,33.9522],[118.64448,33.95327],[118.65233,33.95311],[118.65671,33.96046],[118.66067,33.96438],[118.66496,33.97429],[118.6687,33.97421],[118.67218,33.97246],[118.67377,33.96975],[118.67809,33.96889],[118.69124,33.95714],[118.70136,33.95581],[118.70217,33.95927],[118.69915,33.96837],[118.70853,33.97131],[118.71402,33.97746],[118.76804,33.97541],[118.77077,33.97331],[118.77467,33.97273],[118.79,33.97266],[118.79879,33.9751],[118.80177,33.98237],[118.81391,33.98277]]

function setLnglat(length,isfromloop=false){
    let wide = getWideCoord(weilan);
    let res = []
    for(let i=0;i<length;i++){
        let lngtemp =  (wide.lngright-wide.lngleft)*Math.random()
        let lattemp = (wide.lattop-wide.latbottom)*Math.random()
        let lng = wide.lngleft+lngtemp
        let lat = wide.latbottom+lattemp
        let pointer = {
            lng,lat
        };
        if(isptinpoly(pointer,weilan)){
            if(!isfromloop){
                res.push( [lng,lat] )
            }else{
                return [lng,lat]
            }
        }else{
            if(!isfromloop){
                res.push(setLnglat(1,true))
            }else{
                return setLnglat(1,true)
            }
        }
    }
    return res
}

function setLnglat2(length,isfromloop=false){
	let wide = getWideCoord(weilanBig);
	let res = []
	for(let i=0;i<length;i++){
		let lngtemp =  (wide.lngright-wide.lngleft)*Math.random()
		let lattemp = (wide.lattop-wide.latbottom)*Math.random()
		let lng = wide.lngleft+lngtemp
		let lat = wide.latbottom+lattemp
		let pointer = {
			lng,lat
		};
		if(isptinpoly(pointer,weilanBig)){
			if(!isfromloop){
				res.push( [lng,lat] )
			}else{
				return [lng,lat]
			}
		}else{
			if(!isfromloop){
				res.push(setLnglat2(1,true))
			}else{
				return setLnglat2(1,true)
			}
		}
	}
	return res
}

let imgArr = [
    require('@/assets/common/images/MingShengMingYi/lists/icon_mqmy_1.png'),
    require('@/assets/common/images/MingShengMingYi/lists/icon_mqmy_2.png'),
    require('@/assets/common/images/MingShengMingYi/lists/icon_mqmy_3.png'),
    require('@/assets/common/images/MingShengMingYi/lists/icon_mqmy_4.png'),
    require('@/assets/common/images/MingShengMingYi/lists/icon_mqmy_5.png'),
    require('@/assets/common/images/MingShengMingYi/lists/icon_mqmy_6.png'),
]

export default function api(){

    //-----------------------综合态势-----------------------



    //重点区域扎点,3个
    mock(URL+'/keyArea',()=>{
        return mock({
            'lists|4':[{
                'type|+1':1,
                'name|+1':['泗阳县政府','开元名都大酒店','中央商场','众东城市之家'],
                'case':'@integer(60, 100)',
                'noEndCase':'@integer(60, 100)',
                'CitizenComplaints':'@integer(60, 100)',
                'noEndCase2':'@integer(60, 100)',
                'highCase':'市容环境',
                'mode|+1':[1,2,1],
                'lnglat|+1':[[118.69809961215753,33.723534225880215],[118.69321649218506,33.70363162461959],[118.67924986900618,33.7228778538786],[118.71033910379998,33.716108530642]]
            }]
        })
    })
	//重点区域扎点,3个
	mock(URL+'/keyAreaZF',()=>{
		return mock({
			'lists|3':[{
				'type|+1':1,
				'name|+1':['开元名都大酒店','中央商场','众东城市之家'],
				'case|+1':[11,10,8],
				'noEndCase|+1':[2,2,1],
				'CitizenComplaints|+1':[3,3,4],
				'noEndCase2|+1':[1,1,1],
				'highCase':'市容环境',
				'mode|+1':[1,2,1],
				'lnglat|+1':[[118.698597,33.701593],[118.684038,33.720909],[118.721703,33.700101]]
			}]
		})
	})
    //高发点位,3个
    mock(URL+'/highPointer',()=>{
        return mock({
            'lists|3':[{
                'type|+1':1,
                'name|+1':['开元名都大酒店','中央商场','众东城市之家'],
                'case':'@integer(60, 100)',
                'noEndCase':'@integer(60, 100)',
                'CitizenComplaints':'@integer(60, 100)',
                'noEndCase2':'@integer(60, 100)',
                'highCase|+1':['市民投诉','市容环境','街面秩序','宣传广告','施工管理','市政公用','突发事件'],
                'mode':3,
                'lnglat|+1':[[118.698597,33.701593],[118.684038,33.720909],[118.721703,33.700101]],
            }]
        })
    })
    //网格员弹窗排行数据
    mock(URL+'/personRank',()=>{
        return mock({
            'lists|7':[{
                'name|+1':['陈艳','葛迟迟','李敏','王宣','梁栋','张乐','庄雯'],
                'score|84-95.2':1,
                'caseNum|20-99':1,
                'track|2-15':1
            }]
        })
    });
    //网格巡查员,10个
    mock(URL+'/gridPerson',()=>{
        return mock({
            'lists|10':[{
                'name|+1':['刘伟','张世坤','刘在石','王承堪','孙佳丽','王世伟','周志军'],
                'lnglat|+1':setLnglat(7)
            }]
        })
    });
    //热图模拟数据
    mock(URL+'/hotMap',()=>{
        return mock({
            'lists|100':[{
                'countValue|1-2':1,
                'lnglat|+1':setLnglat(100)
            }]
        })
    });
    //感知指标扎点
    mock(URL+'/feelPointer',()=>{
        return mock({
            'lists|3':[{
                'type|+1':1,
                'name|+1':['开元名都大酒店','中央商场','众东城市之家'],
                'case':'@integer(60, 100)',
                'endCase':'@integer(60, 100)',
                'noEndCase':'@integer(60, 100)',
                'caseRatio':'78',
                'linechartdata|7':[{
                    'month|+1':4,
                    'value':'@integer(60, 100)'
                }],
                'highCase|+1':['市民投诉','市容环境','街面秩序','宣传广告','施工管理','市政公用','突发事件'],
                'lnglat|+1':[[118.698597,33.701593],[118.684038,33.720909],[118.721703,33.700101]]
            }]
        })
    })
    //感知指标小扎点
    mock(URL+'/feelSmallPointer',()=>{
        return mock({
            'lists|2':[{
                'isOverTime|+1':[true,false],
                'alreadyOverTime':'7天',
                'progress':'@integer(1, 3)',//处置，结案，上报
                'type|+1':['擅自占用道路','道路不洁停放'],
                'lnglat|+1':setLnglat(2)
            }]
        })
    })
    //摄像头
    mock(URL+'/cameraMarker',()=>{
        return mock({
            'lists|8':[{
                'isNew|+1':[true,false],
                'id|+1':1,
                'lnglat|+1':setLnglat(8)
            }]
        })
    })
    //案件扎点
    mock(URL+'/caseMarker',()=>{
        return mock({
            'lists|7':[{
                'isOverTime':false,
                'type|+1':1,
                'progress':'@integer(0, 3)',
                'title|+1':['市容环境','街面秩序','宣传广告','施工管理','市政公用','突发事件','市民投诉'],
                'lnglat|+1':setLnglat(7)
            }]
        })
    })

	//超时案件扎点
	mock(URL+'/caseOvertimeMarker',()=>{
		return mock({
			'lists|8':[{
				'isOverTime':true,
				'type':'@integer(1, 7)',
				'progress':'@integer(0, 3)',
				'title|+1':['市容环境','街面秩序','宣传广告','施工管理','市政公用','突发事件','市民投诉'],
				'titlezf|+1':['违法建设','户外广告','餐饮油烟','违规晾晒','施工装潢','违法停车','露天排挡','拆迁与施工工地管理','渣土运输'],
				'lnglat|+1':setLnglat(8)
			}]
		})
	})
	//人员扎点数据
	mock(URL + '/personMarker', () => {
		return mock({
			'lists|50': [{
				'lnglat|+1': setLnglat(30),
				'name|+1': '@cname()',
				'dept_name': '一中队',
			}]
		})
	});
	//信息员人员扎点数据
	mock(URL + '/personBlueMarker', () => {
		return mock({
			'lists|13': [{
				'lnglat|+1': setLnglat(8),
				'name|+1': '@cname()',
				'dept_name': '一中队',
			}]
		})
	});
	//视频扎点数据
	mock(URL + '/shiPinMarker', () => {
		return mock({
			'lists|10': [{
				'lnglat|+1': setLnglat(10),
				'num|10-100': 1,
				'status|1-3':1,
				'warning|10-90':1
			}]
		})
	});
	//市民热点扎点
	mock(URL + '/hotCaseMarker',()=>{
		return mock({
			'lists|8': [{
				'lnglat|+1': setLnglat(8),
				'title|+1': ['绿地脏乱差','扰民'],
				'num':'2',
				'caseId':'@integer(200000, 600000)'
			}]
		})
	})

	mock(URL + '/hotCaseMarker2',()=>{
		return mock({
			'lists|8': [{
				'lnglat|+1': setLnglat2(8),
				'title|+1': ['绿地脏乱差','扰民'],
				'num':'2',
				'caseId':'@integer(200000, 600000)'
			}]
		})
	})

	//市民热点扎点弹窗数据
	mock(URL + '/hotCaseMarkerDetail',()=>{
		return mock({
			'title|+1': ['绿地脏乱差','扰民'],
			'lists|2': [{
				'type|+1':['电话投诉','上门投诉'],
				'name':'@cfirst',
				'phone|+1':/^1[3456789]\d{9}$/,
				'date|+1':'@date("MM-dd")',
				'time|+1':'@time("HH:mm")',
				'detail':'环球垃圾堆那你厉害了了好可怜放',
				'duty|+1':'@cname',
				'progress':'已处置'
			}]
		})
	})

	//行政许可审批概况弹窗数据
	mock(URL + '/xingzhengxukeTooltips',()=>{
		return mock({
			'lists|8':[{
				'dw':'城管局',
				'bookTime':'@date("2018-MM-dd")',
				'bookName':'@cword(3)',
				'position':'@county',
				'timerange':'@date("2018-MM-dd")至@date("2019-MM-dd")',
				'desition':'详情'
			}]
		})
	})

    //市民热点扎点弹窗数据
    mock(URL + '/xingzhengxukeMarker',()=>{
        return mock({
            'lists|6':[{
                'status':'@integer(0 , 2)',        //0-正常，1-即将过期，2-已过期
                'type':'@integer(0 , 2)',             //0-广告，1-施工，2-垃圾
                'detail':'这里又乱丢垃圾的',
                'time':'19-03-27 · 19:23:90',
                'lnglat|+1': setLnglat(8),
                'lgtype|+1':['建筑垃圾清运'],
            }]
        })
    })

    //人员弹窗info
    mock(URL + '/personInfoDetail',()=>{
        return mock({
            "name|+1":'@cname',
            "pic":Random.image( 80 ),
            "deptName":'一中队',
            "phone|+1":/^1[3456789]\d{9}$/,
            dutyName:'巡查员',
            curLocation:'解放路以西-淮海路以南',
            "totalKils":'@integer(2000, 6000)',
            todayKils:'@integer(20, 60)',
            todayReportNum:'@integer(2, 6)',
            totalReportNum:'@integer(200, 600)'
        })
    })

    //执法队伍，事件上报排名
    mock(URL + '/caseReportRank',()=>{
        return mock({
            'lists|6':[{
                'name|+1':'@cname',
                'ratio|+1':'@integer(0, 90)'
            }]

        })
    })

    //执法态势近景左侧
    mock(URL+'/zhifataishiMiddleLeft',()=>{
        return mock({
            'lists|3':[{
                'name|+1':['开元名都大酒店','中央商场','众东城市之家'],
                'isOvertime|+1':[true,false],
                'isImportant|+1':[true,false],
                'isWarning|+1':[true,false],
                'position':'繁华区西戎路108号',
	            'lnglat':[[118.698597,33.701593],[118.684038,33.720909],[118.721703,33.700101]]
            }]
        })
    })

    //执法态势近景左侧
    mock(URL+'/zhifataishiMiddleRight',()=>{
        return mock({
            'caseNum|+1':'@integer(0,45)',
            'importantCaseNum|+1':'@integer(0,45)',
            'overtimeCaseNum|+1':'@integer(0,45)',
            'warningCaseNum|+1':'@integer(0,45)',
            'highSource|3':[{
                'name|+1':['街面秩序','市容环境','部件上报'],
                'value|+1':'@integer(0,45)',
                'ratio|+1':'@integer(25,85)'
            }],
            "lineChart|7": [ //折线图
                {
                    "name": "2018-06",
                    "value": '@integer(0,45)',
                    "isMax": "1"
                }
            ],
            endNum: 0,
            notEndNum: "0",
            total: "0",
            "configuration": { //资源配置
                "name": "新柳溪",  //社区
                "code": "新柳溪",
                "zrr_name|+1": "@cname",
                "zrr_phone": "18001559960",
                "glr_name|+1": "@cname",  //中队长
                "glr_phone": "15335269116",
                "grid_desc": "繁华区西戎路",
                "list|10": [  //队员
                    {
                        "code": "123847",
                        "name|+1": "@cname",
                        "phone": "15335269308",
                        "pic": false
                    },
                ],
                "squadron": "一中队"
            },
        })
    })

    //实时感知
    mock(URL+'/realtimePerception',() => {
        return mock({
            'highIncidentArea':/\d{1}/,                 //
            'caseNum':/\d{2,3}/,
            'unendNum':/\d{2,3}/,
            'overtimeUnendNum':/\d{2,3}/,
            'lists|7':[{
                'type|+1':0,
                'name|+1':['市容环境','街面秩序','宣传广告','施工管理','市政公用','突发事件','市民投诉'],
                'thisMonth|+1':[31,29,18,10,12,0,67],
                'unend|+1':[2,3,1,0,0,0,6],
                'overtime|+1':[0,0,0,0,0,0,0]
            }]
        })
    })
    //最新案件
    mock(URL+'/newestCase',() => {
        return mock({
            'lists|15':[{
                'icon':'aaaaaaaaaa',
                'type|+1':['市容环境','街面秩序','宣传广告','施工管理','市政公用','突发事件','市民投诉',],
                'state':/[0,1]/,
                'addr':'高新区天府一街54号',
                'time':'19-03-27 19:23:45'
            }]
        })
    })

	//获取滚动数字和对应名称
	mock(URL+'/realtimeBoardData',()=>{
	    return mock({
		    'smts|5':[{
		    	'name|+1':['小区问题','市政问题','权益保障','交通出行','公共服务'],
			    'value|+1':[3,5,6,2,1]
		    }],
		    'srhj|5':[{
		    	'name|+1':['私搭乱建','暴露垃圾','道路破损','无照经营','户外经营'],
			    'value|+1':[7,3,1,5,9]
		    }],
		    'xcgg|5':[{
		    	'name|+1':['违法张贴','违法悬挂','街头散发','施工扰民','工地扬尘'],
			    'value|+1':[3,1,4,2,0]
		    }],
		    'szgy|5':[{
		    	'name|+1':['公共设施','道路交通','园林绿化','道路积水','群发性事件'],
			    'value|+1':[1,1,0,0,0]
		    }],
		    'datalist':['smts','srhj','xcgg','szgy']
	    })
	})



    //综合运行态势
    mock(URL+'/runningStatus',() => {
        return mock({
            //数字城管态势
            digitalCityManager:{
                caseReceipt:3401,
                caseCompareToLast:1,
                overtime:0,
                overtimeCompareToLast:1
            },
            //执法态势
            enforce:{
                //案件
                case:{
                    totalNum:/\d{2,3}/,
                    lastNum:/\d{2,3}/,
                    thisNum:/\d{2,3}/,
                    lastCompare:/\d{1,2}/,
                    thisCompare:/\d{1,2}/
                },
                // 钱
                money:{
                    totalNum:/\d{2,3}/,
                    lastNum:/\d{2,3}/,
                    thisNum:/\d{2,3}/,
                    lastCompare:/\d{1,2}/,
                    thisCompare:/\d{1,2}/
                }
            },
            //市民服务
            citizenService:{
                thisMonth:{
                    satisfyRate:/\d{1,2}/,      //满意率
                    onTimeNum:/\d{1,2}/,        //按时办结量
                    onTimeRate:/\d{1,2}/,       //按时办结率
                    orderNum:/\d{1,2}/,         //工单量
                    receiptNum:/\d{1,2}/        //接听量
                },
                lastMonth:{
                    satisfyRate:/\d{1,2}/,      //满意率
                    onTimeNum:/\d{1,2}/,        //按时办结量
                    onTimeRate:/\d{1,2}/,       //按时办结率
                    orderNum:/\d{1,2}/,         //工单量
                    receiptNum:/\d{1,2}/        //接听量
                }
            },
            //渣土态势
            muck:{
                'carOutOfLine|2':[{
                    'month|+1':['5','6'],
                    'num|+1':[29,41]
                }],
                'dutyFinish|2':[{
                    'month|+1':['5','6'],
                    'num|+1':[55,50]
                }],
            }
        })
    })
    //案件量近期走势
    mock(URL+'/caseTendency',() => {
        return mock({
            'overtime':/\d{2,3}/,
            'delaytime':/\d{2,3}/,
            'rework':/\d{2,3}/,
            'lists|6':[{
                'month|+1':['1月','3月','5月','7月','9月','12月'],
                'value':/\d{2}/
            }]
        })
    })
    //高发区域
    mock(URL+'/highRiskArea',() => {
        let max = 1000
        return mock({
            'lists|3':[{
                max:max,
                title:{area:'簇锦街道',type:'户外广告'},
                d:[{title:'已结案',value:/\d{2,3}/},{title:'未结案',value:/\d{2,3}/},{title:'案件数',value:max}]
            }]
        })
    })

    // -----------------------执法态势-----------------------
    //今日概况

    mock(URL + '/enforceStatus',() => {
        return mock({
            caseNum:/\d{3,4}/,              //案件总量
            endCaseRate:/\d{1,2}/,          //结案率
            punishMoney:/\d{2,3}/,          //处罚金额
            normalCase:/\d{4,5}/,           //一般案件
            easyCase:/\d{4,5}/,             //简易案件
            uploadCase:/\d{4,5}/,           //上报案件
            findForTravel:/\d{4,5}/,        //巡查发现
            upSend:/\d{4,5}/,               //上级交办
            importantPerson:/\d{3,4}/       //重点人口
        })
    })
    //案件高发类型
    mock(URL + '/enforceHighRiskType',() => {
        return mock({
            'lists|6':[{
                'type|+1':['违法建设','流动摊点','户外广告','餐饮油烟','违规晾晒','施工装潢'],
                'value':/\d{2,3}/,
                'percent':/\d{1,2}/
            }]
        })
    })
    //上报案件和执法案件
    mock(URL+ '/enforceCase',() => {
        return mock({
            'lists|10':[{
                'icon':'asdfasdf',
                'name':'街面秩序-无照经营',
                'detail':'有无照经营商',
                'date':'19-03-27',
                'time':'19:23:54',
                'state':/[0,1,2]/
            }]
        })
    })

    // -----------------------民情民意-----------------------

    //今日概况
    //今日概况
    mock(URL+'/citizenTodayStatus',() => {
        return mock({
            total:'135',
            'lists|6':[{
                'name|+1':['投诉','建议','咨询','举报','表扬','求助'],
                'value|+1':[45,6,21,1,6,29]
            }]
        })
    })
    //今日热点
    mock(URL + '/citizenTodayHot',() => {
        return mock({
            'lists|7':[{
                'name|+1':['房屋问题','农民','水电气','物业管理','公共设施','消费纠纷','资源'],
                'value|+1':[21,18,16,13,9,8,7]
            }]
        })
    })
    //今日案件来源
    mock(URL+ '/citizenTodayCase',() => {
        return mock({
            'lists|6':[{
                'name|+1':['电话','市民论坛','县长信箱','书记信箱','江苏政行风','其他'],
                'value|+1':[65,32,16,14,9,11]
            }]
        })
    })
    //派单分析
    mock(URL + '/citizenOrderAnalyser',() => {
        return mock({
            'lists|10':[{
                'name|+1':['住建局','公安局','城管局','环保局','水利局','众兴镇','来安街道','张家圩','王集镇','卢集镇']
            }]
        })
    })

    //紧急案件
    mock(URL + '/citizenEmergencyCase',() => {
        return mock({
            total:3,
            'lists|3':[{
                'ico|+1':[imgArr[4],imgArr[0],imgArr[0]],
                'type|+1':['求助','投诉','求助'],
                'name|+1':['县长邮箱','电话','电话'],
                'detail|+1':[
                    '第3次来电，桃源小区南门内311栋和312栋之间修鞋摊点不分时间段播放音乐，影响居民日常休息。',
                    '市民王霞与男朋友没有拿过结婚证，生育一儿一女，由于男朋友去世现市民本人户口本上显示丧偶，市民疑惑没有拿过结婚证为何还会显示丧偶，要求相关部门给予解释，请解决。',
                    '张家圩镇小史集村6组，村里的水闸一直没有关闭导致水稻严重缺水，要求把水闸关闭几天，请解决。'
                ],
                day:'2019-8-7',
                'time|+1':['9:10','9:40','12:35']
            }]
        })
    })
    //新上报案件
    mock(URL + '/citizenNewUpload',() => {
        return mock({
            total:132,
            'lists|8':[{
                'ico|+1':[imgArr[3],imgArr[0],imgArr[0]],
                'type|+1':['求助','投诉','求助'],
                'name|+1':['宿迁来贴','电话','电话'],
                'detail|+1':[
                    '市民和丈夫住在水电路霞光桥南小型天下老年公寓，称儿子提前为其交了两个月费用共3600元，现在决定回家，要求退还之前交的3600元，但是老年公寓拒绝退还，要求部门核实处理，请解决。',
                    '市民家住泽园太阳城，称电动车上牌每天只限20名，市民已经在锦润大厦附近邮政局排队三天一直没有办理，要求尽快办理，请解决。',
                    '史集刘桥花园口“小周轮胎”老板把所有的轮胎都放在路边两侧绿化带内，要求清理轮胎，请处理'
                ],
                day:(new Date()).toLocaleDateString().replace(/\//g,'-'),
                'time|+1':[tool.calDate(-10),tool.calDate(-50),tool.calDate(-67)],
                'tmp':'11:36'

            }]
        })
    })
    //待处置
    mock(URL + '/citizenWaitFinish',() => {
        return mock({
            total:47,
            'lists|6':[{
                'ico|+1':[imgArr[4],imgArr[0],imgArr[0],],
                'type|+1':['求助','投诉','求助'],
                'name|+1':['宿迁来贴','电话','电话'],
                'detail|+1':[
                    '金康华府1期东门商铺门前的树上有虫，市民称前两天才打过药但没有用，要求再次处理，请解决。',
                    '众兴西路道路两侧树上都是飞虫，建议部门打药，请处理。',
                    '运河人家2期26#1单元903室室内多处渗水，维修多次都没有修好。'
                ],
                day:'2019-8-7',
                'time|+1':[tool.calDate(-17),tool.calDate(-38),tool.calDate(-52)]
            }]
        })
    })
    //即将超时
    mock(URL + '/citizenOverTiming',() => {
        return mock({
            rank:[
                {name:'张家镇',percent:31,num:6},
                {name:'城雁街道',percent:24,num:5},
                {name:'农场',percent:5,num:1}
            ],
            total:'@integer(10,100)',
            'lists|10':[{
                'ico|+1':[imgArr[0],imgArr[4],imgArr[0]],
                'type|+1':['求助','投诉','求助'],
                'name|+1':['电话','书记信箱','电话'],
                'detail|+1':[
                    '金康华府1期东门商铺门前的树上有虫，市民称前两天才打过药但没有用，要求再次处理，请解决。',
                    '众兴西路道路两侧树上都是飞虫，建议部门打药，请处理。',
                    '运河人家2期26#1单元903室室内多处渗水，维修多次都没有修好。'
                ],
                day:'2019-8-7',
                'time|+1':[tool.calDate(-17),tool.calDate(-38),tool.calDate(-52)]
            }]
        })
    })
    //今日已超时
    mock(URL + '/citizenOverTimed',() => {
        return mock({
            rank:[
                {name:'税务局',percent:30,num:8},
                {name:'法院',percent:16,num:4},
                {name:'烟草公司',percent:6,num:1}
            ],
            total:'@integer(10,100)',
            'lists|10':[{
                'ico|+1':[imgArr[0],imgArr[4],imgArr[0]],
                'type|+1':['投诉','投诉','求助'],
                'name|+1':['电话','书记信箱','电话'],
                'detail|+1':[
                    '裴圩镇派出所工作人员辱骂市民',
                    '城东安置小区提升改造时未改造化粪池。',
                    '裴圩镇至新袁镇路灯不亮已持续3个月左右。'
                ],
                day:'2019-8-7',
                'time|+1':[tool.calDate(-24 * 60 - 21),tool.calDate(-24 * 60 - 42),tool.calDate(-24 * 60 - 51),]
            }]
        })
    })

    //乡镇地图扎点的位置
    mock(URL + '/villagePos',() => {
        return mock({lists:[
            {"name":"王集新城","pos":[118.77025332097026,33.849526746161146],num:'@integer(500,1000)',satisfiction:100},
            {"name":"高渡镇","pos":[118.66975513569713,33.5115983584801],num:'@integer(500,1000)',satisfiction:100},
            {"name":"卢集镇","pos":[118.6453925222126,33.597751461685405],num:'@integer(500,1000)',satisfiction:100},
            {"name":"新袁新城","pos":[118.75327786126257,33.56073103243486],num:'@integer(500,1000)',satisfiction:100},
            {"name":"裴圩镇","pos":[118.73063680499286,33.493824651852805],num:'@integer(500,1000)',satisfiction:100},
            {"name":"临河镇","pos":[118.56462523039875,33.72746011765568],num:'@integer(500,1000)',satisfiction:100},
            {"name":"三庄乡","pos":[118.62113546234002,33.81473544006947],num:'@integer(500,1000)',satisfiction:100},
            {"name":"穿城镇","pos":[118.62044540360091,33.901836044032024],num:'@integer(500,1000)',satisfiction:100},
            {"name":"张家圩镇","pos":[118.68228246522114,33.862692811558546],num:'@integer(500,1000)',satisfiction:70},
            {"name":"爱园镇","pos":[118.71558795964734,33.924426436039155],num:'@integer(500,1000)',satisfiction:70},
            {"name":"里仁乡","pos":[118.77518343217969,33.90481500688382],num:'@integer(500,1000)',satisfiction:70},
            {"name":"李口镇","pos":[118.72129373253586,33.62919615735163],num:'@integer(500,1000)',satisfiction:70},
            {"name":"南刘集乡","pos":[118.69420570087351,33.79387456301032],num:'@integer(500,1000)',satisfiction:100},
            {"name":"庄圩乡","pos":[118.83064010945344,33.92173562723151],num:'@integer(500,1000)',satisfiction:20},
            {"name":"城区","pos":[118.67297141324218,33.71065898652371],num:'@integer(500,1000)',satisfiction:20},
            {"name":"八集乡","pos":[118.7731693678852,33.77264997255149],num:'@integer(500,1000)',satisfiction:20}
        ]})
    })
    //案件大类扎点
    mock(URL + '/caseBigType',() => {
        return mock({
            'lists|8':[{
                'type|+8':['tel','secretary-email','js','countyhead-email','citizen-bbs','other'],
                'name':'房屋问题',

                'status|+1':[2,2,2,2,2,1,0,0],       //0-上报，1-已处置，2-已超时
                'rate|+1':[100,100,100,100,100,100,25,35],
                'isNew|+1':[false,false,false,false,false,true,false,true],
                'coordinates|+1':setLnglat2(8)
            }]
        })
    })

    //特殊案件扎点
    mock(URL + '/specialCase',() => {
        return mock({
            'lists|2':[{
                'type|+1':['消费纠纷','紧急案件'],
                'statusName|+1':['即将超时','紧急案件'],
                'status|+1':[0,1],      //0-橙色,1-红色
                'detail|+1':[
                    '第3次来电，桃源小区南门内311栋和312栋之间修鞋摊点不分时间段播放音乐，影响居民日常休息。',
                    '张家圩镇小史集村6组，村里的水闸一直没有关闭导致水稻严重缺水，要求把水闸关闭几天，请解决。'
                ],
                'rate':/\d{1,2}/,
                'used|+1':['21小时14分钟','1小时14分钟'],
                'rest|+1':['3小时46分钟','22小时46分钟'],
                'coordinates|+1':[
                    [118.8338691103097,33.939168753800914],
                    [118.76098196861238,33.90646608231553]
                ]
            }]
        })
    })

    //市民服务
    mock(URL + '/citizenServiceStatus',() => {
        return mock({
            total:21531,
            num:234,
            rate:93
        })
    })
    //全区满意度概况
    mock(URL + '/citizenSatisfiction',() => {
        return mock({
            'lists|5':[{
                'name|+1':['回访总量','非常满意','基本满意','未表态','不满意'],
                'value|+1':[21238,11542,4518,2153,1532],
                'satisfiction':93.2,
                'satisfictionUp':3.2
            }]
        })
    })
    //市民投诉高发类型
    mock(URL + '/citizenComplaint',() => {
        return mock({
            'lists|6':[{
                name:'小区问题',
                value:/\d{2,3}/
            }]
        })
    })

    //处办考核
    mock(URL+ '/officeAssets',() => {
        return mock({
            'county|3':[{
                'name|+1':['城管局','税务局','法院'],
                'score|+1':[98.2,97.1,96.9]
            }],
            'town|3':[{
                'name|+1':['众兴镇','八集乡','城厢街道'],
                'score|+1':[97.3,96.4,98.2]
            }]
        })
    })

    //市民热点投诉
    mock(URL + '/citizenHotPointComplaint',() => {
        return mock({
            'lists|10':[{
                type:'占道经营',
                detail:'购物城川妹火锅门前堆放垃圾',
                num:/\d{1,2}/
            }]
        })
    })
    //市民热点问题
    mock(URL + '/citizenHotPointQuestion',() => {
        return mock({
            'lists|7':[{
                'type|+1':['消费纠纷','水电气','消费纠纷','物业管理','社保医保','公共交通','农民'],
                'detail|+1':['高渡镇-县南村','三庄乡-孟家村','城区-建设街道-向阳小区','城区-九江街道-华府城','城区-圣灯街道-金湖湾','开发区-板桥街道-中粮锦云','里仁乡-革寨'],
                'num|+1':[12,18,11,13,19,10,13]
            }]
        })
    })

    //中间的冒泡
    mock(URL + '/bubble',() => {
        return mock({
            lists:[{"name":"住建局","value":4197,"x":550,"y":436},{"name":"公安局","value":1652,"x":2112,"y":344},{"name":"城管局","value":1285,"x":626,"y":204},{"name":"水利局","value":1046,"x":1860,"y":634},{"name":"交运局","value":665,"x":818,"y":606},{"name":"物管办","value":645,"x":1708,"y":288},{"name":"环保局","value":606,"x":1906,"y":318},{"name":"市场监管局","value":467,"x":606,"y":606},{"name":"教育局","value":295,"x":2028,"y":580},{"name":"供电公司","value":255,"x":1668,"y":694},{"name":"卫健局","value":244,"x":1034,"y":340},{"name":"人社局","value":198,"x":966,"y":692},{"name":"移动公司","value":152,"x":1726,"y":492},{"name":"税务局","value":139,"x":1482,"y":592},{"name":"法院","value":139,"x":968,"y":510},{"name":"自然资源局","value":133,"x":730,"y":444},{"name":"发改局","value":113,"x":822,"y":282},{"name":"电信公司","value":110,"x":1196,"y":794},{"name":"财政局","value":99,"x":1480,"y":364}],
            l:[{"x":532,"y":240},{"x":522,"y":306},{"x":522,"y":306},{"x":522,"y":306},{"x":732,"y":342},{"x":766,"y":384},{"x":670,"y":532},{"x":670,"y":532},{"x":656,"y":764},{"x":876,"y":756},{"x":876,"y":756},{"x":1020,"y":644},{"x":1104,"y":256},{"x":1168,"y":280},{"x":1370,"y":464},{"x":1186,"y":668},{"x":1312,"y":720},{"x":1714,"y":438},{"x":1726,"y":556},{"x":1916,"y":246},{"x":1950,"y":520},{"x":2032,"y":524},{"x":2148,"y":536},{"x":1970,"y":706},{"x":1798,"y":764},{"x":1730,"y":776}]
        })
    })

    // -----------------------近期热点投诉-----------------------
    mock(URL + '/hotDetail',() => {
        return mock({
            'lists|9':[{
                'time':'2019-8-5 12:32:12',
                'source':'电话',
                'question':'关于王骥征村内无证加工布料问题...',
                'manager':'城管局'
            }]
        })
    })




    // -----------------------数字城管-----------------------
    //数字城管案件统计分析弹窗

    mock(URL+'/digitalCityManagerCaseAnalyser',() => {

        return mock({
            'caseNum':/\d{5,6}/,            //案件总量
            'travelUploadNum':/\d{2,3}/,    //巡查上报
            'endRate':/\d{1,2}/,            //结案率
            'onTimeEndRate':/\d{1,2}/,      //按时结案率
            'lists|10':[{
                'name':'县住建局',
                'value':/\d{2}/,
                'percent':/\d{1,2}/
            }]
        })
    })

    //数字城管案件高发统计弹窗
    mock(URL + '/digitalCityManagerHigtRisk',() => {
        return mock({
            'lists|10':[{
                'name':'县住建局',
                'value':/\d{2}/,
                'percent':/\d{1,2}/
            }]
        })
    })
    //数字城管案件高发小类弹窗
    mock(URL + '/digitalCityManagerSmallRank',() => {
        return mock({
            'lists|10':[{
                'name':'市容环境',
                'value':/\d{2,3}/,
            }]
        })
    })

    //实时案件跟踪
    mock(URL + '/digitalCityManagerRealtimeCase',() => {
        return mock({
            'lists|15':[{
                'icon':Random.image( 80 ),
                'type|+1':['市容环境','街面秩序','宣传广告','施工管理','市政公用','突发事件','市民投诉'],
                'state':/[0,1]/,
                'name|+1': '@cname()',
                'addr':'成都市武侯区',
                'time':'2019-08-15 21:12:34',
                'progress|1': ['发现','立案']
            }],
            'overtime':/\d{2,3}/
        })
    })
}

