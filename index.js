new Vue({
    el: '#app',
    vuetify: new Vuetify(),
      data () {
          return {
            day: 6,
            invest : 100,
            rate : 0.01,
            rateIncrementBy : 0.001,
            data: [],
          }
      },
      mounted() {
        //
      },
      created() {
        this.profit();
      },
      methods:{
        blocks(){
          let blocks = [];
          let day = this.day;
          let invest = this.invest;
          let rate = this.rate;
          let rateIncrementBy = this.rateIncrementBy;

          let totalCrypto = 0;
          let totalInvest = 0;

          for(let i =1; i <= day; i++){
            let tnbc = invest / rate;
            totalCrypto = totalCrypto + tnbc;
            totalInvest = totalInvest + invest

            let obj = {
                "day" : i,
                "invest" : invest,
                "rate" : rate,
                "tnbc" : tnbc,
                "totalCrypto" : totalCrypto,
                "totalInvest" : totalInvest
            }

            blocks.push(obj);
            rate = rate + rateIncrementBy;
          }
          return blocks;
        },

        profit(){
          // 'http://54.183.16.194/bank_transactions?account_number=6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a'
          
          let day = this.day;
          let n = day - 1;
          let blocks = this.blocks();
          let block = blocks[n];
          let rate = block.rate;
          let totalCrypto = block.totalCrypto;
          let totalInvest = block.totalInvest;

          let salePrice = rate * totalCrypto;
          let profit = salePrice - totalInvest;

          let obj = {
            "blocks" : blocks,
            "day" : day,
            "rate" : rate,
            "total_Investment" : totalInvest,
            "total_crypto" : totalCrypto,
            "sale_price" : salePrice,
            "profit" : profit,
          }
          console.log(obj);

          this.data = obj;
        }
      }
  })