let fs = require('fs');
let path = require('path');
let marked = require('marked');
let yaml = require('yamljs');
var rimraf = require('rimraf');
let dt = require('node-datetime');

const metareg = new RegExp('^---\s*$([^]*)^---\s*$','m');

let mdpath = path.join(__dirname,"posts","publish");
let distpath = path.join(__dirname,"data");

let filelist = [];
let metalist = [];


/*
* catelist
* [ {
*     name: "catename",
*     posts:[{
*         url: "posturl",
*         time : "",
*         xxx
*     }]
* } ]
* */
let catelist = [];
/*
 * taglist
 * [ {
 *     name: "tagname",
 *     posts:[{
 *         url: "posturl",
 *         time : ""
 *     }]
 * } ]
 * */
let taglist = [];
let postlist = [];

function getMeta(mdString) {
    try{
        let meta = metareg.exec(mdString)[1];
        return yaml.parse(meta);
    }
    catch (err){
        return null;
    }
}

function addMeta(meta){
    let i=0;
    let meta_timestamp = new Date(Date.parse(meta['time'])).getTime();
    for(i=0;i<metalist.length;i++){
        let currentTime = new Date(Date.parse(metalist[i]['time'])).getTime();
        if(currentTime<meta_timestamp){
            break;
        }
    }
    if(i == metalist.length) i++;
    meta['time']=dt.create(meta['time']).format('Y-m-d H:M:S');
    metalist.splice(i,0,meta);
}

function addCate(cate,meta) {
    let posturl = meta['url'];
    let posttime = meta['time'];
    let meta_timestamp = new Date(Date.parse(meta['time'])).getTime();
    let found = false;
    for(let i=0;i<catelist.length;i++){
        if(cate==catelist[i]["name"]){
            found = true;
            let insertloc = -1;
            let postinserted = false;
            let j =0;
            for(j=0;j<catelist[i]["posts"].length;j++){
                let currentTime = new Date(Date.parse(catelist[i]["posts"][j]['time'])).getTime();
                if(meta['url']==catelist[i]["posts"][j]['url']){
                    postinserted = true;
                    break;
                }
                if(currentTime<meta_timestamp){
                    insertloc = j;
                }
            }
            if(!postinserted){
                if(insertloc==-1) insertloc=catelist[i]["posts"].length;
                catelist[i]["posts"].splice(insertloc,0,meta);
            }
        }
    }
    if(!found){
        catelist.push({"name":cate,"posts":[{"url":posturl,"time":posttime}]});
    }
}

function addTag(tag) {
    if(!taglist.has(tag)){
        taglist.push(tag);
    }
}

function saveMD2HTML (filePath,mdString) {
    fs.writeFile(filePath, marked(mdString),{encoding:"utf8"},(err)=>{
        if(err) throw err;
        console.log("File "+filePath+" saved.");
    });
}

function saveMETA (filePath,meta) {
    fs.writeFile(filePath, JSON.stringify(meta),{encoding:"utf8"},(err)=>{
        if(err) throw err;
        console.log("File "+filePath+" saved.");
    });
}

function savelist() {
    fs.writeFile(path.join(distpath,'list','catelist'),
        JSON.stringify(catelist),
        {encoding: 'utf8'},
        (err) => {
            if(err) throw err;
            console.log('Category list created.')
        });
    fs.writeFile(path.join(distpath,'list','postlist'),
        JSON.stringify(metalist),
        {encoding: 'utf8'},
        (err) => {
            if(err) throw err;
            console.log('Post list created.')
        });
}

// Clear data folder
rimraf(path.join(distpath,'posts'),(err)=>{
   if(err) throw err;
   console.log("Dir posts cleaned.")
    fs.mkdir(path.join(distpath,'posts'), (err)=>{
        if(err) throw err;
        console.log("Dir posts created.")
        ReadFileList();
    });
});


function ReadFileList() {
    fs.readdir(mdpath, (err, files) => {
        files.forEach(file => {
            filelist.push(file);
        });
        Generate();
    });
}

function Generate() {
    filelist.forEach(file => {
            let markfile = fs.readFileSync(path.join(mdpath,file),
                {flag: 'r+', encoding:'utf8'}
            );
            markfile=markfile.toString();
            let meta = getMeta(markfile);
            if(meta){
                meta['url']=path.basename(file,path.extname(file));
                addMeta(meta);
                meta['category'].forEach(catename => {
                    addCate(catename, meta);
                });
                let marktext = markfile.replace(metareg,"");
                saveMD2HTML(path.join(distpath,"posts",meta['url']),marktext);
                saveMETA(path.join(distpath,"posts",meta['url']+".meta"),meta);
            }

    });
    console.log(catelist);
    savelist();
}





