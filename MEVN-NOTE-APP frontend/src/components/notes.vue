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
    </header>
    <div
      class="notes-container"
      @dragend="onDropEvent"
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
          @blur="(e) => editNoteText(note.id, e)"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import router from '@/router'
import { NodeTypes } from '@vue/compiler-core'
import { defineComponent, onMounted, reactive } from 'vue'
import gsap from 'gsap'

type Note = {
  id: number
  text: string
  x: number
  y: number
}

/* eslint-disable */
export default defineComponent({
  name: 'Login',
  components: {},
  data() {
    return { notes: [] as Note[], elementID: Number }
  },

  setup() {},

  methods: {
    addNote() {
      console.log('hitt')
      
    //   console.log(this.notes,"note---")
    //   gsap.fromTo(
    //   `.draggable-box`,
    //   {
    //     opacity: 0,
    //   },
      
    //   {
    //     duration: 2,
    //     opacity: 1,
    //     y:0,
    //     delay: 0,
    //     ease: 'Circ.easeOut',
    //     stagger: 0.1,
        
    //   }
    // )
    this.notes.push({
        id: this.notes.length,
        text: '',
        x: 100,
        y: 200
      }
      )
    
    },

    onDropEvent(e: any) {
      console.log(e)
      console.log(this.elementID)
      this.editNote(this.elementID, e.clientX, e.clientY)
    },
    dragEnd(e: any, id: any) {
      this.editNote(id, e.clientX, e.clientY)
      console.log('--- dragEnd', id)
    },
    editNote(id: any, newX: any, newY: any) {
      if (newX > 280 && newY > 130) {
        this.notes[id].x = newX - 280
        this.notes[id].y = newY
      } else if (newX < 280 && newY > 130) {
        this.notes[id].x = 0
        this.notes[id].y = newY
      } else if (newX > 280 && newY < 130) {
        this.notes[id].x = newX - 280
        this.notes[id].y = 130
      } else {
        this.notes[id].x = 0
        this.notes[id].y = 130
      }
    },
    editNoteText(id:any , e:any){
      this.notes[id].text = e.target.value;
    }
  },
  getNoteId(){},
  mounted() {
    gsap.to("#heading", {
      duration: 1.5,
      x: 0,
    });

    console.log('hi onmounted')

    gsap.fromTo(
      '.add-btn',
      {
        opacity: 0,
      visibility: 'hidden'
      },
      {
        duration: 1.5,
        opacity: 1,
        y:0,
        delay: 1.3,
        ease: 'Circ.easeOut',
        stagger: 0.1,
        visibility: 'visible'

      }
    );
    gsap.fromTo(
      `.draggable-box`,
      {
        opacity: 0,
      },
      {
        duration: 2,
        opacity: 1,
        y:0,
        delay: 0,
        ease: 'Circ.easeOut',
        stagger: 0.1,

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
