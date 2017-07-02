const readline = require('readline');
const path = require('path');
const fs = require('fs');

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
function writefile() {
    if(write){
        console.log("Creating file...");
        filetext = "---\n"+filetext+"---\n\n# "+title+"\n\nPlease write here.\n\n";
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
            url = answer.replace(" ","-").toLowerCase();

            filePath = path.join(__dirname,"posts","publish",url+".md");
            date = new Date;
            filetext = "title: "+title+"\n"+
                "author: "+author+"\n"+
                    "url: "+url+"\n"+
                "time: "+date.toDateString()+"\n"+
                "category: \n"+
                "    - \n"+
                "tags: \n"+
                "    - \n";

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








