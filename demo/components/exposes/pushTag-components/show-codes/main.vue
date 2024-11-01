<!-- eslint-disable prettier/prettier -->
<template>
<pre class="prettyprint lang-js customize"><code><!--
--><FunctionUse simple />
<span class="comment_out">// or</span>
<FunctionUse /><!--
--></code></pre>
</template>

<script>
import FunctionUse from "./function-use.vue";

export default {
  name: "exposes-pushTag-show-codes-main",
  components: {
    FunctionUse,
  },
};
</script>