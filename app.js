const express = require("express");
const  https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// app.get("/", function(req, res){
//     ///                                                      these lattitude and langitude are locate Bareilly(lat=28.3670&lon=79.4304)
//     var query = "Bareilly"
//     const apikey = "b721b7e0779b696035607fb1c1da92ce"
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric"
    // https.get(url, function(response){
    //     console.log(response.statusCode);
    //     response.on("data", function(data){
    //         const weatherdata = JSON.parse(data) 
    //         const temp = weatherdata.main.temp
    //         const weatherdesc = weatherdata.weather[0].description
    //         const icon = weatherdata.weather[0].icon;
    //         const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    //         console.log(temp);
    //         console.log(weatherdesc);
    //         res.write("<h1>The temperature in " + query + " is "+ temp + " and weather is " + weatherdesc + " </h1>");
    //         res.write("<img src=" + imgurl +">")
    //         res.send();
    //     });
    // });

// });

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    var city = req.body.cityName;
    const apikey = "b721b7e0779b696035607fb1c1da92ce"
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherdata = JSON.parse(data) 
            //console.log(weatherdata);
            const temp = weatherdata.main.temp
            const weatherdesc = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon;
            const windSpeed = weatherdata.wind.speed;
            //console.log("wind speed");
            //console.log(windSpeed);
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
            console.log(weatherdesc);
            res.write("<h1>The temperature in " + city + " is "+ temp + " and weather is " + weatherdesc + " </h1>");
            res.write("<img src=" + imgurl +">")
            res.write("<h1> Wind Speed is " + windSpeed + " </h1>");
            res.write("console.log(weatherdata)");
            res.send();
        });
    });
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})