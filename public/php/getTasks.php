<?php
require_once("./dbInit.php");
echo json_encode($tasksStore->findAll());