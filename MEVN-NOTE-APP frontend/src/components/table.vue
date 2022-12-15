<template class="h-full w-full">
  <div class="table-container">
    <v-card-title class="search">
      <v-text-field
        class="search-text-field"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn class="search-button" @click="searchTable">Search </v-btn>
    </v-card-title>
    <v-table class="table-component" id="myTable" fixed-header height="300px">
      <thead>
        <tr class="table-header">
          <th class="text-center">
            Book
            <span>
              <svg
                class="company-asc"
                @click="sortTableByCompanyAscending()"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 19V6M5 12l7-7 7 7" />
              </svg>
              <svg
                class="company-desc"
                @click="sortTableByCompanyDecending()"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v13M5 12l7 7 7-7" />
              </svg>
            </span>
          </th>
          <th class="text-center">
            Author
            <span>
              <svg
                class="contact-asc"
                @click="sortTableByContactAscending()"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 19V6M5 12l7-7 7 7" />
              </svg>
              <svg
                class="contact-desc"
                @click="sortTableByContactDecending()"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v13M5 12l7 7 7-7" />
              </svg>
            </span>
          </th>
          <th class="text-center">
            Booksmith
            <span>
              <svg
                class="country-asc"
                @click="sortTableByCountryAscending()"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 19V6M5 12l7-7 7 7" />
              </svg>
              <svg
                class="country-desc"
                @click="sortTableByCountryDecending()"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v13M5 12l7 7 7-7" />
              </svg>
            </span>
          </th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="d in tableArray"
          :key="d._id"
          :id="`row-${d._id}`"
          @click="navToNotes(d._id)"
        >
          <td>
            {{ d.book }}
          </td>
          <td>
            {{ d.author }}
          </td>
          <td>
            {{ d.booksmith }}
          </td>

          <td>
            <delete-icon @click="deleteData(d.id)" />
            <download-icon @click="exportToPDF(d)" />
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="text-center">
      <v-dialog v-model="dialog" width="300">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> Add Book </v-card-title>

          <v-card-text>
            <input name="body" v-model="data.book" class="data" />

            <input name="body" v-model="data.author" class="data" />

            <input name="body" v-model="data.booksmith" class="data" />
            <div class="modal-footer">
              <button class="modal-default-button" @click="dialog = false">
                CANCEL
              </button>
              <button class="modal-default-button" @click="addBook">
                SAVE
              </button>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <v-btn
      class="add-btn"
      depressed
      color="primary"
      @click="addBook, (dialog = true)"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Book</v-btn
    >
    <label class="dropdown-label">Number of items:</label>
    <select class="dropdown" @change="e => filterItems(e)">
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="10">10</option>
      <option value="5">05</option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import axios from 'axios'
