<?php
    //接受数据
    $mark = isset($_GET['mark']) ? $_GET['mark'] : 'xinpin';
	$page = isset($_GET['page']) ? $_GET['page'] : '1';
	$num =  isset($_GET['num']) ? $_GET['num'] : '4';
	
	//连接数据库
	include 'conn.php';
	
	//写查询语句 
	$index = ($page - 1) * $num;
	$sql = "SELECT * from happigogoods WHERE mark = '$mark' ORDER BY id ASC LIMIT $index,$num";
	
	//获取结果集
	$res = $conn->query($sql);//结果集
	
	//从结果集中获取数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	
	//查询所有的数据 获取总条数
	$sql2 = "SELECT * from happigogoods WHERE mark = '$mark' ORDER BY id ASC";
	
	//执行语句
	$res2 = $conn->query($sql2);
	
	
	//如果要传输多个数据，可以做成关联数组
	$productlist = array(
		'data' => $content,
		'total' => $res2->num_rows,
		'page' => $page,
		'num' => $num
	);
	
	echo json_encode($productlist,JSON_UNESCAPED_UNICODE);
?>