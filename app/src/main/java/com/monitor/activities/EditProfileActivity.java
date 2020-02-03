package com.monitor.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.monitor.R;
import com.monitor.http.Api_calling;
import com.monitor.util.Comman;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.Validation;
import com.monitor.widget.EditTextFontGothamBook;
import com.monitor.widget.Lato_Regular;

import org.json.JSONException;
import org.json.JSONObject;

public class EditProfileActivity extends AppCompatActivity {
    ImageView back;
    Lato_Regular save;
    MySharedPrefrence m;
    EditTextFontGothamBook number;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        back=findViewById(R.id.bck);
        save=findViewById(R.id.save);
        number=findViewById(R.id.licence);
        m=MySharedPrefrence.instanceOf(EditProfileActivity.this);
        number.setText(m.getDoctorLicenceNo());
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(Validation.isFilled(number))
                {
                    Api_calling.updateDeoctorProfile(EditProfileActivity.this,EditProfileActivity.this,mSetJson());
                }
            }
        });
    }
    private JSONObject mSetJson()
    {
        JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("Email",""+m.getDoctorEmail()).put("licenseNo",""+number.getText().toString());
            Comman.log("Update_Json_Response",""+jsonObject);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return  jsonObject;
    }
}
