<?php
	//接受数据
	$mark = isset($_GET['mark']) ? $_GET['mark'] : '';
	//连接数据库
	include 'conn.php';
	
	//写查询语句 
    $sql = "SELECT * from happigogoods WHERE mark = '$mark' ORDER BY id ASC";
	
	//获取结果集
	$res = $conn->query($sql);//结果集
	
	//从结果集中获取数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>
