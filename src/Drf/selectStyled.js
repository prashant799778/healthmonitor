import styled from 'styled-components'

export const SelectStyled = styled.div`
  


.chosen-select {
    width: 100%;
  }
  
  .chosen-container {
    display: inline-block;
    font-size: 14px;
    position: relative;
    vertical-align: middle;
  }
  .chosen-container .chosen-drop {
    background: #ffffff;
    border: 1px solid #cccccc;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    -webkit-box-shadow: 0 8px 8px rgba(0, 0, 0, .25);
    box-shadow: 0 8px 8px rgba(0, 0, 0, .25);
    margin-top: -1px;
    position: absolute;
    top: 100%;
    left: -9000px;
    z-index: 1060;
  }
  .chosen-container.chosen-with-drop .chosen-drop {
    left: 0;
    right: 0;
  }
  .chosen-container .chosen-results {
    color: #555555;
    margin: 0 4px 4px 0;
    max-height: 240px;
    padding: 0 0 0 4px;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .chosen-container .chosen-results li {
    display: none;
    line-height: 1.42857143;
    list-style: none;
    margin: 0;
    padding: 5px 6px;
  }
  .chosen-container .chosen-results li em {
    background: #feffde;
    font-style: normal;
  }
  .chosen-container .chosen-results li.group-result {
    display: list-item;
    cursor: default;
    color: #999;
    font-weight: bold;
  }
  .chosen-container .chosen-results li.group-option {
    padding-left: 15px;
  }
  .chosen-container .chosen-results li.active-result {
    cursor: pointer;
    display: list-item;
  }
  .chosen-container .chosen-results li.highlighted {
    background-color: #428bca;
    background-image: none;
    color: white;
  }
  .chosen-container .chosen-results li.highlighted em {
    background: transparent;
  }
  .chosen-container .chosen-results li.disabled-result {
    display: list-item;
    color: #777777;
  }
  .chosen-container .chosen-results .no-results {
    background: #eeeeee;
    display: list-item;
  }
  .chosen-container .chosen-results-scroll {
    background: white;
    margin: 0 4px;
    position: absolute;
    text-align: center;
    width: 321px;
    z-index: 1;
  }
  
  .chosen-container .chosen-results-scroll-down {
    bottom: 0;
  }
  
  .chosen-container-single .chosen-single {
    background-color: #ffffff;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding;
    background-clip: padding-box;
    border: 1px solid #797979;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    color: #555555;
    display: block;
    height: 34px;
    overflow: hidden;
    line-height: 34px;
    padding: 0 0 0 8px;
    position: relative;
    text-decoration: none;
    white-space: nowrap;
  }
  .chosen-container-single .chosen-single span {
    display: block;
    margin-right: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chosen-container-single .chosen-single abbr {
    background: url("chosen-sprite.png") right top no-repeat;
    display: block;
    font-size: 1px;
    height: 10px;
    position: absolute;
    right: 26px;
    top: 12px;
    width: 12px;
  }
  .chosen-container-single .chosen-single abbr:hover {
    background-position: right -11px;
  }
  .chosen-container-single .chosen-single.chosen-disabled .chosen-single abbr:hover {
    background-position: right 2px;
  }
  .chosen-container-single .chosen-single div {
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 18px;
  }
  .chosen-container-single .chosen-single div b {
    background: url("chosen-sprite.png") no-repeat 0 7px;
    display: block;
    height: 100%;
    width: 100%;
  }
  .chosen-container-single .chosen-default {
    color: #777777;
  }
  .chosen-container-single .chosen-search {
    margin: 0;
    padding: 3px 4px;
    position: relative;
    white-space: nowrap;
    z-index: 1000;
  }
  .chosen-container-single .chosen-search input[type="text"] {
    background: url("chosen-sprite.png") no-repeat 100% -20px, #ffffff;
    border: 1px solid #cccccc;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    margin: 1px 0;
    padding: 4px 20px 4px 4px;
    width: 100%;
  }
  
  .wrap-drpd {
      display: flex;
  }
  
  .wrap-drpd ul {
      padding: 0px;
      margin: 0px;
      list-style: none;
  }
  .wrap-drpd li {
      display: inline-block;
  }
  .chosen-container {
      width: 160px !important;
      margin-right: 17px;
  }
  span.hading-side {
      font-size: 15px;
      text-transform: capitalize;
      font-weight: 500;
  }
  
  @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 144dpi) {
    .chosen-rtl .chosen-search input[type="text"],
    .chosen-container-single .chosen-single abbr,
    .chosen-container-single .chosen-single div b,
    .chosen-container-single .chosen-search input[type="text"],
    .chosen-container-multi .chosen-choices .search-choice .search-choice-close,
    .chosen-container .chosen-results-scroll-down span,
    .chosen-container .chosen-results-scroll-up span {
      background-image: url("chosen-sprite@2x.png") !important;
      background-size: 52px 37px !important;
      background-repeat: no-repeat !important;
    }
  }


`