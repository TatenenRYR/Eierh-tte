<?php
// CORS erlauben
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// OpenRouteService Endpoint
$url = "https://api.openrouteservice.org/v2/directions/cycling-regular/json";

// Request vom Client weiterleiten
$input = file_get_contents("php://input");

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRkZWI3Y2EzZWU1ZTUzYmRiNTZkZGQzYTQ4MmQ1NzkyZGJiZGM5OGRmMDQ4ZTU3YWMwODYwNzEwIiwiaCI6Im11cm11cjY0In0=",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
