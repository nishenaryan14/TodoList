const express = require("express");
const bodyParser = require("body-parser");
const date  = require(__dirname + "/date.js");
const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const tiME = ["10:00", "11:00", "12:00"];
const workTime = [];
const workItems = [];
const reminderTime = [];
const reminderItems = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/General", (req, res) => {
    
    let day = date.getDate();
   
    res.render('list', {listTitle: day ,enteredTime: tiME,newListItems: items});
});

app.post("/General", (req, res) => {
    let time = req.body.newTime;
    let item = req.body.newItem;
    if(req.body.list === "Work List"){
        workItems.push(item);
        workTime.push(time);
        res.redirect("/work");
    }
   
    else if(req.body.list === "Reminder List"){
        reminderItems.push(item);
        reminderTime.push(time);
        res.redirect("/reminder");
    }
    else{
        tiME.push(time);
        items.push(item);
        res.redirect("/General");
    }

});


app.get("/work", (req, res) => {

    res.render("list", {listTitle: "Work List", enteredTime: workTime, newListItems: workItems});
});

app.get("/reminder", (req, res) => {

    res.render("list", {listTitle: "Reminder List", enteredTime: reminderTime, newListItems: reminderItems});
});

app.get("/portfolio", (req, res) => {
    res.render("portfolio");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/contact",(req, res) => {
    res.render("contact");
});
app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});

