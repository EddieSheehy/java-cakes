<template>
    <h1>My Profile</h1>
    <!--<button type = "button" @click = "getUserComments" class="btn btn-primary">Get Comments</button>-->
        <button type="button" id = "create" class="left"><router-link to="/blog">Create Listing</router-link></button>
        <button type="button" class="right" display="block" @click="logout">Log out</button>
    <br><br>
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
        <td>{{comment.image}}</td>
        <td>{{comment.email}}</td>
        <td>{{comment.comment}}</td>
        <td>{{comment.price}}</td>
        <td>{{comment.beds}}</td>
        <td><button type="button" @click="deleteComment(comment.id)" class="link">Delete Comment</button></td>
      </tr>
    </table>
    </div>
    <!--<ul id="array-rendering">
        <li v-for="comment in comments">
        <div v-if="!editing">
            <span class='text' @click="enableEditing(comment.comment)">{{comment.comment}}</span>
        </div>
        <button type="button" @click="deleteComment(comment.id)" class="link">Delete Comment</button>
        </li>
    </ul>-->
   
</template>
<script>
    import app from "../api/firebase"
    import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
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

        name: "Secure",
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
            },
                deleteComment(id){
                console.log(id);
                const functions = getFunctions(app);
                if(window.location.hostname === "localhost") // Check if working locally
                    connectFunctionsEmulator(functions, "localhost", 5001);
                const deleteComment = httpsCallable(functions, 'deletecomment?id='+id);
                deleteComment().then((result) => {
                    this.getUserComments() // To refresh the client
                })
                 },
                 
                logout() {
                    signOut(getAuth(app)).then(() => {
                        // Send them back to the home page!
                        this.$router.push("/");
                    });
                }
        }
    }
</script>
    <style scoped>
    table{
        width:100%;
        height:300px;
        
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
    #create{
        text-align: left;
    }

    .left {
      margin: 0;
      position: absolute;
      top: 20%;
      left: 10%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    .right {
      margin: 0;
      position: absolute;
      top: 20%;
      left: 90%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
</style>