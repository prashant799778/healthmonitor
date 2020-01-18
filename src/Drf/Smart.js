import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar'
import {DrfStyled} from './DrfStyled'
import DropDown from './dropDown/dropdown';
import { SmartStyled } from './smartStyled';
import { MomStyled } from './momStyled';

import history from '../History';

class User extends React.Component{

  constructor(){
    super()
        this.state={
          isList:true,free:"0",
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
         hubid2:null,
         cityid2:null,
         clusterid2:null,noCancelBar:true,loading :true,
         typeList:'',
         dataList:'',
         isEdit:false,
         deleteid:'',
          hub_id:"",id:"",
          zoneid:"",
          hubid:"",
          cityid:"",
          clusterid:"",
          tableData:"",
          options:[{key:0,text:"Select Zone",value:0}],showtable:false,
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
    
if(this.state.hubid1 == ""|| this.state.hubid1 == null ){
  this.setState({hubid2:id1["hub"],cityid2:id1["city"],clusterid2:id1["cluster"]},()=>{
    
  })
}
else if( this.state.cityid1 == "" || this.state.cityid1 == null){
  this.setState({cityid2:id1["city"],clusterid2:id1["cluster"]})
  
}
else {
  this.setState({clusterid2:id1["cluster"]})
}


if(this.state.getData!="" ){
let data=this.state.getData
this.setState({
  wantEdit:!this.state.wantEdit,err:"",clusterid:id1["ClusterId"],
    arrId:id1["ID"],
    occId:id2["ID"],
    revparId:id3["ID"],noCancelBar:false,

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
 
})}
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

  HubApi=(id)=>{
    axios.get('http://134.209.153.34:5004/HubMaster1?zone='+id)
    .then((res) => {
    
      if(res){
      
        if(res && res.data
          && res.data.status !== "false"
          ){
        
    
    this.setState({hub:res.data.data,optionHub:[]},()=>{
     for(var j = 0; j < this.state.hub.length;j++){
      const obj = {}
     
      obj.key = this.state.hub[j]["hub"];
      obj.text = this.state.hub[j]["hub"]
      obj.value = this.state.hub[j]["hub"]
      this.state.optionHub.push(obj)
    }})
    
    
    
        }else{
        
          this.setState({err:res.data.result}) 
        }
      }
    
    })
    .catch((error)=> {
      // this.setState({err:"somethimg goes wrong!"}) 
     
    }); 

  }
    onchange=(e,{value})=>{
    
      let zoneid = value
      this.setState({zoneid1:zoneid,zoneid2:zoneid,idName:"zone_id",err:"",cityid1:null,clusterid1:null,hubid1:null,
    optionCluster:[],optionCity:[]},()=>{
   
        this.HubApi(this.state.zoneid1)
        if(this.state.zoneid1){
          this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1})
        }


      })
    }



