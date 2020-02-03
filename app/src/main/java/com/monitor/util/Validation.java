package com.monitor.util;

import android.widget.EditText;
import android.widget.TextView;

public class Validation {
    public static Boolean isFilled(EditText editText)
    {
        if(editText.length()==0){
            editText.setFocusable(true);
            editText.setError(Constant.PLEASE_FILL_FIELD);
            return false;
        }

        return true;
    }


    public static Boolean isFilledTextView(TextView editText)
    {
        if(editText.length()==0){
            editText.setFocusable(true);
            editText.setError(Constant.PLEASE_FILL_FIELD);
            return false;
        }

        return true;
    }
}
