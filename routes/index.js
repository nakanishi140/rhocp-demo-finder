/*	--------------------------------------------------------------------------/
*	author		: 
*	module		：
*											COPYRIGHT 
*	-------------------------------------------------------------------------*/


/*	--------------------------------------------------------------------------/
*	index.js
*	-------------------------------------------------------------------------*/	

const express = require('express');
const http = require("http");
const router = express.Router();

/*	--------------------------------------------------------------------------/
*	ルーティング：/top
*	-------------------------------------------------------------------------*/
router.get('/find', function (request, response) {
  
  let totalmeta = {};
  totalmeta.title = "UG-STYLE:Result";
  totalmeta.cds = process.env.CDS_HOME;
  
  let totalrr = {};
  totalrr.result = {};
  
  console.log("param:" + request.query.key);


  /*	---------------------------------------------------------------------/
   *	debug#1 summer
   *	--------------------------------------------------------------------*/
  function debug1(request,response) {

    let obj2 = {};
    obj2.result = "success";
    let tmp21={},tmp22={},tmp23 = {},tmp24 = {};
    obj2.json = [tmp21,tmp22,tmp23,tmp24];
    tmp21.id = "21";
    tmp21.image = "blue-2564660_1920.jpg";
    tmp21.headline = "アウトドアスタイル";
    tmp21.sub_headline = "日常でも快適に着られるアウトドアスタイルファッション";

    tmp22.id = "22";
    tmp22.image = "people-2563491_1920.jpg";
    tmp22.headline = "UGスタイル";
    tmp22.sub_headline = "UGで自分らしく自由なスタイルを";

    tmp23.id = "23";
    tmp23.image = "hip-hop-1209499_1920.jpg";
    tmp23.headline = "街角スタイル";
    tmp23.sub_headline = "街へでかけよう、ファッションを楽しもう";

    tmp24.id = "24";
    tmp24.image = "sunset-1282282_1920.jpg";
    tmp24.headline = "夏の特別コレクション";
    tmp24.sub_headline = "より快適に、より心地よいライフスタイルを";


    totalrr.result.status = 200;
    totalrr.result.body = obj2;

    response.render('result',{ 
              meta: totalmeta,
              result: totalrr.result.body
    });
  }

 



  /*	---------------------------------------------------------------------/
   *	main
   *	--------------------------------------------------------------------*/
  //debug1(request,response);
  serial();

  /*	---------------------------------------------------------------------/
   *	promise : serial
   *	--------------------------------------------------------------------*/
  function serial () {
      let promise = Promise.resolve();
      promise
          .then(call_finder.bind(this,totalrr))
          .then(render_page);
  }


  /*	---------------------------------------------------------------------/
   *	promise:function():call_finder
   *	--------------------------------------------------------------------*/
  function call_finder(totalrr) {
      return new Promise((resolve,reject) => {
          let param = request.query.key;
          let options = {
              protocol: "http:",
              host: "backweb2",
              port: 8080,
              path: "/back2_find?key="+encodeURIComponent(param),
              method: "GET"
          };
          let rr = {};  
          rr.status = ''; 
          rr.body = 'Service backweb2 Unavailable';
          totalrr.result = rr;
          _call_backweb(resolve,reject,options,rr);
      });
  }

  /*	---------------------------------------------------------------------/
   *	promise:function():render_page
   *	--------------------------------------------------------------------*/
  function render_page () {
      return new Promise((resolve,reject) => {
          response.render('result',{ 
               meta: totalmeta,
              result: totalrr.result.body
          });
          resolve("render complete");
      });
  }


  /*	---------------------------------------------------------------------/
   *	common:function():http get
   *	--------------------------------------------------------------------*/
  function _call_backweb(resolve,reject,options,rr) {
      const req = http.request(options,(res)=>{
          let body = '';
          rr.status = res.statusCode;
          res.setEncoding("utf-8");
          res.on("data",(chunk) => {
              body += chunk;
          });
          res.on("end",(chunk)=>{
              try {
                rr.body = JSON.parse(body);
              } catch(error) {
                let obj ={};obj.json=[];
                rr.body = obj;
              }
              resolve(rr);
          });
      });
      req.on('error',(error) => {
        console.log(error.message);
        let obj ={};obj.json=[];
        rr.body = obj;
        resolve(rr);
      });
      req.end();
  }

});


module.exports = router;


