let fs = require('fs');
let path = require('path');
let marked = require('marked');
let yaml = require('yamljs');
var rimraf = require('rimraf');
let dt = require('node-datetime');
const fse = require('fs-extra');

const metareg = new RegExp('^---\s*$([^]*)^---\s*$','m');

let mdpath = path.join(__dirname,"posts","publish");
let distpath = path.join(__dirname,"data");

let filelist = [];
let metalist = [];

let mode = 'prod';

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
    let last = true;
    for(i=0;i<metalist.length;i++){
        let currentTime = new Date(Date.parse(metalist[i]['time'])).getTime();
        if(currentTime<meta_timestamp){
            last = false;
            break;
        }
    }
    if(last) i=metalist.length;
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
                if(currentTime<meta_timestamp&&insertloc==-1){
                    insertloc = j;
                }
            }
            if(!postinserted){
                if(insertloc==-1) insertloc=catelist[i]["posts"].length;
                console.log('cate '+meta['url']+' insert at'+insertloc);
                catelist[i]["posts"].splice(insertloc,0,meta);
            }
        }
    }
    if(!found){
        catelist.push({"name":cate,"posts":[meta]});
    }
}

function addTag(tag,meta) {
    let posturl = meta['url'];
    let posttime = meta['time'];
    let meta_timestamp = new Date(Date.parse(meta['time'])).getTime();
    let found = false;
    for(let i=0;i<taglist.length;i++){
        if(tag==taglist[i]["name"]){
            found = true;
            let insertloc = -1;
            let postinserted = false;
            let j =0;
            for(j=0;j<taglist[i]["posts"].length;j++){
                let currentTime = new Date(Date.parse(taglist[i]["posts"][j]['time'])).getTime();
                if(meta['url']==taglist[i]["posts"][j]['url']){
                    postinserted = true;
                    break;
                }
                if(currentTime<meta_timestamp&&insertloc==-1){
                    insertloc = j;
                }
            }
            if(!postinserted){
                if(insertloc==-1) insertloc=taglist[i]["posts"].length;
                taglist[i]["posts"].splice(insertloc,0,meta);
            }
        }
    }
    if(!found){
        taglist.push({"name":tag,"posts":[meta]});
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
    /*
     * Category
     */
    /* Category item list */
    let cate_item_list = []
    catelist.forEach((cate,index) => {
        cate_item_list.push({"name":cate["name"],"id":(index+1).toString()});
        let tosave = []; tosave.push({"name":cate["name"],"id":(index+1).toString()});
        tosave.push(catelist[index]['posts']);
        fs.writeFile(path.join(distpath,'list','category',(index+1).toString()),
            JSON.stringify(tosave),
            {encoding: 'utf8'},
            (err) => {
                if(err) throw err;
                console.log('Category post list created.')
            });
        fs.writeFile(path.join(distpath,'list','category',cate["name"]),
            JSON.stringify(tosave),
            {encoding: 'utf8'},
            (err) => {
                if(err) throw err;
                console.log('Category list created.')
            });
    });

    fs.writeFile(path.join(distpath,'list','catelist'),
        JSON.stringify(cate_item_list),
        {encoding: 'utf8'},
        (err) => {
            if(err) throw err;
            console.log('Category list created.')
        });

    /*
     * Tag
     */
    /* Tag item list */
    let tag_item_list = [];
    taglist.forEach((tag,index) => {
        tag_item_list.push({"name":tag["name"],"id":(index+1).toString()});
        let tosave = []; tosave.push({"name":tag["name"],"id":(index+1).toString()});
        tosave.push(taglist[index]['posts']);
        fs.writeFile(path.join(distpath,'list','tag',(index+1).toString()),
            JSON.stringify(tosave),
            {encoding: 'utf8'},
            (err) => {
                if(err) throw err;
                console.log('Tag list created.')
            });
        fs.writeFile(path.join(distpath,'list','tag',tag["name"]),
            JSON.stringify(tosave),
            {encoding: 'utf8'},
            (err) => {
                if(err) throw err;
                console.log('Tag list created.')
            });
    });

    fs.writeFile(path.join(distpath,'list','taglist'),
        JSON.stringify(tag_item_list),
        {encoding: 'utf8'},
        (err) => {
            if(err) throw err;
            console.log('Tag item list created.')
        });

    fs.writeFile(path.join(distpath,'list','postlist'),
        JSON.stringify(metalist),
        {encoding: 'utf8'},
        (err) => {
            if(err) throw err;
            console.log('Post list created.')
        });
}

// prepare dest folder
function prepareDir(){
    if(mode=='prod'){
        fse.ensureDirSync(path.join(__dirname,"public"));
        // fse.emptyDirSync(path.join(__dirname,"public"));
        fse.removeSync(path.join(__dirname,"public","index.html"));
        fse.removeSync(path.join(__dirname,"public","404.html"));
        fse.removeSync(path.join(__dirname,"public","dist"));
        fse.removeSync(path.join(__dirname,"public","static"));
        fse.removeSync(path.join(__dirname,"public","data"));

        distpath = path.join(__dirname,"public","data");
        fse.ensureDirSync(distpath);
        fse.copySync(path.join(__dirname,"index.html"),path.join(__dirname,"public","index.html"));
        fse.copySync(path.join(__dirname,"index.html"),path.join(__dirname,"public","404.html"));
        fse.copySync(path.join(__dirname,"dist"),path.join(__dirname,"public","dist"));
        fse.copySync(path.join(__dirname,"static"),path.join(__dirname,"public","static"));
    }
    fse.ensureDirSync(distpath);
    fse.ensureDirSync(path.join(distpath,"posts"));
    fse.ensureDirSync(path.join(distpath,"list","category"));
    fse.ensureDirSync(path.join(distpath,"list","tag"));

    console.log("Static files prepared.");
    ReadFileList();
}

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
                meta['tags'].forEach(tagname => {
                    addTag(tagname, meta);
                });
                let marktext = markfile.replace(metareg,"");
                saveMD2HTML(path.join(distpath,"posts",meta['url']),marktext);
                saveMETA(path.join(distpath,"posts",meta['url']+".meta"),meta);
            }

    });
    savelist();
}


/*
* Entrance
* */

prepareDir();




