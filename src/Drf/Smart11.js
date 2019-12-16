import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar'
import {DrfStyled} from './DrfStyled'
import { whileStatement, isValidES3Identifier } from '@babel/types';
import { Dropdown } from "semantic-ui-react";
import DropDown from './dropDown/dropdown';
import { SmartStyled } from './smartStyled';
import { MomStyled } from './momStyled';
import { SelectStyled } from './selectStyled';
import history from '../History';




const optionYear = [
{key:2019,text:2019,value:2019},{
  key:2018,text:2018,value:2018
}
]
class User extends React.Component{

  constructor(){
    super()
        this.state={
          isList:true,free:"0",noCancelBar:true,
          err:'',
          email:'',
         name:'',
         userid:'',
         pass:'',
         gen:'',
         type:'',
         cluster:[],selected:[],
         year1:"",
         zoneid1:"",
         hubid1:"",
         cityid1:"",
         clusterid1:"",
         typeList:'',
         dataList:'',
         isEdit:false,
         deleteid:'',
          hub_id:"",id:"",D_name:"",D_id:"",
          zoneid:"",hubid2:"",cityid2:"",clusterid2:"",zoneid2:"",
          hubid:"",
          cityid:"",
          clusterid:"",
          tableData:"",
          options:[{key:0,text:"Select Zone",value:0}],
          userlist:[],
          value:"",
          optionHub:[],selectedHub:[],
          optionCity:[],selectedCity:[],idName:"",
          city_name:"",hub_name:"",zone_name:"",smartApi:"",
          optionCluster:[],selectedCluster:[],
          hubbbb:'',
          clustered:'',
          cityname:"",
          wantEdit:false,
          addFreshData:true,xlfile:"",
       
          getData:"",

          arrId:"",
          occId:"",
          revparId:"",
      zone:"",city:[],hub:"",year:"", 
      jan:{arr:"",occ:"",revpar:""},
      feb:{arr:"",occ:"",revpar:""},
      mar:{arr:"",occ:"",revpar:""},
      apr:{arr:"",occ:"",revpar:""},
      may:{arr:"",occ:"",revpar:""},
      jun:{arr:"",occ:"",revpar:""},
      july:{arr:"",occ:"",revpar:""},
      aug:{arr:"",occ:"",revpar:""},
      sept:{arr:"",occ:"",revpar:""},
      oct:{arr:"",occ:"",revpar:""},
      nov:{arr:"",occ:"",revpar:""},
      dec:{arr:"",occ:"",revpar:""},

        }
  }
  deletes=(id)=>{
    this.setState({deleteid:id})
  }
  delete=()=>{
    let api="http://134.209.153.34:5004/deleteUser?userid="+this.state.deleteid
    axios.get(api)
  .then((response)=> {
    // handle success
      
   
    if(response){
      
      if(response && response.data && response.data.status==="true"){
      
         this.callapi() 
      
      }else{
      
        
      }
    }

  })
  .catch( (error)=> {
    // handle error
    
    
  })



 
    
  }
  getTypeapi=()=>{

  let api="http://134.209.153.34:5004/getrole"
   axios.get(api)
 .then((response)=> {
   // handle success
    
  
   if(response){
     
     if(response && response.data && response.data.data[0] && response.data.status==="true"){
      
             let d=response.data.data;
             let l=[]
             for(let i=0;i<d.length;i++){
               l.push(d[i].role)
             }
          this.setState({typeList:l})

     }else{
     
       
     }
   }

 })
 .catch( (error)=> {
   // handle error
   
  
 })



  }
  
  
  editingData=(i,id1,id2,id3)=>{
    setTimeout(()=>{

  
    console.log(id1["hub"],"editing",this.state.hubid1)
    this.setState({hubid2:id1["hub"],cityid2:id1["city"],clusterid2:id1["ClusterId"],zoneid2:id1["zone"]})
  this.setState({hubid1:"?hub="+id1["hub"],cityid1:"?city="+id1["city"],clusterid1:"?cluster="+id1["cluster"],zoneid1:"?zone="+id1["zone"]},()=>{
    console.log(this.state.hubid1,"5555",this.state.clusterid2)
  })
  console.log("qqq",this.state.hubid1,this.state.optionHub,this.state.optionCity)

// else if( this.state.cityid1 === "" || this.state.cityid1 == null){
//   this.setState({cityid1:id1["city"],clusterid1:id1["cluster"]})
//   console.log("qqq12",this.state.hubid1)
// }
// else {
//   this.setState({clusterid1:id1["ClusterId"]})
// }


if(this.state.getData!="" ){
let data=this.state.getData
this.setState({
  wantEdit:!this.state.wantEdit,err:"",
    arrId:id1["ID"],
    occId:id2["ID"],
    revparId:id3["ID"],
  jan:{arr:id1["JAN"],occ:id2["JAN"],revpar:id3["JAN"]},
  feb:{arr:id1["FEB"],occ:id2["FEB"],revpar:id3["FEB"]},
  mar:{arr:id1["MAR"],occ:id2["MAR"],revpar:id3["MAR"]},
  apr:{arr:id1["APR"],occ:id2["APR"],revpar:id3["APR"]},
  may:{arr:id1["MAY"],occ:id2["MAY"],revpar:id3["MAY"]},
  jun:{arr:id1["JUN"],occ:id2["JUN"],revpar:id3["JUN"]},
  july:{arr:id1["JUL"],occ:id2["JUL"],revpar:id3["JUL"]},
  aug:{arr:id1["AUG"],occ:id2["AUG"],revpar:id3["AUG"]},
  sept:{arr:id1["SEP"],occ:id2["SEP"],revpar:id3["SEP"]},
  oct:{arr:id1["OCT"],occ:id2["OCT"],revpar:id3["OCT"]},
  nov:{arr:id1["NOV"],occ:id2["NOV"],revpar:id3["NOV"]},
  dec:{arr:id1["DECE"],occ:id2["DECE"],revpar:id3["DECE"]},

  isList: !this.state.isList,isEdit:true,
free:"0"  
},()=>{

 console.log("aaaadd",this.state.clusterid1,"eee",this.state.optionCluster)

  
})}


},100)
}
  edit=(item)=>{
    this.setState({
      isList:false,
      isEdit:true,
      email:item.email?item.email:"",
      name:item.username?item.username:"",
      userid:item.userid?item.userid:"",
      pass:item.password?item.password:"",
      gen:item.gender?item.gender:"",
      type:item.usertype?item.usertype:"",
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
  report=()=>{
    this.props.history.push("/status")
  }

  HubApi=()=>{
    console.log('http://134.209.153.34:5004/HubMaster?zoneid=')
    axios.get('http://134.209.153.34:5004/HubMaster')
    .then((res) => {
    
      if(res){
      
        if(res && res.data
          && res.data.status !== "false"
          ){
        
    console.log("reshub",res.data.data)
    this.setState({hub:res.data.data,optionHub:[]}
      ,()=>{
    
     for(var j = 0; j < this.state.hub.length;j++){
      const obj = {}
     
      obj.key = this.state.hub[j]["hub"];
      obj.text = this.state.hub[j]["hub"]
      obj.value = "?hub="+this.state.hub[j]["hub"]
      this.state.optionHub.push(obj)
    }}
    )
    
    
    
        }else{
        
          this.setState({err:res.data.result}) 
        }
      }
    
    })
    .catch((error)=> {
      // this.setState({err:"somethimg goes wrong!"}) 
     
    }); 

  }
  onDropZone=(e,{value})=>{
this.setState({D_id:value,zoneid1:value,hubid1:null,clusterid1:null,cityid1:null})
console.log("Did",this.state.D_id)
  }
  onDropHub=(e,{value})=>{

    this.setState({D_id:value,hubid1:value,zoneid1:null,clusterid1:null,cityid1:null})
    console.log("DidHub",this.state.D_id)
      }
      onDropCity=(e,{value})=>{
        this.setState({D_id:value,cityid1:value,hubid1:null,clusterid1:null,zoneid1:null})
        console.log("DidCity",this.state.D_id)
          }
          onDropCluster=(e,{value})=>{
            this.setState({D_id:value,clusterid1:value,zoneid1:null,hubid1:null,cityid1:null})
            console.log("DidCluster",this.state.D_id)
              }
    onchange=(e,{value})=>{
    
      let zoneid = value
      this.setState({zoneid1:zoneid,id:zoneid,idName:"zone_id",err:"",cityid1:null,clusterid1:null,hubid1:null,
    optionCluster:[],optionCity:[]},()=>{
   
        this.HubApi(this.state.zoneid1)
        if(this.state.zoneid1){
          this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1})
        }


      })
    }



    ZoneApi=()=>{
      this.setState({options:[]})
      axios.get('http://134.209.153.34:5004/ZoneMaster')
  .then((res) => {
      
     
    if(res){
      // console.log("drf",res.data)
      if(res && res.data 
        && res.data.status !== "false"
        ){
      

       this.setState({zone:Object.values(res.data.data)})

    
      for(var j = 0; j < this.state.zone.length;j++){
        const obj = {}
       
        obj.key = this.state.zone[j]["zone"];
        obj.text = this.state.zone[j]["zone"];
        obj.value = "?zone="+this.state.zone[j]["zone"];
        this.state.options.push(obj)
      }
      console.log(this.state.err,"134.209.153.34:5004/getsmartdata"+this.state.options[0]["value"],"options")
      }else{
        console.log(this.state.err,this.state.options[0]["value"],"options")
        //  this.setState({err:res.data.result},()=>{
        //   console.log(this.state.err)
        //  }
        //  ) 
      }
    }

    
  })
  .catch( (error)=> {
    // handle error
    // this.setState({err:"somethimg goes wrong!"}) 
   
  });

    }
  componentDidMount(){
  this.setState({err:""}) 
this.ZoneApi()
this.HubApi()
this.CityApi()
this.ClusterApi()
  
  }
  
     

  reset=()=>{

    this.setState({zoneid1:null,clusterid1:null,optionHub:[],optionCity:[],optionCluster:[],hubid1:null,
      cityid1:null,year1:null,tableData:[],
      jan:{arr:"",occ:"",revpar:""},
      feb:{arr:"",occ:"",revpar:""},
      mar:{arr:"",occ:"",revpar:""},
      apr:{arr:"",occ:"",revpar:""},
      may:{arr:"",occ:"",revpar:""},
      jun:{arr:"",occ:"",revpar:""},
      july:{arr:"",occ:"",revpar:""},
      aug:{arr:"",occ:"",revpar:""},
      sept:{arr:"",occ:"",revpar:""},
      oct:{arr:"",occ:"",revpar:""},
      nov:{arr:"",occ:"",revpar:""},
      dec:{arr:"",occ:"",revpar:""},
      clustered:"",cityname:"",hubbbb:"",
      // optionHub:[],optionCity:[],optionCluster:[]
    },()=>{
      console.log(this.state.zoneid1,this.state.clusterid1,"ppppoo")
    })

  }
     callapi=(id)=>{
       // localStorage.setItem("login","yes") 
       
       // history.push("home");
       // e.preventDefault()
       let clusterid = this.state.clusterid1
       let cityid = this.state.cityid1
       let hubid = this.state.hubid1
       this.setState({isList:true,isEdit:false,tableData:"",clustered:"",hubbbb:"",cityname:""})
       axios.get("http://134.209.153.34:5004/getsmartdata"+id
       )
      
  .then((res) => {
 console.log("smart",res.data,"http://134.209.153.34:5004/getsmartdata"+id)
    if(res && res.data !=="not_found"
      // "Data Not Found"
      &&res.data.status !== false ){
      
      this.setState({tableData:res.data,getData:res.data},()=>{
      
      })
  
  
  
  
      }
      else if(res.data && res.data.result === "No Data Found" && res.data.status !== "false"){
        this.setState({err:res.data.result},()=>{
          console.log(this.state.err)
         }) 
      }
      
      else{
      
        this.setState({err:res.data.result}) 
      }
    
  
  
  
  })
  .catch((error)=> {
    this.setState({err:"somethimg goes wrong!"}) 
    
  }); 
  
   
    
       
     }
     reset2=()=>{

       this.setState({zoneid1:null,clusterid1:null,hubid1:null,
        cityid1:null,year1:null,tableData:"",clustered:"",hubbbb:"",cityname:""},
        ()=>{
          console.log(this.state.zoneid1,this.state.clusterid1,this.state.hubid1,this.state.year1,"year1")
         
         
          
        })
     }
   
          
    
    submitapi=()=>{
      
let json={}

json["zoneid"]=this.state.zoneid1

json["hubid"]=this.state.hubid1

json["cityid"]=this.state.cityid1

json["clusterid"]=this.state.clusterid1

json["year"]=2019
json["occ"]={}
json["arr"]={}
json["revpar"]={}

let jan=this.state.jan;
 json["occ"]["jan"]=jan.occ
 json["arr"]["jan"]=jan.arr
 json["revpar"]["jan"]=Math.round(jan.revpar)

 
let feb=this.state.feb;
json["occ"]["feb"]=feb.occ
json["arr"]["feb"]=feb.arr
json["revpar"]["feb"]=Math.round(feb.revpar)
let mar=this.state.mar;
json["occ"]["mar"]=mar.occ
json["arr"]["mar"]=mar.arr
json["revpar"]["mar"]=Math.round(mar.revpar)
let apr=this.state.apr;
json["occ"]["apr"]=apr.occ
json["arr"]["apr"]=apr.arr
json["revpar"]["apr"]=Math.round(apr.revpar)
let may=this.state.may;
json["occ"]["may"]=may.occ
json["arr"]["may"]=may.arr
json["revpar"]["may"]=Math.round(may.revpar)
let jun=this.state.jun;
json["occ"]["jun"]=jun.occ
json["arr"]["jun"]=jun.arr
json["revpar"]["jun"]=Math.round(jun.revpar)
let july=this.state.july;
json["occ"]["july"]=july.occ
json["arr"]["july"]=july.arr
json["revpar"]["july"]=Math.round(july.revpar)
let aug=this.state.aug;
json["occ"]["aug"]=aug.occ
json["arr"]["aug"]=aug.arr
json["revpar"]["aug"]=Math.round(aug.revpar)
let sept=this.state.sept;
json["occ"]["sept"]=sept.occ
json["arr"]["sept"]=sept.arr
json["revpar"]["sept"]=Math.round(sept.revpar)
let oct=this.state.oct;
json["occ"]["oct"]=oct.occ
json["arr"]["oct"]=oct.arr
json["revpar"]["oct"]=Math.round(oct.revpar)
let nov=this.state.nov;
json["occ"]["nov"]=nov.occ
json["arr"]["nov"]=nov.arr
json["revpar"]["nov"]=Math.round(nov.revpar)
let dec=this.state.dec;
json["occ"]["dec"]=dec.occ
json["arr"]["dec"]=dec.arr
json["revpar"]["dec"]=Math.round(dec.revpar)

     let api="http://134.209.153.34:5004/submitSmartData"
    
        
      axios.post(api,json)
    .then((response)=> {
      // handle success
      console.log(json,"json",response)
     
      if(response){
        if(response && response.data && response.data.status==="true"){
        
alert("Data Updated Successfully")

this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id="+this.state.hubid1
+"&city_id="+this.state.cityid1+"&cluster_id="+this.state.clusterid1},()=>{
  this.callapi()
})


        }else{
        
          this.setState({err:response.data.result},()=>{
            console.log(this.state.err)
           }) 
          console.log("log1",this.state.err)
        }
      }
  
     
    })
    .catch( (error)=> {
      // handle error
      this.setState({err:"somethimg goes wrong!"}) 
      console.log("log2",this.state.err)
    })   }

    updatetapi=()=>{
      // localStorage.setItem("login","yes") 
      // console.log("log",this.state.pass);
     
      let json={}
     
      // json["zoneid"]=this.state.zoneid2
    
      // json["hubid"]=this.state.hubid2
     
      // json["cityid"]=this.state.cityid2
   
      json["clusterid"]=this.state.clusterid2
      
      json["year"]="2019"
      json["occ"]={}
      json["arr"]={}
      json["revpar"]={}
      
      let jan=this.state.jan;
       json["occ"]["jan"]=jan.occ
       json["arr"]["jan"]=jan.arr
       json["revpar"]["jan"]=Math.round(jan.revpar)
       json["arr"]["ARRID"]=this.state.arrId
       json["occ"]["OCCID"]=this.state.occId
       json["revpar"]["REVPARID"]=this.state.revparId
     
       
      let feb=this.state.feb;
      json["occ"]["feb"]=feb.occ
      json["arr"]["feb"]=feb.arr
      json["revpar"]["feb"]=Math.round(feb.revpar)
      let mar=this.state.mar;
      json["occ"]["mar"]=mar.occ
      json["arr"]["mar"]=mar.arr
      json["revpar"]["mar"]=Math.round(mar.revpar)
      let apr=this.state.apr;
      json["occ"]["apr"]=apr.occ
      json["arr"]["apr"]=apr.arr
      json["revpar"]["apr"]=Math.round(apr.revpar)
      console.log("mathhhh",Math.round(json["revpar"]["apr"]),json["revpar"]["mar"])
      let may=this.state.may;
      json["occ"]["may"]=may.occ
      json["arr"]["may"]=may.arr
      json["revpar"]["may"]=Math.round(may.revpar)
      let jun=this.state.jun;
      json["occ"]["jun"]=jun.occ
      json["arr"]["jun"]=jun.arr
      json["revpar"]["jun"]=Math.round(jun.revpar)
      let july=this.state.july;
      json["occ"]["july"]=july.occ
      json["arr"]["july"]=july.arr
      json["revpar"]["july"]=Math.round(july.revpar)
      let aug=this.state.aug;
      json["occ"]["aug"]=aug.occ
      json["arr"]["aug"]=aug.arr
      json["revpar"]["aug"]=Math.round(aug.revpar)
      let sept=this.state.sept;
      json["occ"]["sept"]=sept.occ
      json["arr"]["sept"]=sept.arr
      json["revpar"]["sept"]=Math.round(sept.revpar)
      let oct=this.state.oct;
      json["occ"]["oct"]=oct.occ
      json["arr"]["oct"]=oct.arr
      json["revpar"]["oct"]=Math.round(oct.revpar)
      let nov=this.state.nov;
      json["occ"]["nov"]=nov.occ
      json["arr"]["nov"]=nov.arr
      json["revpar"]["nov"]=Math.round(nov.revpar)
      let dec=this.state.dec;
      json["occ"]["dec"]=dec.occ
      json["arr"]["dec"]=dec.arr
      json["revpar"]["dec"]=Math.round(dec.revpar)
      
           let api="http://134.209.153.34:5004/UpdateSmartData"
      
      
      axios.post(api,json)
    .then((response)=> {
      // handle success
     console.log(json,"json")
     
      if(response){
        console.log(json,"json",response.data)
        if(response && response.data && response.data.status==="true"){
        
alert("Updated Successfully")
          this.setState({
            isList: !this.state.isList,isEdit:false,
            wantEdit:!this.state.wantEdit})
            this.callapi(this.state.clusterid1)
            // this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id="+this.state.hubid1
            // +"&city_id="+this.state.cityid1+"&cluster_id="+this.state.clusterid1},()=>{
              
            // })

        }else{
        
          this.setState({err:response.data.result}) 
        }
      }
  
     
    })
    .catch( (error)=> {
      // handle error
      alert("this.state.err")
      this.setState({err:"somethimg goes wrong!"}) 
      
    })
    
  }


