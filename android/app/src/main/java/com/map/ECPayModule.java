package com.map;

import android.app.Activity;
import android.content.Intent;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import tw.com.ecpay.paymentgatewaykit.manager.PaymentkitManager;

public class ECPayModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext reactContext;
    private Promise paymentPromise;

    public ECPayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "ECPay";
    }

    @ReactMethod
    public void initialize(String serverType) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            PaymentkitManager.initialize(activity, serverType);
        }
    }

    @ReactMethod
    public void createPayment(String token, String languageCode, boolean useResultPage, String appStoreName, Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            this.paymentPromise = promise;
            ActivityResultLauncher<Intent> activityResultLauncher = activity.registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(), result -> {
                    if (result.getResultCode() == Activity.RESULT_OK) {
                        createPaymentResult(result.getData());
                    } else {
                        if (paymentPromise != null) {
                            paymentPromise.reject("PAYMENT_FAILED", "Payment failed or cancelled");
                            paymentPromise = null;
                        }
                    }
                }
            );
            PaymentkitManager.createPayment(activity, token, languageCode, useResultPage, appStoreName, activityResultLauncher);
        }
    }

    private void createPaymentResult(Intent data) {
        PaymentkitManager.createPaymentResult(getCurrentActivity(), data, new CallbackFunction<CreatePaymentCallbackData>() {
            @Override
            public void callback(CreatePaymentCallbackData callbackData) {
                if (paymentPromise != null) {
                    if (callbackData.getCallbackStatus() == CallbackStatus.Success && callbackData.getRtnCode() == 1) {
                        paymentPromise.resolve(callbackData);
                    } else {
                        paymentPromise.reject("PAYMENT_FAILED", callbackData.getRtnMsg());
                    }
                    paymentPromise = null;
                }
            }
        });
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        // Handle activity result if necessary
    }

    @Override
    public void onNewIntent(Intent intent) {
        // Handle new intent if necessary
    }
}
