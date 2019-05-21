<?php
	
	//准备参数
	$severnamesq = 'localhost';
	$usernamesq = 'root';
	$passwordsq = '';
	$dbname = 'h5db';
	
	//创建链接
	$conn = new mysqli($severnamesq,$usernamesq,$passwordsq,$dbname);
	
	
	// 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
	
?>