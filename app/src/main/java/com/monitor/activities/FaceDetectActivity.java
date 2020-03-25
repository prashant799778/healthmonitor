package com.monitor.activities;
import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.error.VolleyError;
import com.android.volley.request.SimpleMultiPartRequest;
import com.android.volley.toolbox.Volley;
import com.mindorks.paracamera.Camera;
import com.monitor.R;
import com.monitor.http.URLS;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
public class FaceDetectActivity extends AppCompatActivity {
   static MySharedPrefrence mySharedPrefrence;
    private static final String TAG = "MainActivity";
    Button button ;

    Camera camera;
     String user_type="";
     ProgressBar progressBar;

     LinearLayout progress_layout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_face_detect);
        Intent i= getIntent();
        if(i!=null){
            user_type=  i.getStringExtra("type");
        }
 mySharedPrefrence=MySharedPrefrence.instanceOf(getApplicationContext());
        button=findViewById(R.id.button_capture);
        progressBar=findViewById(R.id.progress);
        progress_layout=findViewById(R.id.progress_layout);
        if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED || checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.CAMERA,Manifest.permission.WRITE_EXTERNAL_STORAGE}, MY_CAMERA_REQUEST_CODE);
        }else {

            setup();
        }

// Build the camera



    }

    public  void setup(){
        camera = new Camera.Builder()
                .resetToCorrectOrientation(true)// it will rotate the camera bitmap to the correct orientation from meta data
                .setTakePhotoRequestCode(1)

                .setDirectory("pics")
                .setName("ali_" + System.currentTimeMillis())
                .setImageFormat(Camera.IMAGE_JPEG)
                .setCompression(75)
                .setImageHeight(1000)// it will try to achieve this height as close as possible maintaining the aspect ratio;
                .build(this);

        try {
            camera.takePicture();
        }catch (Exception e){
            e.printStackTrace();
        }

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
                bitmap.compress(Bitmap.CompressFormat.JPEG, 10, baos);
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

                   // Toast.makeText(this.getApplicationContext(),""+f.getAbsolutePath(),Toast.LENGTH_SHORT).show();
                    String encodedImage = Base64.encodeToString(imageBytes, Base64.DEFAULT);
                    multiPartCall1(getApplicationContext(), URLS.RECOGNIZEIMAGE,mySharedPrefrence.getDoctorEmail(),f);
                } catch (IOException e) {
                    e.printStackTrace();
                }



            }else{
                Toast.makeText(this.getApplicationContext(),"Picture not taken!",Toast.LENGTH_SHORT).show();
            }
        }
    }



    public void multiPartCall1(final Context context, String URL,String Email,File file) {

        if (false) {

        } else {
            progress_layout.setVisibility(View.VISIBLE);
            progressBar.setVisibility(View.VISIBLE);
            button.setVisibility(View.GONE);

            Comman.log("Inside","Inside1");

            SimpleMultiPartRequest simpleMultiPartRequest = new SimpleMultiPartRequest(Request.Method.POST, URL, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    Comman.log("Response",response);
                  //  Toast.makeText(context,response,Toast.LENGTH_SHORT).show();
                    try {
                        JSONObject jsonObject= new JSONObject(response);
                         if(jsonObject.getString("status").equalsIgnoreCase("true")){

                             mySharedPrefrence.setUserType(user_type);

                              startActivity(new Intent(FaceDetectActivity.this,UserDashboard.class));
                               finish();
                         }else {
                               progressBar.setVisibility(View.GONE);
                               button.setVisibility(View.VISIBLE);
                             progress_layout.setVisibility(View.GONE);
                         }
                    } catch (Exception e) {
                        e.printStackTrace();
                        finish();
// Comman.topSnakBar(context,view, Constant.SOMETHING_WENT_WRONG);
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Comman.log("Inside","Inside3"+error.getMessage());
                }
            });
            simpleMultiPartRequest.addStringParam("Email",""+Email);
// if(arrayList.size()>0)
  simpleMultiPartRequest.addFile("TestImage",file.getAbsolutePath());
// Comman.log("Inside","Inside1");
            RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(simpleMultiPartRequest);
        }
    }

    private static final int MY_CAMERA_REQUEST_CODE = 100;




    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == MY_CAMERA_REQUEST_CODE) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                setup();
               // Toast.makeText(this, "camera permission granted", Toast.LENGTH_LONG).show();
            } else {
               // Toast.makeText(this, "camera permission denied", Toast.LENGTH_LONG).show();
            }
        }
    }
}