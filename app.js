const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://danny:Saulotany7@cluster0.wqkprsi.mongodb.net/?retryWrites=true&w=majority");

const itemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Get Up You lazy Ass Do Something Productive Today(Tihardien👶)! ",
});
const item2 = new Item({
  name: "Hit the ➕ button to make a To Do List for Today's Work.",
});
const item3 = new Item({
  name: "yha group ka sabhi sadsya apna daily routine banye aur Life mai aage badhe nhi toh aapko Netaji Nagar mai pappu ke Dhabe pe Sankeyy bete ke sath kaam pe laga diya jayega.(danyavad🙏)  "
});
const item4 = new Item({
  name:"◻---  Hit this to delete an item.",
});

const item11 = new Item({
  name: "Kuch productive karle bhai kyu phone mai ghusa hua hai!!!",
});
const defaultItems = [item1, item2, item3, item4,item11];

const listSchema ={
  name:String,
  items:[itemsSchema]
};
const List = mongoose.model("List", listSchema);

// Item.insertMany(defaultItems, function(err){});

//mera way of doing
// Item.find(function(err, foundItems){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(foundItems);
//     }
// });

//Angela way of doing this

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    // console.log(foundItems);

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {});
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Funkey Monkey's To Do List😎", newListItems: foundItems });
    }
  });
});

//dynamic routing in express
app.get("/:customListname", function(req, res){
  // console.log(req.params.customListname);
  const customlistName = _.capitalize(req.params.customListname);
  
  List.findOne({name: customlistName}, function(err, foundList){
    if(!err){
      if(!foundList){
        // console.log("Doesn't exist!");
        //Create a new list
        const list = new List ({
          name: customlistName,
          items: defaultItems
        });
        
        list.save();
        res.redirect("/"+ customlistName)
      }else{
        // console.log("Exists!");
        //Show an existing list
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    }
  });


});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if(listName === "Funkey Monkey's To Do List😎"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+ listName)
    })
  }
});

app.post("/delete", function(req, res){
  // console.log(req.body.checkbox);
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listname;

  if(listName ==="Funkey Monkey's To Do List😎"){
    Item.findByIdAndRemove(checkedItemId,function(err){
      if (!err){
        // console.log("Successfully deleted");
        res.redirect("/")
      }
    });
  }else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err,foundList){
      if(!err){
        res.redirect("/"+ listName);
      }
      
      })
  }

});

app.get("/about", function (req, res) {
  res.render("about");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully");
});
