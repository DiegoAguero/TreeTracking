package Auth;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

import DAO.ConnectionDAO;
public class TokenService {
    public String createJWT(String id, String email, String id_locality){
        long sessionTime = 900000;
        Date todayDate = new Date();
        Date logoutTime = new Date(todayDate.getTime() + sessionTime);
        String JWTKEY = ConnectionDAO.getJWTKey();
        byte[] secretKeyBytes = JWTKEY.getBytes(StandardCharsets.UTF_8);
        SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyBytes);
        String jwt = Jwts.builder()
                     .subject(id)
                     .issuedAt(todayDate)
                     .expiration(logoutTime)
                     .signWith(secretKey)
                     .claim("email", email)
                     .claim("locality", id_locality)
                     .compact();
        return jwt;
    }

    public String verifyJWT(String JWT){
        String jwtVerified = null;
        try{
            String JWTKEY = ConnectionDAO.getJWTKey();
            byte[] secretKeyBytes = JWTKEY.getBytes(StandardCharsets.UTF_8);
            SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyBytes);
            Claims claimsJws = Jwts.parser()
                                    .verifyWith(secretKey)
                                    .build()
                                    .parseSignedClaims(JWT)
                                    .getPayload();
            System.out.println("Verified. " + claimsJws);
            jwtVerified = claimsJws.toString();
        }catch(Exception e){
            e.printStackTrace();
        }
        return jwtVerified;
    }
}
