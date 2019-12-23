package com.monitor.Adapter;

import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.jaredrummler.materialspinner.MaterialSpinner;
import com.monitor.R;
import com.monitor.activities.ConfigActivity;
import com.monitor.util.Comman;
import com.monitor.widget.GothamBookFontForLable;

import java.util.ArrayList;
import java.util.List;

public class SpinnerHandler {

        public static void SpinnerHandler(final ConfigActivity context, MaterialSpinner spinner, List<String> list, final String key) {
//        final DataBase dataBase;
//        dataBase = new DataBase(context, "", null, EmptyState.version);


            Comman.log("AAA","INININININININiIIIIIIIIIIIIIIIIIIIIIIII");
        ArrayAdapter arrayAdapter1 = new ArrayAdapter(context, R.layout.item_spinner, list) {
//            public boolean isEnabled(int position) {
//
//                if (position == 0) {
//                    return false;
//                } else {
//                    return true;
//                }
//            }
//   @Override
//    public void getWindowVisibleDisplayFrame(Rect outRect) {
//    WindowManager wm = (WindowManager) getContext.getSystemService(Context.WINDOW_SERVICE);
//    Display d = wm.getDefaultDisplay();
//    d.getRectSize(outRect);
//    outRect.set(outRect.left, <STATUS BAR HEIGHT>, outRect.right, outRect.bottom);
//}

            @NonNull
            @Override
            public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

                View view = super.getDropDownView(position, convertView, parent);
                GothamBookFontForLable tv = (GothamBookFontForLable) view;
                tv.setTextSize(14);
                if (position == 0) {
                    // Set the hint text color gray
                    tv.setTextColor(Color.GRAY);
                } else {
                    tv.setTextColor(Color.WHITE);
                }
                return view;

            }

            public View getDropDownView(int position, View convertView,
                                        ViewGroup parent) {
                View view = super.getDropDownView(position, convertView, parent);
                ViewGroup.LayoutParams params = view.getLayoutParams();
                params.height = 130;
                view.setLayoutParams(params);
                GothamBookFontForLable tv = (GothamBookFontForLable) view;
                tv.setTextColor(Color.WHITE);
                ((GothamBookFontForLable) view).setTextColor(Color.WHITE);
                if (position == 0) {
                    // Set the hint text color gray
                    tv.setTextColor(Color.GRAY);
                } else {
                    tv.setTextColor(Color.WHITE);
                }
                return view;
            }
        };
        spinner.setAdapter(arrayAdapter1);
        spinner.setOnItemSelectedListener(new MaterialSpinner.OnItemSelectedListener() {
            @Override
            public void onItemSelected(MaterialSpinner view, int position, long id, Object item) {
                String temp=String.valueOf(item);
//                context.setSpinnerValue(item,position);
                view.setTextColor(Color.WHITE);
                if((item.equals("Select"))||(item.equals(""))) {
                    String temp1="";
//                    dataBase.PropertyUpdate(page_no, key, temp1, true);
                }
                else {
                    Log.d("ValueSpinner",item+"");
//                    dataBase.PropertyUpdate(page_no, key, temp, true);
                }
            }
        });

     /*  property=new property();
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                Log.d("Selected",String.valueOf(adapterView.getSelectedItem()));i
                item=String.valueOf(adapterView.getSelectedItem());
                //dataBase.PropertyUpdate(page_no,key,);
            }
            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {
            }
        });*/
    }
}
