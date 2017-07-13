<template>
	<ul id="lottery">
		<li class="lot-time">
			<i class="time-icon"></i>
			{{lotTime}}
		</li><!-- --><li class="divide-line line"></li><!-- --><li class="lot-bet">
			<i class="recommend" v-if='showRecommend'>荐</i>
			<p class="lot-description" :class='{"to-inline": showCarry}'>
				{{lotDescription}}
				</p>
			<div v-if='showCarry' class="lucky-nums" :class='{"lucky-nums-inline":isLuckyNumsInline}' ref='luckyNums' @click='onSelectNum'>
				<div v-for='(v,i) in luckyNums'>
					<p class='carry'>{{LuckyNumsCarry[i]}}</p>
					<p class='num' :class='{"num-selected":luckyNumsSelectedClass[v]}' :data-index='i'> {{'0'+v}}</p>
				</div>
				<div >
					<p class="placeholder">占位</p>
					<i class="refresh"></i>
				</div>
			</div>
			<div v-else class="lucky-nums" :class='{"lucky-nums-inline":isLuckyNumsInline}' ref='luckyNums' @click='onSelectNum'>
				<i v-for='(v,i) in luckyNums' class='num' :class='{"num-selected":luckyNumsSelectedClass[i]}' :data-index='i' :key='v+i'>{{'0'+v}}</i>
				<i class="refresh"></i>
			</div>
			<div class="bet-bottom">
				<select-component @selectChange='onSelectChange' :values='lotMoney' :selectedValues='selectedMoney'>
					
				</select-component>
				<a class="lot-btn" @click.once='onBet' href="javascript:;">{{goBet}}</a>
			</div>
		</li>
		<li class="lot-jackpot" v-if='showJackpot == true'>
		<i class="currency">￥</i>

		奖池
		<transition-group name="jackpot-yi" mode='out-in'>
			<i v-for='(n,i) in lotJackpot.yi' class="jackpot-num" :key='n+i' >{{n}}</i>

		</transition-group>
		亿
		<transition-group name="jackpot-wan" mode='out-in'>			<i v-for='(n,i) in lotJackpot.wan' class="jackpot-num" :key='n+i'>{{n}}</i>
		</transition-group>
		万
		</li>
	</ul>
</template>
<script type="text/javascript">
import select from "./select.vue";

	export default {
		data () {
			return this.options			
		},
		props: {
			options: Object
		},
		computed: {
			lotJackpot () {
				let num = (~~(this.jackpotMoney/10e4) + '').split('').reverse()
				return num.length > 3 ? {
					wan: num.slice(0,3).reverse(),
					yi: num.slice(3).reverse()
				}
				: {
					wan: num,
					yi: []
				}
			}
		},
		components: {
			'select-component': select
		},
		// watch: {
		// 	lotJackpot: {
		// 		deep: true,
		// 		handler(val,oldVal){
		// 			console.log(val)
		// 		}
		// 	}
		// },
		methods: {
			onSelectChange (value) {
				this.$emit('selectedMoneyChange',value)
			},
			onBet(event){
				let target = event.target
				this.goBet = '已投注'
				target.className += ' lot-btn-clicked'
			},
			onSelectNum (event) {
				let target = event.target
				let className = event.target.className
				let that = this
				switch (className){
					case 'num': clickNum(); break;
					case 'refresh': refresh();break;
				}

				function clickNum() {
					let index = +target.dataset.index
					let cls = new Array(that.luckyNums.length)
					cls[index] = 'num-selected'
					that.luckyNumsSelectedClass = cls
				}
				function refresh() {
					target.className += ' refreshing'
					setTimeout(()=>target.className = 'refresh',1000)
					that.$emit('updateLuckyNums')
				}				
			}
		}
	}
</script>
<style type="text/css" lang="less">
@import "../assets/style/utils-rem.less";
// @keyframes {
// 	0 {
// 		transform: rotateX(0)
// 	}
// 	25% {

// 	}
// 	50% {

// 	}

