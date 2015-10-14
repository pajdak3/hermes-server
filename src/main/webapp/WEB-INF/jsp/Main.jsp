<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="is">

<head>
  <meta charset="UTF-8">
  <title>ÍsFar</title>
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
  <link href='/resources/theme1/css/main.css' rel='stylesheet' type='text/css'>
  <script src="/resources/theme1/build/jquery-1.11.3.min.js"></script>
  <script src="/resources/theme1/src/main.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
</head>

<body>
  <header class="basic-header">
    <h1>ÍsFar</h1>
  </header>
  <main>
    <section class="whatToDo">
      <h1>Mig langar að ...</h1>
    </section>
    <section class="add" id="rider">
        <a></a>
    </section>
    <section class="pickContainer">
      <h5 class="selectRider">Bjóða ísFar</h5>
      <h5 class="selectDriver">Fá ísFar</h5>
    </section>
    <section class="rider-driver-list">
        <div id="rider-driver-data" class="container-fluid"></div>
    </section>
    <div class="overlay"></div>
    <div class="riderRegister">
        <div class="riderRegister_Header">
            <p>Skrá 
                <span class="ice">ís</span>Far
            </p>
        </div>
        <div class="riderRegister_Body">   
            <form name="form" id="form" method="post">             
                <div>           
                    <input type="text" id="phone" class="riderInput" name="phone" placeholder="Símanúmer">
                    <label id="errorPhone"></label>
                </div>
                <div>
                  <input type="text" id="location" name="location" class="locationInput" placeholder="Upphafsstaður">
                  <span class="loc_to_des"> til </span>
                  <input type="text" id="destination" name="destination" class="destinationInput" placeholder="Áfangastaður">
                </div>
                <label id="errorLocation"></label>     
                <label id="errorDestination"></label>
                <p>
                    <label for="amount">Verðhugmynd:</label>
                    <input type="text" id="amount" class="price">
                </p>
                <div id="slider-range"></div>    
                <div class="radios">
                    <span>Fjöldi farþega:</span>
                    <input type="radio" name="rGroup" value=1 id="r1" checked="checked" />
                    <label class="radio" for="r1">1</label>
                    <input type="radio" name="rGroup" value=2 id="r2" />
                    <label class="radio" for="r2">2</label>
                    <input type="radio" name="rGroup" value=3 id="r3" />
                    <label class="radio" for="r3">3</label>
                    <input type="radio" name="rGroup" value=4 id="r4" />
                    <label class="radio" for="r4">4</label>
                    <input type="radio" name="rGroup" value=5 id="r5" />
                    <label class="radio" for="r5">5</label>
                    <input type="radio" name="rGroup" value=6 id="r6" />
                    <label class="radio" for="r6">6</label>
                </div>
                <div class="clocks">
                  <div class="firstTime">
                    <div class="clock" id="time"></div>
                    <button class="clockButton">+</button>  
                  </div>
                  <div class="secondTime">
                    <div class="clock" id="time2"></div>
                    <button class="clockButton2">+</button>  
                  </div>
                </div>
                <div>
                    <textarea rows="4" cols="20" class="max" id="message" name="comments" placeholder="Auka athugasemdir"></textarea>
                    <button class="submitRider">
                        <i class="fa fa-taxi"></i>
                        Skrá far
                    </button>
                </div>       
            </form>
        </div>
    </div>
        <section class="userList">

        </section>

  </main>
</body>

</html>