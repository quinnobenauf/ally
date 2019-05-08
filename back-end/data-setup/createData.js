// 1. if you are using a local instance of MongoDB create a folder named db in the back-end folder
// 2. from the back-end folder, launch the mongo db: mongod -port 3000 -dbpath ".\db"
// 3. To load data, open your mongo shell in teh back-end folder and type
// load('data-setup/createData.js');
// console will return 'true' if load was successful

// Create Users

db = db.getSiblingDB('ally')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
  {
    firstName: "Omer",
    lastName: "Burstein",
    userName: "otown",
    password: "pword123",
    email: "burstei3@seattleu.edu",
    phone: "425-555-1212",
    allergies: ["wheat", "gluten"],
    diets: []
  }
)
usersCollection.insert(
  {
    firstName: "Quinn",
    lastName: "Obenauf",
    userName: "quinn",
    password: "pword123",
    email: "quin@seattleu.edu",
    phone: "425-123-4567",
    allergies: ["Soy"],
    diets: ["Vegetarian"]
  }
)
usersCollection.insert(
  {
    firstName: "Jared",
    lastName: "Alonzo",
    userName: "JarJar",
    password: "pword123",
    email: "jared@seattleu.edu",
    phone: "425-789-0000",
    allergies: ["Dairy", "Shellfish", "Fish"],
    diets: []
  }
)
usersCollection.insert(
  {
    firstName: "Bridger",
    lastName: "Zoske",
    userName: "bridgy",
    password: "pword123",
    email: "bridger@seattleu.edu",
    phone: "425-100-1999",
    allergies: ["Shellfish", "Peanut"],
    diets: ["Vegan"]
  }
)

// Create Allergies

db.createCollection('allergies')
allergyCollection = db.getCollection("allergies")
allergyCollection.remove({})
allergyCollection.insertMany([
  { type: "Wheat" },
  { type: "Peanut" },
  { type: "Chocolate" },
  { type: "Gluten" },
  { type: "Shellfish" },
  { type: "Soy" },
  { type: "Fish" }]
)

// Create Diets

db.createCollection('diets')
dietCollection = db.getCollection("diets")
dietCollection.remove({})
dietCollection.insertMany([
  { type: "Vegetarian" },
  { type: "Paleo" },
  { type: "Vegan" },
  { type: "Meatatarian" },
  { type: "Gluten-free" },
  { type: "Pescatarian" }]
)
