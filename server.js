//   "HomePage", "/",""
//   "/product"=> product page
//   "/api"=>display data.json to browser
//    error 404

var http=require("http")
var fs=require("fs")
var url=require("url")
var json=fs.readFileSync("./data.json")
var template=fs.readFileSync("./product.html")+""
var homepage=fs.readFileSync("./homepage.html")+""
var card=fs.readFileSync("./card.html")+""
//template=template.replace(/Fresh Avocados/,"Green Apple")
json=JSON.parse(json)

function replace(template,product){
    template=template.replace(/#Image#/g,product["image"])
    template=template.replace(/#ProductName#/g,product["productName"])
    template=template.replace(/#Price#/g,product["price"])
    template=template.replace(/#Quantity#/g,product["quantity"])
    template=template.replace(/#Description#/g,product["description"])
    template=template.replace(/#From#/g,product["from"])
    template=template.replace(/#Nutrients#/g,product["nutrients"])
    template=template.replace(/#id#/g,product["i d"])
    //#organic#
    if(product["organic"]==false){
        template=template.replace(/#organic#/g,"not-organic")
        template=template.replace(/#Organic#/g,"")
    }else{
        template=template.replace(/#Organic#/g,"    Organic!")
    }
    
    return template;
}

var server=http.createServer(function(req,res){
    var iurl=url.parse(req.url,true)
    //console.log(iurl.pathname)
    if(req.url=="/homepage"||req.url=="/"||req.url==""){       
        var tbd=""
        for(var i=0;i<json.length;i++){
            tbd+=replace(card,json[i])
        }
        homepage=homepage.replace(/{%cards%}/g,tbd)
        res.write(homepage)

    }else if(iurl.pathname=="/product"){
        //res.write("<h1>Product Page</h1>")
       // res.write(template)
       var id=iurl.query.id
       //console.log(id)
       var productpage=replace(template,json[id])
       res.write(productpage)
    }else if(req.url=="/api"){
        res.write(json)
    }else{
        res.write("<h1>Page Not Found</h1>")
    }
})
var port=process.env.PORT || 3000
server.listen(port,function(){
    console.log("starting server at 3000")
})

