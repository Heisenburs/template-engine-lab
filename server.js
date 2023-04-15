const express = require('express')
const fs = require('fs')

// create express app instance
const app = express();

//TODO: define our template engine
app.engine('madeline', (filePath, options, callback) => {
    // reading the template file
    fs.readFile(filePath, (err, content) => {
    // if there is an error: return, and pass the error to the callback of the engine
        if (err) return callback(err);
        // if no error, parse the template file
        const rendered = content.toString()
        .replace('#title#', '<title>' + options.title + '</title>')
        .replace('#message#', '<h1>' + options.message + '</h1>')
            .replace('#content#', '<div>' + options.content + '</div>')
        // return the parsed data
        return callback (null, rendered )
    })
})

// ============= Configuration =============
// setting the views folder in our app
app.set('views', './views')
// tells our app to use the 'madeline' engine we defined
app.set('view engine', 'madeline')

//TODO: tell our express app to use our new template engine
//TODO: create routes
// 'req' - the request that the browser is making (ex: console.log(req.url) => / )
app.get('/', (req,res) => {
    // res.send("<h1>Hello World!</h1>")
    res.render('template', {title: 'Template Engine', message: 'My first template engine.', content: 'Created by Heisenburs'})
})
app.get('/about-me', (req,res) => {
    
    //using a different ' .madeline ' engine in the same folder that could contain a different layout
    res.render('about-me', {title: 'About Me', message: 'Im a software engineer learning both front-end & back-end', content: 'Created by Jig'})
})
app.get('/other', (req,res) => {
   
    res.render('template', {title: 'Other', message: 'If I work on my craft and discipline I will be very successful', content: 'Created by Jada Burs'})
})




const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})