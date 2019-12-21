import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar';
import history from '../History';
import {UserStyled} from '../User/UserStyled';
import plus from './plus.svg';
import minus from './negative.svg';




class New2 extends React.Component{

  constructor(){
    super()
        this.state={
          isList:true,
          err:'',
          email:'',isBar:true,
       
isValid:true,emailError:false,

         typeList:'',
         userList:'',
         isEdit:false,
         deleteid:'',
         Area:"",
         label:"",id:"",
         type:"",values:[""],openDrop:false,openText:false,newInput:["abcd"],fields:""
        }
  }
  deletes=(id)=>{
    this.setState({id:id})
  }
  delete=()=>{
    let api="http://134.209.153.34:5004/New_Fields_delete?_id="+this.state.id
    axios.get(api)
  .then((response)=> {
    // handle success
  
   
    if(response){
    
      if(response && response.data && response.data.status==="True"){
      
         this.callapi() 
      
      }else{
      
        
      }
    }

    
  })
  .catch( (error)=> {
    // handle error
    
  })
}





edit=(item)=>{
console.log(item)
this.setState({
    isList:false,
    isEdit:true,
    id:item["_id"],
    fields:item["Input Area"],
    type:item["Input Type"],
    label:item["Label Name"],
    values:item["Values"]

},()=>{
    if(this.state.type=="Text"){
        this.setState({openText:true,openDrop:false},()=>{
            console.log(this.state.values,this.state.openText,this.state.openDrop)  
        })
    }
    else if(this.state.type=="Dropdown"){
        this.setState({openDrop:true,openText:false},()=>{
            console.log(this.state.values,this.state.openText,this.state.openDrop)  
        })
        
    }
    
})
}









// Adding New Fields
addInputField=(e)=>{
    e.preventDefault()
    let values = [...this.state.values]
values.push("")
this.setState({values})
console.log(this.state.values)
}
removeInputField=(e)=>{
    e.preventDefault()
    let values = [...this.state.values]
values.pop()
this.setState({values})
console.log(this.state.values)
}


// Storing Input Values
addInputvalues=(e,i)=>{
    console.log(e.target.value,i)
let values = [...this.state.values]
values[i]= e.target.value
this.setState({values},()=>{
    console.log(this.state.values)
})

}

    dash=()=>{
        this.props.history.push("/home")
      }
      user=()=>{
        this.props.history.push("/user")
      }
      drf=()=>{
        this.props.history.push("/drf")
      }
      role=()=>{
        this.props.history.push("/role")
      }
      report=()=>{
        this.props.history.push("/report")
      }
    

// Selecting the input type(text or dropdown)
    selectType=(e)=>{
this.setState({type:e.target.value},()=>{
    console.log("2222",this.state.type)
    if(this.state.type=="Text"){
        this.setState({openText:true,openDrop:false,values:[""]})
    }
    else if(this.state.type=="Dropdown"){
        this.setState({openDrop:true,openText:false})
    }
    })

}




selectFields=(e)=>{
    this.setState({fields:e.target.value},()=>{
        console.log("2222",this.state.fields)
      
        
        })
    
    }











// to change or add the new fields
  submitHandler=(e)=>{
   e.preventDefault()
   console.log(this.state.isEdit)
  
  
    if(this.state.isEdit){
      this.updatetapi()
    }
    else {
      this.submitApi()
    }
  }





  componentDidMount(){
    this.callapi()
   
  }


  reset=()=>{

    this.setState({
      fields:'',
      label:'',
      type:'',
     values:[""],openText:false,openDrop:false
    })
  }
     callapi=()=>{
       
       this.setState({isList:true,isEdit:false})
      let api="http://134.209.153.34:5004/New_Fields_select"
       axios.get(api)
     .then((response)=> {
       // handle success
       
      
       if(response){
         
         if(response && response.data  && response.data.status==="True"){
         
          
           
      
 
          this.setState({userList:response.data["result"]},()=>{
              console.log("aaasasas",this.state.userList)
          })
         }else{
         
           
         }
       }
   
       
     })
     .catch( (error)=> {
       // handle error
       })
 }
   // loading the label name
  labelHandler=(e)=>{
    this.setState({label:e.target.value},()=>{
        console.log("2222",this.state.label)
      
        
        }) 
  }
  
   
      
    
    submitApi=()=>{
    

      
     let api="http://134.209.153.34:5004/addField"
     let json={
       "Input Area":this.state.fields,
       "Label Name":this.state.label,
       "Input Type":this.state.type,
       "Values":this.state.values,
       
     }
     
      axios.post(api,json)
    .then((response)=> {
      // handle success
     
     
      if(response){
        
        if(response && response.data && response.data.status==="True"){
        
alert("Fields Created Successfully")
          this.callapi()




        }else{
        
          this.setState({err:response.data.result}) 
        }
      }
  
      
    })
    .catch( (error)=> {
      // handle error
      this.setState({err:"somethimg goes wrong!"}) 
      
    })
   
   }

