<?php
$dim = 50;

function makeID($x, $y){
  $id = "";

  if($x < 10){
    $id = $id."0";
  }
  $id = $id.$x;

  if($y < 10){
    $id = $id."0";
  }
  $id = $id.$y;

  return $id;
}

function drawLife($dim){
  if($dim < 10 || $dim > 99){
    die("Come on, don't be stupid ya !");
  }
  else{
    echo("<table id='game' >");
    for($i=0 ; $i<$dim ; $i++){
      echo("<tr>");
      for($j=0 ; $j<$dim ; $j++){
        $id = makeID($i, $j);
        echo("<td id='$id'class='gameBit bitOff' ></td>");
      }
      echo("</tr>");
    }
    echo("</table>");
  }
}

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Game of Life | Tanay Manohar Kapoor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Game of life">
    <meta name="author" content="Tanay Manohar Kapoor">
    <link href="assets/css/main.css" type="text/css" rel="stylesheet" />
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/bootstrap-responsive.css" rel="stylesheet">
    <div id="content" class="row-fluid">
      <div id="gameContainer"class="offset1 span5 center_content">
        <?php drawLife($dim); ?>
      </div>
      <div id="controls" class="span5 center_content">
        <div class="bottom_margin">
          <button id="startGame" class="btn btn-success btn-large">Start</button>
          <button id="stopGame" class="btn btn-danger btn-large">Stop</button>
        </div>
        <div class="bottom_margin">
          <p id="notifications"></p>
        </div>
      </div>
    </div>



    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->

    <!-- Global Vars -->
    <script type="text/javascript">
      var dim = <?php echo($dim); ?>;
    </script>

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>

  </body>
</html>
