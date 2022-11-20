<template>
  <div
    class="tag"
    :class="[
      tag.classList,
      {
        editing: childrenEditing,
      },
    ]"
  >
    <Render
      v-if="tag.elm.title"
      :elm="tag.elm.title"
      :elmClass="{
        tag__title: true,
        'no-value': !tag.values && !tag.value,
      }"
    />
    <ValueRender
      v-if="tag.elm.value || tag.value"
      :tag="tag"
      :key="`tag__value--0`"
    />

    <div class="tag__values" v-if="tag.values">
      <template
        v-for="(value, childIndex) in tag.values"
        :key="`tag__value--${childIndex}`"
      >
        <ValueRender :tag="value" />
        <div
          v-if="childIndex + 1 != tag.values.length"
          class="tag__values--conjunction"
          :key="`tag__values--conjunction--${childIndex}`"
        >
          <slot name="tag-conjunction">&</slot>
        </div>
      </template>
    </div>

    <div
      v-if="displayDelete"
      @click="deletes()"
      :class="{ pointer: appIsLock == false }"
      class="tag__close-icon"
    >
      <div class="tag__close-icon--left"></div>
      <div class="tag__close-icon--right"></div>
    </div>
  </div>
</template>

<script>
import Render from "./render.vue";
import ValueRender from "./value-render.vue";
import InjectApp from "../mixins/inject-app";

import { defineComponent } from "vue-demi";
export default defineComponent({
  name: "tag-main",
  mixins: [InjectApp],
  components: {
    Render,
    ValueRender,
  },
  props: {
    index: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    tag: {
      type: Object,
      default: () => {
        return {};
      },
    },
    edit: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    deleteWhere() {
      const where = this.app.deleteIcon;
      if (where == "edit" || where == "none") return where;
      return "always";
    },
    appIsLock() {
      return this.app.isLock;
    },
    childrenEditing() {
      const { app } = this;
      if (app.edit.index == -1) return false;

      let result = false;
      let indexs = this.tag.values
        ? this.tag.values.map((tag) => tag.index)
        : [this.tag.index];

      if (
        indexs.findIndex((index) => {
          return index == app.edit.index;
        }) != -1
      ) {
        result = true;
      }

      return result;
    },
    displayDelete() {
      try {
        const { tag, childrenEditing, deleteWhere } = this;
        const basic = tag.value || tag.values;
        if (deleteWhere == "none" || !basic) throw false;
        if (deleteWhere == "edit") {
          throw childrenEditing == true ? true : false;
        }
        if (deleteWhere == "always") throw true;
        throw false;
      } catch (e) {
        return e;
      }
    },
  },
  methods: {
    deletes(childIndex = -1) {
      if (this.appIsLock == true) return false;

      if (childIndex != -1) {
        this.app.deleteTags([childIndex]);
        return;
      }

      let indexs = [this.index];
      if (this.tag.values) {
        indexs = [];
        this.tag.values.forEach((value) => {
          indexs.push(value.index);
        });
      }
      this.app.deleteTags(indexs);
    },
  },
});
</script>

<style scoped lang="scss">
.tag {
  & {
    display: inline-flex;
    vertical-align: -webkit-baseline-middle;
    transition: background-color 0.3s ease;
    margin: 0.2em 1.6px;
    padding: 0.1em 0px;
  }

  .tag__values {
    display: inline-flex;

    .tag__values--conjunction {
      padding: 0px 2px;
    }
  }

  .tag__title,
  .tag__value {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0px 6px;
    transition: background-color 0.5s ease;
  }

  .tag__title {
    color: initial;
    border-radius: 0;

    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  .tag__title.no-value {
    border-radius: inherit;
  }

  .tag__value {
    &.no-lable {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }

    &.no-delete {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  }

  .pointer {
    cursor: pointer;
  }

  .tag__close-icon {
    position: relative;
    width: 26px;
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    transition: background-color 0.5s ease;

    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;

    .tag__close-icon--left,
    .tag__close-icon--right {
      position: relative;
      width: 2px;
      height: 18px;
      background-color: #a2a2a2;
      transition: background-color 0.5s ease;
    }

    .tag__close-icon--left {
      transform: rotate(-45deg);
    }

    .tag__close-icon--right {
      margin-left: -2px;
      transform: rotate(45deg);
    }
  }

  &,
  .tag__close-icon {
    background-color: #ebebeb;
  }
  .tag__title {
    background-color: #d8d8d8;
  }
  &.hover {
    &,
    .tag__close-icon {
      background-color: #d8d8d8;
    }
    .tag__title {
      background-color: #c8c8c8;
    }
  }
}
</style>