    updatetapi=()=>{
      
     
     let api="http://134.209.153.34:5004/edit_new_fields"
     let json={
         "_id":this.state.id,
        "Input Area":this.state.fields,
        "Label Name":this.state.label,
        "Input Type":this.state.type,
        "Values":this.state.values,
        
      }
   console.log(json)
      axios.post(api,json)
    .then((response)=> {
      // handle success
        
     
      if(response){
       console.log(response.data)
        if(response.data.status=="true"){
        
          alert("Data Updated Successfully")
          this.setState({err:""})
          this.callapi()


        }else{
     
          this.setState({err:response.data.result}) 
         
        }
      }
  
    })
    .catch( (error)=> {
      // handle error
      alert("aa22")
      this.setState({err:"somethimg goes wrong!"}) 
     
    })
 }
    render() {
      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        history.push("/")
      }
     let users=[]
       if(this.state.userList!=""){
         users=this.state.userList
       }
  let types=[]
  if(this.state.typeList!=""){
    types=this.state.typeList
  }
      
      return (
        <UserStyled>
        <div>
          {/* Page Wrapper */}
          <div id="wrapper">
            {/* Sidebar */}
            { this.props.isOpen  &&   <SideBar></SideBar>}

           
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* Main Content */}
              <div id="content">
                {/* Topbar */}
             <AppBar  Open={this.props.Open}></AppBar>
                {/* End of Topbar */}
                {/* Begin Page Content */}
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="wrap-had">
                        <button  style={{    cursor: "pointer"}}  className="clk" onClick={()=>{this.setState({
                           
                            label:"",id:"",
                            type:"",values:[""],fields:"",
                            error1:'',err:"",emailError:false,openDrop:false,openText:false,
                          isList:this.state.isList?false:true,isEdit:this.state.isList?false:this.state.isEdit})
                          }}>
            {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Field</span>}
            