reset1=()=>{
  this.setState({
    year1:"",
    zoneid1:"",
    hubid1:"",
    cityid1:"",
    clusterid1:"",
    tableData:""
  })
}


// event of dropdown in data----------------------------------------------------------------------


zoneSelected = (e,{value})=>{

 
// let zoneid1=
// console.log("hhhhhhhhh",JSON.parse(hubid),Object.values(JSON.parse(hubid)))
// let zone=Object.values(JSON.parse(hubid))
// this.setState({zone:Object.values(JSON.parse(hubid))})

// this.setState({ value })
// let userlist = value1
   
// this.setState({userlist:userlist})
// console.log("qqqq",this.state.value)

// let zoneid:value;
this.setState({zoneid1 : e.target.value,cluster:'',clusterid1:'',city:'',cityid1:'',hub:'',hubid1:''}, function()
{console.log("zoneid",this.state.zoneid)


axios.get('http://134.209.153.34:5004/HubMaster?zoneid='+this.state.zoneid1)
  .then((res) => {

    if(res){
      // console.log("drf",res.data)
      if(res && res.data 
        && res.data.status !== "false"
        ){
      

       this.setState({hub:Object.values(res.data)})
   


      }else{
      
        this.setState({err:res.data.result},()=>{
          console.log(this.state.err)
         }) 
      }
    }

  })
  .catch((error)=> {
    this.setState({err:"somethimg goes wrong!"}) 
    
  }); 
})
}

