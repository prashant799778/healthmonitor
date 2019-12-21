    var flag = true;
    $(document).ready(function(){
    $(".clk").click(function(){
      if(flag){
        
        $(".wrp-box").css("display","block");
        $(".clk").css({"background":"#2e59d9", "border-color":"#2e59d9"});
        $(".fa-chevron-left").css("display","none");
        $(".tbl-b").css("display","none");
        $(".adu").css("display","none");
        $(".canl").css("display","inline-block");
      
        
      flag=false;
    }
    else{
      
      $(".wrp-box").css("display","none");
      $(".clk").css({"background":"#2e59d9", "border-color":"#2e59d9"});
      $(".tbl-b").css("display","block");
      $(".adu").css("display","inline-block");
      $(".canl").css("display","none");
      flag= true;
    }
  });
});