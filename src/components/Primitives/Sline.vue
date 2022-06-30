<template>
  <line
    class="line"
    :x1="params.x"
    :y1="[params.y1 == 0 ? params.y : params.y + params.height]"
    :x2="params.x + params.width"
    :y2="[params.y1 == 0 ? params.y + params.height : params.y]"
    :stroke="['#' + params.foreground]"
    :stroke-width="params.thickness"
  />
</template>

<script>
export default {
  name: "app",
  props: ["params"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