CityApi=()=>{
 
  axios.get('http://134.209.153.34:5004/CityMaster')
  .then((res) => {


    if(res){
     
      if(res && res.data 
        && res.data.status !== "false"
        ){
      

       this.setState({city:res.data.data,optionCity:[]})
       
       for(var j = 0; j < this.state.city.length;j++){
        const obj = {}
        
        obj.key = this.state.city[j]["city"];
        obj.text = this.state.city[j]["city"]
        obj.value = "?city="+this.state.city[j]["city"]
        this.state.optionCity.push(obj)
      }
   


      }else{
      
        this.setState({err:res.data.result},()=>{
          console.log(this.state.err)
         }) 
      }
    }

  })
  .catch((error)=> {
    // this.setState({err:"somethimg goes wrong!"}) 
   
  }); 

}
hubSelected =(e,{value})=>{
  
  
let hubid = value
if(hubid != null){
  this.setState({hubid1:hubid,id:hubid,idName:"hub_id"},
    function(){
      
      this.CityApi(this.state.hubid1)
      this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id"+this.state.hubid1})
      
    }

    )
    if(this.state.optionHub[0].value !== null){
    this.state.optionHub.unshift({key:2019,text:"Select Hub",value:null})}}
   else if(hubid == null){
      this.setState({hubid1:hubid,id:hubid,idName:"hub_id",cityid1:null,clusterid1:null},
        function(){
          
          this.CityApi(this.state.hubid1)
          this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1})
          
        }
        )
        if(this.state.optionHub[0].value == null){
          this.state.optionHub.shift()}
      }
}
ClusterApi=()=>{
  axios.get('http://134.209.153.34:5004/ClusterMaster')
  .then((res) => {
  
    if(res){
    
      if(res && res.data 
        && res.data.status !== "false" 
        && res.data.result !== "No Data Found"
        ){
      
  
      //  this.setState({cluster:Object.values(res.data)})
      this.setState({cluster:res.data.data,optionCluster:[]},()=>{
       
        for(var j = 0; j < this.state.cluster.length;j++){
          const obj = {}
         
          obj.key = this.state.cluster[j]["cluster"];
          obj.text = this.state.cluster[j]["cluster"]
          obj.value = "?cluster="+this.state.cluster[j]["cluster"]
          this.state.optionCluster.push(obj)

        }
    
      })
     
  
      }
      else if(res.data && res.data.result === "No Data Found" && res.data.status !== "false"){
        this.setState({clusterid1:"",err:res.data.result}) 
       
      }
      
      else{
      
        this.setState({err:res.data.result},()=>{
          console.log(this.state.err)
         }) 
      }
    }
  })
  .catch((error)=> {
    // this.setState({err:"somethimg goes wrong!"}) 
  
  }); 
}
citySelected =(e,{value})=>{
 
  let cityid = value
if(cityid != null){
this.setState({cityid1:value,id:value,city:""},()=>{
  
 this.ClusterApi(this.state.cityid1)
 this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id"+this.state.hubid1
+"&city_id"+this.state.cityid1})

})
if(this.state.optionCity[0].value !== null){
this.state.optionCity.unshift({key:2019,text:"Select City",value:null})}}
else if(cityid == null){
  this.setState({cityid1:value,id:value,clusterid1:null,optionCluster:[]},()=>{
    
   this.ClusterApi(this.state.cityid1)
   this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id"+this.state.hubid1})
  
  })
  if(this.state.optionCity[0].value == null){
    this.state.optionCity.shift()}}


}



