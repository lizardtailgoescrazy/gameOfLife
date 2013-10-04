<?php
//Defines board size
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
    <div class="row-fluid">
      <div id="header" class="offset1 span10">
        <h1 class="grey_text" >Game of Life | Tanay Manohar Kapoor</h1>
      </div>
    </div>
    <div id="content" class="row-fluid">
      <div id="gameContainer"class="offset1 span5 center_content">
        <?php drawLife($dim); ?>
      </div>
      <div id="controls" class="span5 center_content">
        <div class="bottom_margin">
          <button id="startGame" class="btn btn-success btn-large">Start</button>
          <button id="stopGame" class="btn btn-danger btn-large">Stop</button>
          <button id="clearGame" class="btn btn-primary btn-large">Clear</button>
        </div>
        <div class="bottom_margin">
          <h4 id="notifications" class="box_it"></h4>
        </div>
        <div class="bottom_margin box_it">
          <h3>Rules of the game</h3>
          <ol>
            <li>Any live cell with 1 or less neighbors will die due to loneliness.</li>
            <li>Any live cell with 4 or more neighbors will die due to overcrowding.</li>
            <li>Any dead cell will become alive if it has 3 neighbors nuturing it.</li>
          </ol>
        </div>
        <div class="bottom_margin box_it">
          <h4 id="cycleCount"></h4>
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
