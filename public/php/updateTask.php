<?php
require_once("./dbInit.php");
$data = json_decode(file_get_contents('php://input'));
$updatedTask = [
    "title" => $data->{"title"},
    "dateTime" => $data->{"dateTime"},
    "reminder" => $data->{"reminder"},
];
$id = $data->{"id"};
$tasksStore->updateById($id, $updatedTask);