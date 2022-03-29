<template>
  <!--Page is for listing creation and is only accessible by administrators-->

  <div ref="container" class="container">
    <h1>Listing Creation</h1>
    <p>Here you can create listing for properties</p>
    <div class="mb-3">
      <label for="addressTextArea" class="form-label">Address</label>
      <!--Note that "comment" stores address-->
      <textarea
        class="form-control"
        v-model="comment"
        id="address"
        placeholder="Address"
        rows="3"
      ></textarea>
    </div>
    <div class="mb-3">
      <label id="contactTextArea" class="form-label">Contact</label>
      <input
        class="form-control"
        v-model="contact"
        id="contact"
        placeholder="Email or Phone Number"
      />
    </div>
    <div class="mb-3">
      <label for="priceTextarea" class="form-label">Price (€) per month</label>
      <input
        class="form-control"
        v-model="price"
        id="Price"
        placeholder="Price"
      />
    </div>
    <div class="mb-3">
      <label for="bedsTextarea" class="form-label">Beds No Of Doubles</label>
      <select id="numDoubles">
        <!--Drop down list of options-->
        <option value="0">0 Double Rooms</option>
        <option value="1">1 Double Rooms</option>
        <option value="2">2 Double Rooms</option>
        <option value="3">3 Double Rooms</option>
        <option value="4">4 Double Rooms</option>
        <option value="5">5 Double Rooms</option>
        <option value="6">6 Double Rooms</option>
        <option value="7">7 Double Rooms</option>
        <option value="8">8 Double Rooms</option>
      </select>
    </div>
        <div class="mb-3">
      <label for="bedsTextarea" class="form-label">Beds No Of Singles</label>
      <select id="numSingles">
        <option value="0">0 Single Rooms</option>
        <option value="1">1 Single Room</option>
        <option value="2">2 Single Rooms</option>
        <option value="3">3 Single Rooms</option>
        <option value="4">4 Single Rooms</option>
        <option value="5">5 Single Rooms</option>
        <option value="6">6 Single Rooms</option>
        <option value="7">7 Single Rooms</option>
        <option value="8">8 Single Rooms</option>
      </select>
    </div>
        <div class="mb-3">
      <label for="bedsTextarea" class="form-label">Beds No Of Twins</label>
      <select id="numTwins">
        <option value="0">0 Twin Rooms</option>
        <option value="1">1 Twin Room</option>
        <option value="2">2 Twin Rooms</option>
        <option value="3">3 Twin Rooms</option>
        <option value="4">4 Twin Rooms</option>
        <option value="5">5 Twin Rooms</option>
        <option value="6">6 Twin Rooms</option>
        <option value="7">7 Twin Rooms</option>
        <option value="8">8 Twin Rooms</option>
      </select>
    </div>
     <div class="mb-3">
      <label for="descriptionTextarea" class="form-label">Description</label>
      <textarea
        class="form-control"
        v-model="description"
        id="description"
        placeholder="Description"></textarea>
    </div>
  <div id="uploadfile">
    <form id="upload-form">
      <input type="file" name="file" required/>

      <!--"postComment" actually posts listings-->
      <button type="submit" @click="postComment" class="btn btn-primary">
        Upload
      </button>
      </form>
    </div>

  </div>
</template>

<script>


import app from "../api/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as stRef,uploadBytes,getDownloadURL} from "firebase/storage";
import {getDatabase, ref as dbRef, push, set, onValue} from "firebase/database";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { store } from "../store/store";

// variables for storing image references
const storage = getStorage(app);
const database = getDatabase();
const databaseReference = dbRef(database, "files");


onValue(databaseReference, function (snapshot) {
  snapshot.forEach(function (childSnapshot){

    const value = childSnapshot.val();
    const storageRefDownload = stRef(storage, value.name+Date());

    // firebase function that gives url from image directory
    getDownloadURL(storageRefDownload).then(function (url){
      
    });
  });
});


window.addEventListener("load", function () {
  document.getElementById("upload-form").addEventListener("submit", function (){
    event.preventDefault();
  });
});

export default {
  name: "Blog",
  data() {
    return {
      comment: "",
      price: "",
      dblbeds: "",
      sglbeds: "",
      twnbeds: "",
      image:"",
      imagename:"",
      description:"",
      comments: [],
      tempValue: "",
      editing: false,
      store,
    };
  },
  methods: {

    // postComment is used for adding listings
    postComment(){
        const functions = getFunctions(app);
        const auth = getAuth(app);
        
        if (window.location.hostname === "localhost")
          // Check if working locally
          connectFunctionsEmulator(functions, "localhost", 5001);
        
        const postComment = httpsCallable(functions, "postcomment");
        let uid = "anonymous";
        
        if (auth.currentUser != null) {
          // Check that there is a logged in user
          uid = auth.currentUser.uid; // if logged in then assign uid
        }
        
        // Insert Image and Grab Url
        let imageUrl = '';
        
        var file = document.getElementById("upload-form").file.files[0];
        const filename = file.name+Date();

        const storageRef = stRef(storage, filename);
        console.log(storageRef);
        uploadBytes(storageRef, file).then((snapshot) => {
          var newFileRef = push(databaseReference);
          var d= document.getElementById("numDoubles");
          var s= document.getElementById("numSingles");
          var t= document.getElementById("numTwins");
          var opDbl = d.options[d.selectedIndex].text;
          var opSgl = s.options[s.selectedIndex].text;
          var opTwn = t.options[t.selectedIndex].text;
          set(newFileRef, {
            "name":file.name
          });

          // storage reference to image is passed in to function
          getDownloadURL(storageRef).then((url) => {
            imageUrl = url;

            postComment({
              "contact": this.contact,
              "comment": this.comment,
              "dblbeds": opDbl,
              "sglbeds": opSgl,
              "twnbeds": opTwn,
              "price": this.price,
              "imag": imageUrl,
              "imagename":filename,
              "description": this.description,
              "uid": uid,
            }).then((result) => {
              this.$router.push("/secure");
              console.log(result);
            });
          });
        });    
        },
  },
};
</script>

<style scoped>


input{
  margin-left:auto;
  margin-right:auto;
  width:25%;
}

textarea{
  margin-left:auto;
  margin-right:auto;
  width:25%;
}

label{
  font-weight:bold;
}

</style>
