package com.monitor.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.NumberPicker;

import com.monitor.R;
import com.monitor.http.Api_calling;
import com.monitor.util.Comman;
import com.monitor.util.MySharedPrefrence;
import com.monitor.widget.GothamBookFontForLable;
import com.monitor.widget.Gotham_Bold_Font;
import com.monitor.widget.Lato_Regular;
import com.monitor.widget.Lato_Regular_Font;

import org.json.JSONException;
import org.json.JSONObject;

public class AlarmActivity extends AppCompatActivity {
    Lato_Regular_Font ecg_limit,spo2_limit,pluse_limit,hbp,lbp,tmp;
    Lato_Regular_Font on2,on3,on4,on5,on6;
    LinearLayout on;
    int h=0,l=0;
    Button disabl;
    Gotham_Bold_Font v1,v2,v3;
    Button disableAlarm;
    MySharedPrefrence m;
    Button m1,m2,m3,p1,p2,p3;
    int cout1=0,count2=0,count3=0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_alarm);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        m=MySharedPrefrence.instanceOf(AlarmActivity.this);
        disableAlarm=findViewById(R.id.disableAlarm);
        on=findViewById(R.id.on1);
        on2=findViewById(R.id.on2);
        on3=findViewById(R.id.on3);
        on4=findViewById(R.id.on4);
        on5=findViewById(R.id.on5);
        on6=findViewById(R.id.on6);
        v1=findViewById(R.id.t1);
        v2=findViewById(R.id.t2);
        v3=findViewById(R.id.t3);
        m1=findViewById(R.id.m1);
        m2=findViewById(R.id.m2);
        m3=findViewById(R.id.m3);
        p1=findViewById(R.id.p1);
        p2=findViewById(R.id.p2);
        p3=findViewById(R.id.p3);
        disabl=findViewById(R.id.disable);
        ecg_limit=findViewById(R.id.ecg_limit);
        spo2_limit=findViewById(R.id.spo2_limit);
        pluse_limit=findViewById(R.id.pluse_limit);
        hbp=findViewById(R.id.high_bp);
        lbp=findViewById(R.id.low_bp);
        tmp=findViewById(R.id.temp_limit);
        v1.setText(m.getAlarmValue());
        v2.setText(m.getPulseValue());
        v3.setText(m.getBrightValue());
        ecg_limit.setText("Heart Rate Limits              Upper:"+m.getHighHeartLimit()+"   Lower:"+m.getLowHeartLimit());
        spo2_limit.setText("Spo2 Limits              Upper:"+m.getHighSpo2()+"   Lower:"+m.getLowSpo2());
        pluse_limit.setText("Pulse Rate Limits              Upper:"+m.getHighPulseRate()+"   Lower:"+m.getLowPulseRate());
        hbp.setText("High Pressure Limits              Upper:"+m.getHighPressureUpper()+"   Lower:"+m.getHighPressureLower());
        lbp.setText("Low Pressure Limits              Upper:"+m.getLowPressureUpper()+"   Lower:"+m.getLowPressureLower());
        tmp.setText("Temperature Limits              Upper:"+m.getTempUpper()+"   Lower:"+m.getTempLower());
        if(m.isAlarmOn()){
            disableAlarm.setText("Disable Alarms");}else { disableAlarm.setText("Enable Alarms"); }
        disableAlarm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(m.isAlarmOn())
                {
                m.setAlarm(false);
                    disableAlarm.setText("Enable Alarms");
                    Comman.log("ALARM","Enable Alarms");
                }else {
                    m.setAlarm(true);
                    Comman.log("ALARM","Disable Alarms");
                    disableAlarm.setText("Disable Alarms");
                }
            }
        });

        Comman.log("CountValue",""+cout1);
        p1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                v.invalidate();
                if(cout1!=10){
                cout1++;
                v1.setText(""+cout1);
                m.setAlarmValue(String.valueOf(cout1));}
            }
        });
        p2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(cout1!=10) {
                    count2++;
                    v2.setText("" + count2);
                }
            }
        });
        p3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(cout1!=10) {
                    count3++;
                    v3.setText("" + count3);
                }
            }
        });

        m1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(cout1!=0) {
                    cout1--;
                    v1.setText("" + cout1);
                }
            }
        });
        m2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(cout1!=0) {
                    count2--;
                    v2.setText("" + count2);
                }
            }
        });
        m3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(cout1!=0) {
                    count3--;
                    v3.setText("" + count3);
                }
            }
        });





        disabl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
        on.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setLable("Heart Rate Limits","Upper","Lower",300,300,ecg_limit,"E",Integer.parseInt(m.getHighHeartLimit()),Integer.parseInt(m.getLowHeartLimit()));
            }
        });
        on2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setLable("Spo2 Limits","Upper","Lower",100,100,spo2_limit,"S",Integer.parseInt(m.getHighSpo2()),Integer.parseInt(m.getLowSpo2()));
            }
        });
        on3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                setLable("Pulse Rate Limits","Upper","Lower",300,300,pluse_limit,"P",Integer.parseInt(m.getHighPulseRate()),Integer.parseInt(m.getLowPulseRate()));
            }
        });
        on4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setLable("High Pressure Limits","Upper","Lower",250,250,hbp,"H",Integer.parseInt(m.getHighPressureUpper()),Integer.parseInt(m.getHighPressureLower()));
            }
        });
        on5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setLable("Low Pressure Limits","Upper","Lower",180,180,lbp,"L",Integer.parseInt(m.getLowPressureUpper()),Integer.parseInt(m.getLowPressureLower()));
            }
        });
        on6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setLable("Temperature Limits","Upper","Lower",45,45,tmp,"T",Integer.parseInt(m.getTempUpper()),Integer.parseInt(m.getTempLower()));
            }
        });


    }
    public void setLable(final String titl, String t1, String t2, int max, int low, final Lato_Regular_Font label, final String check, final int npi1, final int npi2)
    {
        LayoutInflater layoutInflater=LayoutInflater.from(AlarmActivity.this);
        View view=layoutInflater.inflate(R.layout.custom_dialog,null);
        final Lato_Regular_Font title;
        GothamBookFontForLable upper,lower;
        final NumberPicker np1=view.findViewById(R.id.number1);
        NumberPicker np2=view.findViewById(R.id.number2);
        final Button ok,defaoult;
        title=view.findViewById(R.id.title);
        defaoult=view.findViewById(R.id.defalt);
        upper=view.findViewById(R.id.t1);
        lower=view.findViewById(R.id.t2);
        ok=view.findViewById(R.id.ok);
        final AlertDialog.Builder builder = new AlertDialog.Builder(AlarmActivity.this);
        final AlertDialog alertDialog = builder.create();
        alertDialog.setView(view);
        title.setText(titl);
        upper.setText(t1);
        lower.setText(t2);
        np1.setMaxValue(max);
        np1.setMinValue(0);
        np2.setMaxValue(low);
        np2.setMinValue(0);
        Window window=alertDialog.getWindow();
        window.setLayout(200,200);
        alertDialog.show();
        int h1=0,l1=0;
        h=h1;l=l1;
        np1.setValue(npi1);
        np2.setValue(npi2);
        h=npi1;l=npi2;
        final boolean isnp1Changed=false,isnp12Changed=false;
        np1.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            boolean isnp1=isnp1Changed;
            @Override
            public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
                isnp1=true;
                Comman.log("Selected Value   "+isnp1,""+newVal);
                if(isnp1)
                { Comman.log("Selected ValueININ   "+isnp1,""+newVal);
                    h=newVal;
                }else {h=npi1;
                    Comman.log("Selected ValueININMM   "+isnp1,""+newVal);}
            }
        });
        np2.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            boolean isnp2=isnp12Changed;
            @Override
            public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
                Comman.log("Selected Value",""+newVal);
                isnp2=true;
                if(isnp2){
                    l=newVal;
                }else {
                    l=npi2;
                }

            }
        });
        ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                alertDialog.dismiss();
                label.setText(titl+"      "         +"Upper:  "+h+"    Lower:  "+l);
                setValue(check,String.valueOf(h),String.valueOf(l));
            }
        });
        defaoult.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

               alertDialog.dismiss();
               setDefault(check,"","");
            }
        });

    }
    public void setValue(String check,String h,String l)
    {
        Comman.log("setValue","adsfsadfdasdf");
        switch (check)
        {
            case "E":
                m.setHighHeartLimit(h);
                m.setLowHeartLimit(l);
                break;
            case "S":
                m.setHighSpo2(h);
                m.setLowSpo2(l);
                break;
            case "P":
                m.setHighPulseRate(h);
                m.setLowPulseRate(l);
                break;
            case "H":
                m.setHighPressureUpper(h);
                m.setHighPressureLower(l);
                break;
            case "T":
                m.setTempLower(l);
                m.setTempUpper(h);
                break;
            case "L":
                m.setLowPressureUpper(h);
                m.setLowPressureLower(l);
                break;
        }
    }


    public void setDefault(String check,String h,String l)
    {
        Comman.log("Default","adsfsadfdasdf");
        switch (check)
        {
            case "E":
                m.setHighHeartLimit("100");
                m.setLowHeartLimit("60");
                ecg_limit.setText("Heart Rate Limits         Upper:100   Lower:60");
                break;
            case "S":
                m.setHighSpo2("99");
                m.setLowSpo2("66");
                spo2_limit.setText("Spo2 Limits          Upper:99   Lower:66");
                break;
            case "P":
                m.setHighPulseRate("100");
                m.setLowPulseRate("70");
                pluse_limit.setText("Pulse Rate Limits      Upper:100   Lower:70");
                break;
            case "H":
                m.setHighPressureUpper("139");
                m.setHighPressureLower("120");
                hbp.setText("High Pressure Limits       Upper:139   Lower:120");
                break;
            case "T":
                m.setTempLower("1");
                m.setTempUpper("37");
                tmp.setText("Temperature Limits       Upper:37   Lower:1");
                break;
            case "L":
                m.setLowPressureUpper("89");
                m.setLowPressureLower("80");
                lbp.setText("Low Pressure Limits       Upper:89   Lower:80");
                break;
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        Comman.log("Status","-------"+        m.isAlarmOn());
        if(m.isAlarmOn()){
            disableAlarm.setText("Disable Alarms");}else { disableAlarm.setText("Enable Alarms"); }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Api_calling.updatePatient(AlarmActivity.this,setJSonValue());
    }
    public JSONObject setJSonValue()
    {
        JSONObject heartRate=new JSONObject();
        JSONObject spo2=new JSONObject();
        JSONObject temp=new JSONObject();
        JSONObject highPressure=new JSONObject();
        JSONObject lowPressure=new JSONObject();
        JSONObject pulseRate=new JSONObject();
        JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("PatientId",""+m.getPatientId()).put("heartRate",heartRate.put("upper",""+m.getHighHeartLimit()).put("lower",""+m.getLowHeartLimit()).put("status","true"))
                    .put("spo2",spo2.put("upper",""+m.getHighSpo2()).put("lower",""+m.getLowSpo2()).put("status","true"))
                    .put("pulseRate",pulseRate.put("upper",""+m.getHighPulseRate()).put("lower",""+m.getLowPulseRate()).put("status","true"))
                    .put("highPressure",highPressure.put("upper",""+m.getHighPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                    .put("lowPressure",lowPressure.put("upper",""+m.getLowPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                    .put("temperature",temp.put("upper",""+m.getTempUpper()).put("lower",""+m.getTempLower()).put("status","true"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Comman.log("Update Json",jsonObject.toString());
        return jsonObject;
    }
}
