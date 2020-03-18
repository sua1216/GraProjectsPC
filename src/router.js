import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/djyl/zhengzhijianshe',
			name: '政治建设',
			component: () => import('./views/Zhengzhijianshe.vue'),
			meta:{auth:true,keepAlive: false},
		},
		{
			path: '/djyl/zuzhijianshe',
			name: '组织建设',
			component: () => import('./views/Zuzhijianshe.vue'),
			meta:{auth:true,keepAlive: false},
		},
        {
            path: '/shzl/wanggejianshe',
            name: '网格建设',
            component: () => import('./views/Wanggejianshe.vue'),
            meta:{auth:true,keepAlive: false},
        },
		{
			path: '/shzl/wentifenxi',
			name: '问题分析',
			component: () => import('./views/Wentifenxi.vue'),
			meta:{auth:true,keepAlive: false},
		},
		{
			path: '/shzl/quanshehuicanyu',
			name: '全社会参与',
			component: () => import('./views/Quanshehuicanyu.vue'),
			meta:{auth:true,keepAlive: false},
		},
        {
            path: '*',
            name: 'default',redirect: '/djyl/zuzhijianshe',
            component: () => import('./views/Zuzhijianshe.vue'),
            meta:{auth:true,keepAlive: false},
        }
	]
})

router.afterEach((to) => {
	if(to.meta.title){
		window.document.title = to.meta.title + ' -' + process.env.VUE_APP_SERVION;
	}else{
		window.document.title = '楚雄区·城市治理一图全面感知平台' + ' -' + process.env.VUE_APP_SERVION;
	}
})

export default router
