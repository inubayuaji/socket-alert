// load librari
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// seting untuk asset express js
// jadi nanti semua css, gambar dan js dimasukkan di folder asset
// contoh ketika load js maka src="js/script.js" bukan src="asset/js/script.js"
app.use(express.static(__dirname + '/view/asset'));

// buat link ke localhost:3000/a
app.get('/a', function(req, res){
    res.sendFile(__dirname + '/view/a.html');
});

// buat link ke localhost:3000/b
app.get('/b', function(req, res){
    res.sendFile(__dirname + '/view/b.html');
});

// ketika ada client yang koneksi dengan socket.io.js
io.on('connection', function(socket){
    // tampilakan pesan di server
    console.log('Client conek ke server');

    // fungsi ini berjalan ketika tombol dihalaman a diklik
    socket.on('alertEvent', function(data){
        // mengirim perintah ke halaman b
        io.sockets.send('alert');
    });

    // fungsi ini ketika client dengan socket.io.js terputus
    socket.on('disconect', function(){
        // menampilkan pesan di server
        console.log('Client putus koneksi');
    });
});

// menjalankan server dengan url localhost:3000
http.listen(3000, function(){
    console.log('Start listening');
});