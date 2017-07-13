<template>
	<div class="select-component" id="select">
		<button type="button" @click='onShowOptions'>
			<span class="value">{{selValues[0]}}</span>
			<i class="arrow"></i>
		</button>
		<transition name='options'>
			<ul v-show='isShowOptions' class="select-options" @click='onSelect'>
				<li v-for='v in vs' :data-value='v'>{{v}}</li>
			</ul>
		</transition>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				vs: Array.from(this.values),
				isShowOptions: false, // 是否显示options列表
				selValues: this.selectedValues
			}
		},
		props: {
			values: Array,
			selectedValues: Array
		},
		methods: {
			onShowOptions () {
				this.isShowOptions = true;
				this.bindHideListener();
			},
			onSelect (event){
				let selectedValue = event.target.dataset.value
				this.$emit('selectChange',selectedValue)
				setTimeout(()=>{
					this.isShowOptions = false
					console.log(this.selectedValue)
					// this.value = selectedValue

				},200)

			},
			bindHideListener (){
				let that = this
				document.addEventListener('click',hideOptions)
				function hideOptions(event) {
					let target = event.target
					if(target.id == 'select' ||target.parentNode.id == 'select' ||target.parentNode.id == 'select'){
						return
					}else {
						setTimeout(()=>that.isShowOptions = false,100)
					}
					document.removeEventListener('click',hideOptions)
				}
			}
		}

	}
</script>
<style type="text/css" lang='less'>
@import "../assets/style/utils-rem.less";

	#select {
		display: inline-block;
		vertical-align: middle;
		button {
			.px2rem(width,130);
			.px2rem(height,52);
			padding: 0;
			display: inline-block;
			-webkit-appearance: none;
			background-color: #fff;	
			border: none;
			text-align: center;
			color: #979696;
			.px2rem(font-size,24);
			&:before {
				content: '';
				position: absolute;
				border:1px solid #979696;
		    	transform: scale(.5,.5);
				.px2rem(width,260);
				.px2rem(height,104);
				.px2rem(border-radius,16);
				.px2rem(margin-top,-26);
				.px2rem(margin-left,-90);
			}
			&:after {
				content: '';
				height: 100%;
				display: inline-block;
				vertical-align: middle;
				width: 0;
			}
			.arrow {
				// position: absolute;
				display: inline-block;
				border-width: 6px 5px;
				border-style: solid;
				border-color: #979696  transparent transparent transparent;
				vertical-align: -6px;
				&:before {
					content: '';
					position: absolute;
					border-width: 4px 3px;
					border-style: solid;
					border-color: #fff  transparent transparent transparent;
				    margin-left: -3px;
				    margin-top: -6px;			
		    	}
			}		
		}
		.select-options {
			.px2rem(width,360);
			color: #979696;
			position: absolute;
			background-color: #fff;
			text-align: center;
			.px2rem(margin,-58,0,0,-64);
			z-index: 1;
			.px2rem(border-radius, 32);
			transform: scale(.5,.5);
			border: 1px solid #cbcaca;
			li {
				padding:0;
				.px2rem(line-height, 120);
				.px2rem(font-size,48);
				border-bottom: 1px solid #cbcaca;
			}
			li:last-child {
				border: none;
			}
			&:before {
				content: '';
				display: inline-block;
				position: absolute;
				.px2rem(border-width, 36, 32);
				border-style: solid;
				border-color: transparent  transparent #cbcaca transparent;
				.px2rem(top,-70);
    			.px2rem(left,32);

			}
			&:after {
				content: '';
				display: inline-block;
				position: absolute;
				.px2rem(border-width, 36, 32);
				border-style: solid;
				border-color: transparent  transparent #fff transparent;
				.px2rem(top,-66);
    			.px2rem(left,32);
			}
		}
		.options-enter {
			opacity: 0;
		}
		.options-enter-active, .options-leave-active{
			transition: all 1s ease;
		}
		.options-leave-to {
			opacity: 0;
		}
	}
</style>