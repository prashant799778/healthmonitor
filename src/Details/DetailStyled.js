import styled from 'styled-components'

export const DetailStyled = styled.div`
.show-pre-medi {
    display: block;
    position: absolute;
    will-change: transform;
    top: 0px;
    left: 0px;
    transform: translate3d(-183px, 28px, 0px);
    background: #26293b;
}
.clr-white{
	color#fff;
}
.bg-colr-ch.show, textarea {
  background: #26293b !important;
  color: #fff !important;
}
.stiky-note .btn-primary {
  background: #d45f24 !important;
  border-color: #d45f24 !important;
}

.nav-link.active {
  border-right: 3px solid #e96333;
  color: #e96333 !important;
}
.side-button-pis {
    border: 1px solid #464854;
    padding: 5px 10px;
    text-transform: capitalize;
    color: #fff;
    background: #d45f0c;
}
.item-drap-m {
    display: block;
    font-size: 1.1rem;
    padding: 0 10px;
    color: #d45f0c;
    line-height: 20px;
}
.stiky-note {
    padding: 0 16px;
    display: block;
}
.men-drop.show {
    transform: translate3d(-175px, 28px, 0px);
}
button.newclr-bck {
    width: 100%;
    border-radius: 0;
    background: #1f293a !important;
    border-color: #1f293a !important;
    padding: 5px 0 !important;
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
        .box-1 {
            text-align: center;
        }
        .box-title{
          font-size: 8.5px;
          font-weight: 600;
          line-height: 1.29;
          color:#a4b1b5;
          margin: 0px;
          margin-top: 6px;
        }
        .number-title {
          font-size: 15.5px;
          font-weight: 600;
          line-height: 1.32;
          color: #9b9f97;
          margin: 0px;
          margin-top: 9px;
      }
        .box-1 img{
          width: 21.7px;
          height: 18.3px;
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
      font-weight: 400!important;
      word-break: break-all;
  }
  .dropdown-item:last-child {
      border-bottom: none;
      font-size: 11px;
      text-transform: capitalize;
      margin-top: -5px;
      padding: 13px 0px 8px 0px;
  }
  .dropdown-item {

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
  }
  .box-hadingg{
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.18;
      text-align: left;
      color: #9fadb5;
      margin: 0px;
  }
  .innr-box-info {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
          align-items: center;
  }

  
        .info-card{
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 15px;
          border-right: 1px solid gray;
        }
  .border-bottomm{
    border-bottom: 1px solid gray;
  }
  .new-box-add {
      padding: 0 5px 0px 15px;
     display: grid;
      grid-template-columns: 1fr 1fr 1fr;
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
      font-size: 8px;
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
      padding: 10px;
      border-right: 0.5px solid #808080;
  }
  .innr-new-box-card:nth-child(3){
    border: 0px;
  }
  .border-card{
    border: 0.5px solid #808080;
  }
  
  .wrap-container-ups {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
  }
  
  .bg-container{
        background: #1e1e2f;
  }
  .info-card:nth-child(2){
  border: 0px;
  }
  
  
  
  
  
  
  
  .add-hub{
      background: #ff6a07;
      color: #fff;
      border-radius: 2.5px;
      padding: 5px 20px;
      text-transform: capitalize;
      border: none;
    }
    .add-hub:focus{
      outline: none;
      border: none;
    }
  
    .hading-up{
      font-size: 1rem;
      line-height: 1.17;
      color: #9f9f9f;
      text-transform: uppercase;
      margin: 0px;
    }
    .hading-up span{
      color:#ff6a07;
      text-transform: capitalize;
    }
    .uppr-box-card {
      display: flex;
      justify-content: space-between;
          align-items: center;
  }
  .id-info h3{
        font-size: 12.5px;
      font-weight: 500;
      line-height: 1.2;
      color: #9fadb5;
      margin: 0px;
  }
  .id-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 12px;
  }
  .id-info ul li {
      display: inline-block;
      padding: 5px;
  }
  
  .id-info ul {
      margin: 0px;
      padding: 0px;
      list-style: none;
  }
  .id-info ul li .act-button {
      border: none;
      background: transparent;
  }
  .info-doc {
      font-size: 14px;
      color:#a3a3a3;
      text-align: center;
      margin: 0px;
  }
  .num-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0px 12px;
      margin:12px 0;
  }
  .card-wrap-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      padding: 15px;
  }
  .innr-text-hd {
      font-size: 2rem;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.46px;
      text-align: center;
      color: #a3a3a3;
      margin: 0px;
  }
  .main-card {
      border: 1px solid gray;
          margin-top: 1rem;
  }
  .card-box {
      padding: 15px;
      border-bottom: 1px solid gray;
  }

  
  table{
      width:100%;
  }
  #example_filter{
      float:right;
      display: none;
  }
  #example_paginate{
      float:right;
  }
  label {
      display: inline-flex;
      margin-bottom: .5rem;
      margin-top: .5rem;
     
  }
  .list-all-sec{
  margin-bottom: 0px; 
  }
  .list-all-sec tr th {
      font-size: 1rem;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: normal;
      text-align: left;
      color: #9fadb5;
  }
  .list-all-sec tr td {
      font-size: 14px;
      font-weight: 400;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: normal;
      text-align: left;
      color: #9fadb5;
  }
  .list-all-sec tbody tr:nth-of-type(even) {
      background-color: #1e1e2f !important;
  }
  .table td, .table th {
      padding: .75rem;
      vertical-align: top;
      border-top: none !important;
  }
  .table thead th {
      vertical-align: bottom;
      border-bottom: 1px solid #3a3d4d;
  }
  #example_length {
      display: none;
  }
  .dataTables_wrapper {
      padding: 0px;
  }
  .hospital-table .dataTables_wrapper .row:nth-child(3){
    padding-top: 1rem; 
    background: #1e1e2f;
  }
  .page-item.active .page-link {
      z-index: 3;
      color: #fff;
      background-color: #e47027;
      border-color: #e47027;
  }
  ul.pagination li a {
      background: #000;
      border: 0px;
      color: #fff;
  }
  .page-item.disabled .page-link {
      color: #fff;
      pointer-events: none;
      cursor: auto;
      background-color: #000;
      border-color: #dee2e6;
  }
  
  .page-link:hover {
      z-index: 2;
      color: #fff;
      text-decoration: none;
      background-color: #000;
      border-color: #dee2e6;
  }
  .page-link:focus {
      z-index: 3;
      outline: 0;
      box-shadow: none;
  }
  .view-hospital{
    margin-top: 1rem 
  }
  .view-hospital h2 {
      padding: 15px;
      text-transform: capitalize;
      border-bottom: 1px solid #3a3d4d;
  }

  .patient-detail {
      background-image: url(../image/back-img.png);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
  }
  .patient-hading {
      font-size: 1.2rem;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: left;
      color: #9fadb5;
      margin: 0px;
  }
  .patient-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #25293bd4;
  }
  .innr-patient h2{
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.18;
    letter-spacing: normal;
    text-align: left;
  }
  .rap-innr-patient{
    display: flex;
    justify-content: space-between;
  }
  .patient-box-crd {
      display: grid;
      grid-template-columns: 5fr 1fr;
      padding: 20px;
      background: #25293bd4;
  }
  .innr-patient {
      padding: 20px;
  }
  .green-clr{
      color: #09b19e;
  }
  .red-clr{
      color: #ff4c4c;
  }
  .orange-clr{
      color: #ffb500;
  }
  .gray-clr{
    color:#84867c
  }
  .innr-patient {
      border-bottom: 1px solid gray;
  }
  .height-box{
        height: 172px;
  }
  .rem-boder{
    border: 0px
  }

  
  .uppr-box-card {
    margin-bottom: 1rem;
}
  
.wrap-patient {
  margin-bottom: 1rem;
}
.innr-patient canvas {
  width: 100% !important;
}
.rap-innr-patient {
  border-bottom: 1px solid grey;
}
.remo-bord{
  border:none;
}

// alert msg
.alrt-dt {
  position: relative;
}
.alrt-bx-txt{
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

}
.imgaiert {
  width: 100px;
}
.txt-hd {
  color: #fff;
  text-transform: capitalize;
  font-size: 1.7rem;
  font-weight: 400;
  margin: 0px;
  margin-top: 13px;
  word-spacing: 10px;
  letter-spacing: 2px;
}
// .back-fl {
//   background: #000000a6 !important;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   z-index: 1;
// }
.flx-brk {
  margin: 0;
  margin: 1rem 0 1.7rem 0;
  justify-content: space-between;
}
.erroe-mssh {
  margin:0px;
  font-size: 10px;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 20px;
  color: #fff;
  background: red;
  padding: 3px 10px;
}
.msg-dc {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-left: 10px;
}
.imgaiert {
  width: 30px;
  height: 30px;
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
    .card-wrap-box {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      padding: 15px;
  }
  .patient-box-crd {
      display: grid;
      grid-template-columns: 1fr;
      padding: 15px;
      background: #25293bd4;
  }
  .patient-info {
    display: block;
    align-items: center;
    padding: 15px;
    background: #25293bd4;
}
.patient-hading {
  margin-bottom: 10px !important;
}
.patient-hading:last-child {
  margin-bottom: 0px !important;
}
  }
  
  @media (min-width: 481px) and (max-width: 991px) {
      .new-box-add {
      padding: 0 5px 0px 15px;
      display: grid;
      grid-template-columns: 1fr;
  }
  
    .card-wrap-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      padding: 15px;
  }
  
  }
  
  @media (min-width: 992px) and (max-width: 1326px) {
    .new-box-add {
      padding: 0 5px 0px 15px;
      display: grid;
      grid-template-columns: 1fr 1fr;
  }
    
  }
  
  
  
  @media (min-width: 2560px) {
    
  .container {
      max-width: 2500px;
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

        @media (min-width: 320px) and (max-width: 480px) {
  
          .flx-brk {
            margin: 0;
            margin: 1rem 0 1.7rem 0;
            display: block;
            text-align: left;
        }
        .msg-dc {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 10px;
          margin: 2rem 0;
      }
        .erroe-mssh {
          margin: 0px;
          font-size: 11px;
          font-weight: 400;
          text-transform: capitalize;
          line-height: 20px;
          color: #fff;
          background: red;
          padding: 3px 10px;
          margin-top: 1rem;
      }
        }
        @media (min-width: 1192px) and (max-width: 1347px) {
          .flx-brk {
            margin: 0;
          display:block;
          text-align: left;
        }
        .msg-dc {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 10px;
          margin: 2rem 0;
      }
        }
        @media (min-width: 999px) and (max-width: 1191px) {
          .flx-brk {
            margin: 0;
          display:block;
          text-align: left;
        }
        .msg-dc {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 10px;
          margin: 2rem 0;
      }
        }
        @media (min-width: 805px) and (max-width: 999px) {
          .flx-brk {
            margin: 0;
          display:block;
          text-align: left;
        }
        .msg-dc {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 10px;
          margin: 2rem 0;
      }
        }
        @media (min-width: 611px) and (max-width: 804px) {
          .flx-brk {
            margin: 0;
          display:block;
          text-align: left;
        }
        .msg-dc {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 10px;
          margin: 2rem 0;
      }
        }
        @media (min-width: 481px) and (max-width: 610px) {
          .flx-brk {
            margin: 0;
          display:block;
          text-align: left;
        }
        .msg-dc {
          display: grid;
          grid-template-columns: 1fr 1fr ;
          grid-gap: 10px;
          margin: 2rem 0;
      }
        }
`;