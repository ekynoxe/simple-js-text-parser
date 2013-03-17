/*
    Converts a string of formatted text to HTML markup

    Supported markup:

    [b] - bold
    [i] - italics
    [u] - underline
    [nl/] - line break
    [[ - escape for '[' character
    [/] - close tag
    [h url] - hyperlink
 */

function go () {
    var node = document.getElementById('result'),
        text = document.getElementById('source').value,
        out = '';

    foreach(extractLines(text), function() {
        var parsed = parseText(this,'')
        out += parsed.out;
    });

    node.innerHTML = '<span>' + out + '</span>';
}

function extractLines (text) {
    var tempLines = [],
        lines = [];

    tempLines = text.split('\r');

    foreach(tempLines, function() {
        var temp = [];
        temp = this.split('\n');
        lines = lines.concat(temp);
    });

    return lines;
}

function parseText (src, out) {
    var o = '',
        l,
        tag,
        c;

    while (src.length) {
        l = src.length;
        c = src[0];

        //while we don't hit a square bracket, keep adding to the string
        if ("[" != c) {
            o += c;
            src = src.substring(1);

        // If we've got an escaped square bracket
        } else if ("[" == c && 1 <= l && "[" == src[1]) {
            o += c;
            src = src.substring(2);

        // If we've reached a closing tag
        } else if ("[" == c && 1 <= l && "/" == src[1]) {
            // Forwarding to the end of the closing tag
            //  disregarding the characters in it for now
            while (src.length && "]" != src[0]) {
                src = src.substring(1);
            }
            src = src.substring(1);
            break;

        // Otherwise we're opening a tag
        } else {
            tag = '';
            param = '';

            // getting rid of opening square bracket
            src = src.substring(1);

            while (src.length && "]" != src[0] && " " != src[0]) {
                tag += src[0];
                src = src.substring(1);
            }

            // we've got a parameter
            if (" " == src[0]) {
                while (src.length && "]" != src[0]) {
                    param += src[0];
                    src = src.substring(1);
                }
            }

            // getting rid of closing square bracket
            src = src.substring(1);
            
            res = parseText(src);
            src = res.reminder;
            o += createHTMLTag(tag, param, res.out);
        }
    }

    return {'reminder': src, 'out': o};
}

function foreach(obj, callback) {
    var value,
        i = 0,
        length = obj.length;
    
    for ( ; i < length; i++ ) {
        value = callback.apply( obj[i]);

        if ( value === false ) {
            break;
        }
    }
}

function createHTMLTag(tag, param, text) {
    switch(tag) {
        case 'b':
            res = '<b>' + text + '</b>';
            break;
        case 'i':
            res = '<i>' + text + '</i>';
            break;
        case 'u':
            res = '<u>' + text + '</u>';
            break;
        case 'h':
            res = '<a href="' + param + '">' + text + '</a>';
            break;
        case 'nl/':
            res = '<br/>' + text;
            break;
        default:
            res = '[' + tag + ']' + text + '[/' + tag + ']';
    }

    return res;
} 