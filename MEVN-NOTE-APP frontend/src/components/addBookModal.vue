<script lang="ts">
export default {
  props: {
    show: Boolean,
    Data: <any>{
      book: String,
      author: String,
      booksmith: String,
      notes:[]
    }
  },
  //   async EditItem(id:number) {
  //     try {
  //         await axios.patch(`${`http://localhost:3000/dataArray`}/${id}`, {
  //             boughtItem: true
  //         });
  //         let data = this.companyData
  //             return data;

  //     } catch (error) {
  //         console.error(error);
  //     }
  // },
  methods: {
    reload() {
      location.reload()
    }
  }
}
</script>

<template>
  <Transition name="addbookmodal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">Add Book</slot>
          </div>
          <div class="modal-body">
            <span>Book Name :</span>
            <input name="body" v-model="Data.book" class="data" />
            <span>Author :</span>
            <input name="body" v-model="Data.author" class="data" />
            <span>Booksmith :</span>
            <input name="body" v-model="Data.booksmith" class="data" />
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="reload">CANCEL</button>
            <button class="modal-default-button" @click="$emit('close')">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
.data {
  margin: 15px;
  padding: 10px;
  border: 1px solid #42b983;
  border-radius: 5px;
}
.modal-footer {
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-around;
}

.modal-default-button {
  float: none;
  height: 2rem;
  width: 5rem;
  border-radius: 5px;
  border: 1px solid #42b983;
  color: #fff;
  background-color: #42b983;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
