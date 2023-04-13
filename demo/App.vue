<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <v-tags-multiselect>
      <v-tag-dropdown value="country">
        <v-tag-option title> title111 </v-tag-option>
        <v-tag-option value="Māre111" selected> 11Māre1111 </v-tag-option>
        <v-tag-option value="Eldia2222" selected>
          <p>11Eldia2222</p>
        </v-tag-option>
      </v-tag-dropdown>
      <v-tag-dropdown value="country2" displayAll>
        <v-tag-option title> title2222 </v-tag-option>
        <v-tag-option value="2Māre111" selected> 222Māre1111 </v-tag-option>
        <v-tag-option value="2Eldia2222">
          <p>222Eldia2222</p>
        </v-tag-option>
      </v-tag-dropdown>
      <v-tag-dropdown value="country333">
        <v-tag-option value="3Māre111"> 333Māre1111 </v-tag-option>
        <v-tag-option value="3Eldia2222">
          <p>33332Eldia2222</p>
        </v-tag-option>
      </v-tag-dropdown>
    </v-tags-multiselect>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
