<script>
export default {
  name: 'how-to-use'
}
</script>
<script setup>
import ShowHtmlCode from '@tools/show-html-code/main.vue'
</script>

<template>
  <div id="how-to-use" class="demo">
    <div class="description">
      <h3>
        {{ $t(`ui.general.Description`) }}
      </h3>
      <p>{{ $t(`package.main`) }}</p>

      <ul>
        <li v-for="index in [1, 2, 3, 4]" :key="index">
          <p v-html="$t(`package.description.${index}`)"></p>
        </li>
      </ul>
    </div>

    <h3>Install</h3>
    <pre><code>npm install vue-tags-multiselect</code></pre>

    <h3>Setup</h3>
    <h4>
      <li>{{ $t(`package.setup.global`) }}</li>
    </h4>

    <pre><code class="prettyprint lang-js"><!--
    -->import 'vue-tags-multiselect/dist/style.css'
      import VueTagsMultiselect from 'vue-tags-multiselect'
      createApp(App).use(VueTagsMultiselect).mount("#app")
    </code></pre>

    or
    <h4>
      <li>{{ $t(`package.setup.component`) }}</li>
    </h4>
    <pre><code class="prettyprint lang-js"><!--
      -->import 'vue-tags-multiselect/dist/style.css'
      import { vTagsMultiselect, vTagDropdown, vTagOption } from 'vue-tags-multiselect'
    </code></pre>

    <h3>Usage</h3>
    <ShowHtmlCode
      class="prettyprint lang-html customize"
      :dropdown="{
        name: { isDisplayForDemo: false },
        remark: { isDisplayForDemo: false }
      }"
    ></ShowHtmlCode>

    or use data mode

    <ShowHtmlCode
      class="prettyprint lang-html customize"
      :app="{
        options: {
          country: [
            { title: true, element: `<i class='fa fa-flag'></i> ${$t('ui.general.Country')}` },
            'Māre',
            'Eldia'
          ]
        }
      }"
      :dropdown="{
        country: { isDisplayForDemo: false },
        name: { isDisplayForDemo: false },
        remark: { isDisplayForDemo: false }
      }"
    ></ShowHtmlCode>
  </div>
</template>

<style scoped lang="scss">
code {
  white-space: pre-line;
}
h3:not(:first-child) {
  margin-top: 1.2rem;
}

.description {
  h3 {
    font-weight: bolder;
  }
  p {
    margin-left: 1rem;
    margin-bottom: 0.6rem;
  }
}
</style>

<style lang="scss">
#how-to-use {
  .kwd {
    color: #ff7b72;
  }
  .typ {
    color: #ffa657;
  }
  .str {
    color: #a5d6ff;
  }
  .pln {
    color: #f0f6fc;
  }
}
</style>
