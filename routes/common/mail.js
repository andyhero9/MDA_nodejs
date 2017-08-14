var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./mailconfig')

// 开启一个 SMTP 连接池
var transport = nodemailer.createTransport(smtpTransport({
    host: config.email.host, // 主机
    secure: true, // 使用 SSL
    secureConnection: true, // 使用 SSL
    port: config.email.port, // SMTP 端口
    auth: {
        user: config.email.user, // 账号
        pass: config.email.pass // 密码
    }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */


var sendMail = function (recipient, subject, html) {

    var mailOptions = {
        from: config.email.user, // 发件地址
        to: recipient, // 收件列表
        subject: subject, // 标题
        //text:"hello",
        html: html // html 内容
    };

    transport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.error(error);
        } else {
            console.log(response);
        }
        transport.close(); //关闭连接池
    });
};
module.exports = sendMail;