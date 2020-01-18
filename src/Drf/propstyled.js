import styled from 'styled-components'

export const PropStyled = styled.div`
.selectize-control {
    position: relative;
    border-right: 1px solid #ccc;
}
.selectize-input{
    border:none !important;
}
.propf {
    display: flex;
    width:50%
    border: 1px solid lightgrey;
    margin-top: 6%;
    margin-left: 20%;
    box-shadow: 0 10px 21px -14px black;
    margin-bottom:6%;
}
.propf input {
    width: 65%;
    border: none;
    text-align: center;
}
// button.sbmt-btn {
//     padding-right: 27px;
// }
.sbmt-btn:hover {
    background:#ebebe4 !important;
    color:#000 !important;
}
.sbmt-btn {
    background-color: #cd381c !important;
    color: #fff !important;
    width: 20%;
}
.dealname {
    display: flex;
    border: 1px solid lightgrey;

    box-shadow: 0 10px 21px -14px black;
    width: 50%;
   
    margin-left: 20%;
}
.selectize-control.single .selectize-input, .selectize-control.single .selectize-input input {

    width: 200px;
}
.dealname input[type="number"] {
    width: 25%;
}
.dealname .selectize-input, .fmsWbO .selectize-control.single .selectize-input input {
    width: 150px;
}
.dealname p {
    width: 25%;
    position: relative;
    top: 9px;
}
.dealname [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    color: black;
    font-size: large;
}
.bdr-slt {
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
}
.del-inp {
    border: none;
    border-right: 1px solid #ccc;
    text-align: center;
}
.propf p {
    font-size: larger;
    font-family: inherit;
    margin-left: 0%;
    margin-top: 2%;
    width: 50%;
    margin-bottom: 2%;

}

button.sbmt-btn:active {
    background-color:  #cd381c !important;
    color: white !important;
}




`