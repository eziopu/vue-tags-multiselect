<template>
  <div id="keyboard">
    <h5>{{ $t("ui.page.description.keyboard") }}</h5>
    <div class="keyboard">
      <div class="keyboard-column">
        <div class="delete" :class="{ active: keyCode == 8 }">
          <p class="symbol">←</p>
          <p class="text">delete</p>
        </div>
        <div class="return" :class="{ active: keyCode == 13 }">
          <p class="symbol">↵</p>
          <p class="text">return</p>
        </div>
      </div>
      <div class="keyboard-column bottom">
        <div class="left" :class="{ active: keyCode == 37 }">
          <i class="arrow left"></i>
        </div>
      </div>
      <div class="keyboard-column double">
        <div class="up" :class="{ active: keyCode == 38 }">
          <i class="arrow up"></i>
        </div>
        <div class="down" :class="{ active: keyCode == 40 }">
          <i class="arrow down"></i>
        </div>
      </div>
      <div class="keyboard-column bottom">
        <div class="right" :class="{ active: keyCode == 39 }">
          <i class="arrow right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "demo-keyboard",
  data() {
    return {
      keyCode: 0,
      time: null,
    };
  },
  watch: {
    keyCode(newValue, oldValue) {
      if (newValue != 0) {
        this.setTime();
      } else if (newValue != oldValue) {
        this.stopTime();
      }
    },
  },
  created() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  unmounted() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(event) {
      const keyCode = event.keyCode;
      this.keyCode = keyCode;
    },
    timer() {
      this.time = setInterval(() => {
        this.keyCode = 0;
      }, 800);
    },
    setTime() {
      this.timer();
    },
    stopTime() {
      if (this.time) {
        clearInterval(this.time);
      }
    },
  },
});
</script>
<style scoped lang="scss">
.keyboard {
  display: flex;
  flex-direction: row;
}
.keyboard-column {
  margin: 0.2em;
  justify-content: flex-end;
}
.keyboard-column > div {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  text-align: center;
  color: #eee;
  border-radius: 4px;
  margin: 6px;
  width: 48px;
  height: 36px;
  box-sizing: border-box;
  -webkit-user-select: none;
  border: 1px solid #444;
  box-shadow: 0 0.2em 0 0.05em #222;
  border-bottom-color: #555;
}
.keyboard-column > div.active {
  background: #2a2a2a;
  color: #aaa;
  position: relative;
  top: 0.2em;
  box-shadow: 0 0 0 0.05em black;
}
.keyboard-column.double {
  margin-left: -9px;
  margin-right: -9px;
}
.keyboard-column.bottom {
  display: flex;
  align-items: flex-end;
}
.keyboard p {
  margin: 0;
  display: inline-block;
}
.keyboard .delete {
  width: 96px;
  margin-left: 14px;
}
.keyboard .return {
  width: 104px;
}
.keyboard .symbol {
  position: relative;
  margin-right: 6px;
  font-size: 24px;
}
.keyboard .return .symbol {
  margin-top: 8px;
}

.keyboard .arrow {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;

  &.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  &.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  &.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  &.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
}
</style>
