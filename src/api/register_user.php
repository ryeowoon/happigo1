
<?php
	//接受数据
	$username1 = isset($_POST['username']) ? $_POST['username'] : '';
	$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
	$psw = isset($_POST['psw']) ? $_POST['psw'] : '';
	
	//连接数据库
	include 'conn.php';
	
	//写查询语句 

    $sql = "INSERT INTO USER (username,phone,psw) VALUES ('$username1','$phone','$psw')";
	
	$result =$conn->query($sql);//insert update delete语句都是返回布尔值
  
      if($result){//插入成功
        echo true;
      }else{
        echo false;
      }
  	$conn->close();

?>

   

