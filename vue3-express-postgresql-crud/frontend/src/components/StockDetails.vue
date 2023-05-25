<template>
  <div v-if="currentStock.id" class="edit-form">
    <h4>Stock</h4>
    <form>
      <div class="form-group">
        <label for="typeOfHoney">Type of Honey</label>
        <input
          type="text"
          class="form-control"
          id="typeOfHoney"
          v-model="currentStock.typeOfHoney"
        />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          type="text"
          class="form-control"
          id="quantity"
          v-model="currentStock.quantity"
        />
      </div>
      <div class="form-group">
        <label for="harvestDate">Harvest Date</label>
        <input
          type="date"
          class="form-control"
          id="harvestDate"
          v-model="currentStock.harvestDate"
        />
      </div>
      <div class="form-group">
        <label for="harvestLocation">Harvest Location</label>
        <input
          type="text"
          class="form-control"
          id="harvestLocation"
          v-model="currentStock.harvestLocation"
        />
      </div>
      <div class="form-group">
        <label for="purityLevel">Purity Level</label>
        <input
          type="text"
          class="form-control"
          id="purityLevel"
          v-model="currentStock.purityLevel"
        />
      </div>
      <div class="form-group">
        <label for="producer">Producer</label>
        <input
          type="text"
          class="form-control"
          id="producer"
          v-model="currentStock.producer"
        />
      </div>
      <div class="form-group">
        <label for="pricePerKilogram">Price per Kilogram</label>
        <input
          type="text"
          class="form-control"
          id="pricePerKilogram"
          v-model="currentStock.pricePerKilogram"
        />
      </div>
      <div class="form-group">
        <label for="expirationDate">Expiration Date</label>
        <input
          type="date"
          class="form-control"
          id="expirationDate"
          v-model="currentStock.expirationDate"
        />
      </div>
      <div class="form-group">
        <label for="storageLocation">Storage Location</label>
        <input
          type="text"
          class="form-control"
          id="storageLocation"
          v-model="currentStock.storageLocation"
        />
      </div>

      <div class="form-group">
        <label for="isAvailable">Availability</label>
        <input
          type="checkbox"
          class="form-control"
          id="isAvailable"
          v-model="currentStock.isAvailable"
        />
      </div>
    </form>
    <button
      type="submit"
      class="btn_update"
      @click="updateStock"
    >
      <span>Update</span>

    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a honey...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TutorialDataService from '@/services/StockDataService';
import Stock from '@/types/Stock';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
  name: 'stock',
  data() {
    return {
      currentStock: {} as Stock,
      message: ''
    };
  },
  methods: {
    getStock(id: any) {
      TutorialDataService.get(id)
        .then((response: ResponseData) => {
          this.currentStock = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateStock() {
      TutorialDataService.update(this.currentStock.id, this.currentStock)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = 'The stock was updated successfully!';
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteStock() {
      TutorialDataService.delete(this.currentStock.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: 'stocks' });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getStock(this.$route.params.id);
  }
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}


.btn_update {
  display: inline-block;
  border-radius: 15px;
  background-color: #73c443;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 15px;
  padding: 5px 5px;
  width: 300px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.btn_update span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn_update span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.btn_update:hover span {
  padding-right: 25px;
}

.btn_update:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
