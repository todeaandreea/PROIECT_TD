<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="typeOfHoney">Type of Honey</label>
        <input
          type="text"
          class="form-control"
          id="typeOfHoney"
          required
          v-model="stock.typeOfHoney"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          type="number"
          class="form-control"
          id="quantity"
          required
          v-model="stock.quantity"
          name="quantity"
        />
      </div>

      <div class="form-group">
        <label for="harvestDate">Harvest date</label>
        <input
          type="date"
          class="form-control"
          id="harvestDate"
          required
          v-model="stock.harvestDate"
          name="harvestDate"
        />
      </div>

      <div class="form-group">
        <label for="harvestLocation">Harvest location</label>
        <input
          type="text"
          class="form-control"
          id="harvestLocation"
          required
          v-model="stock.harvestLocation"
          name="harvestLocation"
        />
      </div>

      <div class="form-group">
        <label for="purityLevel">Purity level</label>
        <input
          type="text"
          class="form-control"
          id="purityLevel"
          required
          v-model="stock.purityLevel"
          name="purityLevel"
        />
      </div>

      <div class="form-group">
        <label for="producer">Producer</label>
        <input
          type="text"
          class="form-control"
          id="producer"
          required
          v-model="stock.producer"
          name="producer"
        />
      </div>

      <div class="form-group">
        <label for="pricePerKilogram">Price per kilogram</label>
        <input
          type="number"
          class="form-control"
          id="pricePerKilogram"
          required
          v-model="stock.pricePerKilogram"
          name="pricePerKilogram"
        />
      </div>

      <div class="form-group">
        <label for="expirationDate">Expiration date</label>
        <input
          type="date"
          class="form-control"
          id="expirationDate"
          required
          v-model="stock.expirationDate"
          name="expirationDate"
        />
      </div>

      <div class="form-group">
        <label for="storageLocation">Storage location</label>
        <input
          type="text"
          class="form-control"
          id="storageLocation"
          required
          v-model="stock.storageLocation"
          name="storageLocation"
        />
      </div>

      <div class="form-group">
        <label for="isAvailable">Availabilty</label>
        <input
          type="checkbox"
          class="form-control"
          id="isAvailable"
          required
          v-model="stock.isAvailable"
          name="isAvailable"
        />
      </div>

      <button @click="saveTutorial" class="btn_submit">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn_add" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TutorialDataService from '@/services/StockDataService';
import Stock from '@/types/Stock';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
  name: 'add-stock',
  data: function () {
    return {
      stock: {
        typeOfHoney: '',
        quantity: 0,
        harvestDate: new Date(0),
        harvestLocation: '',
        purityLevel: '',
        producer: '',
        pricePerKilogram: 0,
        expirationDate: new Date(0),
        storageLocation: '',
        isAvailable: false
      } as Stock,
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      let data = {
        typeOfHoney: this.stock.typeOfHoney,
        quantity: this.stock.quantity,
        harvestDate: this.stock.harvestDate,
        harvestLocation: this.stock.harvestLocation,
        purityLevel: this.stock.purityLevel,
        producer: this.stock.producer,
        pricePerKilogram: this.stock.pricePerKilogram,
        expirationDate: this.stock.expirationDate,
        storageLocation: this.stock.storageLocation,
        isAvailable: this.stock.isAvailable
      };

      TutorialDataService.create(data)
        .then((response: ResponseData) => {
          this.stock.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.stock = {} as Stock;
    }
  }
});
</script>

<style>

.btn_submit {
  transition-duration: 0.4s;
  background-color: #73c443;
  border-radius: 10px;
  color: #FFFFFF;
  width: 300px;
  border-color: #FFFFFF;
}

.btn_submit:hover {
  background-color: #4CAF50; /* Green */
  color: #FFFFFF;
}

.btn_add {
  transition-duration: 0.4s;
  background-color: #73c443;
  border-radius: 10px;
  color: #FFFFFF;
  width: 300px;
  border-color: #FFFFFF;
}

.btn_add:hover {
  background-color: #4CAF50; /* Green */
  color: #FFFFFF;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
