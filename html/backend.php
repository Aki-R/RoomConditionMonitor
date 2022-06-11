<?php
// host名、DB名、DBユーザ名、DBパスワード
define('DSN','mysql:host=127.0.0.1;dbname=roomconditionmonitor');
define('DB_USER','roomcondition_reading_user');
define('DB_PASSWORD','roomcondition_reading_pass');

// E_NOTICE 以外の全てのエラーを表示する
error_reporting(E_ALL & ~E_NOTICE);

// Connect to SQL database
function connectDb(){
    try {
        return new PDO(DSN, DB_USER, DB_PASSWORD);
    }catch(PDOException $e){
        echo 'dbconnectfail';
        echo $e->getMessage();
        exit;
    }
}

//DB接続
$dbh = connectDb();

//prepareによるクエリの実行準備
$sth = $dbh->prepare("SELECT * FROM roomcondition_table");

//クエリの実行
$sth->execute();

//配列の初期化
$userData=array();

while($row=$sth->fetch(PDO::FETCH_ASSOC)){ //結果を配列で取得
    $roomconditionData[]=array(
        'id'=>$row['id'],
        'date'=>$row['date'],
        'eCO2'=>$row['eCO2'],
        'eTVOC'=>$row['eTVOC'],
        'atom_pressure'=>$row['atom_pressure']
    );
}

//PHPの配列をJSON形式のデータに変換
echo json_encode($roomconditionData);
?>