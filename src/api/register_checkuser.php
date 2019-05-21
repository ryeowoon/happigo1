<?php
	//接受数据
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';

	
	//连接数据库
	include 'conn.php';
	
	//写查询语句 
    $sql = "SELECT * from user WHERE phone = $phone";
	
	//获取结果集
	$res = $conn->query($sql);//结果集
	
	//从结果集中获取数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>