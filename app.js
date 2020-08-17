/*	--------------------------------------------------------------------------/
 *	author		: 
 *	module		：jsansible model
 *											COPYRIGHT 
 *	-------------------------------------------------------------------------*/


/*	--------------------------------------------------------------------------/
 *	app
 *	-------------------------------------------------------------------------*/	
const express = require('express');
// express の実態 Application を生成
const app = express();
const port = 8080;
 
// テンプレートエンジンを EJS に設定
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use('/', require('./routes/index.js'));

var server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


/*	--------------------------------------------------------------------------/
 *	model
 *	-------------------------------------------------------------------------*/

