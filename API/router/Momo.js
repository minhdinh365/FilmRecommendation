import express from "express";
import dotenv from "dotenv"
import https from "https"
import crypto from "crypto";
import queryString from "query-string"
import { Information } from "../models/Information.js"

dotenv.config();

const router = express.Router();

function dateWithMonthsDelay(package_upgrade) {
  const date = new Date()
  if (package_upgrade == 1)
    date.setDate(date.getDate() + 7)
  else if (package_upgrade == 2)
    date.setMonth(date.getMonth() + 1)
  else
    date.setFullYear(date.getFullYear() + 1)

  return date
}

const confirmPayment = async (req, res) => {
  try {
    console.log(req.body);
    const query = req.query;

    const signature = req.query.signature
    console.log(query.accessKey)
    console.log(query)
    delete query.signature
    console.log(query)
    query.accessKey = process.env.MOMO_ACCESS_KEY
    var secretkey = process.env.MOMO_SECRET_KEY;
    var rawSignature = queryString.stringify(query)

    var signatureSystem = crypto.createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');

    if (signatureSystem === signature) {
      const updatePackage = {
        is_upgrade: true,
        package_up: req.body.package_up,
        date_start: new Date(),
        date_end: dateWithMonthsDelay(req.body.package_up),
      };

      const filter = { username: req.body.username, }
      await Information.findOne(filter).then(async (data) => {
        if (data) {
          await Information.findOneAndUpdate(filter, updatePackage, { new: true }).then(() => {
            return res.status(200).json({
              success: true,
              mgs: "Nâng cấp gói thành công",
            });
          })
        }
        else {
          return res.status(200).json({
            success: false,
            mgs: "Thất bại",
          });
        }
      });
    }
  }
  catch (err) {
    res.status(400)
  }
}

const createPaymentURL = async (req, res) => {

  var partnerCode = process.env.MOMO_PARTNER_CODE;
  var accessKey = process.env.MOMO_ACCESS_KEY;
  var secretkey = process.env.MOMO_SECRET_KEY;
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "Upgrade";
  var redirectUrl = "https://chom-phim.netlify.app/#/upgrade_user";
  var ipnUrl = "https://callback.url/notify";
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";

  var packageUpgrade = req.body.package_up;
  var amount = "0";
  if (packageUpgrade == 1) {
    amount = "39000"
  }
  else if (packageUpgrade == 2) {
    amount = "399000"
  }
  else if (packageUpgrade == 3) {
    amount = "790000"
  }
  var requestType = "captureWallet"
  var extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
  //puts raw signature
  //signature
  var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');


  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'en'
  });
  //Create the HTTPS objects
  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  }
  //Send the request and get the response
  const request = https.request(options, response => {
    console.log(`Status: ${response.statusCode}`);
    console.log(`Headers: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    response.on('data', (body) => {
      console.log('Body: ');
      console.log(body);
      console.log('payUrl: ');
      res.json(JSON.parse(body).payUrl);
    });
    response.on('end', () => {
      console.log('No more data in response.');
    });
  })

  request.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....")
  request.write(requestBody);
  request.end();
}

router.route("/momo/payment").post(createPaymentURL);

router.route("/momo/confirm").post(confirmPayment);

export default router;

