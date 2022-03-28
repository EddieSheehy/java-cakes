<template>
    <h1>My Profile</h1>
    <!--<button type = "button" @click = "getUserComments" class="btn btn-primary">Get Comments</button>-->
        <button onclick="window.location.href='/blog'" id = "createbtn" class="btn btn-primary">Create Listing</button>
        <button id = "logoutbtn" class="btn btn-primary" display="block" @click="logout">Log out</button>
    <br><br>
    <div class="mb-3">
    <table border = "2" id="array-rendering">
        <tr>
          <th>Image</th>
          <th>Contact</th>
          <th>Address</th>
          <th>Price</th>
          <th>Beds</th>
          <th>Description</th>
      </tr>
      <tr v-for="comment in comments">
        <td id=imagebox><img :src =comment.image width=150 height=150 ></td>
        <td>{{comment.contact}}</td>
        <td>{{comment.comment}}</td>
        <td>€{{comment.price}}</td>
        <td id="bedsplace">{{comment.dblbeds}}<br>{{comment.sglbeds}}<br>{{comment.twnbeds}}</td>
        <td>{{comment.description}}</td>
        <td><button type="button" @click="deleteComment(comment.id, comment.imagename)" class="btn btn-primary">Delete Comment </button>
        <br></td>
      </tr>
    </table>
    </div>

   
</template>
<script>
    import app from "../api/firebase"
    import { getStorage, ref, deleteObject } from "firebase/storage";
    import { getDatabase, ref as dbRef, set,update} from "firebase/database"
    import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
    const auth = getAuth(app);
    const storage = getStorage(app);




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
            deleteComment(id,imagename){
                console.log(id);
                console.log(imagename);
                const functions = getFunctions(app);
                if(window.location.hostname === "localhost") // Check if working locally
                    connectFunctionsEmulator(functions, "localhost", 5001);
                const deleteComment = httpsCallable(functions, 'deletecomment?id='+id);
                const desertRef = ref(storage, imagename);
                
                console.log(desertRef);
            deleteComment().then((result) => {
                this.getUserComments() // To refresh the client
                deleteObject(desertRef).then(() => {
                // File deleted successfully
                }).catch((error) => {
                // Uh-oh, an error occurred!
                });
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

    #logoutbtn{
        background-color: #FF0000 !important
    }

    #openformbtn{
        background-color: #FFFF00 !important;
        color: black
    }

    table{
        width:100%;
        height:170px;
        
    }
    tr:nth-child(even){background-color: #f2f2f2}
    td{

    }
    th{
        background-color: #04AA6D;
        color: white;
        font-size:25px;
        height:12px;
        font-family: "Georgia", Times, serif;

    }
    h1{
        line-height:75px;
    }
    #createbtn{
        text-align: left;
        background-color: #26abff !important
    }
    #imagebox{
        width:10%;
    }



    
</style>