<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With");


include_once ('../../config/Database.php');
include_once ('../../model/Post.php');

//instantiate DB & connect
$database = new Database();
$db = $database->connect();
// Instantiate blog post object
$post = new Post($db); //ovaj $db je iz konstruktora u Post.php

//Get raw posted data
$data = json_decode(file_get_contents("php://input"));

$post->question_name = $data->question_name;
$post->question_body = $data->question_body;
$post->question_type = $data->question_type;
$post->survey_id = $data->survey_id;

//create question
if ($post->createQuestion()){
  echo json_encode(
    array('message' => 'Question created')
  );
}else{
  echo json_encode(
    array('message' => 'Question not created ')
  );
}
