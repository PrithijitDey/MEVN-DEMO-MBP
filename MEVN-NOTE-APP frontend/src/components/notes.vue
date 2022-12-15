<template>
  <div class="board">
    <header id="heading" class="add-notes-header">
      <v-btn class="add-btn" depressed color="primary" @click="addNote"
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
        Add Notes</v-btn
      >
      <!-- <span>{{ bookID }}</span> -->
    </header>
    <div
      class="notes-container"
      ondragover="{
    event.preventDefault()
    return false
  }"
    >
      <div
        v-for="note in notes"
        :key="`key_${note}`"
        draggable="true"
        @dragend="e => dragEnd(e, note.id)"
        @dragstart="e => dragStart(e)"
        class="draggable-box"
        :id="`draggable-${note.id}`"
        :style="{
          position: 'absolute',
          top: `${note.y}px`,
          left: `${note.x}px`
        }"
      >
        <textarea
          type="text"
          name="input"
          class="note-input"
          placeholder="Type something..."
          :value="note.text"
          @blur="e => editNoteText(note.id, e)"
        ></textarea>
      </div>
    </div>
    <div class="delete-zone" id="delete-area">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import router from '@/router'
import { NodeTypes } from '@vue/compiler-core'
import { defineComponent, onMounted, reactive } from 'vue'
import gsap from 'gsap'
import axios from 'axios'
import { useRoute } from 'vue-router'

type Note = {
  id: number
  text: string
  x: number
  y: number
}
type Book = {
  author: string
  book: string
  booksmith: string
  notes: Note[]
  _id: any
}
const route = useRoute()
/* eslint-disable */
export default defineComponent({
  name: 'Notes',
  props: [],
  components: {},
  data() {
    return {
      notes: [] as Note[],
      tempNotes: [] as Note[],
      elementID: Number,
      bookId: sessionStorage.getItem('selecteBookID'),
      bookDetails: {} as Book
    }
  },
  async created() {
    try {
      const res = await axios.get(`/books/get-book?id=${this.bookId}`)
      this.bookDetails = res.data
      this.notes = res.data.data.notes
      this.tempNotes = this.notes
    } catch (error) {
      console.log(error)
    }
  },

  setup() {},

  methods: {
    addNote() {
      this.tempNotes.push({
        id: this.tempNotes.length + 1,
        text: '',
        x: 100,
        y: 200
      })

      this.bookDetails.notes = this.tempNotes
      this.updateNote(this.bookDetails)
    },
    async updateNote(data: any) {
      try {
        const res = await axios.put(`/books/update?id=${this.bookId}`, data)
      } catch (error) {
        console.log(error)
      }
    },
    // onDropEvent(e: any) {
    //   console.log(e)
    //   console.log(this.elementID)
    //   this.editNote(this.elementID, e.x, e.y)
    // },
    dragEnd(e: any, id: any) {
      this.editNote(id, e.x, e.y)
      var element = document.getElementById('delete-area')
      element!.style.opacity = '0'
    },
    dragStart(e: any) {
      var element = document.getElementById('delete-area')
      element!.style.opacity = '1'
    },
    editNote(id: any, newX: any, newY: any) {
      if (newX > 280 && newY > 130) {
        this.tempNotes[id - 1].x = newX - 280
        this.tempNotes[id - 1].y = newY
      } else if (newX < 280 && newY > 130) {
        this.tempNotes[id - 1].x = 0
        this.tempNotes[id - 1].y = newY
      } else if (newX > 280 && newY < 130) {
        this.tempNotes[id - 1].x = newX - 280
        this.tempNotes[id - 1].y = 130
      } else {
        this.tempNotes[id - 1].x = 0
        this.tempNotes[id - 1].y = 130
      }
      this.bookDetails.notes = this.tempNotes
      this.updateNote(this.bookDetails)
    },
    editNoteText(id: any, e: any) {
      this.tempNotes[id - 1].text = e.target.value
      this.bookDetails.notes = this.tempNotes
      this.updateNote(this.bookDetails)
    }
  },
  getNoteId() {},
  mounted() {
    gsap.to('#heading', {
      duration: 1.5,
      x: 0
    })
    gsap.fromTo(
      '.add-btn',
      {
        opacity: 0,
        visibility: 'hidden'
      },
      {
        duration: 1.5,
        opacity: 1,
        y: 0,
        delay: 1.3,
        ease: 'Circ.easeOut',
        stagger: 0.1,
        visibility: 'visible'
      }
    )
    gsap.fromTo(
      `.draggable-box`,
      {
        opacity: 0
      },
      {
        duration: 2,
        opacity: 1,
        y: 0,
        delay: 0,
        ease: 'Circ.easeOut',
        stagger: 0.1
      }
    )
  }
})
</script>
<style lang="scss" scoped>
@import '../scss/variables';

.board {
  // height: 90vh;
  margin-top: 65px;
  width: 85vw;
  // border: 10px solid rgb(197, 197, 197);
  border-radius: 5px;
}
.delete-zone {
  opacity: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 60px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  background: hsla(10%, 74%, 52%, 1);
  background: linear-gradient(
    0deg,
    rgb(183, 100, 100) 0%,
    rgb(216, 123, 123) 31%,
    rgb(226, 178, 178) 100%
  );
}
// .delete-zone:hover {
//   opacity: 1;
// }
.add-notes-header {
  padding: 12px 0px 12px 30px;
  height: 60px;
  text-align: start;
}
.notes-container {
  height: calc(100vh - 130px);
  width: 100%;
  background-color: bisque;
  border-radius: 5px;
}
.draggable-box {
  height: 7rem;
  width: 12rem;
  background-color: rgb(194, 217, 236);
  border: 1px solid rgb(186, 183, 183);
  border-radius: 5px;
  position: absolute;
  // opacity: 0;
  animation-name: drag;
  animation-duration: 4s;
}
.note-input {
  height: 100%;
  width: 100%;
  border: none;
  background-color: transparent;
  line-height: 20px;
  padding: 10px;
  resize: none;
}

.note-input::-webkit-scrollbar {
  background-color: transparent;
  width: 5px;
}
.note-input::-webkit-scrollbar-thumb {
  background-color: rgb(190, 190, 190, 0.5);

  border-radius: 5px;
}
.mounted {
  background-color: gray;
}
@keyframes drag {
  from {
    opacity: 0;
  }
  to {
    duration: 1.5;
    opacity: 1;
    y: 0;
    delay: 1.3;

    stagger: 0.1;
  }
}
</style>
