<?php
require_once("./dbInit.php");
$data = json_decode(file_get_contents('php://input'));
$id = $data->{"id"};
$tasksStore->deleteById($id);