<template>
  <div
    class="v-tag"
    :class="[
      tag.classList,
      {
        editing: childrenEditing,
      },
    ]"
  >
    <div
      v-if="tag.titleElm"
      v-html="tag.titleElm"
      :class="{
        'v-tag__title': true,
        'no-value': !tag.values && !tag.value,
      }"
    />
    <ValueRender v-if="tag.valueElm || tag.value" :tag="tag" />

    <div class="v-tag__values" v-if="tag.values">
      <template
        v-for="(value, childIndex) in tag.values"
        :key="`v-tag__value--${childIndex}`"
      >
        <ValueRender :tag="value" />
        <div
          v-if="childIndex + 1 != tag.values.length"
          class="v-tag__values--conjunction"
          :key="`v-tag__values--conjunction--${childIndex}`"
        >
          <slot name="tag-conjunction">&</slot>
        </div>
      </template>
    </div>

    <div
      v-if="isDeleteVisible"
      @click="deletes"
      :class="{ pointer: appIsLock == false }"
      class="v-tag__close-icon"
    >
      <div class="v-tag__close-icon--left"></div>
      <div class="v-tag__close-icon--right"></div>
    </div>
  </div>
</template>

<script>
import ValueRender from "./value/index.vue";

import { computed, inject } from "vue";

export default {
  name: "v-tag",
  components: {
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
    // ============== INJECT ================

    const appProps = inject("appProps");
    const appIsLock = inject("appIsLock");
    const appEditTagIndex = inject("appEditTagIndex");
    const appDeleteTags = inject("appDeleteTags");

    // ============== COMPUTED ==============

    const childrenEditing = computed(() => {
      if (appEditTagIndex.value == -1) return false;

      let result = false;
      let indexs = props.tag.values
        ? props.tag.values.map((tag) => tag.index)
        : [props.tag.index];

      if (
        indexs.findIndex((index) => {
          return index == appEditTagIndex.value;
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

    const isDeleteVisible = computed(() => {
      const { tag } = props;
      const hasData = tag.value || tag.values;
      if (!hasData) return false;
      if (deleteWhere.value == "none") return false;
      if (deleteWhere.value == "edit") {
        return childrenEditing.value == true ? true : false;
      }
      if (deleteWhere.value == "always") return true;
      return false;
    });

    // ============== METHODS ==============

    const deletes = (event) => {
      event.preventDefault();
      if (appIsLock.value == true) {
        console.log(
          "[v-tags-multiselect]: tag delete method is not available while the app is locked"
        );
        return;
      }

      let indexs = [props.tag.index];
      if (props.tag.values) {
        indexs = props.tag.values.map((value) => value.index);
      }
      appDeleteTags(indexs);
      return;
    };

    return {
      appIsLock,
      isDeleteVisible,
      childrenEditing,

      deletes,
    };
  },
};
</script>

<style scoped lang="scss">
.v-tag {
  & {
    display: inline-flex;
    vertical-align: -webkit-baseline-middle;
    background-color:#ebebeb;
    transition: background-color 0.3s ease;
    margin: 0.2em 1.6px;
  }

  .v-tag__values {
    display: inline-flex;

    .v-tag__values--conjunction {
      padding: 0px 2px;
    }
  }

  .v-tag__title,
  .v-tag__value {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0px 6px;
    transition: background-color 0.5s ease;
  }

  .v-tag__title {
    color: initial;
    background-color: #d8d8d8;

    border-radius: 0;

    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  .v-tag__title.no-value {
    border-radius: inherit;
  }

  .v-tag__value {
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

  .v-tag__close-icon {
    position: relative;
    width: 26px;
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    transition: background-color 0.5s ease;

    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;

    .v-tag__close-icon--left,
    .v-tag__close-icon--right {
      position: relative;
      width: 2px;
      height: 18px;
      background-color: #a2a2a2;
      transition: background-color 0.5s ease;
    }

    .v-tag__close-icon--left {
      transform: rotate(-45deg);
    }

    .v-tag__close-icon--right {
      margin-left: -2px;
      transform: rotate(45deg);
    }
  }
}
</style>
