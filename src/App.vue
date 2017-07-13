<template>
  <div id="app">
    <header>
      <img src="./assets/img/slogan.png" alt="免费投注双色球" class="slogan">
    </header><!-- --><m-lottery :options='lotteryOptions' @updateLuckyNums='onUpdateLuckyNums' @selectedMoneyChange='onSelectedMoneyChange'>
    </m-lottery>    
    <footer>
     <m-intro>
            <span slot='intro-title'>规则说明</span>
     </m-intro>
    </footer>
  </div>
</template>

<script>
  import lottery from './components/lottery.vue'
  import intro from './components/intro.vue'
  export default {
    data () {
      let data = {
        lotteryOptions:{
          showJackpot: false, // boolean 是否显示奖金池一栏
          showRecommend: false, // boolean 是否显示'推荐'icon
          showCarry: true, // boolean 是否显示金额对应的进位文字，如'百'
          isLuckyNumsInline: true, //  boolean是否将幸运数字显示为inline-flex
          LuckyNumsCarry: ['个','十','百','千','万'].reverse(), // array
          luckyNumsSelectedClass: [], // array
          lotTime: '第14134期 周二21:30开奖', //string
          lotDescription: '排5直选:', // string
          luckyNums: [1,3,4,6,5], //array
          jackpotMoney: 1176811111, // 奖池金额 // number
          lotMoney: ["10元","20元","50元"], // 投注金额 //array
          goBet: '立即投注', // string
          selectedMoney: ["10元"] // 已选择投注金额 //arrary
        }
      }
      // 模仿奖金池金额更新
      setInterval(()=>{
        data.lotteryOptions.jackpotMoney += 20000000 
      },2000)
      return data
    },
    components: {
      'm-intro': intro,
      'm-lottery': lottery
    },
    methods: {
      // 更新lottery组价数据
      updateLotteryOptions(){
        //ajax
      },
      onUpdateLuckyNums () {
        let len = this.lotteryOptions.luckyNums.length
        let nums = new Array(len)
        for (let i=0; i<len ;i++){
            nums[i] = ~~(Math.random()*10)
        }
        // this.lotteryOptions.luckyNums.splice(0,1,~~(Math.random()*10))
        this.lotteryOptions.luckyNums = nums
      },
      onSelectedMoneyChange (value) {
          this.lotteryOptions.selectedMoney.splice(0,1,value)
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/style/index.less";
</style>
