const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Custom API or Webhook request event
* @param {object} data
* @returns {object} result The result of your workflow steps
*/
module.exports = async (data) => {
  data = null
  // TODO: fix params
  // Store API Responses  
  const result = {};
  
  const json2csv = require('json2csv')

  const getCSV = (data) => {
    console.log("inside")
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
    ]
    if (!data) {
      data = mockData
    }
  
    const fields = ["source", "publishedAt", "title", "author", "url", "results"]
    const opts = { fields }
    
    
    const parser = new json2csv.Parser(opts)
    const csv = parser.parse(data)
    return Buffer.from(csv, 'utf8');
  }
  
  try {
    const csv = getCSV()
    await lib.slack.channels['@0.6.4'].files.create({
      filename: `export.csv`,
      channels: [
        `nwfacts`
      ],
      content: csv // required
    });
    return { "success":true }
  } catch (e) {
    console.log(e)
    return { "success": false }
  }
};