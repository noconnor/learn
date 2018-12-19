
import { AuthPiece } from "aws-amplify-react";

class BypassVerify extends AuthPiece {
    constructor(props) {
        super(props);
        this._validAuthStates = ['verifyContact'];
    }
    showComponent(theme) {
        this.changeState('signedIn', this.props.authData);
        return null;
    }
}

export default BypassVerify;