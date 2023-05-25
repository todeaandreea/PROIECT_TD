<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by type of honey"
          v-model="typeOfHoney"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-dark"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Stocks</h4>


      <table class="stock-table">
        <th>Type of honey</th>
        <th>Producer</th>
        <th>Quantity</th>
        <th colspan='2'>Operations</th>

        <tr
          :class="{ active: index == 1 }"
          v-for="(stock, index) in stocks"
          :key="index"
          @click="setActiveTutorial(stock, index)">
          <td >
            {{ stock.typeOfHoney }}
          </td>

          <td>
           {{ stock.producer }}
          </td>
          <td>
            {{ stock.quantity }}
          </td>


          <td>
            <button class="button1" @click="deleteStock(stock.id)">Delete</button>

          </td>

          <td>
            <router-link
              :to="'/tutorials/' + stock.id"
            class="button2"
            >Edit
            </router-link
            >

          </td>

        </tr>
      </table>


      <button class="button3" @click="removeAllstocks">
        Remove All
      </button>
    </div>

    <div class="col-md-6">
      <div v-if="currentStock.id">
        <h4>Stock</h4>
        <div>
          <label><strong>Type of Honey:</strong></label>
          {{ currentStock.typeOfHoney }}
        </div>
        <div>
          <label><strong>Quantity:</strong></label>
          {{ currentStock.quantity }}
        </div>
        <div>
          <label><strong>Harvest Date:</strong></label>
          {{ currentStock.harvestDate }}
        </div>
        <div>
          <label><strong>Harvest Location:</strong></label>
          {{ currentStock.harvestLocation }}
        </div>
        <div>
          <label><strong>Purity Level:</strong></label>
          {{ currentStock.purityLevel }}
        </div>
        <div>
          <label><strong>Producer:</strong></label>
          {{ currentStock.producer }}
        </div>
        <div>
          <label><strong>Price Per Kilogram:</strong></label>
          {{ currentStock.pricePerKilogram }}
        </div>
        <div>
          <label><strong>Expiration Date:</strong></label>
          {{ currentStock.expirationDate }}
        </div>
        <div>
          <label><strong>Storage Location:</strong></label>
          {{ currentStock.storageLocation }}
        </div>
        <div>
          <label><strong>Is available:</strong></label>
          {{ currentStock.isAvailable }}
        </div>


      </div>
      <div v-else>
        <br />
        <p>Please click on a honey...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StockDataService from '@/services/StockDataService';
import Stock from '@/types/Stock';
import ResponseData from '@/types/ResponseData';


export default defineComponent({
  name: 'stocks-list',
  data() {
    return {
      stocks: [] as Stock[],
      currentStock: {} as Stock,
      currentIndex: -1,
      typeOfHoney: '',
      message: ''
    };
  },
  methods: {
    retrievestocks() {
      StockDataService.getAll()
        .then((response: ResponseData) => {
          this.stocks = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievestocks();
      this.currentStock = {} as Stock;
      this.currentIndex = -1;
    },

    setActiveTutorial(stock: Stock, index = -1) {
      this.currentStock = stock;
      this.currentIndex = index;
    },


    deleteStock(id: any) {
      StockDataService.delete(id)
        .then((response: ResponseData) => {
          console.log(response);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },


    updateStock(id:any, data:any) {
      StockDataService.update(id, this.stocks)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = 'The stock was updated successfully!';
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    removeAllstocks() {
      StockDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchTitle() {
      StockDataService.findByType(this.typeOfHoney)
        .then((response: ResponseData) => {
          this.stocks = response.data;
          this.setActiveTutorial({} as Stock);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievestocks();
  }
});
</script>

<style>
.list {
  text-align: center;
  max-width: 1500px;
  margin: auto;
}

.stock-table{
  border-collapse: collapse;
}

.stock-table td{
  padding: 15px;
  white-space: nowrap;
  border-color: #dcb122;
}

table, td,th{
  border: 1px solid black;
}

.button1 {
  display: inline-block;
  padding: 5px 5px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #f4511e;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button1:hover {background-color: #6F1A0E}

.button1:active {
  background-color: #6F1A0E;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}


.button2 {
  background-color: #3684CA;
  color: white;
  padding: 8px 15px;
  text-align: center;
  font-size: 15px;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.button2:hover {opacity: 1}

.button3 {
  display: inline-block;
  padding: 5px 5px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #f4511e;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button3:hover {background-color: #f4511e}

.button3:active {
  background-color: #f4511e;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

h4{
  font-family: "Apple Color Emoji";
  font-size: 40px;
}
th {
  font-family: "Apple Color Emoji";
  border-color: #dcb122;
  background:#f1d11f;
}

.form-control{
  background: #fcfcd6;
}



</style>
