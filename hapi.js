// server construct
const Hapi = require('@hapi/hapi');
// const { options } = require('@hapi/hapi/lib/cors');
const fs=require("fs")
const echarts=require("echarts")


const XLSX=require("xlsx")
const init = async () => {
    
    
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true
        }
    });
  
    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, h){
            // console.log(request.info)
            // console.log(request.headers)
            // console.log(request.payload)
            // console.log(request.state)
            console.log(h)
            return {}
         }   
        // handler: (request, h,err) => {
            // return 'Hello World!'
            // h.response;
        // }
    });
    server.route({
        method: 'GET',
        path: '/data',
        
        handler: function (request, h){
            // console.log(xrray)
            // console.log(yrray)

            return {x:xrray,y:yrray,wb:wbdata}
            // return 'Hello World!'
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
// const promise1 = new Promise((resolve, reject) => {
//     throw 'Uh-oh!';
// });

// promise1.catch((error) => {
//     console.error(error);
// });
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

var buf = fs.readFileSync("sheetjs.xlsx");
var wbdata = XLSX.read(buf, {type:'buffer'});
// console.log(wb.Sheets.Sheet1)

var outdata = XLSX.utils.sheet_to_json(wbdata.Sheets[wbdata.SheetNames[0]],{header:"A",blankrows: true
,defval:"notdefined"});
var xrray=[]
var yrray=[]
outdata.forEach(function myFunction(item, index) {
    xrray.push(item.A)
    yrray.push(item.B)
    // console.log(item.A)
    // console.log(item.B)

})
// console.log (yrray)

