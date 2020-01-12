/**
* @param {object} data
* @returns {object} body The generated message
*/
module.exports = async (data) => {
    data = null //fixme
    const nodemailer = require('nodemailer');
    const json2csv = require('json2csv');
    
    // Email Settings
    const toEmail = 'febg3@yahoo.com';
    const smtpService = 'Yahoo';
    const appPassword = 'dtyfwcdhifxjhnmq';
    
    const getCSV = (data) => {
      const mockData = [
        {
          "header":"something",
          "publishedAt":"time",
          "source":"some source",
          "title": "some title",
          "author": "some author",
          "url": "some url",
          "results": "some results"
        },
        {
          "header":"something 2",
          "publishedAt":"time 2",
          "source":"some source 2",
          "title": "some title 2",
          "author": "some author 2",
          "url": "some url 2",
          "results": "some results 2"
        }
      ];
      
      if (!data) { data = mockData }
    
      const fields = ["source", "publishedAt", "title", "author", "url", "results"]
      const opts = { fields }
      
      const parser = new json2csv.Parser(opts)
      const csv = parser.parse(data)
      return Buffer.from(csv, 'utf8');
    }
  
    // convert callback code to promises
    const asyncWrapper = (data) => {
      return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
          service: smtpService,
          auth: {
            user: toEmail,
            pass: appPassword
          }
        });
        const csv = getCSV(data);
        const mailOptions = {
          from: 'febg3@yahoo.com', // sender address
          to: 'felipeballesteros1@gmail.com', // TODO
          subject: 'I love money', // Subject line
          html: '<p>Something</p>',// plain text body
          attachments: [
            {
              "filename": 'export.csv',
              "content" :csv,
            }
          ]
        };
            
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info)
              return resolve(info)
        });
      })
    }
    
    // run!!
    try {
      await asyncWrapper(data);   
      return { "success":true }
    } catch (e) {
      console.log(e)
      return { "success":false }
    }
  };
