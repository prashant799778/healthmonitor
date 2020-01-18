import styled from 'styled-components'

export const DashStyled = styled.div`

.side-bg-color{
  background: #25293b;
}
.hub-hading{
font-size: 11px;
font-weight: 500;
line-height: 1.18;
text-align: left;
color: #9fadb5;
border-bottom: 1px solid gray;
padding: 15px;
text-transform: capitalize;
}
.hub-innnr-box-wrap {
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin: 0 15px;
grid-gap: 15px;
}
.innr-hub-txt {
margin: 0px;
font-size: 1rem;
color: #9fadb5;
text-transform: capitalize;
font-weight: 400;
margin-bottom: 10px;
}
.hb-wrap-box {
padding: 10px;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 10px;
}
.hb-box{
background:'#E74B4A';
cursor:'pointer';
}
.hb-box h4 {
font-size: 15px;
text-transform: capitalize;
line-height: 20px;
margin: 0px;
background: #3e6d60;
margin-top: 10px;
color: #fff;
font-weight: 400;
text-align: center;
padding: 5px 0;
}
.wrap-wrap {
border: 1px solid gray;
}

.btn-wrap-pagenation {
text-align: center;
margin: 10px 0 15px 0;
}
.btn-wrap-pagenation .next-btn {
border-radius: 2.5px;
border: solid 0.5px #ff6a07;
background-color: #1e1e2f;
padding: 5px 20px;
color: #ff6a07;
text-transform: capitalize;
}
.btn-wrap-pagenation button {
background: transparent;
border: none;
border: 1px solid gray;
}
.btn-wrap-pagenation button img {
width: 15px;
height: 15px;
object-fit: contain;
margin-bottom: 4px;
}
.left{
transform: rotate(180deg);
}







.asd{
  text-decoration: none;
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.box-bg-color{
      background: #25293b;
}
.hader-section{
        background: #25293b;
        height: 65px;
      }

      .container-box{
        margin-top: 18px;
      }
      .info-card{
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 15px;
        margin-bottom:1rem;
      }
      .box-1 {
          text-align: center;
      }
      .box-title{
        font-size: 13px;
        font-weight: 600;
        line-height: 1.29;
        color:#a4b1b5;
        margin: 0px;
        margin-top: 6px;
      }
      .number-title {
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.32;
        color: #9b9f97;
        margin: 0px;
        margin-top: 9px;
    }
      .box-1 img{
        width: 46px;
        height: 46px;
        object-fit: contain;
      }
      .line-spc {
         position: relative;
      }

      .line-spc:before {
          content: '';
          position: absolute;
          width: 1px;
          height: 24px;
          top: 7px;
          background: #d1d1d1;
          right: 0;
      }
      .page-hadding h2{
        font-size: 15px;
        font-weight: 600;
        line-height: 1.17;
        text-align: left;
        color: #ff6a07;
        margin: 0px;
      }
       .page-hadding h3{
        font-size: 10.5px;
        line-height: 1.19;
        text-align: left;
        color: #9f9f9f;
        margin: 8px 0;
      }
      .box-2{
        height: 240.5px;
      }
      .notification-section {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr;
          grid-gap: 10px;
          margin-top: 1rem;
      }
      .box-hading{
          font-size: 11px;
          font-weight: 500;
          line-height: 1.18;
          text-align: left;
          color: #9fadb5;
          border-bottom: 1px solid gray;
          padding: 9px;
      }
      .add-inner-box{

      }
      .box-2 p{
          font-size: 7.5px;
          font-weight: 500;
          line-height: 1.2;
          text-align: left;
          color: #9fadb5;
              padding: 9px;
      }

      .nav-section {
          display: flex;
          width: 100%;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          padding: 0px 15px;
      }
      .nav-list-left ul{
        margin: 0px;
      }

      /*Search section */

      .search-section{
        width: 181px;
        height:23px;
        margin-right: 15px;
      }
      .search-section .form-group .form-control {
          border: none;
          border-radius: 12px;
          box-shadow: 0 1.5px 0 0 rgba(0, 0, 0, 0.16);
          background-color: #444757;
          font-size: 8px;
          color: #c1c1c1;
      }
      .search-section .form-group .form-control::placeholder {
          text-transform: capitalize;
          color: #656464;
      }

      /* End Search section */



      /* user section*/
      .user-section {
          display: flex;
          justify-content: center;
          align-items: center;
      }
        .user-section h2{
            font-size: 10px;
            line-height: 1.2;
            text-align: left;
            color: #808080;
            margin-right: 10px;
            text-transform: capitalize;
            margin-bottom: 0px; 
        }
        .user-section img {
          width: 28px;
          height: 28.5px;
          border: solid 0.5px #7b7b7b;
          border-radius: 50%;
          object-fit: cover;
      }
      .nav-list-left ul li {
          display: inline-block;
      }
      .logout-section {
          display: flex;
          align-items: center;
      }
      .logout-section h2 {
        font-size: 10px;
        line-height: 1.2;
        text-align: left;
        color: #808080;
        margin: 0px;
        margin-right: 10px;
        text-transform: capitalize;
    }
    .logout-section img{
      width: 17px;
    }
      /* End user section*/



      /* Notification Bar*/
.notification-bar .btn-group button img {
    width: 17px;
}
.notification-bar .btn-group .dropdown-menu {
    width: 20rem!important;
    padding: 0px;
}
.hadding {
    display: flex;
    background: #454f63;
    padding: 10px 18px;
    justify-content: space-between;
}
.hadding h2 {
    font-size: 12px;
    margin: 0px;
    color: #fff;
    line-height: 20px;
    text-transform: capitalize;
}
.notification-bar span {
    font-size: 14px;
    text-align: justify;
    white-space: pre-wrap;
    text-transform: capitalize;
    font-weight: 600!important;
}
.dropdown-item:last-child {
    border-bottom: none;
    font-size: 11px;
    text-transform: capitalize;
    margin-top: -5px;
    padding: 13px 0px 8px 0px;
}
.dropdown-item {
/*  margin-top:-5px; */
    border-bottom: 1px solid #e2dcdc;
}
.icon-circle {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.notification-bar .btn:focus {
    outline: none;
    border: none;
    box-shadow: none;
}
.notification-bar .btn{
    border: none;
}
.notification-bar{
  position: relative;
}
.badge-notification {
    position: absolute;
    top: 2px;
    right: 0px;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: #ff6a07;
}
.badge-notification span {
    position: absolute;
    font-size: 6.5px;
    font-weight: 600;
    line-height: 1.15;
    color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
/* End Notification Bar*/



/*Add hospital*/
    .add-info {
      display: grid;
      grid-template-columns: 3fr 3fr 3fr 1fr;
      grid-gap: 2rem;
      width: 100%;
      padding: 0 9px;
    }
    .info-box .form-group .form-control {
        background: #4c4f5e;
        height: 36px;
        border: none;
        border-radius: 0;
        color: #a3a3a3;
    }
        .text-color {
          font-size: 9px;
          font-weight: 300;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.22;
          letter-spacing: normal;
          text-align: left;
          color: #a3a3a3;
      }
        .info-box .form-group .form-control:focus {
          box-shadow: none;
          border: 0px;
          outline: 0px;
    }
    .label-sz{
        font-size: 10.5px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.19;
        letter-spacing: 0.64px;
        text-align: left;
        color: #a3a3a3;
    }
    .btn-section {
    display: flex;
    justify-content: flex-end;
    padding: 0px 9px;
}
.add-btn {
    border-radius: 2.5px;
    border: solid 0.5px #ff6a07;
    background-color: #1e1e2f;
    padding: 5px 20px;
    color: #ff6a07;
    text-transform:capitalize;
}
.add-btn:nth-child(2) {
    background: #ff6a07;
    color: #fff;
}
.spc-right{
  margin-right: 10px; 
}
.spc-bottom-1-padding{
  padding-bottom: 1rem; 
}

  .visibility-hd{
    visibility: hidden;
  }
.add-doctor-info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
    width: 100%;
    padding: 0 9px;
}

.lg-hading{
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: 1.46px;
    text-align: center;
    color: #a3a3a3;
}
.text-hading{
    font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #9fadb5;
  text-transform: capitalize !important;
}
.new-box {
  margin-bottom: 1rem;
}


.border-bottomm{
  border-bottom: 1px solid gray;
}
.new-box-add {
    padding: 0 5px 0px 15px;
   display: grid;
    grid-template-columns: 1fr 1fr;
}
.new-box-card {
    margin-right: 10px;
    margin-bottom: 10px;
}
.new-box-card:nth-child(3) {
   
}
.card-hading-box {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}
.innr-card-bg-color{
  background: #1e1e2f;
}
.new-container{
  margin-top: 2rem; 
}
  .text-hd{
      font-size: 12.5px;
      font-weight: 500;
      line-height: 1.2;
      color: #9fadb5;
      margin: 0px;
  }
  .up-side-box {
    display: flex;
    justify-content: space-between;
        padding: 15px;
}
.text-hading {
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    color: #9fadb5;
    margin: 0px;
    text-transform: capitalize !important;
}
.innr-text-hd{
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.46px;
      text-align: center;
      color: #a3a3a3;
      margin: 0px;
}
.innr-info-text-hd{
    font-size: 9px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #f75d5d;
  margin: 0px;
}
.innr-new-card-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.innr-new-box-card {
    padding: 9px;
    border-right: 0.5px solid #808080;
}
.innr-new-box-card:nth-child(3){
  border: 0px;
}
.border-card{
  border: 0.5px solid #808080;
}


@media (min-width: 320px) and (max-width: 480px) {
  .new-box-add {
    padding: 0 5px 0px 15px;
    display: grid;
    grid-template-columns: 1fr;
}
  .new-box{
    margin-top: 1rem;
  }
}

@media (min-width: 481px) and (max-width: 991px) {
    .new-box-add {
    padding: 0 5px 0px 15px;
    display: grid;
    grid-template-columns: 1fr;
}

  
}
@media (min-width: 1367px) {
  
  .container{
    max-width: 2140px;
  }
  .text-hd {
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.2;
    color: #9fadb5;
    margin: 0px;
}
.text-hading {
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.14;
  text-align: left;
  color: #9fadb5;
  margin: 0px;
  text-transform: capitalize !important;
}
.innr-text-hd {
  font-size: 2rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  -webkit-letter-spacing: 0.46px;
  -moz-letter-spacing: 0.46px;
  -ms-letter-spacing: 0.46px;
  letter-spacing: 0.46px;
  text-align: center;
  color: #a3a3a3;
  margin: 0px;
}
.innr-info-text-hd {
  font-size: 1.1rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: center;
  color: #f75d5d;
  margin: 0px;
}
.card-hading-box img {
  width: 25px;
}
.box-1 img {
  width: 60.7px !important;
  /* object-fit: contain; */
}
.box-title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.29;
  color: #a4b1b5;
  margin: 0px;
  margin-top: 6px;
}
.number-title {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.32;
  color: #9b9f97;
  margin: 0px;
  margin-top: 9px;
}
.page-hadding h2 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.17;
  text-align: left;
  color: #ff6a07;
  margin: 0px;
}
.page-hadding h3 {
  font-size: 1.2rem;
  line-height: 1.19;
  text-align: left;
  color: #9f9f9f;
  margin: 1rem 0;
}
.line-spc:before {
  content: '';
  position: absolute;
  width: 1px;
  height: 68px;
  top: 7px;
  background: #d1d1d1;
  right: 0;
}
}








       @media (min-width: 320px) and (max-width: 480px) {
          .info-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 15px;
            margin-bottom: 1rem;
        }
        .notification-section {
          display: grid;
          grid-template-columns:1fr;
          grid-gap: 10px;
          margin-top: 1rem;
      }
    }

    @media (min-width: 481px) and (max-width: 758px) {
      .notification-section {
          display: grid;
          grid-template-columns:2fr 1fr;
          grid-gap: 10px;
          margin-top: 1rem;
      }
    }

      @media (min-width: 481px) and (max-width: 767px) {
          .info-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 15px;
            margin-bottom: 1rem;
        }
        
      }

`


;