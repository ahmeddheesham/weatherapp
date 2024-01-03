const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


app.get('/weather/:city', async(req,res) => {
    const city = req.params.city;

    try {
        const response  = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb4852767ef842360f5ecf00a2733da8`)
        const weatherResult = response.data;
        console.log({result:weatherResult});
        res.send({result:weatherResult});

    } catch (err) {
        res.status(404).json({error:"Location Not Found" + " " + err}); 
    }
})


app.listen(3300, () => {
    console.log("Server is Running...")
})