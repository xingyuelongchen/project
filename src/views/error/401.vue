<!--
Template Name: 401
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div>
    <callback title="401" />
  </div>
</template>
<script>
export default {
  components: {
    callback: () => import("./callback")
  },
  name: "Error401"
};
</script>
 