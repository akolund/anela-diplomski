<?php
class Answer{
private $conn;
private $table = "survey_answers";

public $question_name;
public $question_id;
public $answer_id;
public $answer_value;
public $answer_body;

//Constructor with // DB
public function __construct($db){
  $this->conn = $db;

}
//GET survey_answers
public function read(){
    //create query
    $query = "SELECT q.question_name as question_name, a.question_id, a.answer_id, a.answer_value,a.answer_body
     FROM ". $this->table ." a LEFT JOIN survey_questions q ON a.question_id = q.question_id";
// $query = "SELECT * FROM ". $this->table;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }
  // get signle answer
  public function read_answer(){
      //create query
      $query = "SELECT q.question_name as question_name, a.question_id, a.answer_id, a.answer_value,a.answer_body
       FROM ". $this->table ." a LEFT JOIN survey_questions q ON a.question_id = q.question_id WHERE a.answer_id  = ? LIMIT 0,1";
      // $query = "SELECT * FROM survey_answers ";
      $stmt = $this->conn->prepare($query);
      //Bind ID
      $stmt->bindParam(1, $this->id);
      //execute query
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      $this->question_id = $row['question_id'];
      $this->question_name = $row['question_name'];
      $this->answer_id = $row['answer_id'];
      $this->answer_value = $row['answer_value'];
      $this->answer_body = $row['answer_body'];
    }


    //Update answer
    public function updateAnswer(){
      //Create query
      $query = 'UPDATE ' .$this->table . ' SET answer_value = :answer_value, answer_body = :answer_body
      WHERE answer_id  = :answer_id ';
      //prepare statement
      $stmt = $this->conn->prepare($query);

      //clean data in security
      $this->answer_value =htmlspecialchars(strip_tags($this->answer_value));
      $this->answer_body =htmlspecialchars(strip_tags($this->answer_body));

      //Bind data
      $stmt->bindParam(':answer_id', $this->answer_id);
      $stmt->bindParam(':answer_value', $this->answer_value);
      $stmt->bindParam(':answer_body', $this->answer_body);

    // Execute query
      //ovdje ne vracamo podatk, nego ih kreiramo
        if ($stmt->execute()){
            return true;
        }else{
          //print errorif something goes wrong
          printf("Error: %s.\n ", $stmt->error);
          return false;
        }
    }


    //Create answer
    public function createAnswer(){
      //Create query
      $query = 'INSERT INTO ' .$this->table . ' SET answer_value = :answer_value, answer_body = :answer_body, question_id = :question_id ';
      //prepare statement
      $stmt = $this->conn->prepare($query);

      //clean data in security
      $this->answer_value =htmlspecialchars(strip_tags($this->answer_value));
      $this->answer_body =htmlspecialchars(strip_tags($this->answer_body));
      $this->question_id =htmlspecialchars(strip_tags($this->question_id));

      //Bind data
      $stmt->bindParam(':answer_value', $this->answer_value);
      $stmt->bindParam(':answer_body', $this->answer_body);
      $stmt->bindParam(':question_id', $this->question_id);
    // Execute query
      //ovdje ne vracamo podatk, nego ih kreiramo
        if ($stmt->execute()){
            return true;
        }else{
          //print errorif something goes wrong
          printf("Error: %s.\n ", $stmt->error);
          return false;
        }
    }
    // Delete answer
  public function deleteAnswer(){
    //create $query
    $query = 'DELETE FROM ' .$this->table . ' WHERE answer_id = :answer_id ';
    //preprare statement
    $stmt = $this->conn->prepare($query);
    //clean data
    $this->answer_id =htmlspecialchars(strip_tags($this->answer_id));
    //bind data
    $stmt->bindParam(':answer_id', $this->answer_id);
    //execute query
    if ($stmt->execute()){
        return true;
    }
      //print errorif something goes wrong
      printf("Error: %s.\n ", $stmt->error);
      return false;

  }

}
