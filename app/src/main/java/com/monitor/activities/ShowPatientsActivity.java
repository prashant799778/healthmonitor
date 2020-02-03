package com.monitor.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ProgressBar;

import com.monitor.Adapter.Patients_Adapter;
import com.monitor.Adapter.Patients_AdapterNew;
import com.monitor.R;
import com.monitor.http.Api_calling;
import com.monitor.http.Model.Patients;
import com.monitor.util.Comman;
import com.monitor.util.MySharedPrefrence;
import com.monitor.widget.Lato_Regular_Font;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ShowPatientsActivity extends AppCompatActivity {
    ProgressBar progressBar;
    LinearLayoutManager manager;
    RecyclerView recyclerView;
    LinearLayout v;
    ImageButton back;
    Patients_AdapterNew a;
    Lato_Regular_Font h;
    String hub_name="",h_name="",email="",h_id="";
    ArrayList<Patients>list;
    MySharedPrefrence mySharedPrefrence;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_patients);
        Intent i=getIntent();
        if(i!=null){
            h_name=i.getStringExtra("h_name");
            h_id=i.getStringExtra("h_id");
        }
        back=findViewById(R.id.bck);
        h=findViewById(R.id.h);
        h.setText(""+h_name);
        list=new ArrayList<>();
        MySharedPrefrence mySharedPrefrence=MySharedPrefrence.instanceOf(this);
        email=mySharedPrefrence.getDoctorEmail();
        manager=new LinearLayoutManager(this);
        recyclerView=findViewById(R.id.reclycle);
        recyclerView.setLayoutManager(manager);
        v=findViewById(R.id.v);
        a=new Patients_AdapterNew(this,list);
        recyclerView.setAdapter(a);
        progressBar=findViewById(R.id.pb);
        Api_calling.getAllPetaintsPerHospital(this,v,a,list,progressBar,setJson(h_id,email));
        Api_calling.checkUserSession(this,ShowPatientsActivity.this);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent();
//                intent.putExtra("MESSAGE",message);
                setResult(2,intent);
                finish();//finishing activity

            }
        });
    }
    public JSONObject setJson(String id,String email)
    {
        JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("HospitalId",id).put("Email",email);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Comman.log("Json form my side",jsonObject.toString());
        return jsonObject;
    }
}
