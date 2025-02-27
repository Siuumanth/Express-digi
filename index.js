import 'dotenv/config'  //best way to import tis
import express from 'express';
const app = express();

const port = process.env.PORT || 3000;

//making routes
app.get("/", (req,res) => {
    res.send("Hello from chubs");
})

app.use(express.json());

let teaData = []
let nextId = 1


//saving data
app.post('/teas', (req, res) => {
    //extract info
    const {name,price} = req.body;
    const newTea = {id: nextId++ , name, price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})

//sending all data
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})


//get by id
app.get('/teas/:id', (req, res) => {
    const {id} = req.params;
    //finding in all elements
    teaData.find(tea => tea.id === parseInt(id))
    if(!tea){
        res.status(404).send('Tea not found')
    }else{
        res.status(200).send(tea)
    }
})


//updating
app.put('/teas/:id', (req, res) => {
    const teaID = req.params.id;
    teaData.find(tea => tea.id === parseInt(id))
    if(!tea){
        res.status(404).send('Tea not found')
    }
    const {tea,price} = req.body;
        tea.name = req.body.name; //or just name
        tea.price = req.body.price;  // or just price
        res.status(200).send(tea)
})


//deleting
app.delete('/teas/:id', (req, res) => {
    const teaID = req.params.id;
    teaData.find(tea => tea.id === parseInt(id))
    if(!tea){
        res.status(404).send('Tea not found')
    }
    // removes the tea with the matching teaID from teaData.
    teaData = teaData.filter(tea => tea.id !== parseInt(teaID))
    res.status(200).send(teaData)
})  


app.listen(port, () => {
    console.log(` server is listening on port ${port}....`)
})