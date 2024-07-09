package Utilities.Handler;

public class RegisterHandler extends JsonHandler {

    private String user;
    private Boolean userCreated;

    public RegisterHandler(Boolean userCreated, String message, String user) {
        super(message);
        this.userCreated = userCreated;
        this.user = user;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Boolean getUserCreated() {
        return userCreated;
    }

    public void setUserCreated(Boolean userCreated) {
        this.userCreated = userCreated;
    }

}