            {!this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
          {!this.state.isList &&      <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                     <form onSubmit={this.submitHandler}> <div className="adduser fadeInLeft animated"> {/* Card user */}              
                        <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                            Add New Fields
                          </h6>
                      
                        </div>
                        {/* <div className="info-headding">
                          <h6 className="m-0 text-black">BD Information</h6>
                          <span className="line" />
                        </div> */}

                        <div className="col-sm-12 col-md-12  ">
                          <div className="container form-box">
                            <div className="row">
                            <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="gender-info">Input Area</label>
                                <select required  value={this.state.fields} onChange={this.selectFields}  className="form-control fom-hit" id="gender-info">
                                  <option value="">Choose Fields </option>
                                  <option value="Property_Basic_Details">Property Basic Details</option>
                                  <option value="Property_And_Owner_Info">Property and Owner Info</option>
                                  <option value="Investment_Info">Investment and Finance</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Label Name</label>
                                <input required  className="fom-wd" type="text" name placeholder="Label Name" value={this.state.label} onChange={this.labelHandler}/>
                               
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div>
                               <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="gender-info">Input Type</label>
                                <select required   className="form-control fom-hit" value={this.state.type} onChange={this.selectType}>
                                  <option value="">Choose Type</option>
                                  <option value="Text">Text</option>
                                  <option value ="Dropdown">Dropdown</option>
                             
                                </select>
                              </div>
                              <div className="clearfix" />
                             

                            </div>
                            
                                {this.state.openText && 
                                <div className="row">
                                <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Dropdown values</label>
                                <input className="fom-wd" type="text" name placeholder="Values..." value={this.state.values[0]} onChange={(e)=>{this.addInputvalues(e,0)}} />
                               </div>
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                              
                               <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                { <button type="submit" className="form-btn sbmtbtn" style={{background:"#4e72df",borderColor:"#4e72df"}} > {this.state.isEdit ? "update" :"save" } </button>}
                                <button style={{background:"#cc7564",borderColor:"#cc7564"}}  className="form-btn sbmtbtn" type="reset" onClick={()=>{this.reset()}}>Reset</button>
                                  </div></div>
                               </div>}

                               {this.state.openDrop && 
                                 <div className="row">
                                     { this.state.values.map((item,i)=>{
return(
    <div className="col-sm-12 col-md-3 innr-bx" id={i}>
                                     <label className="title-fom">Dropdown value:{i+1}</label>
    <input  className="fom-wd" type="text" name placeholder="Values..." value={this.state.values[i]} onChange={(e)=>{this.addInputvalues(e,i)}} />
   
   </div>
)
                                     })}
                               
                                <div className="col-sm-12 col-md-3 news ">
                                <div className="btn-bx-add">
                                <button type="button" style={{background:"transparent",border:"none",outline:"none"}} onClick={this.addInputField}><img className="plus-img" src={plus}style={{width:"25px"}} alt=""></img></button>
                                <button type="button" style={{background:"transparent",border:"none",outline:"none"}} onClick={this.removeInputField}><img className="plus-img"  src={minus} style={{width:"25px"}}alt=""></img></button>
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div></div>
                               <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                { <button type="submit"   className="form-btn sbmtbtn" style={{background:"#4e72df",borderColor:"#4e72df"}} > {this.state.isEdit ? "update" :"save" } </button>}
                                <button style={{background:"#cc7564",borderColor:"#cc7564"}}  className="form-btn sbmtbtn" type="reset" onClick={()=>{this.reset()}}>Reset</button>
                                  </div></div>
                               

                              </div> }

                              
                            

                          </div>
                        </div>
                      </div> </form>{/* End Card user */}
                    </div>
                  </div>
                </div>
               
                            }
               
               
               {/* table data */}
               {this.state.isList &&     <div className="container-fluid tbl-b animated--grow-in adduserr">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="card mb-4">
                        <div className="card-header py-3 d-flex justify-content-between">
                          <h6 className="m-0 text-black">Added Data</h6>
                          {/* <div className="icon-bx">
                            <ul>
                              <li><i className="fas fa-chevron-down" /></li>
                              <li><i className="fas fa-sync" /></li>
                              <li><i className="fas fa-times" /></li>
                            </ul>
                          </div> */}
                        </div>
                        <div className="card-body">
                          <div className="table-responsive srt">
                            <table className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                              <thead>
                                <tr >
                                  <th style={{textAlign:"center"}}>Input Area</th>
                                  <th style={{textAlign:"center"}}>Label Name</th>
                                  <th style={{textAlign:"center"}}>Input Type</th>
                                  <th style={{textAlign:"center"}}>Input Values</th>
                                 
                                  <th style={{textAlign:"center"}} className="dlt">Action</th>
                                </tr>
                              </thead>
                              {/* <tfoot>
                                <tr>
                                  <th>Name</th>
                                  <th>Position</th>
                                  <th>Office</th>
                                  <th>Age</th>
                                  <th>Start date</th>
                                  <th>Action</th>
                                </tr>
                              </tfoot> */}
                              <tbody>
                                <tr></tr>
                      {Array.isArray(this.state.userList) ?  
                     this.state.userList.map((item,i)=>{
                         if(item["Input Type"] == "Text"){
                             return(
            <tr id={i}>
                                <td>{item["Input Area"] == "Property_Basic_Details" ? "Property Basic Details" : item["Input Area"] == "Property_And_Owner_Info" ? "Property and Owner Info" : "Investment and Finance"}</td>
                                  <td>{item["Label Name"]}</td>
                                  <td >
                                  {item["Input Type"]}
                                  </td>
                                
                                
                                  <td style={{width:"20%"}}>  <input style={{textAlign:"center"}} disabled   className="fom-wd" type="text" name  value={item["Values"][0]} /></td>
                                  <td>
                                    <div className="action-bx">
                                      <ul>
                                       
                                        <li onClick={()=>{this.edit(item)}}><i className="far fa-edit" /></li>
                                        <li  onClick={()=>{this.deletes(item["_id"])}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li>
                                      </ul>
                                    </div>  
                                  </td>
                                </tr>
                             )
                         }

                         else if(item["Input Type"] === "Dropdown"){
                             return(
<tr id={i}>
<td>{item["Input Area"] == "Property_Basic_Details" ? "Property Basic Details" : item["Input Area"] == "Property_And_Owner_Info" ? "Property and Owner Info" : "Investment and Finance"}</td>
                                  <td>{item["Label Name"]}</td>
                                  <td >
                                  {item["Input Type"]}
                                  </td>
                                
                                  <td>
                                  <select      className="form-control fom-hit" value={this.state.type} onChange={this.selectType}>
                                  <option   value="">Choose Type</option>
                                  {
                                      item["Values"].map((value,j)=>{
                                          return(
                                          <option  >{value}</option>
                                          )
                                       
                                      })
                                  }
                                  </select> 
                                  </td>
                                  <td>
                                    <div className="action-bx">
                                      <ul>
                                       
                                        <li onClick={()=>{this.edit(item)}}><i className="far fa-edit" /></li>
                                        <li  onClick={()=>{this.deletes(item["_id"])}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li>
                                      </ul>
                                    </div>  
                                  </td>
                                </tr>
                             )
                         }

                     }) 
                      
                    : null }        

                               
                             
                                
                              
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               }
              {/* End Table Data */}
              </div>
              {/* End of Main Content */}
              {/* Footer */}
              <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright ©fourbrick 2019</span>
                  </div>
                </div>
              </footer>
              {/* End of Footer */}
            </div>
            {/* End of Content Wrapper */}
          </div>
          {/* End of Page Wrapper */}
          {/* Scroll to Top Button*/}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up" />
          </a>

            {/* Logout Modal*/}
            <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Ready to Delete?</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Select "Delete" below if you are ready to delete BD.</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <a  style={{color:"#ffffff"}} data-dismiss="modal" className="btn btn-primary"  onClick={()=>{this.delete()}}>delete</a>
                </div>
              </div>
            </div>
          </div>
        
          {/* Logout Modal*/}
         
          <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <a  style={{color:"#ffffff"}} className="btn btn-primary"  onClick={()=>{
                    localStorage.removeItem("login")
                    history.push("/")
                    window.location.reload();

                  }}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div></UserStyled>



      );
    }
  };


  export default New2;
