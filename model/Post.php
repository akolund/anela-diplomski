<?php
class Post{
private $conn;
private $table = "survey_questions";

public $survey_name;
public $question_id;
public $survey_id;
public $question_name;
public $question_body;
public $question_type;

//Constructor with // DB
public function __construct($db){
  $this->conn = $db;

}
//GET survey_questions
public function read(){
    //create query
    $query = "SELECT t.survey_name as survey_name, q.question_id, q.survey_id, q.question_name,q.question_body,q.question_type FROM ". $this->table ." q LEFT JOIN survey_table t ON q.survey_id = t.survey_id";
    // $query = "SELECT * FROM survey_table ";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }
  // get signle question
  public function read_question(){
      //create query
      $query = "SELECT DISTINCT t.survey_name as survey_name, q.question_id, q.survey_id, q.question_name,q.question_body,q.question_type FROM ". $this->table ." q
       LEFT JOIN survey_table t ON q.survey_id = t.survey_id WHERE q.question_id  = ? LIMIT 0,1";
      // $query = "SELECT * FROM survey_table ";
      $stmt = $this->conn->prepare($query);
      //Bind ID
      $stmt->bindParam(1, $this->id);
      //execute query
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      $this->question_id = $row['question_id'];
      $this->question_name = $row['question_name'];
      $this->question_body = $row['question_body'];
      $this->question_type = $row['question_type'];
      $this->survey_id = $row['survey_id'];
      $this->survey_name = $row['survey_name'];
    }


    //Update question
    public function updateQuestion(){
      //Create query
      $query = 'UPDATE ' .$this->table . ' SET question_name = :question_name, question_body = :question_body, question_type = :question_type, survey_id = :survey_id
      WHERE question_id = :question_id';
      //prepare statement
      $stmt = $this->conn->prepare($query);

      //clean data in security
      $this->question_name =htmlspecialchars(strip_tags($this->question_name));
      $this->question_body =htmlspecialchars(strip_tags($this->question_body));
      $this->question_type =htmlspecialchars(strip_tags($this->question_type));
      $this->survey_id =htmlspecialchars(strip_tags($this->survey_id));
      $this->question_id =htmlspecialchars(strip_tags($this->question_id));

      //Bind data
      $stmt->bindParam(':question_name', $this->question_name);
      $stmt->bindParam(':question_body', $this->question_body);
      $stmt->bindParam(':question_type', $this->question_type);
      $stmt->bindParam(':survey_id', $this->survey_id);
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


    //Create question
    public function createQuestion(){
      //Create query
      $query = 'INSERT INTO ' .$this->table . ' SET question_name = :question_name, question_body = :question_body, question_type = :question_type, survey_id = :survey_id ';
      //prepare statement
      $stmt = $this->conn->prepare($query);

      //clean data in security
      $this->question_name =htmlspecialchars(strip_tags($this->question_name));
      $this->question_body =htmlspecialchars(strip_tags($this->question_body));
      $this->question_type =htmlspecialchars(strip_tags($this->question_type));
      $this->survey_id =htmlspecialchars(strip_tags($this->survey_id));

      //Bind data
      $stmt->bindParam(':question_name', $this->question_name);
      $stmt->bindParam(':question_body', $this->question_body);
      $stmt->bindParam(':question_type', $this->question_type);
      $stmt->bindParam(':survey_id', $this->survey_id);
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
    // Delete question
  public function deleteQuestion(){
    //create $query
    $query = 'DELETE FROM ' .$this->table . ' WHERE question_id = :question_id ';
    //preprare statement
    $stmt = $this->conn->prepare($query);
    //clean data
    $this->question_id =htmlspecialchars(strip_tags($this->question_id));
    //bind data
    $stmt->bindParam(':question_id', $this->question_id);
    //execute query
    if ($stmt->execute()){
        return true;
    }
      //print errorif something goes wrong
      printf("Error: %s.\n ", $stmt->error);
      return false;

  }

}
