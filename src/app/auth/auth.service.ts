import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string
    expiresIn: string
    localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0rQyoGwBIhqgSyM_BOTGz_UN6jO8hCQ8";

    constructor(private httpClient: HttpClient) { }

    signup(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(this.authUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }

}