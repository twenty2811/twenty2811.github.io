<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Check out the vue documentation
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Most visited sites</h3>
    <ul>
      <li><a href="https://www.google.com" target="_blank" rel="noopener">google</a></li>
      <li><a href="https://www.bing.com" target="_blank" rel="noopener">bing</a></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
