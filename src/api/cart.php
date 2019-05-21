
<?php
	//接受数据
	$name = isset($_GET['name']) ? $_GET['name'] : '张三';
	//连接数据库
	include 'conn.php';
	// echo $name;
	//写查询语句 
    $sql = "SELECT * from cart WHERE username = '$name'";
	
	//获取结果集
	$res = $conn->query($sql);//结果集
	
	//从结果集中获取数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>
