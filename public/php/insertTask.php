<?php

require_once("./dbInit.php");
$data = json_decode(file_get_contents('php://input'));
$task = [
    "title" => $data->{"title"},
    "dateTime" => $data->{"dateTime"},
    "reminder" => $data->{"reminder"}
];
$tasksStore->insert($task);