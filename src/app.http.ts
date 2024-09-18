import http from 'http';
import fs from 'fs';

const serve = http.createServer((req, res) => {
    if ( req.url === '/home' ) {
        const homeFile = fs.readFileSync('./public/home.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(homeFile );
        return;
    }
    
    if ( req.url?.endsWith('.js') ) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');

    res.end(responseContent)
});

serve.listen(8080, () => {
    console.log('Server running on port 8080')
})