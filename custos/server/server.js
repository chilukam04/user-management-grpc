import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv'; 
dotenv.config();
const app = express();



const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/v1/identity-management/token', async (req, res) => {
    const { code, redirect_uri, grant_type, code_verifier,username,password } = req.body;

    try {
      // Exchange the authorization code for an access token
      const response = await fetch(`https://api.playground.usecustos.org/api/v1/identity-management/token?code_verifier=${code_verifier}`, 
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,

        }),
      });
      // Check if the response is OK and in JSON format
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error('Error response from Custos:', errorText);
        return res.status(response.status).send('Error: ' + errorText); 
      }
  
      const data = await response.json(); 
      console.log(data.access_token);
      
      res.json(data.access_token);
  
    } catch (error) {
      console.error('Unexpected error occurred:', error);
      res.status(500).send('Unexpected error occurred');
    }
  });


  app.post('/api/v1/user-management/userinfo', async (req, res) => {
    const {access_token,code} = req.body;
    try {
      if (!access_token){
        console.log("No access token");
        return; 
      }
      console.log("client id:",process.env.CLIENT_ID);
      
      console.log("access_token", access_token);
      const response = await fetch(`https://api.playground.usecustos.org/api/v1/user-management/userinfo?client_id=${process.env.CLIENT_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
      }}
      );
      if (!response.ok) {
        console.log('Failed to fetch user info:', response.status);
        return res.status(response.status).json({ error: 'Failed to fetch user info' });
      }
      
      const data = await response.json(); 
      console.log(data);
      res.json(data); 
    } catch (error) {
      console.log('Error:', error);
      throw error;
      
    }
  })

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
