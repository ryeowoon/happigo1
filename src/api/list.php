<?php
	//接受数据
	$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '服装配饰11';
	$sortKey = isset($_GET['sortKey']) ? $_GET['sortKey'] : 'id';
	$sortWay = isset($_GET['sortWay']) ? $_GET['sortWay'] : 'ASC';
	
	//连接数据库
	include 'conn.php';
	
	//写查询语句 
    $sql = "SELECT * from happigogoods WHERE type3 LIKE '%$keyword%' ORDER BY $sortKey $sortWay";
	
	//获取结果集
	$res = $conn->query($sql);//结果集
	
	//从结果集中获取数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>
