package Utilities;

public abstract class JsonHandler {
    private String message;
    // In case of User Registration
    public JsonHandler(String message) {
        this.message = message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    
}
