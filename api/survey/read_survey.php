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

//Get ID
//npr. example.com?id=3 $_GET['id'] kupi taj broj 3
//u post settamo ID $survey->id,te ispitujemo postoji li ID isset($_GET['id'])
//if that set then GET['id'] else call die() function
$survey->id = isset($_GET['id']) ? $_GET['id'] : die();

//Get post
$survey->read_survey();

//kreiraj array
$survey_arr = array (
  'survey_id' => $survey->survey_id,
  'survey_name' => $survey->survey_name,
  'survey_description' => $survey->survey_description,
  'author_id' => $survey->author_id,
  'question_type' => $survey->question_type,
  'question_name' => $survey->question_name,
  'question_body' => $survey->question_body,
  'answer_value' => $survey->answer_value,
  'answer_body' => $survey->answer_body
);
//Make JSON
print_r(json_encode($survey_arr));
