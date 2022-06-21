function email_html(image_src, text) {

    var html =

    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IQuote</title>
    </head>
    
    <body>
    
        <table align="center" table-layout="fixed" width="728px" height="484px">
            <tr>
                <td align="center"
                    style="font-family:Comic Sans MS, Comic Sans, cursive; font-size:200%; color:rgb(255, 255, 255); font-weight: 400; padding:10px;"
                    background=${image_src}>
                    ${text}
                </td>
            </tr>
        </table>
    
    </body>
    
    </html>`

    return html;

}

exports.email_html = email_html;
