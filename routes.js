const fs = require('fs');
const { buffer } = require('stream/consumers');
    const requestHandler= (req,res)=>{
        const url=req.url;
        const method =req.method;
if (url==='/'){
     res.write('<html>');
    res.write('<head><title> test </title></head>')
    res.write('<body> <form action= "/message" method="POST"> <input type="text" name="message"> <button type="submit"> send </button>   </form> </body>')
    res.write('</html>');
    return res.end();
    }
    else if (url==='/message'&& method==='POST'){
      const body=[];
      req.on('data',(chunk)=>{
         body.push(chunk);

      });
      req.on('end',()=>{
         const parsedbody= Buffer.concat(body).toString();
         const message=parsedbody.split('=')[1];
         fs.writeFileSync('message.txt',message);
      });
      res.statusCode=302;
      res.setHeader('location','/');
      return res.end();

    }
   else{
      res.write('<html>');
    res.write('<head><title> test </title></head>')
    res.write('<body> hello there </body>')
    res.write('</html>');
   }
    }
    module.exports= requestHandler;