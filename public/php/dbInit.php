<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

require_once "./SleekDB-master/SleekDB-master/src/Store.php";
$configuration = [
    "timeout" => false,
    "primary_key" => "id",
];
$databaseDirectory = "./store.db";
$tasksStore = new \SleekDB\Store("tasks", $databaseDirectory, $configuration);