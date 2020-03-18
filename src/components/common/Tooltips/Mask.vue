<template>
	<!-- 带有遮罩层的模态窗   -->
	<transition name="fadeinout">
		<div class="tooltips" :style="mask?'':'pointer-events:none'">
			<div class="tooltips-Mask"></div>
			<div class="tooltips-content">
				<div class="tooltips-holder" :class="{'tooltips-holder-nomask':!mask}">
					<div class="block-top-right" v-if="mask"></div>
					<div class="block-bottom-right" v-if="mask"></div>
					<div class="tooltips-background">
						<div class="ivu-icon ivu-icon-ios-close tooltips-close" @click="close"></div>
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "Masks",
		props: ['type', 'styles'],
		data: function () {
			return {
				mask: true
			}
		},
		created: function () {
			if (this.type == 'nomask') {
				this.mask = false;
			}
		},
		mounted: function () {
			if (this.styles) {
				let data = this.styles;
				for (let i in data) {
					this.setStyle(i, this.styles[i])
				}
			}
		},
		methods: {
			close: function () {/*关闭弹窗*/
				this.$destroy(true);
				try {
					this.$el.parentNode.removeChild(this.$el);
				}catch (e) {
					console.log(e);
				}
			},
			setStyle: function (className, classNode) {/*手动设置弹窗某个class得style*/
				let target = this.$el.querySelector('.' + className);
				if (target) {
					for (let i in classNode) {
						target.style[i] = classNode[i];
					}
				} else {
					console.error('could not find className ' + className);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tooltips {width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1000}

	.tooltips-Mask {width: 100%;height: 100%;position: fixed;background: rgba(2, 7, 13, .8);z-index: 1001}

	.tooltips-holder {box-sizing: content-box;padding: 17px;border: 1px solid rgba(255, 45, 18, 1);position: relative;z-index: 1013}

	.tooltips-background {background: rgba(8, 30, 43,0.8);box-shadow: 0px -1px 5px 2px rgba(2, 13, 20, 0.69);position: relative}

	.tooltips-content {height: 100%;display: flex;justify-content: center;align-items: center}

	.tooltips-close {position: absolute;right: 0;top: 0;cursor: pointer;z-index: 2 ;color:rgba(255,97,77,1) !important;-webkit-text-stroke: 0.2px rgba(255,0,0,0.2);}

	.tooltips-holder-nomask {
		border: none;padding: 0;

		&:before {display: none !important;}

		&:after {display: none !important;}

		.tooltips-background {
			background: transparent;
			box-shadow: none;
		}
	}

	.tooltips-holder:before {
		content: '';
		height: 14px;
		width: 14px;
		background: rgba(255, 97, 77, 1);
		display: block;
		position: absolute;
		top: -7px;
		left: -7px;
	}

	.tooltips-holder:after {
		content: '';
		height: 14px;
		width: 14px;
		background: rgba(255, 97, 77, 1);
		display: block;
		position: absolute;
		bottom: -7px;
		left: -7px;
	}

	.block-top-right {
		height: 14px;
		width: 14px;
		background: rgba(255, 97, 77, 1);
		display: block;
		position: absolute;
		right: -7px;
		top: -7px;
	}

	.block-bottom-right {
		height: 14px;
		width: 14px;
		background: rgba(255, 97, 77, 1);
		display: block;
		position: absolute;
		right: -7px;
		bottom: -7px;
	}

	.fadeinout-enter, .fadeinout-leave-to {
		opacity: 0;

		.tooltips-holder {
			transform: scale(0.8);
		}
	}

	.fadeinout-enter-to, .fadeinout-leave {
		opacity: 1;

		.tooltips-holder {
			transform: scale(1);
		}
	}

	.fadeinout-enter-active, .fadeinout-leave-active {
		transition: all .5s;

		.tooltips-holder {
			transition: all .5s;
		}
	}
</style>