<?php
require __DIR__ . '/vendor/autoload.php';
use Medoo\Medoo;

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {
    $phoneNumber = $_POST['phoneNumber'];
    $code = $_POST['code'];
    if(!!$phoneNumber && !!$code) {
        if(!(preg_match('/^((\+7|7|8)+([0-9]){10})$/', $_POST['phoneNumber'])&& preg_match('/^[1-9]{4}$/', $_POST['code']))){
            http_response_code(400);
            echo json_encode(['message' =>'incorrect phone number or sms code', 'code'=>400], JSON_FORCE_OBJECT);
            return;
        }

        $database = new Medoo([
            'database_type' => 'mysql',
            'database_name' => 'u555730kr_parkingDB',
            'server' => 'localhost',
            'username' => 'u555730kr_parkingDB',
            'password' => 'GkBiRYO2'
        ]);

        $account_sid = 'AC25bec2345999af391205e6d9fa3032f5';
        $auth_token = 'e15f486e0649e7e0a9ec69f0642139a7';



        $codeFromDB = $database->select('codes', [
            'loginCode',
        ], [
            'PhoneNumber' => $phoneNumber,
            'isActive' => true,
        ]);

        if (!!$codeFromDB) {
            if ($codeFromDB[0]['loginCode'] == $code) {

                $database->update('codes', [
                    'isActive' => false
                ], [
                    'loginCode' => $codeFromDB[0]['loginCode']
                ]);

                http_response_code(200);
                echo json_encode(['message' =>'Ok', 'code'=>200], JSON_FORCE_OBJECT);
                return;
            } else {
                http_response_code(401);
                echo json_encode(['message' =>'Bad code', 'code'=>401], JSON_FORCE_OBJECT);
                return;
            }
        } else {

            http_response_code(400);
            echo json_encode(['message' =>'empty user code', 'code'=>400], JSON_FORCE_OBJECT);
            return;
        }
    }
    else {
        http_response_code(400);
        echo json_encode(['message' =>'empty request data', 'code'=>400], JSON_FORCE_OBJECT);
        return;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' =>$e->getMessage(), 'code'=>500], JSON_FORCE_OBJECT);
    return;
}
?>