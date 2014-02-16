<?php

function sanitizeGameId($gameId) {
    $gameId = intval($gameId);
    
    if($gameId === 0) {
        die;
    }
    
    return $gameId;
}

function getDataPathForGameId($gameId) {
    return 'data/offers-' . $gameId . '.data';
}

function options() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    if ( strtolower($_SERVER['REQUEST_METHOD']) == 'options' ) {
        header('Access-Control-Allow-Headers: Access-Control-Request-Headers, Access-Control-Request-Method, Access-Control-Allow-Origin, Content-Type');
        exit;
    }
}

function get($gameId) {
    $gameId = sanitizeGameId($gameId);
    $path = getDataPathForGameId($gameId);
    
    $offers = array();
    
    if(file_exists($path)) {
        $data = file_get_contents($path);
        
        if($data !== '') {
            $offers = unserialize($data);
        }
    }
    
    return $offers;
}

function put($gameId, $data) {
    $gameId = sanitizeGameId($gameId);
    $path = getDataPathForGameId($gameId);
    
    $offers = get($gameId);
    
    $offers[] = $data;

    file_put_contents($path, serialize($offers));
}

options();

if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'));
    put($_GET['gameId'], $data);
}

echo json_encode(get($_GET['gameId']));