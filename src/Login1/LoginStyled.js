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
`