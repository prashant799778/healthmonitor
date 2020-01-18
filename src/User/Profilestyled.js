import styled from 'styled-components'

export const Profilestyled= styled.div`
.uppr-home-hading h2 span{
        color: #ff6a07;
}
.uppr-home-hading h2 {
    font-size: 1rem;
    line-height: 1.17;
    text-align: left;
    color:#9f9f9f;
    font-weight: 400;
}
.profile-img-box {
    width: 99px;
    height: 99px;
    border-radius: 50%;
    opacity: 0.15;
    background-color: #ffffff;
    margin: 0 auto;
}
.profile-card h3{
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.21;
    text-align: center;
    color: #c1c1c1;
    margin: 14px 0;
}
.profile-card h4 {
    font-size: .9rem;
    font-weight: 600;
    line-height: 1.17;
    text-align: center;
    color: #e76823;
    margin: 0px;
    margin-bottom: 13px;
}
.profile-card {
    background: #25293b;
    margin-top: 24px;
    padding: 32px;
}
.profile-info-sec {
    display: grid;
    grid-template-columns: 1fr 1fr;

}
.border-op{
    border-top: 1px solid #545454;
    padding: 21px 0 0 0;

}
.profile-info-sec h2{
    font-size: 1.1rem;
    line-height: 1.2;
    text-align: left;
    color: #a3a3a3;
    margin:0px;
    font-weight: 300;
    margin-bottom: 10px;
}
// new card design

.info-card{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 15px;
    margin-top: 24px;
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
    .box-title {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.29;
        color: #a4b1b5;
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
    .box-hading {
        font-size: 11px;
        font-weight: 500;
        line-height: 1.18;
        text-align: left;
        color: #9fadb5;
        border-bottom: 1px solid gray;
        padding: 9px;
    }
    .box-2 p {
        font-size: 7.5px;
        font-weight: 500;
        line-height: 1.2;
        text-align: left;
        color: #9fadb5;
        padding: 9px;
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


.wrap-container-ups {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
    }
.info-card:nth-child(2){
    border: 0px;
    }
    .side-bg-color {
        background: #25293b;
    }
    .wrap-profile-doc {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 15px;
    }
    h2.update-hading {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.15;
        text-align: left;
        color: #9fadb5;
        margin: 0px;
        border-bottom: 1px solid gray;
        padding: 15px;
        text-transform: capitalize;
    }
    .update-section-card {
        margin-top: 16px;
        background: #25293b;
        height: 305px;
    }


    // media query

    @media (min-width: 320px) and (max-width: 480px) {
        .wrap-profile-doc {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 15px;
        }
        .update-section-card {
            margin-top: 16px;
            background: #25293b;
            height: 305px;
            margin-bottom: 2rem;
        }
        .info-card:first-child {
            margin-top: 15px !important;
        }
        
        .info-card {
            margin: 0px !important;
        }
      }
      @media (min-width: 481px) and (max-width: 768px) {
  
        .wrap-profile-doc {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 15px;
        }
        .info-card:first-child {
            margin-top: 24px !important;
        }
        
        .info-card {
            margin: 0px !important;
        }
        .info-card:nth-child(2) {
            border: 0px;
            margin-top: 24px !important;
        }
        .profile-card {
            background: #25293b;
            margin-top: 24px;
            padding: 32px 12px 32px 12px;
        }
      }
`