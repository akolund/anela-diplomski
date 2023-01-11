<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With");


include_once ('../../config/Database.php');
include_once ('../../model/Answer.php');

//instantiate DB & connect
$database = new Database();
$db = $database->connect();
// Instantiate blog post object
$answer = new Answer($db); //ovaj $db je iz konstruktora u Answer.php

//Get raw posted data
$data = json_decode(file_get_contents("php://input"));

$answer->answer_value = $data->answer_value;
$answer->answer_body = $data->answer_body;
$answer->question_id = $data->question_id;

//create question
if ($answer->createAnswer()){
  echo json_encode(
    array('message' => 'Answer created')
  );
}else{
  echo json_encode(
    array('message' => 'Answer not created ')
  );
}
