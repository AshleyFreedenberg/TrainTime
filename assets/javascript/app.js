// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvbxQqDp8cYBlASJyo5QLRDq-nKiox12s",
    authDomain: "fullstack-ucsd.firebaseapp.com",
    databaseURL: "https://fullstack-ucsd.firebaseio.com",
    projectId: "fullstack-ucsd",
    storageBucket: "fullstack-ucsd.appspot.com",
    messagingSenderId: "194545796495"
};
firebase.initializeApp(config);

$(document).ready(function () {

    var database = firebase.database();

    $("#addTrain").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = moment($("#trainTime").val().trim(), "hh:mm").format("hh:mm");
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            Name: trainName,
            Destination: destination,
            Time: trainTime,
            Frequency: frequency,
        };

        database.ref().push(newTrain);

        console.log(newTrain.Name);
        console.log(newTrain.Destination);
        console.log(newTrain.Time);
        console.log(newTrain.Frequency);

        alert("Train successfully added");

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");
    });


    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        //get data from DB
        var trainName = childSnapshot.val().Name;
        var destination = childSnapshot.val().Destination;
        var trainTime = childSnapshot.val().Time;
        var frequency = childSnapshot.val().Frequency;

        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

        //create var for Next Arrival time
        //var nextArrival = ;


        //create var for Minutes Away
        //var minutesAway = ;

        // Display new data in new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            //$("<td>").text(),
            //$("<td>").text(),
        );

        $("#train-table").append(newRow);
    });
});