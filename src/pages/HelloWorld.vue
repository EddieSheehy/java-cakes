<template>
    <div class="mb-3">
    <table border = "2" id="array-rendering">
        <tr>
          <th>Image</th>
          <th>Email</th>
          <th>Address</th>
          <th>Price</th>
          <th>Beds</th>
          <th></th>
      </tr>
      <tr v-for="comment in comments">
        <td id=imagebox><img :src =comment.image width=150 height=150 ></td>
        <td>{{comment.email}}</td>
        <td>{{comment.comment}}</td>
        <td>€{{comment.price}}</td>
        <td>{{comment.beds}}</td>
      </tr>
    </table>
    </div>
</template>
<script>
    import app from "../api/firebase"
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
    const auth = getAuth(app);

    export default {
        name: "HelloWorld",
        data(){
            return {
                comments: []
            }
        },
        created(){
          this.getUserComments();
        },

        methods : {
            getUserComments(){
                const functions = getFunctions(app);
                if(window.location.hostname === "localhost") // Check if working locally
                    connectFunctionsEmulator(functions, "localhost", 5001);
                const getComments = httpsCallable(functions, 'getcomments');
                let loader = this.$loading.show({
                    // Optional parameters
                    loader: 'dots',
                    container: this.$refs.container,
                    canCancel: false
                });
                getComments().then((result) => {
                    // Read result of the Cloud Function.
                    // /** @type {any} */
                    // once the response has returned hide the loader
                    loader.hide();
                    console.log(result);
                    if(result.data === 'No data in database')
                        this.comments = [{comment : "No comments posted yet for this user"}]
                    else
                        this.comments = result.data;
                });
            }
        }
    }
</script>
<style scoped>
    table{
        width:100%;
        height:170px;
        
    }
    td{
        border: 1px solid black;
    }
    th{
        font-size:25px;
        height:12px;
        font-family: "Georgia", Times, serif;
        border: 1px solid black;
    }
    h1{
        line-height:75px;
    }
    #imagebox{
        width:10%;
    }
</style>