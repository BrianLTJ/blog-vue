let fs = require('fs');
let path = require('path');
let marked = require('marked');
let yaml = require('yamljs');
var rimraf = require('rimraf');

const metareg = new RegExp('^---\s*$([^]*)^---\s*$','m');

let mdpath = path.join(__dirname,"posts","publish");
let distpath = path.join(__dirname,"data");

let filelist = [];
let metalist = [];
let catelist = [];
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

function addPostlist(post) {
    postlist.push(post)
}

function saveMD2HTML (filePath,mdString) {
    fs.writeFile(filePath, marked(mdString),{encoding:"utf8"},(err)=>{
        if(err) throw err;
        console.log("File "+filePath+" saved.");
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
                metalist.push(meta);
                let marktext = markfile.replace(metareg,"");
                saveMD2HTML(path.join(distpath,"posts",meta['url']),marktext);
            }

    })
}