clusterSelected =(e,{value})=>{
 
  let clusterid = value
  if(clusterid != null){
  this.setState({clusterid1:clusterid,id:clusterid,idName:"cluster_id"},()=>{
    
    this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id="+this.state.hubid1
    +"&city_id="+this.state.cityid1+"&cluster_id="+this.state.clusterid1})
    

  }
 )
 if(this.state.optionCluster[0].value !== null){
   console.log("fff",this.state.optionCluster[0].value)
 this.state.optionCluster.unshift({key:2019,text:"Select Cluster",value:null})}}
 else if(clusterid == null){
  this.setState({clusterid1:clusterid,id:clusterid,idName:"cluster_id"},()=>{
    
    this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id="+this.state.hubid1
    +"&city_id="+this.state.cityid1})
    

  }
 )
 if(this.state.optionCluster[0].value !== null){
  console.log("fff",this.state.optionCluster[0].value)
this.state.optionCluster.shift()}
 }

}









//end of event of dropdown in post data---------------------------------------------------------------

//event of smart data get ---------------------------------------------------------------------
  searchData =(e)=>{

this.setState({free:"1"})
const year = this.state.year1


    // axios.get('http://134.209.153.34:5004/getsmartdataNew?cluster_id='+this.state.clusterid1+
    // '&year='+year)

    this.callapi(this.state.D_id)
    

  }

