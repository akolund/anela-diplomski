<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once ('../../config/Database.php');
include_once ('../../model/Post.php');

//instantiate DB & connect
$database = new Database();
$db = $database->connect();
// Instantiate blog post object
$post = new Post($db); //ovaj $db je iz konstruktora u Post.php

// survey post $query
$result = $post->read();

//get row count
$num = $result->rowCount();

//check if any row
if ($num > 0){
  //post array
  $posts_arr = array();
  $posts_arr['data'] = array();
  while($row=$result->fetch(PDO::FETCH_ASSOC)){
    // echo $row['survey_id'];
    extract($row);
    $post_item = array('survey_id' => $survey_id,
    'survey_name' => $survey_name,
     'question_id' => $question_id,
     'question_name' => $question_name,
     'question_body' => html_entity_decode($question_body),
      'question_type' => $question_type
   );

array_push($posts_arr['data'], $post_item);

  }
  echo json_encode($posts_arr);
}else{
echo json_encode(array('message' => 'There is no surveys'));
}
