<template>
  <router-link to="/House">
  <div class='content'>
    <img src="../images/House.jpg" alt="House">
    
  </div>
  </router-link>

  <router-link to="/Room">
  <div class='content2'>
    <img src="../images/Room.jpg" alt="Room">
  </div>
  </router-link>
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
  margin: 0 20px;
}
a {
  color: #42b983;
}

div.content {
    width: 400px;
    height: 400px;
    position:relative;
    padding:20px;
    box-sizing:border-box;
    background: #ff8f00;
    border-radius: 15px;
    transform: skew(5deg);
    overflow: hidden;
    display: flex;
    justify-content: center;
    top:200px;
    left:200px;
    right:0;
    bottom:0;
}


div.content2 {
    width: 400px;
    height: 400px;
    position:absolute;
    padding:20px;
    box-sizing:border-box;
    background: #ff8f00;
    border-radius: 15px;
    transform: skew(-5deg);
    overflow: hidden;
    display: flex;
    justify-content: center;
    top: 280px;
    left:800px;
    right:0;
    bottom:0;
}


</style>
