<!--
Template Name: 404
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div>
    <callback title="404" />
  </div>
</template>
<script>
export default {
  components: {
    callback: () => import("./callback")
  },
  name: "Error404"
};
</script>
 