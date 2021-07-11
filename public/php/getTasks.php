<?php
require_once("./dbInit.php");
$data = json_decode(file_get_contents('php://input'));
$user = $data->{"user"};
echo json_encode($tasksStore->findBy(["user","=",$user]));