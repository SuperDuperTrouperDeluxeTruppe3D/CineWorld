module.exports.routes = (app) => {
    app.get('/demo', function(req, res){
        res.render("filmCard"); // Set disposition and send it.
      });
    
    }