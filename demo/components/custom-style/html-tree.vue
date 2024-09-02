<script>
export default {
  name: 'custom-style__html-tree'
}
</script>
<script setup>
const i18n = 'ui.page.customStyle.html-tree'
</script>

<template>
  <div id="custom-style__html-tree" class="demo">
    <ToolTitle><span v-html="$t(`${i18n}.title`)"></span></ToolTitle>

    <div class="depiction">
      <p v-html="$t(`${i18n}.mains.1`)"></p>
      <p v-html="$t(`${i18n}.mains.2`)"></p>
      <p v-html="$t(`${i18n}.mains.3`)"></p>

      <ul id="html-tree">
        <li>
          <span class="caret"></span>div.v-tags-multiselect // .active .disabled .loading
          ['.v-tag-top' or '.v-tag-bottom']
          <ul>
            <li>
              <span class="caret"></span>div.v-tags-multiselect__tags.v-overflow-tags (v-if
              attribute <code class="tag">tag-position</code> not null)
            </li>
            <li>
              <ul>
                <li>div.VTag</li>
              </ul>
            </li>
            <li><span class="caret"></span>div.v-tags-multiselect__main</li>
            <li>
              <ul>
                <li>
                  <span class="caret"></span
                  >div.v-tags-multiselect__tags.v-tags-multiselect__main--tags
                </li>
                <li>
                  <ul>
                    <li>div.VTag</li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li><span class="caret"></span>div.v-tags-multiselect__main--stashTag</li>
                <li>
                  <ul>
                    <li>div.VTag</li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li><span class="caret"></span>div.v-tags-multiselect__main--controls</li>
                <li>
                  <ul>
                    <li>div.v-tags-multiselect__main--dropdowns // .stash .(stashTag.classList)</li>
                    <li>slot.dropdown-loading</li>
                    <li>
                      <span class="caret"></span>div.v-dropdown // .display-all .disabled .divided
                      .selecting .editing .no-title .hidden
                    </li>
                    <ul>
                      <li>div.v-option // .title .disabled .divided .hover .no-value .hidden</li>
                    </ul>
                    <li>input</li>
                    <li>div.v-tags-clear</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li><p></p></li>

        <li><span class="caret"></span>(div.VTag) div.v-tag // .editing</li>
        <li>
          <ul>
            <li>div.v-tag__title // .no-value</li>
            <li>div.v-tag__value (v-if attribute <code class="tag">merge</code> is false)</li>
            <li>or</li>
            <li>
              <span class="caret"></span>div.v-tag__values (v-if attribute
              <code class="tag">merge</code> is true)
            </li>
            <ul>
              <li>div.v-tag__value</li>
              <li>slot.v-tag__values--conjunction</li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 
  Tree View
  Source: https://www.w3schools.com/howto/howto_js_treeview.asp
*/

ul,
#html-tree {
  list-style-type: none;
}

#html-tree {
  margin: 0;
  padding: 0;

  li {
    margin: 6px 0;
  }

  .caret {
    -webkit-user-select: none; /* Safari 3.1+ */
    -moz-user-select: none; /* Firefox 2+ */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
  }

  .caret::before {
    content: ' ▼ ';
    color: black;
    display: inline-block;
    margin-right: 6px;
  }

  .caret-down::before {
    -ms-transform: rotate(90deg); /* IE 9 */
    -webkit-transform: rotate(90deg); /* Safari */
    transform: rotate(90deg);
  }
}
</style>