    ZoneApi=()=>{
      this.setState({options:[]})
      axios.get('http://134.209.153.34:5004/ZoneMaster')
  .then((res) => {
      
     
    if(res){
      if(res && res.data 
        && res.data.status !== "false"
        ){
      

       this.setState({zone:Object.values(res.data.data)})

    
      for(var j = 0; j < this.state.zone.length;j++){
        const obj = {}
       
        obj.key = this.state.zone[j]["zone"];
        obj.text = this.state.zone[j]["zone"]
        obj.value = this.state.zone[j]["zone"]
        this.state.options.push(obj)
      }
     
      }else{
       
      }
    }

    
  })
  .catch( (error)=> {
  
  });

    }
  componentDidMount(){
  this.setState({err:"",loading:false}) 
this.ZoneApi()
  
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
    })

  }
     callapi=()=>{
       let clusterid = this.state.clusterid1
       let cityid = this.state.cityid1
       let hubid = this.state.hubid1
       this.setState({isList:true,isEdit:false,tableData:"",clustered:"",hubbbb:"",cityname:""})
       axios.get(this.state.smartApi
       )
       
  .then((res) => {
    if(res && res.data !=="not_found"
      &&res.data.status !== false ){
     this.setState({tableData:res.data,getData:res.data},()=>{
      })
   }
      else if(res.data && res.data.result === "No Data Found" && res.data.status !== "false"){
        this.setState({err:res.data.result},()=>{
         
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

       this.setState({zoneid1:null,clusterid1:null,optionHub:[],optionCity:[],optionCluster:[],hubid1:null,
        cityid1:null,year1:null,tableData:"",clustered:"",hubbbb:"",cityname:"",showtable:false},
        ()=>{
        
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
    
     
      if(response){
        if(response && response.data && response.data.status==="true"){
        
alert("Data Updated Successfully")

this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub="+this.state.hubid1
+"&city="+this.state.cityid1+"&cluster="+this.state.clusterid1},()=>{
  this.callapi()
})


        }else{
        
          this.setState({err:response.data.result},()=>{
           }) 
        
        }
      }
  
     
    })
    .catch( (error)=> {
      // handle error
      this.setState({err:"somethimg goes wrong!"}) 
     
    })   }

    updatetapi=()=>{
     
     
      let json={}
     
      json["clusterid"]=this.state.clusterid
      
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
    
     
      if(response){
        
        if(response && response.data && response.data.status==="true"){
        
alert("Updated Successfully")
          this.setState({
            isList: !this.state.isList,isEdit:false,noCancelBar:true,
            wantEdit:!this.state.wantEdit,cityid1:this.state.cityid2,clusterid1:this.state.clusterid2,hubid1:this.state.hubid2},()=>{

            

            this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub="+this.state.hubid1
            +"&city="+this.state.cityid1+"&cluster="+this.state.clusterid1},()=>{
              this.callapi()
            })
          })
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

 
this.setState({zoneid1 : e.target.value,cluster:'',clusterid1:'',city:'',cityid1:'',hub:'',hubid1:''}, function()
{


axios.get('http://134.209.153.34:5004/HubMaster1?zone='+this.state.zoneid1)
  .then((res) => {

    if(res){
      if(res && res.data 
        && res.data.status !== "false"
        ){
      

       this.setState({hub:Object.values(res.data)})
   


      }else{
      
        this.setState({err:res.data.result},()=>{
          
         }) 
      }
    }

  })
  .catch((error)=> {
    this.setState({err:"somethimg goes wrong!"}) 
    
  }); 
})
}

CityApi=(idd)=>{
  axios.get('http://134.209.153.34:5004/CityMaster1?hub='+idd)
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
        obj.value = this.state.city[j]["city"]
        this.state.optionCity.push(obj)
      }
   


      }else{
      
        this.setState({err:res.data.result},()=>{
   
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
  this.setState({hubid1:hubid,hubid2:hubid,idName:"hub_id"},
    function(){
      
      this.CityApi(this.state.hubid1)
      this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub="+this.state.hubid1},()=>{
      
      })
      
    }

    )
    if(this.state.optionHub[0].value !== null){
    this.state.optionHub.unshift({key:2019,text:"Select Hub",value:null})}}
   else if(hubid == null){
      this.setState({hubid1:hubid,id:hubid,idName:"hub_id",cityid1:null,clusterid1:null},
        function(){
          
          this.CityApi(this.state.hubid1)
          this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1})
          
        }
        )
        if(this.state.optionHub[0].value == null){
          this.state.optionHub.shift()}
      }
}
ClusterApi=(id)=>{
  axios.get('http://134.209.153.34:5004/ClusterMaster1?city='+id)
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
          obj.value = this.state.cluster[j]["cluster"]
          this.state.optionCluster.push(obj)

        }
    
      })
     
  
      }
      else if(res.data && res.data.result === "No Data Found" && res.data.status !== "false"){
        this.setState({clusterid1:"",err:res.data.result}) 
       
      }
      
      else{
      
        this.setState({err:res.data.result},()=>{
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
this.setState({cityid1:value,cityid2:value,city:""},()=>{
  
 this.ClusterApi(this.state.cityid1)
 this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub"+this.state.hubid1
+"&city"+this.state.cityid1})

})
if(this.state.optionCity[0].value !== null){
this.state.optionCity.unshift({key:2019,text:"Select City",value:null})}}
else if(cityid == null){
  this.setState({cityid1:value,id:value,clusterid1:null,optionCluster:[]},()=>{
    
   this.ClusterApi(this.state.cityid1)
   this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub"+this.state.hubid1})
  
  })
  if(this.state.optionCity[0].value == null){
    this.state.optionCity.shift()}}


}



clusterSelected =(e,{value})=>{
 
  let clusterid = value
  if(clusterid != null){
  this.setState({clusterid1:clusterid,clusterid2:clusterid,idName:"cluster_id"},()=>{
    
    this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub="+this.state.hubid1
    +"&city="+this.state.cityid1+"&cluster="+this.state.clusterid1})
    

  }
 )
 if(this.state.optionCluster[0].value !== null){
 this.state.optionCluster.unshift({key:2019,text:"Select Cluster",value:null})}}
 else if(clusterid == null){
  this.setState({clusterid1:clusterid,id:clusterid,idName:"cluster_id"},()=>{
    
    this.setState({smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub="+this.state.hubid1
    +"&city="+this.state.cityid1})
    

  }
 )
 if(this.state.optionCluster[0].value !== null){
this.state.optionCluster.shift()}
 }

}









