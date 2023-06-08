
import * as queryString from 'query-string';
require("dotenv").config();

const stringifiedParams = queryString.stringify
({
  client_id: process.env.appid,
  redirect_uri: 'https://thelocalwarehouse.onrender.com/auth/facebook',
  scope: ['email', 'user_friends'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;