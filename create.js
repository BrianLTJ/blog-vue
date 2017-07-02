const readline = require('readline');
const path = require('path');
const fs = require('fs');
const datetime = require('node-datetime');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let title = "";
let author = "";
let url = "";
let write = false;
let filePath = "";
let filetext = "";

let default_cate = "";
let default_tag = "";
let timezone_offset = "";

try{
    let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    default_cate = config['default_category'];
    default_tag = config["default_tag"];
    timezone_offset = config["timezone_offset"];
}
catch (exception) {

}
function writefile() {
    if(write){
        console.log("Creating file...");
        filetext = "---\n"+filetext+"---\n\nPlease write here.\n\n";
        fs.writeFile(filePath,filetext,(err) => {
            if(err) throw err;
            console.log("Created: "+filePath);
        })
    }else{
        console.log("\nQuit without changing anything.");
    }
}

rl.question('Title: ', (answer) => {
    title = answer;

    rl.question('Author: ', (answer) => {
        author = answer;

        rl.question('Url: ', (answer) => {
            let spacereg = new RegExp(" ",'g');
            url = answer.replace(spacereg,"-").toLowerCase();

            filePath = path.join(__dirname,"posts","publish",url+".md");
            let nowtime = datetime.create()
            filetext = "title: "+title+"\n"+
                "author: "+author+"\n"+
                    "url: "+url+"\n"+
                "time: "+nowtime.format('Y-m-d H:M:S ')+timezone_offset+"\n"+
                "category: \n"+
                "    - "+default_cate+"\n"+
                "tags: \n"+
                "    - "+default_tag+"\n";

            console.log("\n\n"+filetext+"\n\n");

            rl.question('Is this correct?(Y)/N ', (answer)=>{
                if(answer=="Y"||answer=="y"||answer==""){
                    // Whether file exists
                    if(fs.existsSync(filePath)){

                        rl.question('\n\nFile '+url+".md already exists. Do you want to override it? Y/(N)", (answer) => {
                            if(answer=="Y"||answer=="y"){
                                write = true;
                            }else{
                                write = false;
                            }
                            if(write){
                                writefile();
                            }
                            rl.close();
                        });
                    }else{
                        write = true;
                        if(write){
                            writefile();
                        }
                        rl.close();
                    }
                }else{
                    write = false;
                    rl.close();
                }

            });
        });
    });
});








