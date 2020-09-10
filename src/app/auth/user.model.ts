

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        public _tokenExpiry: Date,
        public emailVerified: boolean,
        public displayName?: string,
        public profileImage?: string,
    ) { }

    get token(){
        if (!this._tokenExpiry || new Date() > this._tokenExpiry){
            return null;
        }
        return this._token; 
    }

}