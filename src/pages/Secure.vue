<template>
<<<<<<< Updated upstream
    <h1>Welcome to the secure page</h1>
    <button type = "button" @click = "getUserComments" class="btn btn-primary">Get Comments</button>
    <br>
    {{comments}}
=======
    <h1>My Profile</h1>
    <!--<button type = "button" @click = "getUserComments" class="btn btn-primary">Get Comments</button>-->
        <button type="button" id = "create" class="link"><router-link to="/blog">Create Listing</router-link></button>
        <button type="button" class="link" display="block" @click="logout">Log out</button>
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
        <td><img :src =comment.image width=50 height=50 ></td>
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
   
>>>>>>> Stashed changes
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

        name: "Secure",
        data(){
            return {
                comments: []
            }
        },

        methods : {
            getUserComments(){
                const functions = getFunctions(app);
                if(window.location.hostname === "localhost") // Check if working locally
                    connectFunctionsEmulator(functions, "localhost", 5001);
                const getComments = httpsCallable(functions, 'secure');
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