import styled from 'styled-components'
export const UserStyled = styled.div`


input.fom-wd {
    
    text-transform: none !important; 
    
}
button.clk {
    background: blue;
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
    font-weight:400
    opacity: 1; /* Firefox */
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
    border-color:#4e72df !important;
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
    background: #ffffff;
    border:red;
}
.innr-table tbody tr:nth-child(even){
    background: #f2f2f2;
}
.innr-table tbody tr:nth-child(odd){
    background: #ffffff;
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


`