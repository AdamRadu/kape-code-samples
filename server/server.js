const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cors = require("cors")
const express = require("express")
const { MongoClient } = require("mongodb")
const dotenv = require('dotenv');
dotenv.config();
const uri = `mongodb+srv://${process.env.mongoName}:${process.env.mongoPass}@eurafricamotors.tlbsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri)
const app = express()
app.use(cors())
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(bodyParser.urlencoded({ extended: true }))

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DomParser = require('dom-parser');
// var user = ""

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('eurafricamotors');
//     const users = database.collection('users');
//     const query = { username: 'admin' };
//     user = await users.findOne(query);
//     console.log("the user is : ", user)
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.listen(process.env.PORT, () => {
  console.log(`App listens on port ${process.env.PORT}`)
})

app.get('/', (req, res) => {
  res.send('doar sa vad ceva in cmd line ffs')
})

app.get('/users:user', (req, res) => {
  getUserByName(req.params.user).then(result => {
    res.send(result)
  })
    .catch(console.dir)

})

const getValueFromElement = (text) => {
  text = text.trim()
  const parser = new DomParser();
  var result
  if (text[0] === "<") {
    result = parser.parseFromString(text, "text/html")
    if (result.getElementsByTagName("a")[0] === undefined) {
      return result.rawHTML.split("</span>", 2)[1]
    }
    else {
      return getValueFromElement(result.getElementsByTagName("a")[0].innerHTML)
    }
  } else {
    return text
  }
}

app.post('/add', (req, res) => {
  const url = req.body.url
  const parser = new DomParser();
  sourceCode = getSourceAsDOM(url)
  var values = []
  var dotari = []

  const title_elements = sourceCode.getElementsByClassName("offer-params__label")
  const value_elements = sourceCode.getElementsByClassName("offer-params__value")
  const photos = sourceCode.getElementsByClassName("offer-photos-thumbs__item")
  var bigPhotos = []
  const dotari_elements = sourceCode.getElementsByClassName("offer-features__item")


  sourceCode.getElementsByClassName("photo-item").map((photo, index) => {
    if (photo.innerHTML.trim().substring(0, 4) === '<img') {
      bigPhotos.push(photo.innerHTML)
    }
  })

  if (bigPhotos[0].length > 1500) {
    bigPhotos.shift()
  }


  photos.map(photo => {
    photo = photo.innerHTML.trim()
    const result = photo.split(" ")
    // console.log(result[1].split("src=", 2)[1])
    // check for undefined
  })


  bigPhotos.map(photo => {
    photo = photo.trim()
    const result = photo.split(" ")
    // console.log(result)
    console.log(result[4].split("data-lazy=", 2)[1])
    console.log("-------------------------------------------------------------")
  })

  value_elements.map((element, index) => {
    t = getValueFromElement(title_elements[index].innerHTML)
    v = getValueFromElement(element.innerHTML)
    values.push({
      "title": t,
      "value": v
    })
  })

  dotari_elements.map((element, index) => {
    d = getValueFromElement(element.innerHTML)
    dotari.push(d)
  })

})

function getSourceAsDOM(url) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  parser = new DomParser();

  return parser.parseFromString(xmlhttp.responseText, "text/html");
}

async function createUser() {
  try {
    await client.connect();
    const database = client.db('eurafricamotors');
    const users = database.collection('users');
    const password = await hashIt("1234")
    const user = {
      "username": "admin",
      "password": `${password}`,
      "type": "admin"
    }
    await users.insertOne(user)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getUserByName(name) {
  try {
    await client.connect();
    const database = client.db('eurafricamotors');
    const users = database.collection('users');
    const query = { username: name };
    const user = await users.findOne(query);
    return user

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function hashIt(password) {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed
}

