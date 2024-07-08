package Utilities.Handler;

public class JwtHandler extends JsonHandler {
    private Boolean isVerified;
    private String jwt;
    public JwtHandler(Boolean isVerified, String message, String jwt){
        super(message);
        this.isVerified = isVerified;
        this.jwt = jwt;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
    
}
