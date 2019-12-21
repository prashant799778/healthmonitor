import styled from 'styled-components'

export const LoginStyled = styled.div`
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
button.small {
    background: transparent;
    border: none;
    outline:none;
}
.aslog button {
    display: block;
    width: 100% !important;
    padding: 10px !important;
    font-weight: 900 !important;
    background: #a62d24 !important;
    border-color: #a02b1b !important;
}
.btn-forget-c {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    color: #912511 !important;
}
.btn-forget-c .next-cl {
    background: #942612 !important;
    color: #fff !important;
    width: 100% !important;
    border-color: #942612 !important;
}

.next-cl {
    padding: 5px 17px !important;
    border-radius: 0px !important;
    background: transparent !important;
    color: #0062cc !important;
    font-weight: 600;
    font-size: 1rem !important;
    margin-left: 10px;
}
.forget-hd p {
    margin: 0px;
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 20px;
    margin-bottom: 1.5rem;
}
.ext-spce {
    margin: 6rem 0;
}
.forget input {
    border-radius: 0px !important;
}
.forget-hd {
    text-align: left;
}
.btn-forget-c {
    text-align: right;
}

.p-5 {
    padding: 3rem 4rem!important;
}
.btn-block {
   
    border-radius: 0px !important;
}




// add new css

.sign-container {
   
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.innr-container-sign {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.rwap-box {
  width: 400px;
  background: #29333d91;
  padding: 2rem;
}
.upper-title {
text-align: center;
font-size: 1.5rem;
color: #c1c1c1;
text-transform: capitalize;
font-weight: 400;
margin-bottom: 0px;
}
.logo-title {
font-size: 1.6rem;
color: #c1c1c1;
text-align: center;
margin-bottom: 2rem;
text-transform: capitalize;
font-weight: 400;
}
.form-container .form-control {
background: #3b4654;
border: none;
border: 1px solid #455262;
color: #c1c1c1;
cursor: pointer;
}
.form-container .form-control::placeholder {
text-transform: capitalize;
font-size: 14px;
font-weight: 500;
color: #636e6e;
}
.form-container .form-control:focus {
outline: none;
box-shadow: none;
}
.form-container {
  margin-top: 2rem;
}
/* Checkbox*/
.check-info {
padding: 10px 0px;
background: transparent;
margin-bottom: 7px;
}
.span_pseudo, .chiller_cb span:before, .chiller_cb span:after {
content: "";
display: inline-block;
background: #fff;
width: 0;
height: 0.2rem;
position: absolute;
transform-origin: 0% 0%;
}

.chiller_cb {
position: relative;
display: flex;
align-items: center;
}
.chiller_cb input {
display: none;
}
.chiller_cb input:checked ~ span {
background: #e76823;
border-color: #e76823;
}
.chiller_cb input:checked ~ span:before {
width: 10px;
height: 2px;
transition: width 0.1s;
transition-delay: 0.3s;
}
.chiller_cb input:checked ~ span:after {
width: 0.4rem;
height: 0.15rem;
transition: width 0.1s;
transition-delay: 0.2s;
}
.chiller_cb input:disabled ~ span {
background: #ececec;
border-color: #dcdcdc;
}
.chiller_cb input:disabled ~ label {
color: #dcdcdc;
}
.chiller_cb input:disabled ~ label:hover {
cursor: default;
}
.chiller_cb label {
padding-left: 2rem;
position: relative;
z-index: 2;
cursor: pointer;
margin-bottom:0;
color: #c1c1c1;
font-size: 14px;
font-weight: 500;
}
.chiller_cb span {
display: inline-block;
width: 14px;
height: 14px;
border: 1px solid #ccc;
position: absolute;
left: 0;
transition: all 0.2s;
z-index: 1;
box-sizing: content-box;
background: #fff;
}
.chiller_cb span:before {
transform: rotate(-55deg);
top: 11px;
left: 5px;
}
.chiller_cb span:after {
transform: rotate(35deg);
bottom: 4px;
left: 2px;
}
.check-rap-box .check-info .chiller_cb label{
font-size: 14px;
line-height: 1.57;
text-align: left;
color: #515151;
font-weight: 400;
}
.nxt-btn button {
background: #ffcb55;
border: none;
padding-left: 20px !important;
padding: 5px 5px;
border-radius: 22px;
color: #fff;
text-transform: capitalize;
font-weight: 500;
font-size: 1rem;
}
.nxt-btn button:focus {
outline: none;
}
.nxt-btn.text-right button img {
width: 13px;
margin-left: 2rem;
}
.nxt-btn {
margin-top: 22px;
}
/* Check box End*/
.btn-cust:focus {
box-shadow: none;
}
.btn-cust {
background: #e76823;
color: #fff !important;
border-radius: 4px;
margin-top: 2.5rem;
margin-bottom: 0px;
}
.forget-pass img {
width: 15px;
}
.forget-pass {
margin-top: 1rem;
}
.forget-pass span {
font-size: 14px;
font-weight: 500;
color: #c1c1c1;
vertical-align: middle;
margin-left: 9px;
text-transform: capitalize;
}
`