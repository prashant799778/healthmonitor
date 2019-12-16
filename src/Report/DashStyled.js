import styled from 'styled-components'

export const DashStyled = styled.div`






.fil-select {
  background: #26293b;
  color: #b1b1b5;
    margin-bottom: .5rem;
    text-transform: capitalize;
    font-size: 1.125rem;
    font-weight: 700;
}



.new-background-color{
  background: #26293b;
}
.upper-card-hading{
    color: #b1b1b5;
    margin-bottom: .5rem;
    text-transform: capitalize;
    font-size: 1.125rem;
    text-align: left;
    padding: 10px 0;
}
.border-bt {
  border-bottom: 1px solid #313452;
}
.card {
  background: none;
  margin-bottom: 15px;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0px 15px;
}
.inner-box-detail {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
}
.device-info:last-child {
  margin: 0px;
}
.device-info h2{
  text-align:left;
  font-size:14px;
  font-weight:600;
  line-height:20px;
  margin:0px;
 
}
.color-gr{
  color:#13c313de;
  
}
.color-red{
  color:#d02408de;

}
.color-yellow{
  color:#e4e649f2;
}
.color-white{
  color:#fff;
}
.device-info {
  margin-bottom: 1rem;
  border-bottom: 1px solid #313452;
}
.side-device-info h2{
  font-size:14px;
  font-weight:600;
  line-height:20px;
  margin:0px;
 
}
.device-box:first-child {
  border-right: 1px solid  #313452;
  padding-right: 10px;
}
.side-device-info p {
  margin: 0px;
  font-size:14px;
  font-weight:700;
}
.side-device-info {
  border-bottom: 1px solid #313452;
  margin-top: 10px;
  padding-bottom: 10px;
}
.wrap-both-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.side-device-info:last-child {
  border: none;
}
.wrap-all-container-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
@media (min-width: 320px) and (max-width: 480px) {
  .wrap-both-box {
    display: grid;
    grid-template-columns: 1fr;
}
  
}
















  /* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/

@media (min-width: 1281px) {
    
.home-page{
    height: 76vh;
}
// .cardbox{
//     height:35vh;
// }
  
}

/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {
  
    .home-page{
        height: 76vh;
    }
    // .cardbox{
    //     height:35vh;
    // }
  
}

/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) {
  
  //CSS
  
}

/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  

  
}

/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {

  
}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {
  

  
}




`


;