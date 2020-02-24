<?php
require __DIR__ . '/vendor/autoload.php';
use Medoo\Medoo;

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
try {

    $userStatus = $_POST['status'];
    $phoneNumber = $_POST['phoneNumber'];

    if(!(!!$phoneNumber && !!$userStatus)){
        http_response_code(400);
        echo json_encode([
            'message' => 'Empty phone number',
            'code' => 400,
            'phone' => !!$phoneNumber,
            'status' => !!$userStatus,
            'post' => $_POST
            ], JSON_FORCE_OBJECT);
        return;
    }
    $userStatus = $userStatus=='true'?true:false;

    if(!preg_match('//', $phoneNumber)){
        http_response_code(400);
        echo json_encode(['message' => 'Incorrect phone number', 'code' => 400], JSON_FORCE_OBJECT);
        return;
    }

    $database = new Medoo([
        'database_type' => 'mysql',
        'database_name' => 'u555730kr_parkingDB',
        'server' => 'localhost',
        'username' => 'u555730kr_parkingDB',
        'password' => 'GkBiRYO2'
    ]);
    $tableName = 'Parking_entry';

    $isEntered = $database->select($tableName,[
        'EntryId',
        'EntryStatus',
        'LastTime'
    ],[
        'PhoneNumber' => $phoneNumber
    ]);

    if(!$isEntered){
        if($userStatus) {
            $database->insert($tableName, [
                'PhoneNumber' => $phoneNumber,
                'EntryStatus' => true,
                'LastTime' => time()
            ]);
            http_response_code(200);
            echo json_encode(['message' => 'Ok', 'code' => 200], JSON_FORCE_OBJECT);
            return;
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'You have not entered yet', 'code' => 400], JSON_FORCE_OBJECT);
            return;
        }
    } else {
        if ($isEntered[0]['EntryStatus'] == $userStatus){
            http_response_code(401);
            echo json_encode(['message' => 'You already did it', 'code' => 401], JSON_FORCE_OBJECT);
            return;
        } else {
            $resTime = $isEntered[0]['LastTime'];
            $curTime = time();
            $resultUp = $database->update($tableName, [
                'EntryStatus' => $userStatus,
                'LastTime' => $curTime
            ], [
                'EntryId' => $isEntered[0]['EntryId']
            ]);

            if($userStatus){
                http_response_code(200);
                echo json_encode(['message' => 'Ok', 'code' => 200], JSON_FORCE_OBJECT);
                return;
            } else {
                http_response_code(200);
                echo json_encode(['message' => 'Ok', 'code' => 200, 'time'=>($curTime-$resTime)], JSON_FORCE_OBJECT);
                return;
            }
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' =>$e->getMessage(), 'code'=>500], JSON_FORCE_OBJECT);
    return;
}
?>