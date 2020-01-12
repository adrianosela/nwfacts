const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Custom API or Webhook request event
* @param {array} keywords
* @returns {object} result The result of your workflow steps
*/
module.exports = async (keywords) => {

  // Store API Responses
  const result = {};
  const query = keywords.join(' ');
  const Twitter = require('twitter');
  const googleCloudLogging = require('@google-cloud/logging');
  
  const logging = new googleCloudLogging.Logging({'projectId':'nwfacts'})
  const log = logging.log('stdlib-log')
  
  const metadata = {
    resource: {
      type: 'global'
    }
  }
  
  const search = function(client) {
      return new Promise((resolve, reject) => {
          client.get('search/tweets', {q:query, count:10}, async function(error, tweets, res) {
              if (error) {
                const entry = log.entry(metadata, error)
                await log.write(entry)
                return reject(error)
              }
              return resolve(tweets)
            })
      })
  }
  
  const client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_KEY,
      access_token_secret: process.env.ACCESS_SECRET
  })

  try {
    let res = await search(client);
    result['tweets'] = res['statuses'];
    result['success'] = true;
    return result;

  } catch (e) {
    return { "success": false };
  }
};