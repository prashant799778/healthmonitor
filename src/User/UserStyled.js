import styled from 'styled-components'
export const UserStyled = styled.div`
   
.form-control:disabled, .form-control[readonly] {
    background-color: #26293b;
    opacity: 1;
  }   
.rw-multiselect-taglist {
    margin: auto;
    padding: 0;
    list-style: none;
    display: inline-block;
    vertical-align: top;
    outline: none;
}
.rw-list-option rw-state-focus{

    font-size:1rem;
    color:white;
}


.rw-list-option{
    font-size:1rem;
    color:white;

}

.rw-multiselect .rw-input-reset {
    height: calc(2.429em - 2px);
    margin-top: -2px\9;
    height: 2.429em\9;
    border-width: 0;
    width: inherit;
    max-width: 100%;
    padding: 0 .857em;
}  

.rw-list-option.rw-state-focus, .rw-list-option.rw-state-focus:hover {
    background-color: transparent;
    border-color: #66afe9;
    color: #fff;
}
.rw-widget-input.rw-widget-picker.rw-widget-container:hover {
    background: #1E1E2F;
}

li.rw-list-option:hover {
    background: #1E1E2F;
    color:white
} 
.rw-list {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 1em;
    outline: 0;
    overflow: auto;
    max-height: 200px;
    background: #26293B !important;
}

.rw-multiselect>.rw-widget-picker {
    height: auto;
    background: #1E1E2F;
}



input.fom-wd {
    
    text-transform: none !important;
    
}
 .text10{
     font-size:10px
 }
.hubs{ margin: 44px;   padding-top: 12px;
    padding-bottom: 12px;
    background: #26293B;
    color: aliceblue;}
    .hubsLine{       background: white;
        height: 1px;
        margin-left: 4px;
        margin-right: 4px;
        margin-top: 5px;
        margin-bottom: 5px;}

    .hubsNumber{font-size: 38px;
        margin-top: 10px;
        margin-bottom: 5px;}
button.clk {
    background: #E96729 !important;
    border: none;
    border-radius: 3px;
    padding-left: 8px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 15px;
    font-weight: 600;
    outline:none;
}
::placeholder {
    font-size:1rem;
    font-weight:400;
    color:"#FFFFFF"

    opacity: 1; /* Firefox */
  }
  input, select, textarea,option{
    color: #ffffff;
     background:    #1E1E2F;

}
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    font-size:1rem;
    font-weight:400
  }
  
  ::-ms-input-placeholder { /* Microsoft Edge */
    font-size:1rem;
    font-weight:400
  }
.btn-bx button {
    padding: 7px 15px !important;
    font-size: 1.2rem !important;
    text-transform: capitalize;
    font-weight: 600;
  
    
}
.btn-bx button:focus {
    border-color:#E96729 !important;
    outline: none;
}
a:hover {
    color: #ffffff;
    text-decoration: none;
}
button.btn.btn-secondary.clks.dropdown-toggle {
    background: transparent;
    border: none;
}
.card-body.drf-vi.side-by-side {
    display: flex;
    justify-content: space-between;
}
.sbmtbtn {
    background: transparent;
   color:white;
   border-radius:3px;
   border:none;
    margin: 1%;
    padding: 0.5%;
}
.table-responsive {
   
    padding-bottom: 2%;
   
}
table#dataTable thead tr {
    border-top: 1px solid #dee2e6;
}
.innr-table thead tr:nth-child(odd){
    background: #26293B;
    border:red;
}
.innr-table tbody tr:nth-child(even){
    background: #26293B;
}
.innr-table tbody tr:nth-child(odd){
    background: #26293B;
}
.save-btn {
    background: transparent;
    border: none;
    margin: 7px;
    padding: 5px;
}

// .card-body {
    
//     padding: 1.25rem !important;
// }
ul.nav li.dropdown:active > ul.dropdown-menu {
    display: block;    
}

.col-sm-12.col-md-3.news {
    margin-top: 37px;
    padding-left: 0px !important;
    padding-right: 0px !important;
    margin-left: -110px !important;
}




// add new css



.container-box{
    margin-top: 18px;
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
  .box-hadingg{
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.18;
    text-align: left;
    color: #9fadb5;
    margin: 0px;
}

.border-bottomm{
    border-bottom: 1px solid gray;
  }
  .box-bg-color{
    background: #25293b;
}
@media (min-width: 320px) and (max-width: 480px) {
    .box-container {
        margin-bottom: 1rem;
    }
  }

  .table-bordered td, .table-bordered th {
    border: 0px !important;
}
.card-body tbody tr:nth-child(odd) {
    background: #1e1e2f !important;
}
table#dataTable thead tr {
    border-top: 0px !important;
}
.innr-table thead tr th {
    text-transform: capitalize;
    font-weight: 600;
    font-family: sans-serif;
    text-align: left;
    color: #9fadb5 !important;
    font-size: 12px;
}
.innr-table tbody tr td {
    font-size: 17px;
    font-weight: 100;
    text-transform: capitalize;
    position: relative;
    font-family: sans-serif;
    font-size: 14px;
    color: #9fadb5 !important;
}


/* add hubs*/
.text-hd{
    font-size: 12.5px;
    font-weight: 500;
    line-height: 1.2;
    color: #9fadb5;
    margin: 0px;
    text-align:left;
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




/*Add hospital*/
    .add-info {
      display: grid;
      grid-template-columns: 3fr 3fr 3fr 1fr;
      grid-gap: 2rem;
      width: 100%;
      padding: 0 9px;
    }
    .info-box .form-group .form-control {
        background: #4c4f5e !important;
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
        line-height: 1.19;
        letter-spacing: 0.64px;
        text-align: left;
        color: #a3a3a3;
        margin: 15px 0 !important;
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
.page-hadding h2 {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.17;
    text-align: left;
    color: #ff6a07;
    margin: 0px;
}
.page-hadding h3 {
    font-size: 10.5px;
    line-height: 1.19;
    text-align: left;
    color: #9f9f9f;
    margin: 10px 0;
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
.info-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0px 15px;
}
.add-btn:focus {
    /* border: none; */
    outline: none;
}
/* End Add Hospital*/

span.d-act {
    border: 1px solid red;
    background: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
}
span.act {
    border: 1px solid green;
    background: green;
    color: #fff;
    padding: 5px 19px;
    border-radius: 20px;
}

@media (min-width: 320px) and (max-width: 480px) {

    .card-wrap-box {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      padding: 15px;
  }
  .info-box {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0px 15px;
}
  }
  @media (min-width: 481px) and (max-width: 991px) {
    .card-wrap-box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
        padding: 15px;
    }
}
`