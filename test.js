



// // // function test(a) {
// // //     return new Promise((resolve, reject) => {
// // //         if(a == 1)  resolve(1);
// // //         if(a != 1)  reject(new Error("hi"));
// // //     })
// // // }





// // // // async function aaaa(t) {

// // // //     try {
// // // //         let b = await test(t);
// // // //         return b;
// // // //     }

// // // //     catch(error) {
// // // //         console.log(error.message);
// // // //     }

// // // // }

// // // // async function aa() {

// // // //     try {

// // // //         let b = await aaaa(2);
// // // //         console.log(b);
// // // //     }

// // // //     catch(error) {

// // // //         console.log(error.message);
// // // //     }
    

// // // // }

// // // // aa();

// // // // function func1(num) {

// // // //     return new Promise((resolve, reject) => {
// // // //         setTimeout(() => {
// // // //             if(num == 1)  resolve(num);
// // // //             else          reject(new Error("error"));
// // // //         }, 1000);
// // // //     });
// // // // }

// // // // async function func2(num) {

// // // //     try {
// // // //         return await func1(num);

// // // //     }
// // // //     catch(error) {
// // // //         throw error;
// // // //     }
// // // // }

// // // // async function func3(num) {

// // // //     let x = await func2(num);
// // // //     console.log(x);
// // // // }


// // // // func3(1);



// // // // const bcrypt = require("./collect/bcrypt").create();
// // // // const hmac   = require("./collect/hmac").create();

// // // // // bcrypt.hash("fjdsafl;kdjsalk;fjsdalk;fjmsda;lkfjasd;lfjl;kadsfj;lkdsajf;lkdsajf;ldasjfiopej2q3poirjoikdsjamfokds;ajfl;kdsajflk;dsajfioewpqrjfdksa;fjiepoqjfdksa;lf")
// // // // //       .then(hashValue => console.log("bcrypt : ", hashValue));


// // // // console.log(Date.now());
// // // // console.log("hmac : ", hmac.get_signature("POST", "https://gssiot.org"));



// const request = require("request");
// // const options = { method : "POST", json : true};
// const cryptoJS = require("crypto-js");
// const dotenv   = require("dotenv").config({path : "../../../.env"});
// const xmlToJson = require("xml-js");
// const hmac      = require("./collect/hmac");


// function test() {

//     // let newSignatrue = undefined;
//     // let secretKey    = "GSSIOT";
//     // let method       = "POST";
//     // let space        = " ";
//     // let newLine      = "\n";
//     // //let hmac         = cryptoJS.algo.HMAC.create(cryptoJS.algo.SHA256, secretKey);
//     // let host         = `http://localhost:1234/api/env`;
//     let date         = Date.now().toString();

//     // hmac.update(method);
//     // hmac.update(space);
//     // hmac.update(host);
//     // hmac.update(newLine);
//     // hmac.update(date);
//     // hmac.update(newLine);
//     // hmac.update("GSSIOT");
    
//     // const hash   = hmac.finalize();
//     // newSignature = hash.toString(cryptoJS.enc.Base64);

//     request({
    
//         method : "POST",
//         json   : true,
//         uri    : "http://192.168.0.2:3030/data",
//         headers: { "x-signature" : hmac.get_signature("POST", date.toString(), "http://192.168.0.2:3030/data"), "x-accesskey" : "GSSIOT", "x-date" : date.toString()},
//         body : {
//             Farmid : "4",
//         }

//     },function(error, res, body) {
//         if(error) console.log(error.message);
//         console.log("body", body);
//     })
// }

// test();
// // // // setInterval(() => { test(); }, 1000);

// // // // //const request = require("request");
// // const request = require("request");
// // const dotenv = require("dotenv").config({path:".env"});
// // const payload = {
// //     method : "GET",
// //     url    : `http://api.openweathermap.org/data/2.5/weather?q=Goyang-si&appid=${process.env.WEATEHR_API_KEY}`
// // };
// // request(payload, function(error, response, body) {
// //     if(error) console.log(error);
// //     else console.log(JSON.parse(response.body));
// // }); 

// // const WebSocketServer = require("ws").Server;
// // const wss = new WebSocketServer({port : 3001}, () => {console.log("wss is running")});

// // wss.on("connection", (ws) => {
    
// //     console.log("connected");

// //     ws.on("message", (message) => {
// //         console.log("data");
// //         ws.send("data");
// //     })
// // });


// // var d = new Date();


// // var h = d.getHours() > 9 ? d.getHours(1) : '0' + d.getHours();


// // console.log(h);


const mariadb = require("mariadb");


const pool = mariadb.createPool({
    host : "localhost",
    port : 9999,
    user : "root",
    database : "SFIMS",
    password : "gssiot"
});

async function connection() {

    let conn;
    let rows;

    try {
        conn = await pool.getConnection();
        rows = conn.query("SELECT * FROM USERINFOTABLE");
    }
    catch(error) {
        console.log(error);
    }
    finally {
        conn.release();
        console.log(rows);
    }
}

<<<<<<< HEAD
// console.log(h);
const dotenv = require("dotenv").config({"path" : ".env"})
const request = require("request");
const payload = {
    method  : "POST",
    uri     : "https://www.google.com/recaptcha/api/siteverify",
    headers : { "Content-Type" : "application/x-www-form-url-urlencoded" },
    form    : {
        secret   : process.env.RCT_SECRET_KEY,
        response : "03AGdBq24keVZce7Pqm0IrdngDgsAHXpCshNIbK95C7RGvTek67icHv6KY6WJ_MI7b_JVTQcWZPGwJ2BIyn8Ywz9r1Moc_NJwITU-_2jxdCmh79lOynHDqa2zL07UJoVLOK8ri57yqSOFQO54lh9T6h5hfObVOKXXzRvAq1R7V4M_g4RvX7WN-8KN9dl8dZE3LUzBfq-NIigxhaqdRoS3PsXjnBXcyOgFAHetkAqSU62apLpj10NKSXTIeHP3ZJdwehACv6JdP9ePYlQGTGxLvXwV8zWw7aqcauXKRFLIRlukfmc6Etc3uOyE8YpJpwbVRNGkbrJBfGvdcZQh75NGK29pYFwxL_2b6eFKfe9pTsbXRESreT0USeaPPfWjzs2-QcU9Uj6xB4wSlVcxdYHgWJ9Q6ffuJ2jMvFE4N1vvvY_nT6wj9_os32ZYyd5ISp7ip6bTYnOa_u9z7",
    },
};


request(payload, function(error, response, body) {

    const success = JSON.parse(body)["success"];

    console.log(body);
    
})
=======
connection().then((rows) => {console.log(rows)});
>>>>>>> a51a3b42017db990cc1c6fad27b2981d20bba0f3
