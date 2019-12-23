package com.monitor;

import android.app.Application;
import android.content.Context;
import android.content.res.Configuration;

import androidx.annotation.NonNull;

import com.monitor.activities.UserDisplayActivity;
import com.monitor.util.Comman;
import com.monitor.util.Constant;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class IcuApplication extends Application {

    public static Context context;
    public int myInt = 0;
    /** The Constant TAG. */
    private static final String TAG = IcuApplication.class.getSimpleName();

    /** The _is app in background. */
    private boolean _isAppInBackground = false;

    /** The instance. */
    private static IcuApplication _instance = null;
    public MqttAndroidClient client;
    @Override
    public void onCreate() {
        _instance = this;
        context = getApplicationContext();
        super.onCreate();
//        connecttoMqtt();
    }

    /**
     * Gets the app instance.
     *
     * @return the app instance
     */
    public static IcuApplication getAppInstance() {
        return _instance;
    }


    /**
     * Checks if is app in background.
     *
     * @return true, if is app in background
     */
    public boolean isAppInBackground() {
        return _isAppInBackground;
    }
    public MqttAndroidClient getClient()
    {
        return client;
    }
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
    }

    public void connecttoMqtt()
    {
        String clientId = MqttClient.generateClientId();
        client = new MqttAndroidClient(this, Constant.SERVER_URL,
                        clientId);
        Comman.log("Mqtt Client Id",":"+clientId);

        if (!client.isConnected())
            try {
                IMqttToken token = client.connect();
                token.setActionCallback(new IMqttActionListener() {
                    @Override
                    public void onSuccess(IMqttToken asyncActionToken) {
                        Comman.log("Connection Established","SuccessFully");
                    }
                    @Override
                    public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                        Comman.log("Connection Established","Not");
                        Comman.log("Connection Error",":"+exception);
                    }
                });
            } catch (MqttException e) {
                e.printStackTrace();
                Comman.log("Connection Error",":"+e);
            }
    }
}
