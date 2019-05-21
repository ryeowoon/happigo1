
<?php
    include 'conn.php';

    //写查询语句
    $sql = 'SELECT * from usermsg';

    //获取结果集
    $res = $conn->query($sql);

    //从结果集获取数据
    $content = $res->fetch_all(MYSQLI_ASSOC);

    //返回数据
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>
