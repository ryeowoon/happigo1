
<?php
    //接受数据
    $index = isset($_GET['index']) ? $_GET['index'] : '58';
    $num = isset($_GET['num']) ? $_GET['num'] : '200';
    
    
	//连接数据库
	include 'conn.php';
	
	//写查询语句 

    $sql = "UPDATE cart set num = $num WHERE id = $index";
	
	$result =$conn->query($sql);//insert update delete语句都是返回布尔值
  
      if($result){//插入成功
        echo 'yes';
      }else{
        echo 'no';
      }
  	$conn->close();
?>