uploadChange=(e)=>{
let value = e.target.files[0]
this.setState({xlfile:value},()=>{
  console.log("aaaaaa",this.state.xlfile)
})

}

uploadHandler=(e)=>{
  this.uploadApi()
  }
  
uploadApi() {
  const data = new FormData()
 
  data.append('Filename', this.state.xlfile)
  console.log("data",data)
    axios.post("http://134.209.153.34:5004/Uploadexcel", data, 

)

   .then(res => { // then print response status
  console.log("res",res.data)
 
  if(res.data.result == "something went wrong" || res.data.status !== false){
    alert("Please, Upload correct format of excelsheet")
  }
  else if(res.data.result == "'NoneType' object has no attribute 'filename'" && res.data.status !== false){
    alert("Please, Upload excelsheet")
  }
  else if (res.data.result ="record" &&res.data.status == true ){
    alert("Data Uploaded Successfully")
  }
  this.setState({xlfile:"",theInputKey:Math.random().toString(36)})
  console.log("res",res.data.result,this.state.xlfile)
  })
  .catch(err => { 
    alert("Please upload correct format of excelsheet")
}
)
}
hoveringData=(i,id1,id2,id3)=>{
  console.log("aaannn",id1["zone_id"])
if(this.state.hubid1 == "" || this.state.hubid1 == null){
  console.log("aaa")
 this.HubApi(id1["zone_id"])
  this.CityApi(id1["hub_id"])
  this.ClusterApi(id1["city_id"])
}
else if(this.state.cityid1 == ""|| this.state.cityid1 == null){
  this.ClusterApi(id1["city_id"])
  this.CityApi(id1["hub_id"])
  console.log("aaa11")
}
console.log("55nnnn",this.state.hubid1,this.state.cityid1)
}

lastHandler=()=>{
  if(!this.state.isEdit){
  this.setState({
    year1:"",
    zoneid1:null,
    hubid1:null,
    cityid1:null,
    clusterid1:null,
    hub:"",
   year:"",
    city:"",
    cluster:"",tableData:"",
   
     optionHub:[],
optionCity:[],
optionCluster:[], hubbbb:'',
clustered:'',
cityname:"",err:"",
    jan:{arr:"",occ:"",revpar:""},
    feb:{arr:"",occ:"",revpar:""},
    mar:{arr:"",occ:"",revpar:""},
    apr:{arr:"",occ:"",revpar:""},
    may:{arr:"",occ:"",revpar:""},
    jun:{arr:"",occ:"",revpar:""},
    july:{arr:"",occ:"",revpar:""},
    aug:{arr:"",occ:"",revpar:""},
    sept:{arr:"",occ:"",revpar:""},
    oct:{arr:"",occ:"",revpar:""},
    nov:{arr:"",occ:"",revpar:""},
    dec:{arr:"",occ:"",revpar:""},
 isList:this.state.isList?false:true,isEdit:this.state.isList?false:this.state.isEdit})
}
else if(this.state.isEdit){
  this.setState({
    // year1:"",
    zoneid1:"",
    hubid1:"",
    cityid1:"",
    clusterid1:"",
//     hub:"",
//    year:"",
//     city:"",
//     cluster:"",
// tableData:"",
   
//      optionHub:[],
// optionCity:[],
// optionCluster:[],
//  hubbbb:'',
// clustered:'',
// cityname:"",err:"",
smartApi:'http://134.209.153.34:5004/getsmartdata?zone_id='+this.state.zoneid1+"&hub_id="+this.state.hubid1
    +"&city_id="+this.state.cityid1+"&cluster_id="+this.state.clusterid1,
    jan:{arr:"",occ:"",revpar:""},
    feb:{arr:"",occ:"",revpar:""},
    mar:{arr:"",occ:"",revpar:""},
    apr:{arr:"",occ:"",revpar:""},
    may:{arr:"",occ:"",revpar:""},
    jun:{arr:"",occ:"",revpar:""},
    july:{arr:"",occ:"",revpar:""},
    aug:{arr:"",occ:"",revpar:""},
    sept:{arr:"",occ:"",revpar:""},
    oct:{arr:"",occ:"",revpar:""},
    nov:{arr:"",occ:"",revpar:""},
    dec:{arr:"",occ:"",revpar:""},
 isList:this.state.isList?false:true ,
isEdit:false},()=>{
  // this.callapi()
})
 
if(this.state.optionCity[0].value !== null){
  this.state.optionCity.unshift({key:2019,text:"Select City",value:null})}
  if(this.state.optionCluster[0].value !== null){
    this.state.optionCluster.unshift({key:2019,text:"Select Cluster",value:null})}
    if(this.state.optionHub[0].value !== null){
      this.state.optionHub.unshift({key:2019,text:"Select Hub",value:null})}

}

}




    render() {
      const value =this.state;
      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        history.push("/")
      }
     let datas=[]
       if(this.state.dataList!==""){
         datas=this.state.dataList
       }
  let types=[]
  if(this.state.typeList!==""){
    types=this.state.typeList
  }
       

// console.log("1111",Object.values(this.state.tableData[0]))

// let zone = []
if(this.state.zone !== ""){
  const zone = this.state.zone
 
}
const hub = this.state.hub

const cluster = this.state.cluster

const yearList = this.state.yearList;

const tableData = this.state.tableData


      let main=this.state;
