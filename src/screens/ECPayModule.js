import CryptoJS from 'crypto-js';

let ecpayConfig = {};

export const initializeECPay = (environment) => {
  if (environment === 'Stage') {
    ecpayConfig = {
      MerchantID: '2000132',
      HashKey: '5294y06JbISpM5x9',
      HashIV: 'v77hoKGq4kWxNNIS',
      URL: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
    };
  }else {
    throw new Error('Invalid ECPay environment');
  }
};


export const createPayment = async (token, locale, isTestMode, storeName) => {
  const ecpayParams = {
    MerchantID: ecpayConfig.MerchantID,
    MerchantTradeNo: `EC${new Date().getTime()}`,
    MerchantTradeDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), // yyyy/MM/dd HH:mm:ss
    PaymentType: 'aio',
    TotalAmount: '1000',
    TradeDesc: 'Test Order',
    ItemName: 'Test Product',
    ReturnURL: 'https://your-return-url.com',
    ChoosePayment: 'ALL',
    EncryptType: 1,
  };

  const rawData = Object.entries(ecpayParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const hash = CryptoJS.MD5(`HashKey=${ecpayConfig.HashKey}&${rawData}&HashIV=${ecpayConfig.HashIV}`).toString().toUpperCase();

  return {
    ...ecpayParams,
    CheckMacValue: hash,
  };
};