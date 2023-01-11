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

//Get ID
//npr. example.com?id=3 $_GET['id'] kupi taj broj 3
//u post settamo ID $post->id,te ispitujemo postoji li ID isset($_GET['id'])
//if that set then GET['id'] else call die() function
$post->id = isset($_GET['id']) ? $_GET['id'] : die();

//Get post
$post->read_question();

//kreiraj array
$post_arr = array (
  'question_id' =>$post->question_id,
  'question_name' =>$post->question_name,
  'question_body' =>$post->question_body,
  'question_type' =>$post->question_type,
  'survey_id' =>$post->survey_id,
  'survey_name' =>$post->survey_name
);
//Make JSON
print_r(json_encode($post_arr));
