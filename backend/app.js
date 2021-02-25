const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const EXAMPLE_DATA = [
  { id: 1, address: { name: "Hydrogen", street: "asivalayam" }, third: "vinod" },
  { id: 2, address: { name: "Helium", street: "bsivalayam" }, third: "vinod" },
  { id: 3, address: { name: "Lithium", street: null }, third: "vinod" },
  { id: 4, address: "testing", third: "raju" },
  { id: 5, address: { name: "Boron", street: "esubasham" }, third: "raju" },
  { id: 6, address: { name: "Carbon", street: "fsubasham" }, third: "raju" },
  { id: 7, address: { name: "Nitrogen", street: "gsivalayam" }, third: "raju" },
  { id: 8, address: { name: 66, street: 66 }, third: "raju" },
  { id: 9, address: { name: "Fluorine", street: "isubasham" }, third: "raju" },
  { id: 10, address: { name: "Neon", street: "jsubasham" }, third: "raju" },
  { id: 11, address: { name: "Sodium", street: "ksivalayam" }, third: "raju" },
  { id: 12, address: { name: "Magnesium", street: "lsubasham" }, third: "raju" },
  { id: 13, address: { name: "Aluminum", street: "msubasham" }, third: "vinod" },
  { id: 14, address: { name: "Silicon", street: "nsivalayam" }, third: "vinod" },
  { id: 15, address: { name: "Phosphorus", street: "osubasham" }, third: "vinod" },
  { id: 16, address: { name: "Sulfur", street: "psivalayam" }, third: "vinod" },
  { id: 17, address: { name: "Chlorine", street: "sivalayam" }, third: "vinod" },
  { id: 18, address: { name: "Argon", street: "qsivalayam" }, third: "vinod" },
  { id: 19, address: { name: "Potassium", street: "ssivalayam" }, third: "vinod" },
  { id: 20, address: { name: "Calcium", street: "tsubasham" }, third: "vinod" },
];

app.get("/api/getdata", (req, res) => {
  res.json(EXAMPLE_DATA);
});

app.listen(3000, () => {
  console.log("backend listening at port 3000");
});
