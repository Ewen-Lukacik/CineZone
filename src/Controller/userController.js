import database from "../database.js";

export async function createUser(req, res){
    const { name, email, hashedPassword } = req.body;

    try{
        const [result] = await database.query(
            "INSERT INTO users (name, email, password) VALUES (?,?,?)", 
            [name, email, hashedPassword]
        );

        if(result){
            res.status(201).json({
                'message': 'User created successfully',
                'id': result.insertId
            });
        }
    } catch (err) { 
        console.error(err);
        res.sendStatus(500);
    }
}

export async function login(req, res){
    //TODO: check que email existe en bd, compater le mdp avec bcrypt, generer jwt pour la session et le return
    res.status(200).json({
        message: "Logged in successfully"
    })
}