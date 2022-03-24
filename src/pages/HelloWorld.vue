<template>
    <h1>Home Page</h1>
    <table border = "2">
      <tr>
          <th>handle</th>
          <th>comment</th>
          <th>timestamp</th>
          <th>id</th>
      </tr>
      <tr v-for="comment in comments">
        <td>{{comment.handle}}</td>
        <td>{{comment.comment}}</td>
        <td>{{comment.timestamp}}</td>
        <td>{{comment.id}}</td>
      </tr>
    </table>
</template>
<script>
    import app from "../api/firebase"
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
    const auth = getAuth(app);

    export default {
        beforeRouteEnter(to, from, next) {
            auth.onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in continue to the page
                    next();
                } else
                {
                    // No user is signed in.
                    next({path: '/'})
                    console.log("No user signed in")
                    // Send them back to the login page
                }
            });
        },

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
  
</style>