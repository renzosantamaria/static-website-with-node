const ejs = require('ejs')
const path = require(('path'))
const fs = require('fs')

const albums = JSON.parse(fs.readFileSync('./assets/albums.json', {encoding: 'utf8'})).albums
let pages = []  
let pageObject = {}
let content = []

const outputDir = 'dist'
const templatePath = path.join('views', 'layout.ejs')

for (let i = 0; i < albums.length; i++) {
    content.push(albums[i])

    if (i % 20 == 0 && i != 0 || i == albums.length-1) {
        pageObject['fileName'] = `${i-19}-${i}.html`
        pageObject['template'] = `${i-19}-${i}.ejs`
        pageObject['albums'] = content
        pages.push(pageObject)
        content = []
        pageObject = {}
    }       
}

for (const page of pages) {
    const data = {page, pageName: page.fileName ,pages}
    ejs.renderFile(templatePath, data, function(err, str){
        if (err) {
            console.log(err);
        }else{
            const outputPath = path.join(outputDir, page.fileName)
            fs.writeFileSync(outputPath, str)
            console.log('Done with ' + page.fileName)
        }
    })
}