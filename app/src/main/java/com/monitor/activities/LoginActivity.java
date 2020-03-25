package com.monitor.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.provider.Settings;
import android.text.format.Formatter;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.monitor.R;
import com.monitor.http.Api_calling;
import com.monitor.util.Comman;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.Validation;
import com.monitor.widget.EditTextFontGothamBook;


public class LoginActivity extends BaseActivity {
 Button login;
 EditTextFontGothamBook email,passwaord;
 RelativeLayout item_top_view;
 MySharedPrefrence m;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        m=MySharedPrefrence.instanceOf(LoginActivity.this);
        setContentView(R.layout.activity_login2);
        login=findViewById(R.id.LoginButton);
        email=findViewById(R.id.email);
        passwaord=findViewById(R.id.password);
        item_top_view=findViewById(R.id.top_layout);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(Validation.isFilled(email)&&(Validation.isFilled(passwaord))){
                    Comman.log("INSIDE","BUTTON");
                    Api_calling.login(LoginActivity.this,item_top_view,email.getText().toString(),passwaord.getText().toString(),getIP(),uniqueId());
                }
            }
        });


    }
    public String getIP()
    {

        WifiManager wm = (WifiManager) getSystemService(WIFI_SERVICE);
        String ipAddress = Formatter.formatIpAddress(
                wm.getConnectionInfo().getIpAddress());

        return ipAddress;
    }
    public String uniqueId()
    {
       String uniqueId="";
       uniqueId = Settings.Secure.getString(LoginActivity.this.getContentResolver(),
                Settings.Secure.ANDROID_ID);
       m.setSUerSessionId(uniqueId);
       Comman.log("UniqueId",""+uniqueId);
        return uniqueId;
    }

}
