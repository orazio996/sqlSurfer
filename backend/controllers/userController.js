
const dbService = require('../services/dbService')
const bcrypt = require('bcrypt')
const { SignJWT, jwtVerify } = require('jose')

exports.signup = async (req, res, next) => {
    const { username, password } = req.body;

    // Controllo se l'utente esiste già
    try {
        const userExists = await dbService.findUser(username);     //usa mysql2
        if (userExists) {      //da testare
            return res.status(400).json({ message: 'User already exists' });
        }
    } catch (error) {
        console.log('Errore: ' + error)
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salvataggio dell'utente "nel database"
    dbService.signup({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
}

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

exports.signin = async (req, res, next) =>{
    const { username, password } = req.body;

    // Controllo se l'utente esiste
    const user = await dbService.findUser(username);     //usa mysql2
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Verifica della password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Creazione del JWT --- DEVE ESSERE SALVATO LATP CLIENT CON USERNAME (ECC...)?
    const token = await new SignJWT({username: username, id: user.id})
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2h')
        .sign(jwtSecret);           //jwtSecret

    //res.redirect('/workspace');
    res.status(200).json({ token })
}

