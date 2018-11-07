const fs = require('fs')
const xlsx = require('node-xlsx')

var mysql  = require('mysql'); 

const data = xlsx.parse(fs.readFileSync('./input.xlsx'))[0].data.slice(1)

console.log(data, 'data')

// convertToDataBaseFormat = (arr) => {
// 	return arr.map(item => {
// 		const [name, age, time] = item
// 		const t = new Date(1900, 0, time)
// 		const date = `${t.getFullYear()}-${t.getMonth()}-${t.getDate() - 1}`
// 		return [name, age, date]
// 	})
// }

// const formattedData = convertToDataBaseFormat(data)

// console.log(formattedData, 'formattedData')
 
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'user' 
}); 
 
connection.connect();
 
var  addSql = 'INSERT INTO info(name,age, date) VALUES ?';

var addSqlParams = data


console.log(addSqlParams, 'addSqlParams')

//增
connection.query(addSql,[addSqlParams],function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();