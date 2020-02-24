<?php
require __DIR__ . '/vendor/autoload.php';

use Medoo\Medoo;
use Twilio\Rest\Client;
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {

    $phoneNumber = $_POST['phoneNumber'];
    if(!!$phoneNumber) {
        if (!preg_match('/^((\+7|7|8)+([0-9]){10})$/', $_POST['phoneNumber'])) {
            http_response_code(400);
            echo json_encode(['message' => 'incorrect phone number', 'code' => 400], JSON_FORCE_OBJECT);
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


        $code = random_int(1000, 9999);


        $data = $database->select('codes', [
            'codeId',
        ], [
            'PhoneNumber' => $phoneNumber,
            'isActive' => true,
        ]);

        if (!!$data) {
            $database->update('codes', [
                'isActive' => false
            ], [
                'codeId' => $data[0]['codeId']
            ]);
        }

        $database->insert('codes', [
            'PhoneNumber' => $phoneNumber,
            'loginCode' => $code,
            'isActive' => true,
        ]);

        $twilio_number = "+12019879710";

        $client = new Client($account_sid, $auth_token);
        $test = $client->messages->create(
            $phoneNumber,
            array(
                'from' => $twilio_number,
                'body' => $code
            )
        );
        http_response_code(200);
        echo json_encode(['message' =>'Ok', 'code'=>200], JSON_FORCE_OBJECT);
        return;
    } else {
        http_response_code(400);
        echo json_encode(['message' =>'Empty phone number', 'code'=>400], JSON_FORCE_OBJECT);
        return;
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['message' =>$e->getMessage(), 'code'=>400], JSON_FORCE_OBJECT);
    return;
}
?>