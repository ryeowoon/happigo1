<?php
    //接受数据
    $name = isset($_GET['username']) ? $_GET['username'] : 'zhangsan';
	$goodsid = isset($_GET['goodsid']) ? $_GET['goodsid'] : '12';
	$goodsname = isset($_GET['goodsname']) ? $_GET['goodsname'] : '服装配饰';
	$goodspic = isset($_GET['goodspic']) ? $_GET['goodspic'] : '2.jpg';
    $originprice = isset($_GET['originprice']) ? $_GET['originprice'] : '';
    $currentprice = isset($_GET['currentprice']) ? $_GET['currentprice'] : '';
    $stocknum = isset($_GET['stocknum']) ? $_GET['stocknum'] : '';
    $num = isset($_GET['num']) ? $_GET['num'] : '';
    
    
	//连接数据库
	include 'conn.php';
	
	//写查询语句 

    $sql = "INSERT INTO cart (username,goodsid,goodsname,goodspic,originprice,currentprice,stocknum,num) VALUES ('$name',$goodsid,'$goodsname','$goodspic',$originprice,$currentprice,$stocknum,$num)";
	
	$result =$conn->query($sql);//insert update delete语句都是返回布尔值
  
      if($result){//插入成功
        echo 'yes';
      }else{
        echo 'no';
      }
  	$conn->close();

?>