package com.monitor.util;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;

import androidx.coordinatorlayout.widget.CoordinatorLayout;

import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;

import org.w3c.dom.Text;

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
        if(TEXT!=null)
            Log.d(TAG,TEXT);
    }
    public static SweetAlertDialog sweetDialogProgress(Context context)
    {
        final SweetAlertDialog dialog=new SweetAlertDialog(context,SweetAlertDialog.PROGRESS_TYPE);
        dialog.show();
        return dialog;
    }
}