import Vue3Html2pdf from 'vue3-html2pdf'
import { jsPDF } from 'jspdf'
import router from '@/router'
type Note = {
  id: number
  text: string
  x: number
  y: number
}
type Data = {
  book: string
  author: string
  booksmith: string
  notes: Note[]
}
export default defineComponent({
  name: 'table',
  components: {
    Vue3Html2pdf
  },
  // setup() {
  //   const tabArray = inject('tableArray')
  //   const lang = ref()

  //   watch(lang, (newValue: number) => {
  //     console.log(tabArray)

  //     // console.log((tabArray as Record<string, any>[]).slice(0, newValue - 1))
  //   })

  //   return { lang }
  // },
  async created() {
    try {
      const res = await axios.get(`/books/get-book-list`)
      this.dataArray = res.data.data
      this.tableArray = this.dataArray
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      search: '',
      itemsOnTable: 0,
      showModal: false,
      data: {} as Data,
      dataArray: <Record<string, any>>[],
      tableArray: <Record<string, any>>[],
      dialog: false
    }
  },

  // async created() {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/dataArray`)
  //     this.dataArray = res.data
  //     this.tableArray = this.dataArray
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },

  // async deleteData(id: number) {
  //   try {
  //     const res = await axios.delete(`http://localhost:3000/dataArray/${id}`)
  //     this.dataArray = this.dataArray.filter(
  //       (dataArray: any) => dataArray.id !== id
  //     )
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },

  methods: {
    navToNotes(bookId: any) {
      sessionStorage.setItem('selecteBookID', bookId)
      router.push({ path: `/homepage/notes/${bookId}`, params: { bookId } })
    },
    // openModal(companyData: any) {
    //   this.showModal = true
    //   this.companyData = companyData.id
    //   console.log('--------', companyData)
    // }
    addBook() {
      axios.post('/books/add-book', this.data)
      console.log('add-book')
      console.log(this.data)
      this.dialog = false
      location.reload();
    },

    deleteData(id: number) {
      // window.alert("hi")
      console.log('id----', id)
      this.dataArray.splice(id - 1)
      // delete(this.dataArray[id])
      console.log('---', this.dataArray)
    },

    exportToPDF(data: any) {
      var doc = new jsPDF()
      const row: any = []
      const cols = ['Amount', 'Description']
      const title = 'Sales details'

      var elementHTML = document.getElementById(`row-${data.id}`) as HTMLElement
      doc.setFont('times', 'bold')
      doc.text('Company', 20, 10)
      doc.text('Contact', 95, 10)
      doc.text('Country', 170, 10)

      doc.setFont('times', '')
      doc.setFontSize(10)
      doc.text(data.company, 15, 20)
      doc.text(data.contact, 95, 20)
      doc.text(data.country, 175, 20)
      doc.save(`row-${data.id}.pdf`)
    },
    sortTableByCompanyAscending() {
      this.tableArray.sort(this.dynamicSortAscending('company'))
    },
    sortTableByContactAscending() {
      this.tableArray.sort(this.dynamicSortAscending('contact'))
    },
    sortTableByCountryAscending() {
      this.tableArray.sort(this.dynamicSortAscending('country'))
    },
    dynamicSortAscending(property: any) {
      var sortOrder = 1
      if (property[0] === '-') {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (a: any, b: any) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0

        return result * sortOrder
      }
    },
    //descending order sorting functions..
    sortTableByCompanyDecending() {
      this.tableArray.sort(this.dynamicSortDecending('company'))
    },
    sortTableByContactDecending() {
      this.tableArray.sort(this.dynamicSortDecending('contact'))
    },
    sortTableByCountryDecending() {
      this.tableArray.sort(this.dynamicSortDecending('country'))
    },
    dynamicSortDecending(property: any) {
      var sortOrder = 1
      if (property[0] === '-') {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (a: any, b: any) {
        var result =
          a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0

        return result * sortOrder
      }
    },
    searchTable() {
      const searchRegExp: RegExp = new RegExp(this.search, 'gi')

      if (!this.search) {
        this.tableArray = this.dataArray
        return
      }

      // console.log(this.tableArray);

      this.tableArray = this.tableArray.filter((item: Record<string, any>) => {
        return (
          searchRegExp.test(item.book) ||
          searchRegExp.test(item.author) ||
          searchRegExp.test(item.booksmith)
        )
      })

      console.table(this.tableArray)
    },
    filterItems(e: any) {
      this.tableArray = this.dataArray
      console.log((this.tableArray = this.tableArray.slice(0, e.target.value)))
      console.log(e.target.value)
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../scss/variables';

.table-component {
  border-collapse: collapse;
  border: 1px solid grey;
  border-radius: 0 5px 5px 5px;
}
.table-header {
  background-color: rgb(193, 190, 190);
}
tr {
  line-height: 30px;
  border-bottom: 1px solid grey;
}
th {
  background-color: rgb(193, 190, 190);
  width: 15rem;
  text-align: center;
  span {
    visibility: hidden;
  }
}
th:hover {
  span {
    visibility: visible;
    cursor: pointer;
  }
}
svg {
}
.search {
  width: 30rem;
  margin-left: -16px !important;
  margin-bottom: -10px !important;
  margin-right: -25px;
  display: flex;
  // justify-content: space-around;
  // align-items: center;
}
.search-text-field {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-radius: 5px 0 0 0;
}
.search-button {
  height: 3.4rem !important;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-radius: 0 5px 0 0;
}
.dropdown-container {
}
.dropdown {
  position: absolute;
  bottom: auto;
  right: 145px;
  width: 3.5rem;
  height: 2rem;
  padding: 3px;
  text-align: center;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: 10px;
}
span {
  cursor: pointer;
}
option {
  text-align: center;
}
.dropdown-label {
  position: absolute;
  bottom: auto;
  right: 200px;
  padding: 5px;
  margin-top: 10px;
}
.table-component::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
}
.table-component:webkit-scrollbar-thumb {
  background-color: rgb(190, 190, 190, 0.5);

  border-radius: 5px;
}
</style>
