<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With");


include_once ('../../config/Database.php');
include_once ('../../model/Answer.php');

//instantiate DB & connect
$database = new Database();
$db = $database->connect();
// Instantiate blog answer object
$answer = new Answer($db); //ovaj $db je iz konstruktora u Answer.php

//Get raw Answer data
$data = json_decode(file_get_contents("php://input"));

//set ID to update
$answer->answer_id = $data->answer_id;

$answer->answer_value = $data->answer_value;
$answer->answer_body = $data->answer_body;

//update answer
if ($answer->updateAnswer()){
  echo json_encode(
    array('message' => 'Answer updated')
  );
}else{
  echo json_encode(
    array('message' => 'Answer not updated ')
  );
}
