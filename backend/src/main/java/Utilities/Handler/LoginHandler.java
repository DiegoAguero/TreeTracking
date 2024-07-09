package Utilities.Handler;

public class LoginHandler extends JsonHandler {

    private Boolean userLogged;
    private String user;

    public LoginHandler(Boolean userLogged, String message, String user) {
        super(message);
        this.userLogged = userLogged;
        this.user = user;
    }

    public Boolean getUserLogged() {
        return userLogged;
    }

    public String getUser() {
        return user;
    }

    public void setUserLogged(Boolean userLogged) {
        this.userLogged = userLogged;
    }

    public void setUser(String user) {
        this.user = user;
    }

}
