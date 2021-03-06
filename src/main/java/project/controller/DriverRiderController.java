package project.controller;

import misc.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import project.mockservice.MockDataService;
import project.responseentities.DriverRiderResponse;
import project.service.DriverRiderService;
import project.service.UserService;

/**
 * Created by olafurorn on 10/1/15.
 */
@Controller
public class DriverRiderController
{
    private static final String LOGTAG = DriverRiderController.class.getSimpleName();

    private final UserService userModel;
    private final DriverRiderService driverRiderService;
    private final MockDataService mockDataService;


    @Autowired
    public DriverRiderController(UserService userService, DriverRiderService driverRiderService,
                                 MockDataService mockDataService)
    {
        this.userModel = userService;
        this.driverRiderService = driverRiderService;
        this.mockDataService = mockDataService;
    }

    @RequestMapping(value = "/driverrider", method = RequestMethod.GET)
    public ResponseEntity<DriverRiderResponse> getDriverRider(
            //@RequestParam(value="accessToken") String accessToken, TODO: check the accessToken
    )
    {
        // user exist and we return 200

        DriverRiderResponse driverRiderResponse = new DriverRiderResponse(
                driverRiderService.getDriverListEntry(),
                driverRiderService.getRiderListEntry());
        return new ResponseEntity<DriverRiderResponse>(driverRiderResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/registerrider", method = RequestMethod.POST)
    public ResponseEntity<Object> registerRider(
            @RequestParam(value="phone_number") int phoneNumber,
            @RequestParam(value="price") int price,
            @RequestParam(value="number_of_people") int numberOfPeople,
            @RequestParam(value="location") String location,
            @RequestParam(value="destination") String destination,
            @RequestParam(value="message") String message,
            @RequestParam(value="pickup_time_timestamp") long pickUpTimeTimestamp,
            @RequestParam(value="user_id") String userId
            //@RequestParam(value="accessToken") String accessToken, TODO: check the accessToken
    )
    {
        Log.i(LOGTAG, "calling /registerrider");
        driverRiderService.createRiderListEntry(phoneNumber,
                price,
                numberOfPeople,
                location,
                destination,
                message,
                pickUpTimeTimestamp,
                userId);
        return new ResponseEntity<Object>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/registerdriver", method = RequestMethod.POST)
    public ResponseEntity<Object> registerDriver(
            @RequestParam(value="phone_number") int phoneNumber,
            @RequestParam(value="low_price") int lowPrice,
            @RequestParam(value="high_price") int highPrice,
            @RequestParam(value="number_of_people") int numberOfPeople,
            @RequestParam(value="place") String place,
            @RequestParam(value="car_description") String carDescription,
            @RequestParam(value="message") String message,
            @RequestParam(value="start_time_timestamp") long startTimeTimestamp,
            @RequestParam(value="end_time_timestamp") long endTimeTimestamp,
            @RequestParam(value="user_id") String userId
            //@RequestParam(value="accessToken") String accessToken, TODO: check the accessToken
    )
    {
        Log.i(LOGTAG, "calling /registerdriver");
        driverRiderService.createDriverListEntry(phoneNumber,
                lowPrice,
                highPrice,
                numberOfPeople,
                place,
                carDescription,
                message,
                startTimeTimestamp,
                endTimeTimestamp,
                userId);
        return new ResponseEntity<Object>(HttpStatus.CREATED);
    }

}
