const express = require("express")
const bodyParser = require("body-parser")

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    
    var today = new Date();
    var currentday = today.getDay();
    var day ="";

    // if(currentday === 0 && currentday === 6){
    //     day ="Weekend";
    // // if(today.getDay() === 3){
    //     // res.send("<h2>Yay! it's the weekend</h2>")
    //     // res.write("<h2>Yay! it's the weekend</h2>")

    //     // res.sendFile(__dirname+ "/weekend.html");

    //     // res.render('list')
    //     // res.render('list', {kindOfDay:day});
    // }else{
    //     day ="Weekday";
    //     // res.end("<h1>it's Working dayyy</h1>")
    //     // res.write("<h1>it's Working dayyy</h1>")
    //     // res.write("<h2>you need to work</h2>")
    //     // res.send();

    //     // res.sendFile(__dirname+"/index.html")

    //     // res.render('list', {kindOfDay:day});
    // }


    switch (currentday) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wenesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
        console.log("Error: Current day is equal to:"+ currentday);
    }
    res.render('list', {kindOfDay:day});
    // res.render('list', {day:day});
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
})