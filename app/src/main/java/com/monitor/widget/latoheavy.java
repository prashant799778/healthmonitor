package com.monitor.widget;


import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.widget.TextView;

@SuppressLint("AppCompatCustomView")
public class latoheavy extends TextView {


  public latoheavy(Context context) {
    super(context);
    Typeface face= Typeface.createFromAsset(context.getAssets(), "lato.ttf");
    this.setTypeface(face);
  }

  public latoheavy(Context context, AttributeSet attrs) {
    super(context, attrs);
    Typeface face=Typeface.createFromAsset(context.getAssets(), "lato.ttf");
    this.setTypeface(face);
  }

  public latoheavy(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
    Typeface face=Typeface.createFromAsset(context.getAssets(), "lato.ttf");
    this.setTypeface(face);
  }

  protected void onDraw (Canvas canvas) {
    super.onDraw(canvas);


  }

}