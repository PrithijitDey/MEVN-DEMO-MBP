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
              Name
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
              Username
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
              Email
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
          <tr v-for="d in tableArray" :key="d.id" :id="`row-${d.id}`">
            <td @click=";(userData = d), (showModal = true)">
              {{ d.name }}
            </td>
            <td @click=";(userData = d), (showModal = true)">
              {{ d.username }}
            </td>
            <td @click=";(userData = d), (showModal = true)">
              {{ d.email }}
            </td>

            <td>
              <delete-icon @click="deleteData(d.id)" />
            </td>
          </tr>
        </tbody>
      </v-table>
      <label class="dropdown-label">Number of items:</label>
      <select class="dropdown" @change="e => filterItems(e)">
        <option value="10">10</option>
        <option value="5">5</option>
      </select>
      <Teleport to="body">
        <modal
          :Data="userData"
          :show="showModal"
          @close="showModal = false"
        >
          <template #header>
            <h3>User Details</h3>
          </template>
        </modal>
      </Teleport>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import axios from 'axios'
import Modal from './Modal.vue'

export default defineComponent({
  name: 'users',
  components: {
    Modal
  },
  data() {
    return {
      search: '',
      itemsOnTable: 0,
      showModal: false,
      userData: {},
      dataArray: <Record<string, any>>[],
      tableArray: <Record<string, any>>[]
    }
  },
  mounted() {
    gsap.registerPlugin(Draggable)

    console.log('hi mounted')

    Draggable.create('#head', {
      type: 'x,y',
      bounds: document.getElementsByClassName('mounted'),
      inertia: true,
      onClick: function () {
        console.log('clicked')
      },
      onDragEnd: function (e: any) {
        console.log('drag ended')
        console.log(e)
      }
    })
  },
  async created() {
    try {
      const res = await axios.get(`/user/get-user`)
      this.dataArray = res.data.data
      this.tableArray = this.dataArray
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    deleteData(id: number) {
      // window.alert("hi")
      console.log('feature will be available soon')
      // this.dataArray.splice(id - 1)
      // delete(this.dataArray[id])
      console.log('---', this.dataArray)
    },
    filterItems(e: any) {
      this.tableArray = this.dataArray
      console.log((this.tableArray = this.tableArray.slice(0, e.target.value)))
      console.log(e.target.value)
    },
    searchTable() {
      const searchRegExp: RegExp = new RegExp(this.search, 'gi')

      if (!this.search) {
        this.tableArray = this.dataArray
        return
      }

      this.tableArray = this.tableArray.filter((item: Record<string, any>) => {
        return (
          searchRegExp.test(item.company) ||
          searchRegExp.test(item.contact) ||
          searchRegExp.test(item.country)
        )
      })

      console.table(this.tableArray)
    },
    sortTableByCompanyAscending() {
      this.tableArray.sort(this.dynamicSortAscending('name'))
    },
    sortTableByContactAscending() {
      this.tableArray.sort(this.dynamicSortAscending('username'))
    },
    sortTableByCountryAscending() {
      this.tableArray.sort(this.dynamicSortAscending('email'))
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
      this.tableArray.sort(this.dynamicSortDecending('name'))
    },
    sortTableByContactDecending() {
      this.tableArray.sort(this.dynamicSortDecending('username'))
    },
    sortTableByCountryDecending() {
      this.tableArray.sort(this.dynamicSortDecending('email'))
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
.dropdown-container{

}
.dropdown {
  position: absolute;
  bottom: auto;
  right: 145px;
  width: 3.5rem;
  height: 2rem;
  padding: 5px;
  text-align: center;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: 10px;
}
span {
  cursor: pointer;
}
option{
  text-align: center;
}
.dropdown-label{
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
