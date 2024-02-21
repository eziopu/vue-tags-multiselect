<template>
  <div class="detail attributes container">
    <div class="row titles">
      <div><h5>#</h5></div>
      <div>
        <h5>{{ $t("ui.general.Country") }}</h5>
      </div>
      <div>
        <h5>{{ $t("ui.general.Name") }}</h5>
      </div>
      <div>
        <h5>{{ $t("ui.general.Height(m)") }}</h5>
      </div>
      <div>
        <h5>{{ $t("ui.general.Remark") }}</h5>
      </div>
    </div>
    <transition-group name="list-complete">
      <div
        class="row list-complete-item"
        v-for="(data, index) in datas"
        :key="`data${index}`"
      >
        <div>
          <span class="i-block d-md-none">#</span>
          {{ index + 1 }}
        </div>
        <div>
          <span class="i-block d-md-none"
            >{{ $t("ui.general.Country") }}:
          </span>
          {{ $t(`ui.data.country.${data.country}`) }}
        </div>
        <div>
          <span class="i-block d-md-none">{{ $t("ui.general.Name") }}: </span>
          {{ $t(`ui.data.name.${data.name}`) }}
        </div>
        <div>
          <span class="i-block d-md-none"
            >{{ $t("ui.general.Height(m)") }}:
          </span>
          {{ data.height }}
        </div>
        <div>
          <span class="i-block d-md-none">{{ $t("ui.general.Remark") }}: </span>
          {{ getRemarkI18n(data.remark) }}
        </div>
      </div>
      <!-- blank data -->
      <div
        class="row full text-center list-complete-item"
        v-for="(data, index) in [...Array(11 - datas.length)]"
        :key="`blank${index}`"
      >
        <div v-if="datas.length == 0 && index == 6" style="width: 100%">
          <h5>{{ $t("ui.general.NotFind") }}</h5>
        </div>
        <div v-else>&emsp;</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "data-table",
  props: {
    props: {
      framework: {
        type: String,
        default: () => {
          return "default";
        },
      },
    },
    datas: {
      type: Array,
      default: () => {
        return [];
      },
    },
    notFindDatas: {
      type: Array,
      default: () => {
        let i = [...Array(11)].map(() => `&emsp;`);
        i[5] = `<h5 class="text-center">Not find any</h5>`;
        return i;
      },
    },
  },
  methods: {
    getRemarkI18n(test) {
      if (!test) return "-";
      try {
        let i18n = this.$t(`ui.data.remark.${test}`);
        if (i18n) return i18n;
      } catch (error) {
        return "-";
      }
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  margin: 18px 0 !important;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-active {
  position: absolute;
}

@media all and (min-width: 576px) {
  .row {
    &.full {
      width: 100% !important;
    }
    &:not(.full) {
      & > div:nth-child(1) {
        width: 10%;
      }
      & > div:nth-child(2) {
        width: 20%;
      }
      & > div:nth-child(3) {
        width: 25%;
      }
      & > div:nth-child(4) {
        width: 20%;
      }
      & > div:nth-child(5) {
        width: 25%;
      }
    }
  }
}
</style>
