module.exports.routes = (app) => {
  app.get('/download', function(req, res){
      const file = `../../public/movie1.png`;
      res.download(file); // Set disposition and send it.
    });
  
  }