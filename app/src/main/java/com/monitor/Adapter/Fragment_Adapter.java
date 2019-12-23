package com.monitor.Adapter;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.monitor.fragments.DashBoard_Fragment;

public class Fragment_Adapter extends FragmentPagerAdapter {
    private static  String title[]= new String[]{"Hospital_1","Hospital_2","Hospital_3  "};
    private Fragment[] childFragments;

    public Fragment_Adapter(FragmentManager fm) {
        super(fm);
        childFragments = new Fragment[] {
                new DashBoard_Fragment(), //0
                new DashBoard_Fragment(), //1
                new DashBoard_Fragment() //2
        };
    }

    @Override
    public Fragment getItem(int position) {
        return childFragments[position];
    }

    @Override
    public int getCount() {
        return childFragments.length; //3 items
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return title[position];
    }
}