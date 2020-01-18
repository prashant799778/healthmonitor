import styled from 'styled-components'

export const PopupStyled = styled.div`
nav > .nav.nav-tabs{

    border: none;
    color:#fff;
    background:transparent;
    border-radius:0;
    margin-top: 10px 

}
.nav-item.active {
    background: #cc1919 !important;
    color: #fff !important;
    font-weight: 500;
    border: none !important;
}
.spc-rw:nth-child(17) {
    
    margin-right: 0px;
}
button.update-btn {
    background-color: #cd381c;
    border: none;
    outline:none;
    border-radius: 40px;
    font-size: larger;
    color: white;
    margin-top: 9px;
    padding: 3px;
    font-weight: 500;
}
button.edit-bt {
    position: absolute;
    right: 35px;
    border: none;
    background: transparent;
    font-size: 20px;
    color: #818181;
    outline:none
}
button.close:focus {
    outline: none;
    }
button.close span {
    font-size: 25px;
    position: relative;
    top: -1px;
    left: 2px;
    outline:none;
}
.nav-item {
    border: 1px solid #cc1919 !important;
    color: #cc1919 !important;
    font-weight: 500;
}
nav > div a.nav-item.nav-link,
nav > div a.nav-item.nav-link.active
{
    border: none;
    padding: 7px 25px;
    color:#fff;
    background:transparent;
    border-radius:0;
    text-transform: capitalize;
}

.tab-content {
    background: #fdfdfd;
 
    padding: 10px 0px !important;
   
     // overflow: hidden;
 

}
ul.year-data {
    margin: 0px;
    padding: 0px;
    list-style: none;
    text-align: left;
}
nav > div a.nav-item.nav-link:hover,
nav > div a.nav-item.nav-link:focus
{
  	border: none;
    background: transparent;
    color:#fff;
    border-radius:0;
    transition:background 0.20s linear;
}

.invest-hading {
    border: 1px solid #b7b7b7;
    padding: 5px 12px;
    margin-top: 10px;
    display:flex;
    justify-content:space-between;
}
.invest-hading h3 {
    font-size: 16px;
    color: #101010;
    text-align: center;
    text-transform: capitalize;
    font-weight: 600;
    margin: 0px;
}
.invest-hading h2 {
    font-size: 13px;
    text-transform: capitalize;
    font-weight: 500;
    margin: 0px;
    display: inline-block;
    text-align: left;
    
    
}
.yar-dat .invest-hading {
    display: block;
}
ul.year-data li p {
    float: right;
    color: darkslategrey;
}
.invest-hading input {
    display: inline-block !important;
    position: absolute;
    right: 18px;
    text-align:left;
    background: white;
    height: 18px !important;
}
.invest-hading p {
    margin: 0px;
    display: inline-block;
    font-size: 12px;
    color: gray;
    text-transform: capitalize;
    word-break: break-word !important;
}
.main-b {
    display:block !important;
}
.slick-slide img {
    display: block;
    width: 300px !important;
    height: 200px !important;
    margin-left: 8%; !important;
}
.slick-prev:before, .slick-next:before {
  
    color: #470d04 !important;
    
}
.slick-prev{
    left:0px !important;
    z-index:99;
}
.slick-next{
    right:0px !important;
    z-index:99;
}
p.propar {
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    margin-left: 1%;
}
.property{
    border: 1px solid #d6d6d6 !important;
    padding: 12px 16px 39px 16px;
}

.slick-next:before {
    color: #470d04 !important;
   
}
.slick-prev:before {
    color: #470d04 !important;
    
}
button.dwnld {
    background: transparent;
    border: none;
    outline: none;
    color: #3366BB;
}
.clicked {
    color: red !important;
  }



`