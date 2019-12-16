import styled from 'styled-components'

export const StyledDrf = styled.div`
.hRqjms .tab-content {
    background: #fdfdfd;
    line-height: 25px;
    padding: 10px 10px !important;
    /* display: none; */
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
    margin-top: 1rem;
}

.card-body.drf-vi.side-by-side {
    display: flex;
    justify-content: space-between;
}
.table-responsive-sm {
    margin-right: 10px;
}
.input-box {
    width: 30%;
    display: inline-block !important;
    position: absolute;
    right: 20px;
    background: white;
 
}
td.autho {
    max-width: 260px !important;
}
.innr-table thead tr th {
   
    text-align: center !important;
    // padding: 3px 15px;
  
}
.innr-table tbody tr td {
    
    text-align: center;
    //  padding: 3px 15px;
}
.authority {
    column-count: 2;
    text-align: left;
    font-size: 12px;
    column-gap: 0px;
}
.authority p {
    margin-bottom: 5px;
}

td.status p {
   
    border-radius: 20px;
    color: #ffffff;
    font-size: 12px;
    margin-top: 8px;
    padding: 4px 0px;
    box-shadow: 0px 7px 10px -6px #252525;
    width:76px;
    display:inline-block;
}
div#abcd {
   
    height: 337px;
    overflow: hidden;
    scroll-behavior: auto;
}
 button.btn.btn-primary {
    background: #454f63;
    padding: 4px 4px;
    font-size: 12px;
    margin-top: 8px;
    width: 74px;
    border-radius: 20px;
    border: 1px solid #454f63;
    text-transform: capitalize;
    
}
.picturebox p {
    
    margin: 0 10px 0 10px;
}
.picturebox img {
    width: 130px;
    height: 160px;
    object-fit: fill;
}














@media (max-width: 768px) {
    .carousel-inner .carousel-item > div {
        display: none;
    }
    .carousel-inner .carousel-item > div:first-child {
        display: block;
    }
}

.carousel-inner .carousel-item.active,
.carousel-inner .carousel-item-next,
.carousel-inner .carousel-item-prev {
    display: flex;
}

/* medium - display 4  */
@media (min-width: 768px) {

    .carousel-inner .carousel-item-right.active,
    .carousel-inner .carousel-item-next {
      transform: translateX(25%);
    }
    
    .carousel-inner .carousel-item-left.active, 
    .carousel-inner .carousel-item-prev {
      transform: translateX(-25%);
    }
}

/* large - display 6 */
@media (min-width: 992px) {
    
    .carousel-inner .carousel-item-right.active,
    .carousel-inner .carousel-item-next {
      transform: translateX(16.666%);
    }
    
    .carousel-inner .carousel-item-left.active, 
    .carousel-inner .carousel-item-prev {
      transform: translateX(-16.666%);
    }
}

.carousel-inner .carousel-item-right,
.carousel-inner .carousel-item-left{ 
  transform: translateX(0);
}
`