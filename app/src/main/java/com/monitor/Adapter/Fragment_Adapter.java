package com.monitor.Adapter;

import android.util.Log;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.monitor.fragments.DashBoard_Fragment;
import com.monitor.fragments.ListFragment;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.Result;
import com.monitor.util.Comman;

import java.util.ArrayList;

public class Fragment_Adapter extends FragmentPagerAdapter {
    private ArrayList<String>title;
    private ArrayList<Fragment> childFragments;
    public ArrayList<Fragment>ff;
    public Fragment_Adapter(FragmentManager fm, int size, LiveModel liveModel) {
        super(fm);
        childFragments=new ArrayList<>();
        title=new ArrayList<>();
//        ff= new ArrayList<>();

        for (int i=0;i<size;i++)
        {
         title.add(""+liveModel.getResult().get(i).getHospitalName()+" Hospital");
//         if(new ListFragment(liveModel.getResult().get(i))!=null)
            Log.d("chala",i+"");
           // if(liveModel.getResult().get(i)!=null && liveModel.getResult().get(i) instanceof Result)
         childFragments.add(new ListFragment(liveModel.getResult().get(i)));
//         childFragments.add(ff.get(0));

        }
    }
    @Override
    public Fragment getItem(int position) {
        return childFragments.get(position);
    }

    @Override
    public int getCount() {
        return childFragments.size(); //3 items
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return title.get(position);
    }
}