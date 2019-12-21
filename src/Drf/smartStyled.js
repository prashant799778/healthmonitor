import styled from 'styled-components'

export const SmartStyled = styled.div`
.data-box .table {
    margin: 0px;
}


.data-box {
margin-right: 3px;
padding-bottom:10px;
}
.data-box .table thead th {
    vertical-align: bottom;
    border-bottom: 0px;
}
.data-box .table td, .table th{
    border-top:	0px;
}
.data-box td {
    /* padding: 2.8px; */
    border: 1px solid #b5b5b5;
    transition: 0.5s;
    background:#fff;
    padding: 4px 4px;
}
.data-box th, td {
    font-size: 12px;
    font-weight: 600;
}
.data-box tbody tr td:hover button.btn-edt {
    color: #fff !important;
    font-weight: 600;
    outline:none;
}

.info-hading tr th {
    padding: 0px 4px;
}

.rap-table {
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    margin-bottom: 2rem;
    margin-top: 2rem;
    justify-content: space-around;
    display: -webkit-box;
}


.info-hading h2 {
    font-size: 13px;
    margin: 0px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 3px;
    color: #fff;
}
.info-hading tr th:hover {
    background: black;
}
span.final {
    padding: 4px 4px;
    font-size: 12px;
    font-weight: 600;
}
.info-hading {
    background: #9a1c1b;
    padding: 2px 0px;
}
.spac {
    margin-top: 22px;
}
.info-hading tr th {
    color: #fff;
    text-align: center;
    text-transform: uppercase;
}
.spac tr th {
    padding: 0px 10px;
}
.hnd tr th {
    color: #9b291c !important;
}
.hnd tr th:hover {
    background: #9b291c !important;
}
.data-box td:hover {
    transform: scale(1.2);
    cursor: pointer;
    background: #000;
    color: #fff;
    transition: 0.5s;
}
.data-box{
    cursor:pointer;
}

@media (min-width: 481px) and (max-width: 786px) {
  
    .dp-wrp{
        display:block !important;
    }
    .rap-table{
        justify-content:unset;
        overflow: hidden;
    overflow-x: scroll;
      }
      .drp-rap {
        overflow: hidden;
        overflow-x: scroll;
    }
    .ui.selection.dropdown {
        min-width: 7em;
    }
  }
   .rap-table{
justify-content:unset;
    overflow: hidden;
overflow-x: auto;
margin-bottom: 2rem;
    margin-top: 2rem;
    ::-webkit-scrollbar {
        width: 2em;
        height: .5em
    }
    .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
        padding: 1px;
        line-height: 1.42857143;
        
    }


  }


  

`;