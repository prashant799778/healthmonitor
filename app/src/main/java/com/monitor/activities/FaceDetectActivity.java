package com.monitor.activities;



import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.error.VolleyError;
import com.android.volley.request.SimpleMultiPartRequest;
import com.android.volley.toolbox.Volley;

import com.mindorks.paracamera.Camera;
import com.monitor.R;
import com.monitor.util.Comman;
import com.monitor.util.Constant;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class FaceDetectActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    Button button ;

    Camera camera;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_face_detect);

        button=findViewById(R.id.button_capture);
// Build the camera
        camera = new Camera.Builder()
                .resetToCorrectOrientation(true)// it will rotate the camera bitmap to the correct orientation from meta data
                .setTakePhotoRequestCode(1)
                .setDirectory("pics")
                .setName("ali_" + System.currentTimeMillis())
                .setImageFormat(Camera.IMAGE_JPEG)
                .setCompression(75)
                .setImageHeight(1000)// it will try to achieve this height as close as possible maintaining the aspect ratio;
                .build(this);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    camera.takePicture();
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        });


    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        camera.deleteImage();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == Camera.REQUEST_TAKE_PHOTO){
            File f = new File(getApplicationContext().getCacheDir(),"abc.jpeg");
            try {
                f.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
            Bitmap bitmap = camera.getCameraBitmap();
            Toast.makeText(this.getApplicationContext(),"Picture taken!",Toast.LENGTH_SHORT).show();

            if(bitmap != null) {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
                byte[] imageBytes = baos.toByteArray();
//write the bytes in file
                FileOutputStream fos = null;
                try {
                    fos = new FileOutputStream(f);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                try {
                    fos.write(imageBytes);
                    fos.flush();
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                String encodedImage = Base64.encodeToString(imageBytes, Base64.DEFAULT);
                 multiPartCall1(getApplicationContext(),encodedImage);

            }else{
                Toast.makeText(this.getApplicationContext(),"Picture not taken!",Toast.LENGTH_SHORT).show();
            }
        }
    }



    public static void multiPartCall1(final Context context, String URL) {
        if (false) {

        } else {
            Comman.log("Inside","Inside1");
            SimpleMultiPartRequest simpleMultiPartRequest = new SimpleMultiPartRequest(Request.Method.POST, URL, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {

                    try {

                    } catch (Exception e) {
                        e.printStackTrace();
// Comman.topSnakBar(context,view, Constant.SOMETHING_WENT_WRONG);
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Comman.log("Inside","Inside3"+error.getMessage());
                }
            });
            simpleMultiPartRequest.addStringParam("data",""+URL);
// if(arrayList.size()>0)
// simpleMultiPartRequest.addFile("postImage",""+new File(arrayList.get(0).trim()));
// Comman.log("Inside","Inside1");
            RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(simpleMultiPartRequest);
        }
    }


}