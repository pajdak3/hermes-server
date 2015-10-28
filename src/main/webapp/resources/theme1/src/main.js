var Main = (function() {

  var userData;
  var riderIsRegistered = false;
  var driverIsRegistered = false;
  var addRiderDriver = false;
    //Get out of rider with clicking outside of div
  $(document).mousedown(function(e) {
      var container = $(".register");

      if (!container.is(e.target) && // if the target of the click isn't the container...
          container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          container.hide();
          $(".addContainer").on("click",showRegisterForm);
      }
  });

  function showRegisterForm(e) {
      $(".addContainer").off("click");
      $(".register").hide().fadeIn(600);
      // Header
      var headerName = $('.headerName');
      $(headerName).empty();
      // Place
      var place = $('.place');
      $(place).empty();

      //Clock
      var now = new Date();
      now.setMinutes(now.getMinutes() + 30); // Default is 30 minutes after you decide to post
      var clocks = $('.clocks');
      var selectHours = $('<select class="selectHours"></select>');
      var selectMinutes= $('<select class="selectMinutes"></select>');
      $(clocks).empty();
      for (var i = 0; i < 24; i++) {
        $('<option value="' + i +'">' + ('0' + i).slice(-2) + '</option>').appendTo(selectHours);
        if (i < 12) $('<option value="' + i +'">' + ('0' + 5 * i).slice(-2) + '</option>').appendTo(selectMinutes);
      }
      $(selectHours).val(now.getHours());
      $(selectMinutes).val(Math.floor(now.getMinutes() / 5));
      $('<h4>Tími</h4>').appendTo(clocks);

      if(addRiderDriver){
      riderIsRegistered=true;
      driverIsRegistered=false;
      // Header
      var headName = ('<p>Skrá <span class="ice">ís</span>Far</p>');
      // Location and Destination
      var locationInput = $('<input type="text" name="location" class="locationInput" placeholder="Upphafsstaður">');
      var to = $('<span class="loc_to_des"> til </span>');
      var destinationInput= $('<input type="text" name="destination" class="destinationInput" placeholder="Áfangastaður">');
      var errorLocation= $('<label id="errorLocation"></label>');   
      var errorDestination= $('<label id="errorDestination"></label>');
      $(locationInput).appendTo(place);
      $(to).appendTo(place);
      $(destinationInput).appendTo(place);
      $(errorLocation).appendTo(place);
      $(errorDestination).appendTo(place);

      $(selectHours).appendTo(clocks);
      $(selectMinutes).appendTo(clocks);
      // Car
      var car = $('.car');
      $(car).empty();
      }

      if(!addRiderDriver){
      riderIsRegistered=false;
      driverIsRegistered=true;
      // Header
      var headName = ('<p>Skrá <span class="ice">ís</span>Skutlara</p>');
      // Location
      var locationAreaInput= $('<input type="text" name="location" class="locationAreaInput" placeholder="Svæði, t.d. höfuðborgarsvæðið">');
      var errorlocationArea = $('<label id="errorLocationArea"></label>');
      $(locationAreaInput).appendTo(place);
      $(errorlocationArea).appendTo(place);
      // CarDescription
      var car = $('.car');
      $(car).empty();
      var carDescription = $('<input type="text" name="carDescription" class="carDescription" placeholder="Lýsing á bíl">');
      var errorCar = $('<label id="errorCar"></label>');
      $(carDescription).appendTo(car);
      $(errorCar).appendTo(car);
      // 2 Clocks
      $(selectHours).appendTo(clocks);
      $(selectMinutes).appendTo(clocks);
      }
      $(headName).appendTo(headerName);

      e.preventDefault();
  }
  //Ride information, run when Ok is clicked
  function postInfo(e) {
      // this er formið, $(this) býr til jQuery hlut af forminu
      var form = $(this);
      // Get input from inputs ID's
      var phoneElement = $('.phoneInput');
      var locationElement = $('.locationInput');
      var destinationElement = $('.destinationInput');
      var locationAreaElement = $('.locationAreaInput');
      var carElement = $('.carDescription');
      var phone = phoneElement.val();
      var location = locationElement.val();
      var destination = destinationElement.val();
      var locationArea = locationAreaElement.val();
      var carDescription = carElement.val();

      var timestamp = new Date();
      timestamp.setHours($('.selectHours').val());
      timestamp.setMinutes($('.selectMinutes').val());
      var phoneNumber=parseInt(phone); 

      var valid = true;
      //Phone
      if (phone === '') {
          $("#errorPhone").text("* Vinsamlegast skráðu símanúmerið þitt");
          valid = false;
          phoneElement.addClass('invalid');
      }
      //Check if its only numbers
      if (phone.match(/^[0-9]+$/) === null) {
          valid = false;
          phoneElement.addClass('invalid');
      } else {
          $("#errorPhone").text("");
          phoneElement.removeClass('invalid');
      }
      if (phone !== '' && phone.match(/^[0-9]+$/) === null) {
          $("#errorPhone").text("* Vinsamlegast hafðu aðeins tölustafi í símanúmerinu þínu");
      }
      //Location
      if (location === '') {
          $("#errorLocation").text("* Vinsamlegast settu inn upphafsstað");
          valid = false;
          locationElement.addClass('invalid');
      } else {
          $("#errorLocation").text("");
          locationElement.removeClass('invalid');
      }
      //Destination
      if (destination === '') {
          $("#errorDestination").text("* Vinsamlegast settu inn áfangastað");
          valid = false;
          destinationElement.addClass('invalid');
      } else {
          $("#errorDestination").text("");
          destinationElement.removeClass('invalid');
      }
      //Location Area
      if (locationArea === '') {
          $("#errorLocationArea").text("* Vinsamlegast settu inn keyrslusvæði");
          valid = false;
          locationAreaElement.addClass('invalid');
      } else {
          $("#errorLocationArea").text("");
          locationAreaElement.removeClass('invalid');
      }
      //Car
      if (carDescription === '') {
          $("#errorCar").text("* Vinsamlegast settu inn lýsingu á bíl");
          valid = false;
          carElement.addClass('invalid');
      } else {
          $("#errorCar").text("");
          carElement.removeClass('invalid');
      }

      //Shows result box with valid or unvalid
      if (valid){
          var accessTokenObj = localStorage.getItem('accessToken');
          var userId;
          if (accessTokenObj) {
            accessTokenObj = JSON.parse(accessTokenObj);
            if (accessTokenObj.timestamp < new Date().getTime()) {
              response.accessToken = '';
              localStorage.removeItem('accessToken');
            } else {
              userId = accessTokenObj.userId;
            }
          }
          //resets everything
         
          console.log(location);
          console.log(($('.locationInput')).val());
          var riderdata= {
            phone_number:phoneNumber,
            price:$("#slider-range").slider("values", 0),
            number_of_people: $("input[type='radio'][name='rGroup']:checked").val(),
            location: ($('.locationInput')).val(),
            destination: ($('.destinationInput')).val(),
            message : $('#message').val(),
            userId: userId,
            pickup_time_timestamp: timestamp.getTime()
          }
          console.log(riderdata);
          //Sends info to registerdriver
          if(riderIsRegistered){
            $.ajax({
              type: 'POST',
              url: '/registerrider',
              data: riderdata,
              statusCode: {
                201: function() {
                  console.log("WE GOT 201!");
                }
              },
              success: function(data) {
                  console.log("Skrá ísFar tókst");
              }
            }).fail(function() {
              console.log("Skrá ísFar mistókst");
            });
          }
          var driverdata= {
            phone_number:phoneNumber,
            low_price:$("#slider-range").slider("values", 0),
            high_price:$("#slider-range").slider("values", 1),
            number_of_people: $("input[type='radio'][name='rGroup']:checked").val(),
            place: ($('.locationAreaInput')).val(),
            car_description: ($('.carDescription')).val(),
            message : $('#message').val(),
            start_time_timestamp: 345345345,
            end_time_timestamp: 34534534,
            userId: userId
          }  
          console.log(driverdata);
          //Sends info to registerdriver
          if(driverIsRegistered){
            $.ajax({
              type: 'POST',
              url: '/registerdriver',
              data: driverdata,
              statusCode: {
                201: function() {
                  console.log("WE GOT 201!");
                }
              },
              success: function(data) {
                  console.log("Skrá ísSkutl tókst");
              }
            }).fail(function() {
              console.log("Skrá ísSkutl mistókst");
            }); 
          }
          $('#form').get(0).reset();
          $(".register").hide();
          $(".addContainer").on("click", init);
        } 

      e.preventDefault();
  }

  function showRiders() {
    addRiderDriver=false;
    var userList = $('.userList');
    userList.empty();
    $('.selectDriver').removeClass('notActiveTab');
    $('.selectRider').addClass('notActiveTab');
    var riders = userData.ridersList;
    for (var i = 0; i < riders.length; i++) {
      var container = $('<div class="postContainer"></div>');
      var userHead = $('<div class="userHead"></div>');
      var userBody = $('<div class="userBody"></div>');
      var starContainer = $('<div class="starContainer"></div>');
      var userInfo = $('<div class="userInfo"></div>');
      for (var j = 0; j < riders[i].rider.starRating; j++) {
        $('<span class="glyphicon glyphicon-star"></span>').appendTo(starContainer);
      }
      $('<a target="_blank" href="http://www.facebook.com/' + riders[i].rider.id + '"><img src="' +
        riders[i].rider.profilePictureUrl + '"></a>').appendTo(userHead);
      $('<a target="_blank" class="userName" href="http://www.facebook.com/' + riders[i].rider.id + '">' +
        riders[i].rider.name + '</a>').appendTo(userInfo);
      $(starContainer).appendTo(userInfo);
      $('<p>Frá: ' + riders[i].currentLocation + '</p>').appendTo(userBody);
      $('<p>Til: ' + riders[i].destination + '</p>').appendTo(userBody);
      $('<p>Verðhugmynd: 4000 kr.</p>').appendTo(userBody);
      $('<p>Þarf far fyrir fjóra</p>').appendTo(userBody);
      
      userInfo.appendTo(userHead);
      userHead.appendTo(container);
      userBody.appendTo(container);
      container.appendTo(userList);
    }

  }

  function showDrivers() {
    addRiderDriver=true;
    var userList = $('.userList');
    var drivers = userData.driversList;
    $('.selectDriver').addClass('notActiveTab');
    $('.selectRider').removeClass('notActiveTab');
    userList.empty();
    for (var i = 0; i < drivers.length; i++) {
      var container = $('<div class="postContainer"></div>');
      var userHead = $('<div class="userHead"></div>');
      var userBody = $('<div class="userBody"></div>');
      var starContainer = $('<div class="starContainer"></div>');
      var userInfo = $('<div class="userInfo"></div>');
      var driverInfo = $('<div class="driverInfoContainer clearfix"></div>');
      var time = $('<section class="driverInfo"></section>');
      var location = $('<section class="driverInfo"></section>');
      var carDescription = $('<section class="driverInfo"></section>');
      var money = $('<section class="driverInfo"></section>');
      var people = $('<section class="driverInfo"></section>');
      var message = $('<article></article>')
      
      for (var j = 0; j < drivers[i].driver.starRating; j++) {
        $('<span class="glyphicon glyphicon-star"></span>').appendTo(starContainer);
      }
      $('<a target="_blank" href="http://www.facebook.com/' + drivers[i].driver.id + '"><img src="' +
        drivers[i].driver.profilePictureUrl + '"></a>').appendTo(userInfo);
      $('<a target="_blank" class="userName" href="http://www.facebook.com/' + drivers[i].driver.id + '">' +
        drivers[i].driver.name + '</a>').appendTo(userInfo);
      $(starContainer).appendTo(userInfo);

      // Time
      $('<span class="glyphicon glyphicon-time"></span>').appendTo(time);
      $('<p>' + new Date(drivers[i].startDriving).toTimeString().substr(0, 5) +
        '-' + new Date(drivers[i].stopDriving).toTimeString().substr(0, 5) + '</p>').appendTo(time);

      // Location
      $('<span class="glyphicon glyphicon-map-marker"></span>').appendTo(location);
      $('<p>' + drivers[i].place + '</p>').appendTo(location);

      // Car description
      $('<i class="fa fa-car"></i>').appendTo(carDescription);
      $('<p>' + drivers[i].carDescription + '</p>').appendTo(carDescription);

      // Money
      $('<span class="glyphicon glyphicon-usd"></span>').appendTo(money);
      $('<p>' + drivers[i].lowPrice + '-' + drivers[i].highPrice + ' kr.</p>').appendTo(money);

      // People
      $('<div class="passengersContainer"><i class="fa fa-user-times">' + drivers[i].numberOfPeople + '</i></div>').appendTo(people);

      // Message
      $('<p>' + drivers[i].message +'</p>').appendTo(message);

      
      location.appendTo(driverInfo);
      carDescription.appendTo(driverInfo);
      time.appendTo(driverInfo);
      money.appendTo(driverInfo);
      people.appendTo(driverInfo);
      message.appendTo(userBody);
      userInfo.appendTo(userHead);
      driverInfo.appendTo(userHead);
      userHead.appendTo(container);
      userBody.appendTo(container);
      container.appendTo(userList);

    }
  }

  function textBoxKeycount(){
    //Makes max number of keys in textbox
    $('textarea').keydown(function(e) {
      this.value = this.value.substr(0, 256);
      //fjoldi = $(this).val().length;
      //$('#eftir').text((256 - fjoldi) + ' eftir.');
    });
  }
  //Price slider
  function priceSlider(){
  $(function() {
      $("#slider-range").slider({
        range: true,
        min: 0,
        max: 10000,
        values: [1000, 2000],
        step: 100,
        slide: function(event, ui) {
            $("#amount").val(ui.values[0] + "kr" + " - " + ui.values[1] + "kr");
        }
      });
      $("#amount").val($("#slider-range").slider("values", 0) + "kr" +
          " - " + $("#slider-range").slider("values", 1) + "kr");
    });
  }

  function init() {
    $('.selectRider').on('click', showDrivers);
    $('.selectDriver').on('click', showRiders);
    $('.submitRegister').on('click', postInfo);
    $(".addContainer").on("click", showRegisterForm);


    //Max keyCount
    textBoxKeycount();
    //RiderInfo price slider
    priceSlider();

    //getDriverRiderList
    $.ajax({
      type: 'GET',
      url: '/driverrider',
      success: function(data) {
        console.log(data);
        userData = data;
        showDrivers();
      }
    }).fail(function() {
      var userList = $('.userList');
      $('.pickContainer').hide();
      $('<section class="wrong"><h3>Úps. Þetta er vandræðalegt.</h3><p>Eitthvað fór úrskeiðis</p>' +
        '<p>Vinsamlegast reyndu aftur</p></section>').appendTo(userList);
    });
  }
  return {
    init: init
  };
})();

$(document).ready(function() {
  Main.init();
});

