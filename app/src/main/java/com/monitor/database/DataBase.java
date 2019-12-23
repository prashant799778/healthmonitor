package com.monitor.database;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.monitor.bluetooth.Const;
import com.monitor.util.Comman;
import com.monitor.util.Constant;

public class DataBase extends SQLiteOpenHelper {
    Context context;
    String col1 = "PATIENT_ID";
    String col2 = "MAC_ADDRESS";
    String TABLE_NAME="Patient";


    SQLiteDatabase sqLiteDatabase ;
    public DataBase(Context context,String name, SQLiteDatabase.CursorFactory factory, int version)
    {
        super(context, Constant.DB_NAME,null,Constant.DB_VERSION);
        this.context=context;
        sqLiteDatabase = this.getWritableDatabase();

    }
    @Override
    public void onCreate(SQLiteDatabase db) {
//        String query = "CREATE TABLE " + Constant.TABLE_NAME + "(ID INTEGER PRIMARY KEY AUTOINCREMENT," + patient_id + " INTEGER," + macAddress + " TEXT)";
        String query1 = "CREATE TABLE " + TABLE_NAME + " (ID INTEGER PRIMARY KEY AUTOINCREMENT ," + col1 + " TEXT,"+ col2 +" TEXT)";
//        String query1 = "CREATE TABLE " + Constant.TABLE_NAME + "(ID INTEGER PRIMARY KEY AUTOINCREMENT," + col1 + " TEXT)";
        db.execSQL(query1);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME + ";");
        onCreate(db);
    }
//    public void deleteRow(String id) {
//        sqLiteDatabase = this.getReadableDatabase();
////        sqLiteDatabase.execSQL("DELETE FROM " + Constant.TABLE_NAME+ " WHERE "+Constant.BED_NO+"='"+ id +"'");
//    }
    public Cursor fetchAllData() {
        sqLiteDatabase = this.getReadableDatabase();
        Cursor cursor = this.getReadableDatabase().rawQuery("SELECT * FROM " +TABLE_NAME , null);
        return cursor;
    }
    public void deleteDatabase() {
        String str1 = "DELETE FROM " + TABLE_NAME;
        this.getWritableDatabase().execSQL(str1);
        Comman.log("Deletion_is_done","Successfully");
    }
    public void insertData(String id,String mac)
    {
//    int p_id=Integer.parseInt(id.replaceAll(",",""));
//        String sql = "insert into " + Constant.TABLE_NAME + " (  "+ co +" , " + macAddress +" ) values('" + id + "','" + mac + "')";
//        String sql = "insert into " + Constant.TABLE_NAME + " ( " + col1 + ") values(" + id + ")";
//        String sql = "insert into " + Constant.TABLE_NAME  + " values(" + p_id + ",'" + mac + "')";
        String sql = "insert into " + TABLE_NAME + " ( " + col1 + ", " + col2 + ") values('" + id + "','" + mac + "')";
        Comman.log("Insertion_is_done","Successfully");
        sqLiteDatabase.execSQL(sql);
//        Comman.log("ERROR",""+sqLiteDatabase.get);

    }
}