//end of event of dropdown in post data---------------------------------------------------------------

//event of smart data get ---------------------------------------------------------------------
  searchData =(e)=>{

this.setState({free:"1",showtable:true},()=>{
  this.callapi()
})
const year = this.state.year1


    // axios.get('http://134.209.153.34:5004/getsmartdataNew?cluster_id='+this.state.clusterid1+
    // '&year='+year)

    
    

  }

uploadChange=(e)=>{
let value = e.target.files[0]
this.setState({xlfile:value},()=>{
})

}

uploadHandler=(e)=>{
  this.uploadApi()
  }
  
uploadApi() {
  const data = new FormData()
 
  data.append('Filename', this.state.xlfile)
    axios.post("http://134.209.153.34:5004/Uploadexcel", data, 

)

   .then(res => { // then print response status

  if (res.data.result == " Record Inserted" && res.status ==true){
    alert("Data Uploaded Successfully")
  }
  else {
    alert("Please, Upload correct format of excelsheet")
  }
  this.setState({xlfile:"",theInputKey:Math.random().toString(36)})
  })
  .catch(err => { 
    alert("Please upload correct format of excelsheet")
}
)
}
hoveringData=(i,id1,id2,id3)=>{
if(this.state.hubid1 == "" || this.state.hubid1 == null){
  this.setState({hubid2:id1["hub"],cityid2:id1["city"],clusterid2:id1["cluster"]})
  
 this.HubApi(id1["zone"])
  this.CityApi(id1["hub"])
  this.ClusterApi(id1["city"])

}
else if(this.state.cityid1 == ""|| this.state.cityid1 == null){
  this.setState({cityid2:id1["city"],clusterid2:id1["cluster"]})
  this.ClusterApi(id1["city"])
  this.CityApi(id1["hub"])
 
}
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
    // zoneid1:"",
    // hubid1:"",
    // cityid1:"",
    // clusterid1:"",
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
// smartApi:'http://134.209.153.34:5004/getsmartdata?zone='+this.state.zoneid1+"&hub="+this.state.hubid1
//     +"&city="+this.state.cityid1+"&cluster="+this.state.clusterid1,
    jan:{arr:"",occ:"",revpar:""},noCancelBar:true,
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
  this.callapi()
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
       

if(this.state.zone !== ""){
  const zone = this.state.zone
 
}


      let main=this.state;

  
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


                    <div className="col-sm-12 col-md-12">

                   {this.state.isList && <div className="uppr-box-r">
                        <button type="button" className="login100-form-btn upsheet" data-toggle="modal" data-target="#exampleModalLong">
                        <i class="fa fa-upload" aria-hidden="true"></i> <span>Upload ExcelSheet</span>
                        </button>
                      </div>}





                      {this.state.addFreshData && <div className="wrap-had">
                     {!this.state.noCancelBar &&   <a  style={{    cursor: "pointer"}}  className="clk" onClick={this.lastHandler}>
            {/* { this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Smart Data</span>} */}
            
            { !this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
                        </a>}
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
           defaultValue={this.state.zoneid2} > </DropDown>
      </div>

        </td>
        <td>

<div className="dp-wrp">
<label>Hub</label>
<DropDown onChange={this.hubSelected} options={this.state.optionHub}   defaultValue={this.state.hubid2}
          placeholder =" Select Hub" />
</div>

</td>
<td>

<div className="dp-wrp">
<label>City</label>
<DropDown options ={this.state.optionCity}  placeholder= "Select City"
onAddItem={this.handleAddition}
onChange={this.citySelected} defaultValue={this.state.cityid2} 
> </DropDown>
</div>

</td>
<td>

<div className="dp-wrp">
<label>Cluster</label>

<DropDown onChange={this.clusterSelected} options={this.state.optionCluster} defaultValue={this.state.clusterid2} 
           placeholder =" Select Cluster"/>
</div>

</td>


        
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
                                <input  onChange={(e)=>{this.setState({jan:{...main.jan,arr: e.target.value,revpar:(e.target.value*main.jan.occ/100+"")}})}}  className="fom-wd" value={main.jan.arr} type="number" name placeholder /></h5>
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
                                            <input onChange={(e) => { this.setState({ feb: { ...main.feb, arr: e.target.value, revpar: (e.target.value * main.feb.occ/100 + "" )} }) }} className="fom-wd" value={main.feb.arr} type="number" name placeholder /></h5>
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
                                <input  onChange={(e)=>{this.setState({mar:{...main.mar,arr: e.target.value,revpar:(e.target.value*main.mar.occ/100+"")}})}}  className="fom-wd" value={main.mar.arr} type="number" name placeholder /></h5>
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
                                <input  onChange={(e)=>{this.setState({apr:{...main.apr,arr: e.target.value,revpar:(e.target.value*main.apr.occ/100+"")}})}}  className="fom-wd" value={main.apr.arr} type="number" name placeholder /></h5>
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
                                <input  onChange={(e)=>{this.setState({may:{...main.may,arr: e.target.value,revpar:(e.target.value*main.may.occ/100+"")}})}}  className="fom-wd" value={main.may.arr} type="number" name placeholder /></h5>
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
                                <input  onChange={(e)=>{this.setState({jun:{...main.jun,arr: e.target.value,revpar:(e.target.value*main.jun.occ+"")}})}}  className="fom-wd" value={main.jun.arr} type="number" name placeholder /></h5>
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
                                <input  onChange={(e)=>{this.setState({oct:{...main.oct,arr: e.target.value,revpar:(e.target.value*main.oct.occ/100+"")}})}}  className="fom-wd" value={main.oct.arr} type="number" name placeholder /></h5>
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
                                <input  onChange={(e)=>{this.setState({nov:{...main.nov,arr: e.target.value,revpar:(e.target.value*main.nov.occ/100+"")}})}}  className="fom-wd" value={main.nov.arr} type="number" name placeholder /></h5>
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
                                <input  onChange={(e)=>{this.setState({dec:{...main.dec,arr: e.target.value,revpar:(e.target.value*main.dec.occ/100+"")}})}}  className="fom-wd" value={main.dec.arr} type="number" name placeholder /></h5>
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
                                  {this.state.isEdit && <a  className="form-btn" onClick={()=>{this.updatetapi()}}><span className="update-btn" style={{color:"#fff",fontSize:"15px"}}>update</span></a>}
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
               {this.state.isList &&     <div className="container-fluid tbl-b animated--grow-in adduserr">
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
                                   onChange={this.onchange}
                                value={this.state.zoneid1}
                              > </DropDown>
                              </div>

                                </td>
                                <td>

<div className="dp-wrp">
<label>Hub</label>
<DropDown onChange={this.hubSelected} options={this.state.optionHub} value={this.state.hubid1} 
                                  placeholder =" Select Hub"/>
</div>

  </td>
  <td >

<div className="dp-wrp">
<label>City</label>
<DropDown options ={this.state.optionCity}  placeholder= "Select City"
     onAddItem={this.handleAddition}
     onChange={this.citySelected}
  value={this.state.cityid1}> </DropDown>
</div>

  </td>
  <td >

<div className="dp-wrp">
<label>Cluster</label>
<DropDown onChange={this.clusterSelected} options={this.state.optionCluster} value={this.state.clusterid1} 
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

 {}
 {this.state.tableData !== "" && 
 <SmartStyled>
                  <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="one-rap-tb">
              <div className="rap-table">
                <div className="data-box">
                  <table className>
                  <thead className="info-hading hnd">
                   
                   <tr>
                <th>Zone</th> <th>Hub</th>  <th>City</th>  <th>Cluster</th>
                   
                    
                   </tr> 
                 </thead>
                    <thead className="info-hading spac">
                   
                      <tr>
                      <th>Zone</th> <th>Hub</th>  <th>City</th>  <th>Cluster</th>
                      </tr> 
                    </thead>
                    <tbody>
                     
                    { Array.isArray(this.state.tableData)   ? 
  this.state.tableData.map((item,i)=>{
    
    if(item.length != 0){
    return(
      <tr>
        <td>{item[0]["zone"]}</td> <td>{item[0]["hub"]}</td> <td>{item[0]["city"]}</td><td>{item[0]["cluster"]}</td>
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
          </SmartStyled>}

  

                </div>
                
               }
              {/* End Table Data */}
              </div>
            
              {/* End of Main Content */}
              {/* Footer */}
              <footer className="sticky-footer bg-white">
                <div className="container my-auto">

                  <div className="copyright text-center my-auto">
                    <span>Copyright ©Digitology Healthtech Pvt. Ltd. 2020</span>
                    
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