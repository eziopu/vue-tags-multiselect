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

import { ref, computed, inject, onMounted, watch } from "vue";

export default {
  name: "v-tag",
  components: {
    Render,
    ValueRender,
  },
  props: {
    tag: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const appProps = inject("appProps");
    const appIsLock = inject("appIsLock");
    const appEeditTagIndex = inject("appEeditTagIndex");
    const appDeleteTags = inject("appDeleteTags");

    const childrenEditing = computed(() => {
      if (appEeditTagIndex.value == -1) return false;

      let result = false;
      let indexs = props.tag.values
        ? props.tag.values.map((tag) => tag.index)
        : [props.tag.index];

      if (
        indexs.findIndex((index) => {
          return index == appEeditTagIndex.value;
        }) != -1
      ) {
        result = true;
      }

      return result;
    });

    const deleteWhere = computed(() => {
      const where = appProps.deleteIcon;
      if (where == "edit" || where == "none") return where;
      return "always";
    });

    const displayDelete = computed(() => {
      try {
        const { tag, childrenEditing } = this;
        const basic = tag.value || tag.values;
        if (deleteWhere.value == "none" || !basic) throw false;
        if (deleteWhere.value == "edit") {
          throw childrenEditing == true ? true : false;
        }
        if (deleteWhere.value == "always") throw true;
        throw false;
      } catch (e) {
        return e;
      }
    });

    // =============== METHODS ==============

    const deletes = (childIndex = -1) => {
      if (appIsLock.value == true) return false;

      if (childIndex != -1) {
        appDeleteTags([childIndex]);
        return;
      }

      let indexs = [this.index];
      if (this.tag.values) {
        indexs = [];
        this.tag.values.forEach((value) => {
          indexs.push(value.index);
        });
      }
      appDeleteTags(indexs);
    };

    return {
      appIsLock,
      displayDelete,
      childrenEditing,

      deletes,
    };
  },
};
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
