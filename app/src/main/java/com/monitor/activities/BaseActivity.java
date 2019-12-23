package com.monitor.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.coordinatorlayout.widget.CoordinatorLayout;

import android.os.Bundle;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;

import com.monitor.R;

public class BaseActivity extends AppCompatActivity {
RelativeLayout top_view;
ProgressBar pb;
CoordinatorLayout item_snakbar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_base);
        item_snakbar=findViewById(R.id.ite_snak);
        top_view=findViewById(R.id.relative_top);
        pb=findViewById(R.id.pb);
    }
}
