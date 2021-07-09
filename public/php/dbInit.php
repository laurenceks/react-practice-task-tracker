<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

require_once "./SleekDB-master/SleekDB-master/src/Store.php";
$configuration = [
    "timeout" => false,
    "primary_key" => "id",
];
$databaseDirectory = "./store.db";
$tasksStore = new \SleekDB\Store("tasks", $databaseDirectory, $configuration);