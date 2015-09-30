package project.model;

import misc.Log;
import org.springframework.stereotype.Service;
import project.responseentities.subentities.User;

import java.net.URISyntaxException;
import java.sql.*;

/**
 * Created by olafurorn on 9/30/15.
 */
@Service
public class UserModel extends AbstractModel
{
    private static final String LOGTAG = UserModel.class.getSimpleName();

    public UserModel()
    {

    }

    /**
     *
     * @param userId for the user (i.e. fb-id)
     * @return null if user doesn't exist in database
     *         else the user object
     */
    public User getUser(String userId)
    {
        User user = null;
        try
        {
            Connection connection = getConnectionToDatabase();

            final String sqlQuery = "SELECT * FROM " + DatabaseConstants.TABLE_USERS
                    + " WHERE " + DatabaseConstants.TABLE_USERS_COLUMN_USER_ID + " = ?;";
            PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
            preparedStatement.setString(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next())
            {
                final String name = resultSet.getString(DatabaseConstants.TABLE_USERS_COLUMN_NAME);
                final String id = userId;
                final String email = resultSet.getString(DatabaseConstants.TABLE_USERS_COLUMN_EMAIL);

                user = new User(id, name, email);
            }

            resultSet.close();
            preparedStatement.close();
        }
        catch (URISyntaxException e)
        {
            Log.e(LOGTAG, "Couldn't get user", e);
        }
        catch (SQLException e)
        {
            Log.e(LOGTAG, "Couldn't get user", e);
        }






        if (user == null)
        {
            Log.i(LOGTAG, "User, id: " + userId + ", does NOT exist in database");
        }
        else
        {
            Log.i(LOGTAG, "User, id: " + userId + ", does exist in database, return user");
        }

        return user;
    }


    /**
     * Create user in database
     */
    public void createUser(String id, String name, String email)
    {
        try
        {
            Connection connection = getConnectionToDatabase();

            final String sqlQuery = "INSERT  INTO " + DatabaseConstants.TABLE_USERS + " (" +
                    DatabaseConstants.TABLE_USERS_COLUMN_USER_ID + ", " +
                    DatabaseConstants.TABLE_USERS_COLUMN_NAME + ", " +
                    DatabaseConstants.TABLE_USERS_COLUMN_EMAIL
                    + ") VALUES (?,?,?);";
            PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
            preparedStatement.setString(1, id);
            preparedStatement.setString(2, name);
            preparedStatement.setString(3, email);
            preparedStatement.execute();

            preparedStatement.close();
        }
        catch (URISyntaxException e)
        {
            Log.e(LOGTAG, "Couldn't get user", e);
        }
        catch (SQLException e)
        {
            Log.e(LOGTAG, "Couldn't get user", e);
        }

    }
}
