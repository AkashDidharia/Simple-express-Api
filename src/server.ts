import express, {Application, Request, Response} from 'express';
const app: Application = express();
import axios from 'axios';

const port: number = 5000;

// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('views','src/views');   //set the views directory that contains the template ejs,pug or mustache files

app.set('view engine','ejs');    // Set view engine as the templating engine that you are using

app.get('/', async (req: Request, res: Response) => {

    axios.get('https://fakestoreapi.com/products')
    .then( (response)=>{    
        let data = [];
        for(let i=0;i<10;i++){
             data.push(response.data[i]);  
        }; 
        res.render('index.ejs', {data: data});
    });
});


app.post('/newlist',async (req: Request, res: Response) => {
    console.log("req recieved");
    axios.get('https://fakestoreapi.com/products')
    .then( (response)=>{    
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
    });
});
 
app.listen(port, function(){
    console.log(`listenting on port ${port}`)
});


