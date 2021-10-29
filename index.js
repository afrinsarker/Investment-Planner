new Vue({
    el: '#app',
    vuetify: new Vuetify(),
      data () {
          return {
            valid: true,
            show:false,
            search: '',
            loading: false,
            interval: '',
            invest : '',
            rate : '',
            rateIncrement : '',
            data: [],
            calculations:[],
            headers: [
              { text: 'Intervals', align: 'start', sortable: true, value: 'interval'},
              { text: 'Investment', align: 'start', sortable: false, value: 'invest'},
              { text: 'Rate', align: 'start', sortable: true, value: 'rate'},
              { text: 'Tnbc', align: 'start', sortable: false, value: 'tnbc'},
              { text: 'Total TNBC', align: 'start', value: 'totalCrypto', sortable: false },
              { text: 'Total Investment', align: 'start', value: 'totalInvest', sortable: false },
          ],
          validation: [
            v => !!v || 'This field is required',
          ],
         }
          
      },
      mounted() {
        //
      },
      created() {
        //
      },
      methods:{
        blocks(interval, invest, rate, rateIncrement){
          let blocks = [];
          let totalCrypto = 0;
          let totalInvest = 0;

          for(let i =1; i <= interval; i++){
            let tnbc = invest / rate;
            totalCrypto = totalCrypto + tnbc;
            totalInvest = totalInvest + invest

            let obj = {
                "interval" : i,
                "invest" : invest,
                "rate" : rate.toFixed(3),
                "tnbc" : tnbc.toFixed(3),
                "totalCrypto" : totalCrypto.toFixed(3),
                "totalInvest" : totalInvest
            }

            blocks.push(obj);
            rate = rate + rateIncrement;
          }
          return blocks;
        },

        profit(interval, invest, rate, rateIncrement){
          let n = interval - 1;
          let blocks = this.blocks(interval, invest, rate, rateIncrement);
          let block = blocks[n];
          let dayRate = block.rate;
          let totalCrypto = block.totalCrypto;
          let totalInvest = block.totalInvest;

          let salePrice = dayRate * totalCrypto;
          let profit = salePrice - totalInvest;

          let obj = {
            "blocks" : blocks,
            "interval" : interval,
            "invest" : invest,
            "rate" : rate,
            "dayRate" : dayRate,
            "total_Investment" : totalInvest,
            "total_crypto" : totalCrypto,
            "sale_price" : salePrice.toFixed(2),
            "profit" : profit.toFixed(2),
          }
          return obj;
        },
        calculate(){
          const interval = Number(this.interval);
          const invest = Number(this.invest);
          const rate = Number(this.rate);
          const rateIncrement = Number(this.rateIncrement);

          // const interval = 2;
          // const invest = Number(100);
          // const rate = Number(0.01);
          // const rateIncrement = Number(0.001);

          let profit = this.profit(interval, invest, rate, rateIncrement);
          this.data = profit;
          this.show = true;
        }
      }
  })