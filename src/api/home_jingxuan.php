
<?php
	//连接数据库
    include 'conn.php';
    
    //接受数据
    $activity1 = isset($_GET["activity1"]) ? $_GET['activity1'] : '个护美妆';
    $activity2 = isset($_GET['activity2']) ? $_GET['activity2'] : '牌品馆';
    $activity3 = isset($_GET['activity3']) ? $_GET['activity3'] : '餐厨日用';
    $activity4 = isset($_GET['activity4']) ? $_GET['activity4'] : '服装配饰';
    $activity5 = isset($_GET['activity5']) ? $_GET['activity5'] : '食品健康';
    

	
	//写查询语句 
	$sql1 = "SELECT * from happigogoods WHERE type1 = '$activity1' ORDER BY id ASC LIMIT 0,4";
	//获取结果集
	$res1 = $conn->query($sql1);//结果集
	
	//从结果集中获取数据
    $content1 = $res1->fetch_all(MYSQLI_ASSOC);
    
    //第二个
    //写查询语句 
	$sql2 = "SELECT * from happigogoods WHERE type1 = '$activity2' ORDER BY id ASC LIMIT 0,4";
	
	//获取结果集
	$res2 = $conn->query($sql2);//结果集
	
	//从结果集中获取数据
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);
    
    //第3个
    //写查询语句 
	$sql3 = "SELECT * from happigogoods WHERE type1 = '$activity3' ORDER BY id ASC LIMIT 0,4";
	
	//获取结果集
	$res3 = $conn->query($sql3);//结果集
	
	//从结果集中获取数据
    $content3 = $res3->fetch_all(MYSQLI_ASSOC);
    
    //第4个
    //写查询语句 
	$sql4 = "SELECT * from happigogoods WHERE type1 = '$activity4' ORDER BY id ASC LIMIT 0,4";
	
	//获取结果集
	$res4 = $conn->query($sql4);//结果集
	
	//从结果集中获取数据
    $content4 = $res4->fetch_all(MYSQLI_ASSOC);
    
    //第二个
    //写查询语句 
	$sql5 = "SELECT * from happigogoods WHERE type1 = '$activity5' ORDER BY id ASC LIMIT 0,4";
	
	//获取结果集
	$res5 = $conn->query($sql5);//结果集
	
	//从结果集中获取数据
	$content5 = $res5->fetch_all(MYSQLI_ASSOC);
	
	
	
	//如果要传输多个数据，可以做成关联数组
	$productlist = array(
        'activity1' => $content1,
        'activity2' => $content2,
        'activity3' => $content3,
        'activity4' => $content4,
        'activity5' => $content5
	);
	
	echo json_encode($productlist,JSON_UNESCAPED_UNICODE);
?>


