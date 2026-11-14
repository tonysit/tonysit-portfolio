import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default ({ severity, open, onClose, anchorOrigin, children }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={anchorOrigin}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {children}
            </Alert>
        </Snackbar>
    );
}