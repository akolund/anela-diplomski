<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");
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

//set ID to update
$post->question_id = $data->question_id;

//delete question
if ($post->deleteQuestion()){
  echo json_encode(
    array('message' => 'Question deleted')
  );
}else{
  echo json_encode(
    array('message' => 'Question not deleted ')
  );
}
