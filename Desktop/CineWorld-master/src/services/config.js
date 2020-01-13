//jshint esversion:6
((configRepo)=>{

    configRepo.SetConfig = (paypal)=>{

        var config = {
            host: "api.sandbox.paypal.com",
            port: "",
            client_id:"AcriMC4sfpa8lp6hu9-hVzGfslrywuCwDYQi-inJeDoK_E51YtOOpRHx0CX9HNrpu_OcKSrQVYplbEuA",
            client_secret: "EPA_Gmn7E3XCe-V7_z1Qs29EdqZDahZ9rb7AaMyQalFBP9RIbvs5KY4IKITNIzfOqMTAy5kIp7cAVD5G"
        };

        paypal.configure(config);
    };


})
(
    module.exports
);

