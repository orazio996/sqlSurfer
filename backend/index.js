require('dotenv').config();
const express = require('express')
const app = express()
app.listen(3000)

const cors = require('cors');
const correctionController = require('./controllers/correctionController')
const userController = require('./controllers/userController')
const provaController = require('./controllers/provaController')
const modelController = require('./controllers/modelController')
const bodyParser = require('body-parser')
const {jwtVerify} = require('jose')

const jwtSecret = new TextEncoder().encode('af7e9cdeeaf71aee6a67a85bf2fbdcc4b403ef50a528dda24660826a32ccd53b5a48e9a506a84d1c34c378c8768f7c671e368e89f7dcff155fde6368606cc9d8');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));




app.get('/protected', async (req, res) => { //fai un middleware
    const authHeader = req.headers.authorization;

    console.log(req.headers.authorization)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica del token
        const { payload } = await jwtVerify(token, jwtSecret);
        console.log(payload)
        res.status(200).json({ message: `Hello ${payload.username}, this is protected data!` });
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

app.post('/cronologia', correctionController.cronologia)


app.post('/signup', userController.signup)
app.post('/signin', userController.signin)

app.post('/correct', correctionController.correct, correctionController.formatCorrection, correctionController.saveCorrection)

app.post('/newModel', modelController.newModel)
app.post('/models', modelController.models)

app.all('*', (req,res)=>{       //default
    res.send('Error 404: Not Found');
})





