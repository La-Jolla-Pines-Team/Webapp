var nodemailer = require('nodemailer');
const { email_html } = require("../iquote/email_html");
const { get_dbinfo } = require("../database/get_dbinfo");
const nthline = require('nthline');

//variable declaration
var dayOfWeekDigit;
var maillist = '';
var email_list_query = "SELECT * FROM iquote;";
var sender_address = '"La Jolla Pines Team" <lajollapines@hotmail.com>';
var message_body = '';
const subject_line = [
    "This Sunday, take some time & prep for success",
    "Monday, it's time to get motivated",
    "What's up Tuesday, get down to business",
    "Wednesday it is, keep it going",
    "Reflect on all you have done on thursday",
    "Friday - conquer your fears",
    "Enjoy some breaks on saturday"
];

// Create the transporter with the required configuration for Outlook
var transporter = nodemailer.createTransport({

    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'lajollapines@hotmail.com',
        pass: '3Edc@vgy7'
    }

});

// setup e-mail data, even with unicode symbols
var mailOptions = {

    from: sender_address, // sender address (who sends)
    to: maillist, // list of receivers (who receives)
    subject: '',
    text: message_body,
    html: ''

};

const sendIquoteEmail = () => {
    get_dbinfo(email_list_query, async function (rows) {

        //collect all emails in db into a maillist
        rows.forEach(row => {
            maillist += row['email'] + ", ";
        });

        maillist = maillist.substring(0, maillist.lastIndexOf(","));
        mailOptions.to = maillist;

        //Set subject line according to which day of the week
        dayOfWeekDigit = new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        });
        dayOfWeekDigit = new Date(dayOfWeekDigit).getDay();
        mailOptions.subject = subject_line[dayOfWeekDigit];

        //generate email html
        quote_for_today = await pick_quote();
        image_for_today = pick_image();
        mailOptions.html = email_html(image_for_today, quote_for_today);

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }

            console.log('Message sent: ' + info.response);
        });
    });
}

/**
 * Section for helper functions
 */
async function pick_quote() {
    random_linenum = Math.floor(Math.random() * 2394);
    return await nthline(random_linenum, '/var/www/html/iquote/web_scrapping/scrapped_quotes.txt');
}

function pick_image() {
    random_imagenum = Math.floor(Math.random() * 510) + 1;
    return "https://www.lajollapines.com/iquote/web_scrapping/images/local_image" + random_imagenum + ".jpg";
}

exports.sendIquoteEmail = sendIquoteEmail;