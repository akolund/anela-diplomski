<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Content-Type: text/html; charset=utf-8');
include_once ('../../config/Database.php');
include_once ('../../model/Answer.php');

//instantiate DB & connect
$database = new Database();
$db = $database->connect();
// Instantiate blog post object
$answer = new Answer($db); //ovaj $db je iz konstruktora u Answer.php

//Get ID
//npr. example.com?id=3 $_GET['id'] kupi taj broj 3
//u post settamo ID $answer->id,te ispitujemo postoji li ID isset($_GET['id'])
//if that set then GET['id'] else call die() function
$answer->id = isset($_GET['id']) ? $_GET['id'] : die();

//Get post
$answer->read_answer();

//kreiraj array
$answer_arr = array (
  'question_id' =>$answer->question_id,
  'question_name' =>$answer->question_name,
  'answer_id' =>$answer->answer_id,
  'answer_value' =>$answer->answer_value,
  'answer_body' =>$answer->answer_body

);
//Make JSON
print_r(json_encode($answer_arr,JSON_UNESCAPED_UNICODE));
