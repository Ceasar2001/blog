import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    
    //CHECK EXISTING USER

    const q = "SELECT * FROM users WHERE email = $1 OR username = $2";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.rows.length) return res.status(409).json("User already exists!");

        //hash password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [
        req.body.username,
        req.body.email,
        hash
        ];

       db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("User created successfully!");
        });
        
    });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = $1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.rows.length === 0) {
      return res.status(404).json("User not found!");
    }

    const user = data.rows[0];

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong password or username!");
    }

    const token = jwt.sign({ id: user.id }, "jwtkey");

    const { password, ...other } = user;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        // secure: true (if using https),
        // sameSite: "strict"
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
    
}

