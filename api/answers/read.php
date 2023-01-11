<?php
//headers
header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");

include_once('../../config/Database.php');
include_once('../../model/Answer.php');
include_once('../../view/answers.php');

//instantiate DB & connect
$database = new Database();
$db = $database->connect();
// Instantiate blog answer object
$answer = new Answer($db); //ovaj $db je iz konstruktora u Answer.php

// survey answer $query
$result = $answer->read();

//get row count
$num = $result->rowCount();

//check if any row
  if ($num > 0){


    $answers_arr = array();
    $answers_arr['data'] = array();
    while($row=$result->fetch(PDO::FETCH_ASSOC)){

        // echo $row['question_name'];
        extract($row);
        $answer_item = array('question_id' => $question_id,
         'question_name' => $question_name,
         'answer_id' => $answer_id,
         'answer_value' => $answer_value,
         'answer_body' => html_entity_decode(utf8_encode($answer_body))
       );

        array_push($answers_arr['data'], $answer_item);
    }
    // utf8_encode($answers_arr);
     echo json_encode($answers_arr);
    $odgovori = json_encode($answers_arr);

    // $fp = fopen('results.json', 'w');
    // fwrite($fp, $odgovori);
    // fclose($fp);
  }else{
    echo json_encode(array('message' => 'There is no answers'));
  }
