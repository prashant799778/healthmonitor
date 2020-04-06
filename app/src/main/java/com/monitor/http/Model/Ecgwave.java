
package com.monitor.http.Model;

import java.util.HashMap;
import java.util.Map;

public class Ecgwave {

    private int one;
    private int two;
    private int three;
    private int avr;
    private int avl;
    private int avf;

    public Ecgwave(int one, int two, int three, int avr, int avl, int avf, int five) {
        this.one = one;
        this.two = two;
        this.three = three;
        this.avr = avr;
        this.avl = avl;
        this.avf = avf;
        this.five = five;
    }

    public int getOne() {
        return one;
    }

    public void setOne(int one) {
        this.one = one;
    }

    public int getTwo() {
        return two;
    }

    public void setTwo(int two) {
        this.two = two;
    }

    public int getThree() {
        return three;
    }

    public void setThree(int three) {
        this.three = three;
    }

    public int getAvr() {
        return avr;
    }

    public void setAvr(int avr) {
        this.avr = avr;
    }

    public int getAvl() {
        return avl;
    }

    public void setAvl(int avl) {
        this.avl = avl;
    }

    public int getAvf() {
        return avf;
    }

    public void setAvf(int avf) {
        this.avf = avf;
    }

    public int getFive() {
        return five;
    }

    public void setFive(int five) {
        this.five = five;
    }

    private int five;






}
