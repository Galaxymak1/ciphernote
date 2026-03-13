from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from schemas.AuthSchema import TokenData
from security.JwtUtils import verify_access_token

security = HTTPBearer()

def get_current_user(credentials : HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    token = credentials.credentials
    payload = verify_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Could not validate credentials.")

    return payload