// } 
	#lottery {
		background-color: #fff;
		.px2rem(border-radius,20);
		font-size: 0;
		.px2rem(margin,0,20);
    	position: relative;	
    	.line {
		    border-top:1px solid #cbcaca;
		    transform: scaleY(.5);
		}

		i {
			font-style: normal;
			display: inline-block;
		}
		li {
			.px2rem(font-size,24);
			.px2rem(margin,0,20);
		}
		li:first-child {
			margin-top: 0;
		}
		.lot-time {
			.px2rem(padding-top,20);
			color: #666;
			.px2rem(height,40);
		}
		.divide-line {
			.px2rem(margin,20,20);
		}
		.lot-bet {
			color: #979696;
			.px2rem(padding-bottom,26);
			.recommend {
				.px2rem(font-size,16);
				color: #fff;
				.px2rem(width,20);
				background: url(../assets/img/recommend.png) no-repeat center center;
				.px2rem(line-height,26);
				text-align:center;
				background-size: 100%;
				.px2rem(vertical-align,4);
			}
			.lot-description {
				display: inline-block;
				.px2rem(margin-right,12);
			}
			.to-inline {
				.px2rem(vertical-align, -42);
			}
			.lucky-nums {
				-webkit-user-select: none;
				user-select: none;
				.px2rem(margin-top,16);
				text-align:center;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: flex-start;
				.carry {
					.px2rem(margin-bottom,4);
					.px2rem(margin-right,20);

				}
				.num {
					.px2rem(width,50);
					color: #fff;
					.px2rem(font-size,30);
					.px2rem(line-height,50);
					.px2rem(border-radius,50);
					background-color: #f2514a;
					.px2rem(margin-right,20);
				}
				.refresh {
					background: url('../assets/img/refresh.png') no-repeat center center;
					.px2rem(width,36);
					.px2rem(height,50);
					.px2rem(margin-top,4);
					background-size: 100%;

				}
				.refreshing {
						transition: all 1s ease;
						transform: rotateZ(180deg);
					}
				.num-selected {
					background-color: #4493f4;
				}
			}
			.placeholder {
					visibility: hidden;
				}
			.lucky-nums-inline {
				display: inline-flex;
			}
			.lucky-nums-enter-active {
			    transition: all 1s ease;
			}
			.lucky-nums-leave-active {
				position: absolute;
			    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
			}
			.lucky-nums-enter {
				opacity: 0;
			}
			.lucky-nums-leave-to {		  
				transform: translateY(-10px);
			    opacity: 0;
			}
			.bet-bottom {
				.px2rem(padding-top,18);
				font-size:0;
				&:before {
					content: '';
					height: 100%;
					width: 0;
				}
			}
			.lot-btn {
				.px2rem(width,410);
				vertical-align: middle;
				display: inline-block;
				.px2rem(line-height,52);
				.px2rem(padding-bottom,4);
				background-color: #f2514a;
				.px2rem(border-radius,8);
				.px2rem(font-size,26);
				.px2rem(margin-left,20);
				color: #fff;
				text-align: center;
			}
			.lot-btn-clicked {
				background-color: #b3b1b1;
			}
		}
		.lot-jackpot {
			background-color: #ffe6e6;
			text-align: center;
			.px2rem(height,68);
			margin: 0;
			.px2rem(border-radius,0,0,20,20);
			&:after {
				content: '';
				height: 100%;
				width: 0;
				vertical-align: middle;
				display: inline-block;
			} 
			.jackpot-num {
				.px2rem(width,20);
				.px2rem(height,30);
				.px2rem(margin-left,2);
				color: #fff;
				.px2rem(border-radius,4);
				background-color: #f2514a;
			}
			.currency {
				.px2rem(width,24);
				.px2rem(line-height,24);
				.px2rem(font-size,18);
				color: #706f6f;
				text-align: center;
				border: 1px solid #706f6f;
				.px2rem(border-radius,24);
				word-spacing: -1px;
				vertical-align: 1px;
			}
		}
		.jackpot-yi-enter-active, .jackpot-wan-enter-active {
		    transition: all 1s ease;
		}
		.jackpot-yi-leave-active, .jackpot-wan-leave-active {
			position: absolute;
		    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.jackpot-yi-enter, .jackpot-wan-enter {
			opacity: 0;
		}
		.jackpot-yi-leave-to, .jackpot-wan-leave-to {		  
			transform: translateY(-10px);
		    opacity: 0;
		}
		.time-icon {
			.px2rem(width,40);
			.px2rem(height,40);
			display: inline-block;
			.px2rem(border-width,4); 
			border-style: solid;
			border-color: #666;
			.px2rem(border-radius,40);
			.px2rem(vertical-align,-14);
			transform: scale(.5,.5);
			.px2rem(margin,0,-12);
			&:before, &:after {
				position: absolute;
				content: '';
				border-style: solid;
				border-color: #666;
			}
			&:before {
				.px2rem(border-width,20,0,0,4); 
				.px2rem(margin,8,0,0,16);
			}
			&:after {
				.px2rem(border-width,4,0,0,12); 
				.px2rem(margin,24,0,0,18);
			}
		}
	}
</style>