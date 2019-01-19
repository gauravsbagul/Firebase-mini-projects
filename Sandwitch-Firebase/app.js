  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1oPoW6EUie0BGUhoZcN6a3pwmnyYc670",
    authDomain: "sandwitchfirebase.firebaseapp.com",
    databaseURL: "https://sandwitchfirebase.firebaseio.com",
    projectId: "sandwitchfirebase",
    storageBucket: "sandwitchfirebase.appspot.com",
    messagingSenderId: "470247526242"
  };
  firebase.initializeApp(config);

const firestore = firebase.firestore();
const docRef = firestore.doc("samples/sandwitchData");
const outputHeader = document.querySelector("#SandwitchOutput");
const inputTextField = document.querySelector("#SandwitchStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton"); //#endregion
saveButton.addEventListener("click", function ()  {
    const textToSave = inputTextField.value;
    console.log("I am going to save "+ textToSave + " to Firebase");
    docRef.set({
        SandwitchStatus: textToSave
    }).then(function() {
        console.log("Status saved!")
    }).catch(function (error) {
        console.log("Got an error:", error);
    });

})

loadButton.addEventListener("click", function () {
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData =   doc.data();
            outputHeader.innerText = "Sandwitch Status : "+ myData.SandwitchStatus;
            console.log(myData.SandwitchStatus);
        }
    }).catch(function (error) {
        console.log("Got an error:", error);
    });
});

getRealtimeUpdates = function() {
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData =   doc.data();
            console.log("on snapshot listner", doc);
            outputHeader.innerText = "Sandwitch Status : "+ myData.SandwitchStatus;
            console.log(myData.SandwitchStatus);
        }
    });
}
getRealtimeUpdates();