const {text} =this.state;
  
      return (
        <DrfStyled>
        <div>
          {/* Page Wrapper */}
          <div id="wrapper">
            {/* Sidebar */}
        {  this.props.isOpen  &&   <SideBar></SideBar>}
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* Main Content */}
              <div id="content">
                {/* Topbar */}
               
               <AppBar  Open={this.props.Open} ></AppBar>
                {/* End of Topbar */}
                {/* Begin Page Content */}
                <div className="container-fluid">
                  <div className="row ">
{/* 
                  <div className="col-sm-12 col-md-12 col-xl-12">
                     
        
                    </div> */}


                    {/* <div className="col-sm-12 col-md-12">

<div className="wrap-had">
                        <button  style={{    cursor: "pointer"}}  className="clk" data-toggle="modal" data-target="#exampleModalLong">

           <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Upload ExcelData</span>}
            
                         
                        </button>
                      </div>
                    </div> */}

                    <div className="col-sm-12 col-md-12">

                   {this.state.isList && <div className="uppr-box-r">
                        <button type="button" className="login100-form-btn upsheet" data-toggle="modal" data-target="#exampleModalLong">
                        <i class="fa fa-upload" aria-hidden="true"></i> <span>Upload ExcelSheet</span>
                        </button>
                      </div>}





                      {!this.state.noCancelBar && this.state.addFreshData && <div className="wrap-had">
                        <a  style={{    cursor: "pointer"}}  className="clk" onClick={this.lastHandler}>
            {/* { this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Smart Data</span>} */}
            
            {  !this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
                        </a>
                      </div>} </div>
                  </div>
                </div>
          {! this.state.isList &&  <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="adduser fadeInLeft animated">             
                        <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                            Add Smart Data
                          </h6>
                          {/* <ul>
                            <li><i className="fas fa-chevron-down" /></li>
                            <li><i className="fas fa-sync" /></li>
                            <li><i className="fas fa-times" /></li>
                          </ul> */}
                        </div>
                        <div className="info-headding">
                          <h6 className="m-0 text-black">Smart Data Information</h6>
                          <span className="line" />
                        </div>
                    
                        <div className="col-sm-2 col-md-2  "></div>
                        <div className="col-sm-2 col-md-2  "></div>
                        <div className="col-sm-2 col-md-2  "></div>
                        <div className="col-sm-2 col-md-2  "></div>
                        <div className="col-sm-2 col-md-2  "></div>




                        <div className="col-sm-12 col-md-12  ">
                          <div className="container form-box">
                            <div className="row">
<MomStyled>
              
                              <div>

<div className="col-sm-12 col-md-12">
  
  <div className="drp-rap">
  <table className="table">
    <tbody>
      <tr>
        <td>

      <div className="dp-wrp">
      <label>zone</label>
    <DropDown options ={this.state.options}  placeholder= "Select Zone"
           onAddItem={this.handleAddition}
           onChange={this.onchange} 
           defaultValue={this.state.zoneid1} value={this.state.zoneid1} > </DropDown>
      </div>

        </td>
        <td>

<div className="dp-wrp">
<label>Hub</label>
<DropDown onChange={this.hubSelected} options={this.state.optionHub}   defaultValue={this.state.hubid1}
      value={this.state.hubid1}    placeholder =" Select Hub" />
</div>

</td>
<td>

<div className="dp-wrp">
<label>City</label>
<DropDown options ={this.state.optionCity}  placeholder= "Select City"
onAddItem={this.handleAddition}
onChange={this.citySelected} defaultValue={this.state.cityid1} value={this.state.cityid1}
> </DropDown>
</div>

</td>
<td>

<div className="dp-wrp">
<label>Cluster</label>

<DropDown onChange={this.clusterSelected} options={this.state.optionCluster} defaultValue={this.state.clusterid1} 
         value={this.state.clusterid1}  placeholder =" Select Cluster"/>
</div>

</td>
{/* <td>

<div className="dp-wrp">
<label>Year</label>
<DropDown onChange={this.yearSelected} options={optionYear} defaultValue={this.state.year1}
          placeholder =" Select Year"/>
</div>

</td> */}

        
      </tr>
    </tbody>
  </table>
  </div>
  
  

</div>



    </div>
                              </MomStyled> 
                           

                           <div className="container">
                              <div className="row mtt">
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  JAN
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({jan:{...main.jan,arr: e.target.value,revpar:e.target.value*main.jan.occ+""}})}}  className="fom-wd" value={main.jan.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({jan:{...main.jan,occ: e.target.value,revpar:(e.target.value*main.jan.arr/100+"")}})}} className="fom-wd" value={main.jan.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.jan.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  FEB
                                </div>
                                        <div class="card-body">
                                          <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                            <input onChange={(e) => { this.setState({ feb: { ...main.feb, arr: e.target.value, revpar: e.target.value * main.feb.occ + "" } }) }} className="fom-wd" value={main.feb.arr} type="number" name placeholder /></h5>
                                          <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                            <input onChange={(e) => { this.setState({ feb: { ...main.feb, occ: e.target.value, revpar: e.target.value * main.feb.arr/100 + "" } }) }} className="fom-wd" value={main.feb.occ} type="number" name placeholder /></h5>
                                          <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                            <input className="fom-wd" value={Math.round(main.feb.revpar)} disabled type="number" name placeholder /></h5>
                                        </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                 MAR
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({mar:{...main.mar,arr: e.target.value,revpar:e.target.value*main.mar.occ+""}})}}  className="fom-wd" value={main.mar.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({mar:{...main.mar,occ: e.target.value,revpar:e.target.value*main.mar.arr/100+""}})}} className="fom-wd" value={main.mar.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.mar.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  APR
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({apr:{...main.apr,arr: e.target.value,revpar:e.target.value*main.apr.occ+""}})}}  className="fom-wd" value={main.apr.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({apr:{...main.apr,occ: e.target.value,revpar:e.target.value*main.apr.arr/100+""}})}} className="fom-wd" value={main.apr.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.apr.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  MAY
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({may:{...main.may,arr: e.target.value,revpar:e.target.value*main.may.occ+""}})}}  className="fom-wd" value={main.may.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({may:{...main.may,occ: e.target.value,revpar:e.target.value*main.may.arr/100+""}})}} className="fom-wd" value={main.may.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.may.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  JUN
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({jun:{...main.jun,arr: e.target.value,revpar:e.target.value*main.jun.occ+""}})}}  className="fom-wd" value={main.jun.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({jun:{...main.jun,occ: e.target.value,revpar:e.target.value*main.jun.arr/100+""}})}} className="fom-wd" value={main.jun.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.jun.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  JULY
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({july:{...main.july,arr: e.target.value,revpar:e.target.value*main.july.occ+""}})}}  className="fom-wd" value={main.july.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({july:{...main.july,occ: e.target.value,revpar:e.target.value*main.july.arr/100+""}})}} className="fom-wd" value={main.july.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input  className="fom-wd" value={Math.round(main.july.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  AUG
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({aug:{...main.aug,arr: e.target.value,revpar:e.target.value*main.aug.occ+""}})}}  className="fom-wd" value={main.aug.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({aug:{...main.aug,occ: e.target.value,revpar:e.target.value*main.aug.arr/100+""}})}} className="fom-wd" value={main.aug.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.aug.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  SEPT
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({sept:{...main.sept,arr: e.target.value,revpar:e.target.value*main.sept.occ+""}})}}  className="fom-wd" value={main.sept.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({sept:{...main.sept,occ: e.target.value,revpar:e.target.value*main.sept.arr/100+""}})}} className="fom-wd" value={main.sept.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.sept.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  OCT
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({oct:{...main.oct,arr: e.target.value,revpar:e.target.value*main.oct.occ+""}})}}  className="fom-wd" value={main.oct.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({oct:{...main.oct,occ: e.target.value,revpar:e.target.value*main.oct.arr/100+""}})}} className="fom-wd" value={main.oct.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.oct.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  NOV
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({nov:{...main.nov,arr: e.target.value,revpar:e.target.value*main.nov.occ+""}})}}  className="fom-wd" value={main.nov.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({nov:{...main.nov,occ: e.target.value,revpar:e.target.value*main.nov.arr/100+""}})}} className="fom-wd" value={main.nov.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.nov.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              <div className="col-sm-4 col-md-3">
                              <div class="card">
                                <div class="card-header">
                                  DEC
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title"> <label className="title-fom">ARR&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input  onChange={(e)=>{this.setState({dec:{...main.dec,arr: e.target.value,revpar:e.target.value*main.dec.occ+""}})}}  className="fom-wd" value={main.dec.arr} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">OCC%</label>
                                <input  onChange={(e)=>{this.setState({dec:{...main.dec,occ: e.target.value,revpar:e.target.value*main.dec.arr/100+""}})}} className="fom-wd" value={main.dec.occ} type="number" name placeholder /></h5>
                                <h5 class="card-title"> <label className="title-fom">RevPar</label>
                                <input   className="fom-wd" value={Math.round(main.dec.revpar)} disabled type="number" name placeholder /></h5>
                               </div>
                              </div>
                              </div>
                              </div>

</div>
                              <div className="clearfix" />
                              <div className="col-sm-12 col-md-12">
                                <p style={{color:'red'}}>{this.state.err}</p>
                              </div>
                              <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                  {this.state.isEdit && <a  className="form-btn" onClick={()=>{this.updatetapi()}}>update</a>}
                                  {!this.state.isEdit && <a  style={{color:"#ffffff"}} className="form-btn" onClick={()=>{this.submitapi()}}>save</a>
                                  }
                                 {!this.state.isEdit &&   <a  style={{color:"#ffffff"}} className="form-btn"  onClick={()=>{this.reset()}}>Reset</a>
                                 }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{/* End Card user */}
                    </div>
                  </div>
                </div>
               
                            }
               
               
               {/* table data */}
               { this.state.isList &&     <div className="container-fluid tbl-b animated--grow-in adduserr">
                  <div className="row">
                  <div className="col-sm-12 col-md-12">

<div className="card mb-12">
      <div className="card-header py-3 d-flex justify-content-between">
        <h6 className="m-0 text-black">Smart Data</h6>
        <div className="icon-bx">
   
        </div>
      </div>
     
      

<MomStyled>
<div className="drp-rap">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td >

                              <div className="dp-wrp">
                              <label>Zone</label>
                            <DropDown options ={this.state.options}  placeholder= "Select Zone"
                                   onAddItem={this.handleAddition}
                                   onChange={this.onDropZone}
                                value={this.state.zoneid1}
                              > </DropDown>
                              </div>

                                </td>
                                <td>

<div className="dp-wrp">
<label>Hub</label>
<DropDown onChange={this.onDropHub} options={this.state.optionHub} value={this.state.hubid1} 
                                  placeholder =" Select Hub"/>
</div>

  </td>
  <td >

<div className="dp-wrp">
<label>City</label>
<DropDown options ={this.state.optionCity}  placeholder= "Select City"
     onAddItem={this.handleAddition}
     onChange={this.onDropCity}
  value={this.state.cityid1}> </DropDown>
</div>

  </td>
  <td >

<div className="dp-wrp">
<label>Cluster</label>
<DropDown onChange={this.onDropCluster} options={this.state.optionCluster} value={this.state.clusterid1} 
                                  placeholder =" Select Cluster"/>
</div>

  </td>
  {/* <td>

<div className="dp-wrp">
<label>Year</label>
<DropDown onChange={this.yearSelected} options={optionYear} value={this.state.year1} 
                                  placeholder =" Select Year"/>
</div>

  </td> */}
 
                                
                              </tr>
                            </tbody>
                          </table>
<div className="mom-btns">
{ <button onClick ={this.searchData} style={{background:"#4E73DF",color:"white",marginRight:"3px"}} className="btn form-btn">Search</button>
                }
      
            
            {  <button  className=" btn btn-danger form-btn" onClick={this.reset2} >Reset</button>
               }
            
</div>


                          </div>
</MomStyled>





{/* End dropdown */}



    </div>

                  </div>
 </div>
 <SmartStyled>
                  <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="one-rap-tb">
              <div className="rap-table">
                <div className="data-box">
                  <table className>
                  <thead className="info-hading hnd">
                   
                   <tr>

                   <th>Cluster</th>
                   
                     <th>City</th>
                     <th>Hub</th>
                     <th>Zone</th>
                   </tr> 
                 </thead>
                    <thead className="info-hading spac">
                   
                      <tr>

                      <th>Cluster</th>
                      
                        <th>City</th>
                        <th>Hub</th>
                        <th>Zone</th>
                      </tr> 
                    </thead>
                    <tbody>
                     
                    { Array.isArray(this.state.tableData)   ? 
  this.state.tableData.map((item,i)=>{
    
    if(item.length != 0){
    return(
      <tr>
        <td>{item[0]["cluster"]}</td> <td>{item[0]["city"]}</td> <td>{item[0]["hub"]}</td><td>{item[0]["zone"]}</td>
      </tr>
    )}}):null}

                     
                    </tbody>
                  </table>
                </div>
               


                <div className="data-box">
                  <table className>
                    <thead className="info-hading">
                      <tr>
                        <th colSpan={12}>Arr</th>
                      </tr>
                    </thead>
                    <thead className="info-hading">
                      <tr>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sep</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                      </tr>
                    </thead>
                    <tbody>
                     
     


{ Array.isArray(this.state.tableData)   ? 
  this.state.tableData.map((item,i)=>{
    
    if(item.length != 0){
    return(
      <tr id={i}>
      <td>{item[0]["JAN"]}</td><td>{item[0]["FEB"]}</td><td>{item[0]["MAR"]}</td>
     <td>{item[0]["APR"]}</td><td>{item[0]["MAY"]}</td><td>{item[0]["JUN"]}</td>
    <td>{item[0]["JUL"]}</td><td>{item[0]["AUG"]}</td><td>{item[0]["SEP"]}</td><td>{item[0]["OCT"]}</td>
    <td>{item[0]["NOV"]}</td><td>{item[0]["DECE"]}</td>  
    </tr> 
    )}
  })

: null}
              
                     
                    </tbody>
                  </table>
                </div>
                   
                <div className="data-box">
                  <table className>
                    <thead className="info-hading">
                      <tr>
                        <th colSpan={12}>occ%</th>
                      </tr>
                    </thead>
                    <thead className="info-hading">
                      <tr>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sep</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                      </tr>
                    </thead>
                    <tbody>



  {Array.isArray(this.state.tableData) && this.state.tableData !== [[]]?

  this.state.tableData.map((item,i)=>{
  
    if(item.length != 0){
    return(
      <tr id={i}>
      <td>{item[1]["JAN"]}</td><td>{item[1]["FEB"]}</td><td>{item[1]["MAR"]}</td>
     <td>{item[1]["APR"]}</td><td>{item[1]["MAY"]}</td><td>{item[1]["JUN"]}</td>
    <td>{item[1]["JUL"]}</td><td>{item[1]["AUG"]}</td><td>{item[1]["SEP"]}</td><td>{item[1]["OCT"]}</td>
    <td>{item[1]["NOV"]}</td><td>{item[1]["DECE"]}</td>  
    </tr> 
    )}
  })
: null}   


                   
                    </tbody>
                  </table>
                </div>
                <div className="data-box">
                  <table className>
                    <thead className="info-hading">
                      <tr>
                        <th colSpan={12}>revpar</th>
                      </tr>
                    </thead>
                    <thead className="info-hading">
                      <tr>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sep</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                      </tr>
                    </thead>
                    <tbody>


{Array.isArray(this.state.tableData) && this.state.tableData !== [[]]?

  this.state.tableData.map((item,i)=>{
 
    if(item.length != 0){
    return(
      <tr id={i}>
      <td>{item[2]["JAN"]}</td><td>{item[2]["FEB"]}</td><td>{item[2]["MAR"]}</td>
     <td>{item[2]["APR"]}</td><td>{item[2]["MAY"]}</td><td>{item[2]["JUN"]}</td>
    <td>{item[2]["JUL"]}</td><td>{item[2]["AUG"]}</td><td>{item[2]["SEP"]}</td><td>{item[2]["OCT"]}</td>
    <td>{item[2]["NOV"]}</td><td>{item[2]["DECE"]}</td>  
    </tr> 
    )}
  })
: null}
                     
                    </tbody>
                  </table>
                </div>


                <div className="data-box">
                  <table className>
                  <thead className="info-hading hnd">
                      
                      <tr>
                        <th>.</th>
      
                      </tr>
                          </thead>
                    <thead className="info-hading spac">
                      
                <tr>
                  <th>Action</th>

                </tr>
                    </thead>
                    <tbody>
                   
                      { Array.isArray(this.state.tableData) ? 
                      this.state.tableData.map((item,i)=>{
                       
                        if(item.length != 0){
                        return(
                     
                     <tr id={i}>
                      <td>
                     <button className="btn-edt" onClick ={()=>this.editingData(i,this.state.tableData[i][0],this.state.tableData[i][1],this.state.tableData[i][2])} 
                     onMouseEnter ={()=>this.hoveringData(i,this.state.tableData[i][0],this.state.tableData[i][1],this.state.tableData[i][2])}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                     <span className="final">Edit</span></button>
                      </td>
                     </tr>)}})

                      :null}
                     
                    </tbody>
                  </table>
                </div>


                {/* <div className="data-box">
                  
                </div> */}
              </div>
              </div>
            </div>
          </div>
          </SmartStyled>

  

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
                    
                    {/* <select className="selectpicker" data-live-search="true" >

                    <option>Alabama</option>
    <option>Alaska </option>
    <option>Arizona </option>
    <option>Arkansas </option>
    <option>California </option>
                    </select> */}
                    
                  </div>
                </div>
              </footer>
              {/* End of Footer */}
            </div>
            {/* End of Content Wrapper */}
          </div>
          {/* End of Page Wrapper */}
          {/* Scroll to Top Button*/}
          <a className="scroll-to-top rounded" >
            <i className="fas fa-angle-up" />
          </a>

            {/* Logout Modal*/}
            <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Ready to Delete?</h5>
                  <button className="close" type="button" 
                  data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Select "Delete" below if you are ready to delete user.</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <a  style={{color:"#ffffff"}} data-dismiss="modal" className="btn btn-primary"  onClick={()=>{this.delete()}}>delete</a>
                </div>
              </div>
            </div>
          </div>
        
          {/* Logout Modal*/}
         
          {/* <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          </div> */}
          {/* upload data*/}
<MomStyled>
          <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add Excel Data</h5>
              <button type="button" className="close" data-dismiss="modal" onClick={()=>{
                    this.setState({theInputKey:Math.random().toString(36)})
                  }} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6 col-md-6 mdl-table">
                    <p className="mdl-table abcde">Choose a ExcelSheet</p>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <div className="form-group" onSubmit={this.submitHandler}>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" 
                      name = "file" accept=".xls, .xlsx"
                      onChange = {this.uploadChange} 
                   key={this.state.theInputKey||''} />
                    </div>
                  </div>
                  
                  <div className="col-sm-6 col-md-6">
                    
                    
                    <div className="btn-video">
                    <button type="" className="vd-btn" 
                    value="save" onClick={this.uploadHandler}>Upload</button>

                    </div>
         
                  </div></div></div></div></div></div></div></MomStyled>
        </div>
        </DrfStyled>


      );
    }
  };


  export default User;