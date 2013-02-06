var fs = require("fs");

function mapLines(filename, fn, done) {
    var stream = fs.createReadStream(filename);
    stream.setEncoding("utf8");
    var buf = "";

    function handleData(data) {
        var lines = (buf + data).split("\n");
        buf = lines[lines.length - 1];
        lines = lines.slice(0, -1);
        lines.map(fn);
    }
    stream.on("data", function(data) {
        handleData(data);
    });
    stream.on("end", function() {
        fn(buf);
        done();
    });
}

count = 0;
stat = {};
mapLines("dbf2010_12.efterbroenddbmf.ttl", function(data) {
    var line = data.trim();
    var words = line.split(" ");
    stat[words.length] = (stat[words.length] || 0) + 1;
    if(words.length > 40) {
        console.log(line);
    }
    ++count;
}, function() {
    console.log(count, stat);
});
