package com.monitor.util;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.icu.text.SimpleDateFormat;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.ToneGenerator;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;

import androidx.coordinatorlayout.widget.CoordinatorLayout;

//import com.google.android.gms.common.internal.safeparcel.SafeParcelReader;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;
import com.monitor.R;
import com.monitor.activities.LoginActivity;

import org.w3c.dom.Text;

import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class Comman {
    public static Boolean isNetworkConnected(Context context)
    {
        ConnectivityManager manager=(ConnectivityManager)context.getApplicationContext().getSystemService(context.CONNECTIVITY_SERVICE);
        if(manager!=null){
            NetworkInfo []info=manager.getAllNetworkInfo();
            if (info != null)
                for (int i = 0; i < info.length; i++)
                    if (info[i].getState() == NetworkInfo.State.CONNECTED) {
                        return true;
                    }
        }
        return false;
    }


 public static void startAlarm1(Context context)
 {
     ToneGenerator toneGen1 = new ToneGenerator(AudioManager.STREAM_MUSIC, 100);
     toneGen1.startTone(ToneGenerator.TONE_CDMA_PIP,150);
 }


 public static void userSessionOut(Activity activity,Context context)
 {
     MySharedPrefrence mySharedPrefrence=MySharedPrefrence.instanceOf(context);
     if(context!=null) {
         mySharedPrefrence.clearData();
         Intent i = new Intent(context, LoginActivity.class);
         i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
         context.startActivity(i);
         activity.finish();
     }

 }















    public static void startAlarm(Context context)
    {
        AssetFileDescriptor afd = null;
        try {
            afd = context.getAssets().openFd("beep.mp3");

            MediaPlayer player = new MediaPlayer();
            player.setDataSource(afd.getFileDescriptor(),afd.getStartOffset(),afd.getLength());
            player.prepare();
            player.start();
            Comman.log("Alarm","Alarm");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
//    public static String getCurrentTime() {
//        String currentTime="";
//        try {
//            Calendar c = Calendar.getInstance();
//            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            String formattedDate = df.format(c.getTime());
//            Date current = null;
//            try {
//                current = new SimpleDateFormat("yyyy-M-dd HH:mm:ss").parse(formattedDate);
//            } catch (ParseException e) {
//                e.printStackTrace();
//            }
//            System.out.println("Current Time"+current.getTime());
//            currentTime=String.valueOf(current.getTime());
//        } catch (SafeParcelReader.ParseException e) {
//            e.printStackTrace();
//        }
//        return currentTime;
//    }

    public static void show_Real_Message(Context context, View view,String text)
    {
        Snackbar snackbar = Snackbar.make(view,text, BaseTransientBottomBar.LENGTH_LONG);
//        Snackbar snack = Snackbar.make(view, text, Snackbar.LENGTH_LONG);
//        View view1 = snack.getView();
//        FrameLayout.LayoutParams params =(FrameLayout.LayoutParams)view.getLayoutParams();
//        params.gravity = Gravity.TOP;
//        view1.setLayoutParams(params);
//        snack.show();






//        View view1 = snackbar.getView();
//        CoordinatorLayout.LayoutParams params =(CoordinatorLayout.LayoutParams)view.getLayoutParams();
//        params.gravity = Gravity.TOP;
//        view.setLayoutParams(params);
        snackbar.show();

    }
    public static void log(String TAG,String TEXT)
    {
        if(TEXT!=null);
            Log.d(TAG,TEXT);
    }
    public static SweetAlertDialog sweetDialogProgress(Context context)
    {
        final SweetAlertDialog dialog=new SweetAlertDialog(context,SweetAlertDialog.PROGRESS_TYPE);
        dialog.show();
        return dialog;
    }
}
