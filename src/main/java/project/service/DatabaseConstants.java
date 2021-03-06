package project.service;

/**
 * Created by olafurorn on 9/30/15.
 */
public class DatabaseConstants
{

    /******* TABLE: USERS *******/
    public static final String TABLE_USERS = "users";
    public static final String TABLE_USERS_COLUMN_USER_ID = "user_id";
    public static final String TABLE_USERS_COLUMN_ACCESS_TOKEN = "access_token";
    public static final String TABLE_USERS_COLUMN_FIRST_NAME = "first_name";
    public static final String TABLE_USERS_COLUMN_NAME = "name";
    public static final String TABLE_USERS_COLUMN_EMAIL = "email";
    public static final String TABLE_USERS_COLUMN_PICTURE_URL = "picture_url";
    public static final String TABLE_USERS_COLUMN_STAR_RATING = "star_rating";
    public static final String TABLE_USERS_COLUMN_NUMBER_OF_STAR_RATINGS = "number_of_star_ratings";


    /******* TABLE: RIDER_LIST_ENTRY ******/
    public static final String TABLE_RIDER_ENTRY = "rider_list_entry";
    public static final String TABLE_RIDER_ENTRY_COLUMN_PHONE_NUMBER = "phone_number";
    public static final String TABLE_RIDER_ENTRY_COLUMN_PRICE = "price";
    public static final String TABLE_RIDER_ENTRY_COLUMN_NUMBER_OF_PEOPLE = "number_of_people";
    public static final String TABLE_RIDER_ENTRY_COLUMN_LOCATION = "location";
    public static final String TABLE_RIDER_ENTRY_COLUMN_DESTINATION = "destination";
    public static final String TABLE_RIDER_ENTRY_COLUMN_MESSAGE = "message";
    public static final String TABLE_RIDER_ENTRY_COLUMN_PICK_UP_TIMESTAMP = "pick_up_timestamp";
    public static final String TABLE_RIDER_ENTRY_COLUMN_USER_ID = "user_id";


    /******* TABLE: DRIVER_LIST_ENTRY ******/
    public static final String TABLE_DRIVER_ENTRY = "driver_list_entry";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_PHONE_NUMBER = "phone_number";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_LOW_PRICE = "low_price";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_HIGH_PRICE = "high_price";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_NUMBER_OF_PEOPLE = "number_of_people";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_PLACE = "place";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_CAR_DESCRIPTION = "car_description";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_MESSAGE = "message";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_START_TIME = "start_time_timestamp";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_END_TIME = "end_time_timestamp";
    public static final String TABLE_DRIVER_ENTRY_COLUMN_USER_ID = "user_id";


}
