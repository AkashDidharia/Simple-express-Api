import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
const app: Application = express();
import axios from 'axios';

const port: number = 5500;

// For parsing application/json
app.use(bodyParser.json());
  
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views','src/views');   //set the views directory that contains the template ejs,pug or mustache files

app.set('view engine','ejs');    // Set view engine as the templating engine that you are using

app.get('/', async (req: Request, res: Response) => {

    try{
        let [response1,response2] =  await axios.all([axios.get('https://fakestoreapi.com/products'),
                                                      axios.get('https://fakestoreapi.com/users')]);
            let products = [];
            let users = [];
            for(let i=0;i<10;i++){
                products.push(response1.data[i]);  
            }; 

            for(let i=0;i<10;i++){
                users.push(response2.data[i]);  
            }; 
            res.render('index.ejs', {data: products, users: users});
    }
    catch(error){
        console.error(error);
    }
    // try{
    //     const response = await axios.get('https://fakestoreapi.com/products');
    //         let products = [];
    //         for(let i=0;i<10;i++){
    //             products.push(response.data[i]);  
    //         }; 
    //         res.render('index.ejs', {data: products});
    // }
    // catch(error){
    //     console.error(error);
    // }
});


app.post('/newlist',async (req: Request, res: Response) => {
    console.log("req recieved");
    try{
        const response = await axios.get('https://fakestoreapi.com/products')    
            
        let data = [];
            for(let i=0;i<10;i++){
                data.push(response.data[i]);  
            }; 
            let newPrd = req.body;
            // Since there isn't any id and rating field in our form
            if(newPrd.id == null)
                newPrd.id = response.data.length +1;

            if(newPrd.rating == null)
                newPrd.rating = {
                    "rate": 0,
                    "count": 0
                };
            console.log(newPrd);
            data.push(newPrd);
            res.render('products.ejs', {data: data});
    }
    catch(error){
        console.error(error);
    }
});
 
app.listen(port, function(){
    console.log(`listenting on port ${port}`)
});
