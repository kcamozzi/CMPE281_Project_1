import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-west-1_h6bwYcCrY",
    ClientId: "kl5jabfq2hs4fgg9kp9hneohb"
}

export default new CognitoUserPool(poolData);