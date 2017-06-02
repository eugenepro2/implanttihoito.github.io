<?php

function post($url, $data) {
  $header = array("User-Agent: " . $_SERVER["HTTP_USER_AGENT"], "Content-Type: multipart/form-data");
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  $response = curl_exec($curl);
  print_r($data);
  curl_close($curl);
  return $response;
}

$url = 'https://crm.zoho.com/crm/WebToLeadForm';
$_POST['Last Name'] = $_POST['Last_Name'];
$_POST['zc_gad'] = $_POST['zc_gad'];
echo(post($url, $data));

?>