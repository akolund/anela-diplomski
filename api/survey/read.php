<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once ('../../config/Database.php');
include_once ('../../model/Survey.php');

//instantiate DB & connect
$database = new Database();
$db = $database->connect();
// Instantiate blog post object
$survey = new Survey($db); //ovaj $db je iz konstruktora u Post.php

// survey post $query
$result = $survey->read();

//get row count
$num = $result->rowCount();

//check if any row
if ($num > 0){
  //post array
  $surveys_arr = array();
  $surveys_arr['data'] = array();
  while($row=$result->fetch(PDO::FETCH_ASSOC)){
    // echo $row['survey_id'];
    extract($row);
    $survey_item = array('survey_id' => $survey_id,
    'survey_name' => $survey_name,
     'survey_description' => $survey_description,
     'author_id' => $author_id,
     'question_name' => $question_name,
     'question_body' => html_entity_decode($question_body),
      'question_type' => $question_type,
      'answer_value' => $answer_value,
     'answer_body' => html_entity_decode($answer_body)
   );

array_push($surveys_arr['data'], $survey_item);

  }
  echo json_encode($surveys_arr);
}else{
echo json_encode(array('message' => 'There is no surveys'));
}
